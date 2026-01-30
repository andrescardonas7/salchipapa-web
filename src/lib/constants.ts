/**
 * Constantes de la aplicación
 * Centraliza valores que se usan en múltiples lugares
 */

// Cookies
export const COOKIE_NAMES = {
  SESSION: 'vote_session',
  ADMIN: 'admin_token',
} as const;

// Tiempos de expiración
export const EXPIRATION = {
  OTP_MINUTES: 10,
  SESSION_MINUTES: 15,
  ADMIN_HOURS: 24,
} as const;

// Límites
export const LIMITS = {
  OTP_MAX_ATTEMPTS: 5,
  NAME_MIN_LENGTH: 2,
  // Supabase Email OTP (en este proyecto) llega con 8 dígitos
  OTP_CODE_LENGTH: 8,
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'No autorizado',
  INTERNAL_ERROR: 'Error interno del servidor',
  INVALID_SESSION: 'Sesión no válida. Verifica tu correo primero.',
  ALREADY_VOTED: 'Este usuario ya ha votado en el desafío',
  INVALID_EMAIL: 'Correo inválido o no permitido',
  EMAIL_REQUIRED: 'Correo requerido',
  INVALID_NAME: 'Nombre inválido',
  INVALID_OTP: 'Código de verificación inválido (debe ser de 8 dígitos)',
  OTP_EXPIRED: 'Código expirado o inválido. Solicita uno nuevo.',
  BUSINESS_REQUIRED: 'Debes seleccionar un negocio',
  BUSINESS_INVALID: 'Negocio no válido o no activo',
  VOTER_NOT_FOUND: 'Votante no encontrado',
} as const;
