import { logAuditEvent } from '@/lib/audit';
import {
    createAdminToken,
    setAdminCookie,
    verifyAdminPassword,
} from '@/lib/auth';
import { hashIp } from '@/lib/hash';
import { rateLimitAdminLoginByIp } from '@/lib/rate-limit';
import {
    ErrorResponses,
    getClientIp,
    successResponse,
} from '@/lib/request-helpers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return ErrorResponses.custom('Contraseña requerida');
    }

    const ip = getClientIp(request);
    const ipHash = hashIp(ip);

    const rateLimit = await rateLimitAdminLoginByIp(ip);
    if (!rateLimit.allowed) {
      await logAuditEvent('ADMIN_LOGIN', undefined, {
        ipHash,
        success: false,
        reason: 'RATE_LIMITED',
      });
      return ErrorResponses.rateLimited(rateLimit.reason!);
    }

    if (!verifyAdminPassword(password)) {
      await logAuditEvent('ADMIN_LOGIN', undefined, { ipHash, success: false });
      return ErrorResponses.custom('Contraseña incorrecta', 401);
    }

    const token = await createAdminToken();
    await setAdminCookie(token);

    await logAuditEvent('ADMIN_LOGIN', undefined, { ipHash, success: true });

    return successResponse({ message: 'Autenticación exitosa' });
  } catch {
    return ErrorResponses.internalError();
  }
}
