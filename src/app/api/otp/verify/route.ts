import { NextRequest } from 'next/server'

import { logAuditEvent } from '@/lib/audit'
import { LIMITS } from '@/lib/constants'
import { isAllowedEmail } from '@/lib/email'
import { hashIp, sha256Hash } from '@/lib/hash'
import { prisma } from '@/lib/prisma'
import { rateLimitOtpVerify } from '@/lib/rate-limit'
import { ErrorResponses, getClientIp, successResponse } from '@/lib/request-helpers'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    // Validar campos
    if (!email || typeof email !== 'string') {
      return ErrorResponses.emailRequired()
    }

    if (!code || typeof code !== 'string' || code.length !== LIMITS.OTP_CODE_LENGTH) {
      return ErrorResponses.invalidOtp()
    }

    const normalizedEmail = email.trim().toLowerCase()
    if (!isAllowedEmail(normalizedEmail)) {
      return ErrorResponses.invalidEmail()
    }

    const ip = getClientIp(request)
    const ipHash = hashIp(ip)

    // Rate limit
    const rateLimit = await rateLimitOtpVerify(normalizedEmail)
    if (!rateLimit.allowed) {
      return ErrorResponses.rateLimited(rateLimit.reason!)
    }

    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token: code,
      type: 'email',
    })

    if (error) {
      await logAuditEvent('OTP_VERIFY_FAILED', normalizedEmail, { ipHash, error: error.message })
      return ErrorResponses.otpExpired()
    }

    const user = data.user
    if (!user) {
      await logAuditEvent('OTP_VERIFY_FAILED', normalizedEmail, {
        ipHash,
        reason: 'No user in verifyOtp response',
      })
      return ErrorResponses.internalError()
    }

    // Asegurar voter local (1 voto por usuario de Supabase)
    const nameFromMetadata =
      typeof user.user_metadata === 'object' && user.user_metadata && 'name' in user.user_metadata
        ? String((user.user_metadata as Record<string, unknown>).name ?? '')
        : ''
    const voterName = nameFromMetadata.trim() || normalizedEmail

    const voter = await prisma.voter.upsert({
      where: { phoneE164: normalizedEmail },
      update: { name: voterName, verifiedAt: new Date() },
      create: {
        name: voterName,
        phoneE164: normalizedEmail,
        phoneHash: sha256Hash(normalizedEmail),
        verifiedAt: new Date(),
      },
      include: { vote: true },
    })

    if (voter.vote) {
      return ErrorResponses.alreadyVoted()
    }

    await logAuditEvent('OTP_VERIFIED', normalizedEmail, { ipHash, userId: user.id })

    return successResponse({
      message: 'Verificación exitosa',
      voterId: voter.id,
    })

  } catch {
    return ErrorResponses.internalError()
  }
}
