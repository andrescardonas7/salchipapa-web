import { logAuditEvent } from '@/lib/audit'
import { hashIp, hashUserAgent } from '@/lib/hash'
import { prisma } from '@/lib/prisma'
import { rateLimitVoteByIp } from '@/lib/rate-limit'
import { ErrorResponses, getClientIp, getClientUserAgent, successResponse } from '@/lib/request-helpers'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user || !user.email) {
      return ErrorResponses.invalidSession()
    }

    const body = await request.json()
    const { businessId } = body

    if (!businessId || typeof businessId !== 'string') {
      return ErrorResponses.businessRequired()
    }

    // Verificar que el negocio existe y está activo
    const business = await prisma.business.findFirst({
      where: { id: businessId, active: true }
    })

    if (!business) {
      return ErrorResponses.businessInvalid()
    }

    const ip = getClientIp(request)
    const userAgent = getClientUserAgent(request)
    const ipHash = hashIp(ip)
    const userAgentHash = hashUserAgent(userAgent)
    const normalizedEmail = user.email.trim().toLowerCase()

    // Rate limit por IP (prevenir abuso)
    const rateLimit = await rateLimitVoteByIp(ip)
    if (!rateLimit.allowed) {
      return ErrorResponses.rateLimited(rateLimit.reason!)
    }

    // Verificar que el votante existe y no ha votado
    const voter = await prisma.voter.findUnique({
      where: { phoneE164: normalizedEmail },
      include: { vote: true }
    })

    if (!voter) {
      return ErrorResponses.voterNotFound()
    }

    if (voter.vote) {
      await logAuditEvent('VOTE_DUPLICATE_ATTEMPT', normalizedEmail, {
        ipHash,
        userAgentHash,
        businessId,
        existingVoteId: voter.vote.id
      })
      return ErrorResponses.alreadyVoted()
    }

    // Crear voto
    const vote = await prisma.vote.create({
      data: {
        voterId: voter.id,
        businessId,
        ipHash,
        userAgentHash,
      }
    })

    await logAuditEvent('VOTE_CREATED', normalizedEmail, {
      ipHash,
      userAgentHash,
      businessId,
      businessName: business.name,
      voteId: vote.id
    })

    return successResponse({
      message: '¡Gracias por tu voto!',
      vote: {
        id: vote.id,
        businessName: business.name,
        createdAt: vote.createdAt
      }
    })

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return ErrorResponses.alreadyVoted()
    }

    return ErrorResponses.internalError()
  }
}

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) {
      return NextResponse.json({ verified: false, hasVoted: false })
    }

    const normalizedEmail = user.email.trim().toLowerCase()

    const voter = await prisma.voter.findUnique({
      where: { phoneE164: normalizedEmail },
      include: {
        vote: {
          include: {
            business: { select: { name: true } }
          }
        }
      }
    })

    return NextResponse.json({
      verified: true,
      hasVoted: !!voter?.vote,
      vote: voter?.vote ? {
        businessName: voter.vote.business.name,
        createdAt: voter.vote.createdAt
      } : null
    })

  } catch {
    return ErrorResponses.internalError()
  }
}
