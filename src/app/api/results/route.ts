import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Verificar si los resultados están publicados
    const config = await prisma.systemConfig.findUnique({
      where: { key: 'results_published' }
    })

    if (config?.value !== 'true') {
      return NextResponse.json({
        published: false,
        message: 'Los resultados aún no están disponibles'
      })
    }

    // Total de votos
    const totalVotes = await prisma.vote.count()

    // Ranking de negocios
    const businesses = await prisma.business.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        _count: {
          select: { votes: true }
        }
      },
      orderBy: {
        votes: {
          _count: 'desc'
        }
      }
    })

    const ranking = businesses.map((business, index) => ({
      rank: index + 1,
      name: business.name,
      slug: business.slug,
      imageUrl: business.imageUrl,
      votes: business._count.votes,
      percentage: totalVotes > 0
        ? ((business._count.votes / totalVotes) * 100).toFixed(1)
        : '0'
    }))

    return NextResponse.json({
      published: true,
      totalVotes,
      ranking,
      lastUpdated: new Date().toISOString()
    })

  } catch {
    return NextResponse.json(
      { error: 'Error al cargar resultados' },
      { status: 500 }
    )
  }
}
