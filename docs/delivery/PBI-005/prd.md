# PBI-005: Hardening producción + security cleanup

## Objetivo

Dejar el proyecto listo para escalar en Vercel, reduciendo riesgo de seguridad y mejorando salud del código sin romper el flujo de votación.

## Alcance

- Quitar telemetría/debug accidental.
- Endurecer manejo de secrets (sin fallbacks inseguros).
- Proteger endpoints sensibles (admin/cron/export).
- Mejorar clean code (DRY/KISS), accesibilidad básica y warnings de lint.
- Ejecutar auditorías (`pnpm audit` y `npm audit`) y checks (`pnpm run check`).

## Fuera de alcance

- Cambios de UX no solicitados.
- Refactors con migraciones grandes (p. ej. renombrar campos DB) sin un PBI dedicado.

## Criterios de aceptación

- `pnpm run check` pasa en local.
- Auditorías ejecutadas y documentadas en la tarea.
- No existe código que envíe datos de entorno a endpoints locales/remotos por defecto.
- Endpoints sensibles fallan cerrado si faltan variables críticas.

