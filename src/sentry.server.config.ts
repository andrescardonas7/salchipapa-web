import * as Sentry from '@sentry/nextjs';

/**
 * Sentry server SDK initialization (Node.js runtime).
 *
 * - Enabled only when `SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN` is set.
 * - Error monitoring only (no performance tracing, no replay).
 */
Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(
    process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN
  ),
  sendDefaultPii: false,
});
