import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import { COOKIE_NAMES, EXPIRATION } from './constants'

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  return new TextEncoder().encode(secret)
}

const JWT_SECRET = getJwtSecret()

export interface VoteSessionPayload extends JWTPayload {
  voterId: string
  phoneE164: string
  verified: boolean
}

interface AdminPayload extends JWTPayload {
  isAdmin: boolean
}

/**
 * Crea un token JWT para una sesión verificada
 */
export async function createVerifiedToken(voterId: string, phoneE164: string): Promise<string> {
  return new SignJWT({
    voterId,
    phoneE164,
    verified: true,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION.SESSION_MINUTES}m`)
    .sign(JWT_SECRET)
}

/**
 * Verifica y decodifica un token de sesión
 */
export async function verifyToken(token: string): Promise<VoteSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as VoteSessionPayload
  } catch {
    return null
  }
}

/**
 * Guarda el token en una cookie HTTP-only
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAMES.SESSION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: EXPIRATION.SESSION_MINUTES * 60,
    path: '/',
  })
}

/**
 * Obtiene el token de la cookie de sesión
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAMES.SESSION)?.value || null
}

/**
 * Elimina la cookie de sesión
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAMES.SESSION)
}

/**
 * Verifica la sesión actual y retorna el payload
 */
export async function getVerifiedSession(): Promise<VoteSessionPayload | null> {
  const token = await getSessionToken()
  if (!token) return null
  return verifyToken(token)
}

/**
 * Verifica el password de admin
 */
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  return password === adminPassword
}

/**
 * Crea un token de admin
 */
export async function createAdminToken(): Promise<string> {
  return new SignJWT({ isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION.ADMIN_HOURS}h`)
    .sign(JWT_SECRET)
}

/**
 * Verifica un token de admin
 */
export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return (payload as AdminPayload).isAdmin === true
  } catch {
    return false
  }
}

/**
 * Guarda el token de admin en cookie
 */
export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAMES.ADMIN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: EXPIRATION.ADMIN_HOURS * 60 * 60,
    path: '/',
  })
}
