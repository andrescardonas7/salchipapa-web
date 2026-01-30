/**
 * Verifica un token de Cloudflare Turnstile
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  // Si no hay secret key configurada:
  // - en desarrollo: permitir (no bloquear el flujo)
  // - en producción: fallar cerrado
  if (!secretKey) return process.env.NODE_ENV !== 'production'

  if (!token || token.trim().length === 0) return false

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        ...(ip && { remoteip: ip }),
      }),
    })

    const data = await response.json() as { success: boolean }
    return data.success
  } catch {
    return false
  }
}
