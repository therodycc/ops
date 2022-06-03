import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  ddsn: SENTRY_DSN || 'https://0f17644d4b2d46cba2204e637810e511@o1234810.ingest.sentry.io/6468767',
  environment: process.env.SENTRY_ENV || 'development',
  enabled: (process.env.SENTRY_ENABLED || 'true') === 'true',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0
});
