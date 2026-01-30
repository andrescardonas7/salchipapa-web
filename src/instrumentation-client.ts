import * as Sentry from '@sentry/nextjs';

/**
 * Sentry client SDK initialization.
 *
 * - Enabled only when `NEXT_PUBLIC_SENTRY_DSN` is set.
 * - Error monitoring only (no performance tracing, no replay).
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  sendDefaultPii: false,
});
