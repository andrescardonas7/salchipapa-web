import { prisma } from '@/lib/prisma'
import { ErrorResponses, isAdminAuthenticated } from '@/lib/request-helpers'
import { NextRequest, NextResponse } from 'next/server'

const CSV_FORMULA_PREFIX_RE = /^[=+\-@]/u

function escapeCsvCell(value: string): string {
  // Prevent CSV injection in spreadsheet apps
  const safeValue = CSV_FORMULA_PREFIX_RE.test(value) ? `'${value}` : value

  // RFC4180 escaping: double quotes inside quoted field
  const escaped = safeValue.replace(/"/g, '""')
  return `"${escaped}"`
}

export async function GET(request: NextRequest) {
  try {
    if (!await isAdminAuthenticated()) {
      return ErrorResponses.unauthorized()
    }

    const format = request.nextUrl.searchParams.get('format') || 'csv'

    const votes = await prisma.vote.findMany({
      include: {
        voter: { select: { name: true, phoneE164: true } },
        business: { select: { name: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (format === 'json') {
      return NextResponse.json({
        exported: new Date().toISOString(),
        total: votes.length,
        votes: votes.map(v => ({
          voteId: v.id,
          voterName: v.voter.name,
          voterEmail: v.voter.phoneE164,
          businessName: v.business.name,
          businessSlug: v.business.slug,
          votedAt: v.createdAt.toISOString(),
        }))
      })
    }

    // Formato CSV
    const headers = ['ID Voto', 'Nombre Votante', 'Correo', 'Negocio', 'Fecha Voto']
    const rows = votes.map(v => [
      v.id,
      v.voter.name,
      v.voter.phoneE164,
      v.business.name,
      v.createdAt.toISOString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => escapeCsvCell(String(cell))).join(','))
    ].join('\n')

    const filename = `votos-salchipapa-${new Date().toISOString().split('T')[0]}.csv`

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch {
    return ErrorResponses.internalError()
  }
}
