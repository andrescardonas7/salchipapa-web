import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const businesses = await prisma.business.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ businesses })

  } catch {
    return NextResponse.json(
      { error: 'Error al cargar los negocios' },
      { status: 500 }
    )
  }
}
