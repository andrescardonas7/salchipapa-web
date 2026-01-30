import bcrypt from 'bcryptjs'
import { createHash } from 'crypto'

const SALT_ROUNDS = 10

/**
 * Genera un código OTP aleatorio de 4 dígitos
 */
export function generateOtpCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

/**
 * Hash de un código OTP usando bcrypt
 */
export async function hashOtpCode(code: string): Promise<string> {
  return bcrypt.hash(code, SALT_ROUNDS)
}

/**
 * Verifica un código OTP contra su hash
 */
export async function verifyOtpCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash)
}

/**
 * Genera un hash SHA-256 para datos no sensibles (teléfono, IP, etc.)
 * Usado para identificación/auditoría sin exponer el dato original
 */
export function sha256Hash(data: string): string {
  return createHash('sha256').update(data).digest('hex')
}

/**
 * Hash de un número de teléfono para reporting
 */
export function hashPhone(phoneE164: string): string {
  return sha256Hash(phoneE164)
}

/**
 * Hash de IP para auditoría
 */
export function hashIp(ip: string): string {
  return sha256Hash(ip)
}

/**
 * Hash de User-Agent para auditoría
 */
export function hashUserAgent(ua: string): string {
  return sha256Hash(ua)
}
