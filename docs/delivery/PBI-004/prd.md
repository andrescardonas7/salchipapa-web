# PRD: PBI-004 - Vista pública de participantes

## Resumen

Crear una página pública para ver la lista de participantes sin fricción (sin OTP), manteniendo la verificación OTP únicamente para el flujo de votación.

## Problema

Actualmente, para revisar o iterar sobre la UI donde se muestran los participantes, hay que entrar al flujo de OTP. Eso hace lenta la revisión de UI y dificulta ajustes rápidos.

## Solucion

- Crear la ruta `/participants` para visualizar participantes (solo lectura).
- Mantener `/` como punto de entrada para votar (con OTP).
- Agregar un enlace visible desde la home para acceder a `/participants`.

## Alcance

### En alcance

- Nueva ruta `src/app/participants/page.tsx` con listado de participantes.
- Reutilizar la misma fuente de datos y convención de assets (fallback por `slug`).
- CTA para ir al flujo de voto.
- Tests unitarios mínimos para lógica de fallback de logo.

### Fuera de alcance

- Cambios al flujo OTP.
- Cambios a rutas de voto o reglas de negocio.
- Cambios al panel admin.

## Criterios de Aceptacion

- [ ] `/participants` carga sin OTP y lista participantes activos.
- [ ] Se muestran logos con fallback `/participants/<slug>.svg` cuando no exista `imageUrl`.
- [ ] Existe un CTA claro para ir a `/` a votar.
- [ ] La home incluye un enlace para ver participantes sin autenticación.
- [ ] `pnpm test` pasa.

## Archivos clave

| Archivo                                | Proposito                              |
| -------------------------------------- | -------------------------------------- |
| src/app/participants/page.tsx          | Página pública de participantes        |
| src/components/ParticipantsList.tsx    | UI de grilla + búsqueda (solo lectura) |
| src/lib/participants.ts                | Helper de logo fallback                |
| src/lib/**tests**/participants.test.ts | Tests de helper de fallback            |
