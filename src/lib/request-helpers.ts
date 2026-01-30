import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from './auth';
import { COOKIE_NAMES, ERROR_MESSAGES } from './constants';

/**
 * Obtiene la IP del cliente desde los headers de la request
 */
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Obtiene el User-Agent del cliente
 */
export function getClientUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'unknown';
}

/**
 * Verifica si el usuario actual es admin (basado en cookie)
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAMES.ADMIN)?.value;

  if (!token) return false;
  return verifyAdminToken(token);
}

/**
 * Helper para crear respuestas de error JSON consistentes
 */
export function errorResponse(
  message: string,
  status: number = 400
): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Respuestas de error predefinidas
 */
export const ErrorResponses = {
  unauthorized: () => errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401),
  internalError: () => errorResponse(ERROR_MESSAGES.INTERNAL_ERROR, 500),
  invalidSession: () => errorResponse(ERROR_MESSAGES.INVALID_SESSION, 401),
  alreadyVoted: () => errorResponse(ERROR_MESSAGES.ALREADY_VOTED, 400),
  invalidEmail: () => errorResponse(ERROR_MESSAGES.INVALID_EMAIL, 400),
  emailRequired: () => errorResponse(ERROR_MESSAGES.EMAIL_REQUIRED, 400),
  invalidName: () => errorResponse(ERROR_MESSAGES.INVALID_NAME, 400),
  invalidOtp: () => errorResponse(ERROR_MESSAGES.INVALID_OTP, 400),
  otpExpired: () => errorResponse(ERROR_MESSAGES.OTP_EXPIRED, 400),
  businessRequired: () => errorResponse(ERROR_MESSAGES.BUSINESS_REQUIRED, 400),
  businessInvalid: () => errorResponse(ERROR_MESSAGES.BUSINESS_INVALID, 400),
  voterNotFound: () => errorResponse(ERROR_MESSAGES.VOTER_NOT_FOUND, 400),
  rateLimited: (reason: string) => errorResponse(reason, 429),
  custom: (message: string, status: number = 400) =>
    errorResponse(message, status),
};

/**
 * Helper para crear respuestas de éxito JSON consistentes
 */
export function successResponse<T extends Record<string, unknown>>(
  data: T,
  status: number = 200
): NextResponse {
  return NextResponse.json({ success: true, ...data }, { status });
}
