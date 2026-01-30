import { prisma } from '@/lib/prisma'
import { ErrorResponses, isAdminAuthenticated } from '@/lib/request-helpers'
import { NextResponse } from 'next/server'

const HOURS_24 = 24 * 60 * 60 * 1000

export async function GET() {
  try {
    if (!await isAdminAuthenticated()) {
      return ErrorResponses.unauthorized()
    }

    // Ejecutar queries en paralelo para mejor rendimiento
    const [
      totalVoters,
      totalVotes,
      votesByBusiness,
      recentVotes
    ] = await Promise.all([
      prisma.voter.count(),
      prisma.vote.count(),
      prisma.business.findMany({
        where: { active: true },
        select: {
          id: true,
          name: true,
          slug: true,
          _count: { select: { votes: true } },
          votes: {
            select: { createdAt: true },
            orderBy: { createdAt: 'asc' },
            take: 1
          }
        },
        orderBy: { votes: { _count: 'desc' } }
      }),
      prisma.vote.groupBy({
        by: ['createdAt'],
        where: { createdAt: { gte: new Date(Date.now() - HOURS_24) } },
        _count: true
      })
    ])

    const ranking = votesByBusiness.map((business, index) => ({
      rank: index + 1,
      id: business.id,
      name: business.name,
      slug: business.slug,
      votes: business._count.votes,
      firstVoteAt: business.votes[0]?.createdAt || null,
    }))

    const conversionRate = totalVoters > 0
      ? ((totalVotes / totalVoters) * 100).toFixed(1)
      : '0'

    return NextResponse.json({
      summary: {
        totalVoters,
        totalVotes,
        conversionRate: `${conversionRate}%`,
      },
      ranking,
      recentActivity: recentVotes.length,
      lastUpdated: new Date().toISOString()
    })

  } catch {
    return ErrorResponses.internalError()
  }
}
