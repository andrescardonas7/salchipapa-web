import { logAuditEvent } from '@/lib/audit'
import { hashIp } from '@/lib/hash'
import { prisma } from '@/lib/prisma'
import { ErrorResponses, getClientIp, isAdminAuthenticated, successResponse } from '@/lib/request-helpers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    if (!await isAdminAuthenticated()) {
      return ErrorResponses.unauthorized()
    }

    const body = await request.json()
    const { publish } = body

    if (typeof publish !== 'boolean') {
      return ErrorResponses.custom('Valor inválido')
    }

    await prisma.systemConfig.upsert({
      where: { key: 'results_published' },
      update: { value: publish.toString() },
      create: { key: 'results_published', value: publish.toString() }
    })

    const ip = getClientIp(request)
    const ipHash = hashIp(ip)
    await logAuditEvent('RESULTS_PUBLISHED', undefined, { ipHash, published: publish })

    return successResponse({
      published: publish,
      message: publish ? 'Resultados publicados' : 'Resultados ocultados'
    })

  } catch {
    return ErrorResponses.internalError()
  }
}

export async function GET() {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: 'results_published' }
    })

    return NextResponse.json({ published: config?.value === 'true' })

  } catch {
    return ErrorResponses.internalError()
  }
}
