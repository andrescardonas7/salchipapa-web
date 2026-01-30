import { prisma } from './prisma';

export type AuditEventType =
  | 'OTP_REQUESTED'
  | 'OTP_REQUEST_FAILED'
  | 'OTP_VERIFIED'
  | 'OTP_VERIFY_FAILED'
  | 'VOTE_CREATED'
  | 'VOTE_DUPLICATE_ATTEMPT'
  | 'ADMIN_LOGIN'
  | 'RESULTS_PUBLISHED';

interface AuditMetadata {
  ipHash?: string;
  userAgentHash?: string;
  userAgent?: string;
  businessId?: string;
  error?: string;
  [key: string]: unknown;
}

/**
 * Registra un evento de auditoría
 */
export async function logAuditEvent(
  eventType: AuditEventType,
  phoneE164?: string,
  metadata?: AuditMetadata
): Promise<void> {
  try {
    await prisma.auditEvent.create({
      data: {
        eventType,
        phoneE164,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null,
      },
    });
  } catch (error) {
    // No fallar si la auditoría falla, solo loggear
    console.error('Failed to log audit event:', error);
  }
}
