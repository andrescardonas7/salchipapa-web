import { logAuditEvent } from '@/lib/audit';
import { LIMITS } from '@/lib/constants';
import { isAllowedEmail } from '@/lib/email';
import { hashIp } from '@/lib/hash';
import { prisma } from '@/lib/prisma';
import { rateLimitOtpRequest } from '@/lib/rate-limit';
import {
    ErrorResponses,
    getClientIp,
    successResponse,
} from '@/lib/request-helpers';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, turnstileToken } = body;

    // Validar campos requeridos
    if (
      !name ||
      typeof name !== 'string' ||
      name.trim().length < LIMITS.NAME_MIN_LENGTH
    ) {
      return ErrorResponses.invalidName();
    }

    if (!email || typeof email !== 'string') {
      return ErrorResponses.emailRequired();
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!isAllowedEmail(normalizedEmail)) {
      return ErrorResponses.invalidEmail();
    }

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);

    // Verificar Turnstile (captcha)
    // Si TURNSTILE_SECRET_KEY está configurada, el captcha es requerido.
    const isTurnstileRequired = Boolean(process.env.TURNSTILE_SECRET_KEY);
    if (isTurnstileRequired && !turnstileToken) {
      return ErrorResponses.custom('Completa el captcha para continuar', 400);
    }

    if (turnstileToken) {
      const isValidCaptcha = await verifyTurnstileToken(turnstileToken, ip);
      if (!isValidCaptcha) {
        return ErrorResponses.custom('Verificación de captcha fallida', 400);
      }
    }

    // Verificar rate limit
    const rateLimit = await rateLimitOtpRequest(normalizedEmail, ip);

    if (!rateLimit.allowed) {
      return ErrorResponses.rateLimited(rateLimit.reason!);
    }

    // Verificar si ya votó con este correo
    const existingVoter = await prisma.voter.findUnique({
      where: { phoneE164: normalizedEmail },
      include: { vote: true },
    });

    if (existingVoter?.vote) {
      return ErrorResponses.alreadyVoted();
    }

    await logAuditEvent('OTP_REQUESTED', normalizedEmail, { ipHash });

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        shouldCreateUser: true,
        data: { name: name.trim() },
        ...(turnstileToken ? { captchaToken: String(turnstileToken) } : {}),
      },
    });

    if (error) {
      await logAuditEvent('OTP_REQUEST_FAILED', normalizedEmail, {
        ipHash,
        error: error.message,
      });

      // Mensaje específico para rate limit de Supabase
      if (error.code === 'over_email_send_rate_limit') {
        return ErrorResponses.custom(
          'Demasiados correos enviados. Espera unos minutos e intenta de nuevo.',
          429
        );
      }

      return ErrorResponses.custom(
        'Error al enviar el código. Intenta de nuevo.',
        500
      );
    }

    return successResponse({
      message: 'Código enviado a tu correo',
    });
  } catch {
    return ErrorResponses.internalError();
  }
}
