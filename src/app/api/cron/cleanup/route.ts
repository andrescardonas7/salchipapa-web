import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Verificar que la request viene de Vercel Cron
const CRON_SECRET = process.env.CRON_SECRET

export async function GET(request: NextRequest) {
  // Verificar autenticación del cron
  if (!CRON_SECRET) {
    return NextResponse.json(
      { error: 'CRON_SECRET is not configured' },
      { status: 500 }
    )
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Limpiar eventos de auditoría antiguos (más de 30 días)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const deletedAuditEvents = await prisma.auditEvent.deleteMany({
      where: {
        createdAt: { lt: thirtyDaysAgo }
      }
    })

    return NextResponse.json({
      success: true,
      cleaned: {
        auditEvents: deletedAuditEvents.count
      },
      timestamp: new Date().toISOString()
    })

  } catch {
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    )
  }
}
