import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate Limiting para la aplicación
 *
 * En PRODUCCIÓN: Usa Upstash Redis (persistente, distribuido)
 * En DESARROLLO: Usa almacenamiento en memoria (fallback)
 */

// Verificar si Upstash está configurado
const isUpstashConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
)

// Cliente Redis de Upstash (solo si está configurado)
const redis = isUpstashConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

// Rate limiters usando Upstash
const rateLimiters = redis ? {
  otpRequestByIdentifier: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '15 m'), // 3 por correo cada 15 min
    prefix: 'ratelimit:otp:identifier',
  }),
  otpRequestByIp: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '15 m'), // 10 por IP cada 15 min
    prefix: 'ratelimit:otp:ip',
  }),
  otpVerifyByIdentifier: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 intentos cada 15 min
    prefix: 'ratelimit:verify:identifier',
  }),
  voteByIp: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, '1 h'), // 20 votos por IP por hora (familias)
    prefix: 'ratelimit:vote:ip',
  }),
  apiGeneral: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests por minuto general
    prefix: 'ratelimit:api:general',
  }),
  adminLoginByIp: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '15 m'), // 10 intentos cada 15 min
    prefix: 'ratelimit:admin:login:ip',
  }),
} : null

// ============================================
// FALLBACK: Rate limiting en memoria para desarrollo
// ============================================

interface RateLimitEntry {
  count: number
  resetAt: number
}

const memoryStore = new Map<string, RateLimitEntry>()

// Limpieza periódica de entradas expiradas
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of memoryStore.entries()) {
      if (entry.resetAt < now) {
        memoryStore.delete(key)
      }
    }
  }, 60000)
}

interface RateLimitConfig {
  windowMs: number
  max: number
}

function checkMemoryRateLimit(key: string, config: RateLimitConfig): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = memoryStore.get(key)

  if (!entry || entry.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + config.windowMs })
    return { success: true, remaining: config.max - 1 }
  }

  if (entry.count >= config.max) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  memoryStore.set(key, entry)
  return { success: true, remaining: config.max - entry.count }
}

// Configuraciones para fallback en memoria
const MEMORY_LIMITS = {
  OTP_REQUEST_BY_IDENTIFIER: { windowMs: 15 * 60 * 1000, max: 3 },
  OTP_REQUEST_BY_IP: { windowMs: 15 * 60 * 1000, max: 10 },
  OTP_VERIFY_BY_IDENTIFIER: { windowMs: 15 * 60 * 1000, max: 5 },
  VOTE_BY_IP: { windowMs: 60 * 60 * 1000, max: 20 },
  API_GENERAL: { windowMs: 60 * 1000, max: 100 },
  ADMIN_LOGIN_BY_IP: { windowMs: 15 * 60 * 1000, max: 10 },
}

// ============================================
// API PÚBLICA
// ============================================

interface RateLimitResult {
  allowed: boolean
  remaining: number
  reason?: string
}

/**
 * Rate limit para solicitud de OTP
 */
export async function rateLimitOtpRequest(identifier: string, ip: string): Promise<RateLimitResult> {
  if (rateLimiters) {
    // Producción: Upstash
    const [identifierResult, ipResult] = await Promise.all([
      rateLimiters.otpRequestByIdentifier.limit(identifier),
      rateLimiters.otpRequestByIp.limit(ip),
    ])

    if (!identifierResult.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Demasiadas solicitudes para este correo. Intenta en 15 minutos.',
      }
    }

    if (!ipResult.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Demasiadas solicitudes desde tu conexión. Intenta más tarde.',
      }
    }

    return { allowed: true, remaining: Math.min(identifierResult.remaining, ipResult.remaining) }
  }

  // Desarrollo: Memoria
  const identifierResult = checkMemoryRateLimit(
    `otp:identifier:${identifier}`,
    MEMORY_LIMITS.OTP_REQUEST_BY_IDENTIFIER
  )
  if (!identifierResult.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Demasiadas solicitudes para este correo. Intenta de nuevo más tarde.',
    }
  }

  const ipResult = checkMemoryRateLimit(`otp:ip:${ip}`, MEMORY_LIMITS.OTP_REQUEST_BY_IP)
  if (!ipResult.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Demasiadas solicitudes. Intenta de nuevo más tarde.',
    }
  }

  return { allowed: true, remaining: Math.min(identifierResult.remaining, ipResult.remaining) }
}

/**
 * Rate limit para verificación de OTP
 */
export async function rateLimitOtpVerify(identifier: string): Promise<RateLimitResult> {
  if (rateLimiters) {
    const result = await rateLimiters.otpVerifyByIdentifier.limit(identifier)
    if (!result.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Demasiados intentos de verificación. Intenta en 15 minutos.',
      }
    }
    return { allowed: true, remaining: result.remaining }
  }

  const result = checkMemoryRateLimit(
    `verify:identifier:${identifier}`,
    MEMORY_LIMITS.OTP_VERIFY_BY_IDENTIFIER
  )
  if (!result.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Demasiados intentos de verificación. Intenta de nuevo más tarde.',
    }
  }
  return { allowed: true, remaining: result.remaining }
}

/**
 * Rate limit para votos por IP (prevenir abuso desde una conexión)
 */
export async function rateLimitVoteByIp(ip: string): Promise<RateLimitResult> {
  if (rateLimiters) {
    const result = await rateLimiters.voteByIp.limit(ip)
    if (!result.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Se detectó actividad inusual. Intenta más tarde.',
      }
    }
    return { allowed: true, remaining: result.remaining }
  }

  const result = checkMemoryRateLimit(`vote:ip:${ip}`, MEMORY_LIMITS.VOTE_BY_IP)
  if (!result.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Se detectó actividad inusual. Intenta más tarde.',
    }
  }
  return { allowed: true, remaining: result.remaining }
}

/**
 * Rate limit general para API (protección contra DDoS)
 */
export async function rateLimitApi(ip: string): Promise<RateLimitResult> {
  if (rateLimiters) {
    const result = await rateLimiters.apiGeneral.limit(ip)
    if (!result.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Demasiadas solicitudes. Por favor espera un momento.',
      }
    }
    return { allowed: true, remaining: result.remaining }
  }

  const result = checkMemoryRateLimit(`api:general:${ip}`, MEMORY_LIMITS.API_GENERAL)
  if (!result.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Demasiadas solicitudes. Por favor espera un momento.',
    }
  }
  return { allowed: true, remaining: result.remaining }
}

/**
 * Rate limit para login admin (protección contra brute force)
 */
export async function rateLimitAdminLoginByIp(ip: string): Promise<RateLimitResult> {
  if (rateLimiters) {
    const result = await rateLimiters.adminLoginByIp.limit(ip)
    if (!result.success) {
      return {
        allowed: false,
        remaining: 0,
        reason: 'Demasiados intentos. Intenta de nuevo más tarde.',
      }
    }
    return { allowed: true, remaining: result.remaining }
  }

  const result = checkMemoryRateLimit(`admin:login:${ip}`, MEMORY_LIMITS.ADMIN_LOGIN_BY_IP)
  if (!result.success) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Demasiados intentos. Intenta de nuevo más tarde.',
    }
  }
  return { allowed: true, remaining: result.remaining }
}

/**
 * Indica si el rate limiting usa Redis (producción) o memoria (desarrollo)
 */
export function isUsingRedis(): boolean {
  return Boolean(rateLimiters)
}
