# Backlog - Desafío Salchipapa

> Single source of truth para todos los PBIs del proyecto.

## Estado de PBIs

| ID      | Título                                          | Estado     | Prioridad |
| ------- | ----------------------------------------------- | ---------- | --------- |
| PBI-002 | Migracion a Email OTP con Supabase Auth         | Agreed     | Alta      |
| PBI-003 | Mejora UI Home Salchipapa (natural y divertida) | InProgress | Alta      |
| PBI-004 | Vista pública de participantes                  | InProgress | Alta      |
| PBI-005 | Hardening producción + security cleanup         | InProgress | Alta      |

---

## PBIs Archivados

| ID      | Título                                       | Estado   | Razón                           |
| ------- | -------------------------------------------- | -------- | ------------------------------- |
| PBI-001 | Configurar Twilio/OTP y validar stack actual | Archived | Descartado - no se usará Twilio |

> Ver detalles en [docs/delivery/archived/PBI-001/](./archived/PBI-001/)

---

## PBI-002: Migracion a Email OTP con Supabase Auth

**Estado:** Agreed
**Prioridad:** Alta
**Carpeta:** [docs/delivery/PBI-002/](./PBI-002/)

### Descripción

Migrar el flujo de verificacion de OTP de WhatsApp (Twilio) a Email OTP con Supabase Auth. Incluye configuracion de variables de entorno, cambios en frontend, rutas API, y reglas RLS para garantizar 1 voto por usuario.

### Criterios de Aceptacion

- [ ] Variables de entorno de Supabase documentadas y listas
- [ ] Email OTP envia y verifica correctamente
- [ ] Validacion de dominios permitidos operativa
- [ ] Captcha Turnstile integrado en el flujo
- [ ] RLS y restriccion de voto unico activas
- [ ] Tests y documentacion actualizadas

### Tareas

- [PBI-002-01](./PBI-002/PBI-002-01.md): Configurar proyecto Supabase y variables de entorno

---

## PBI-003: Mejora UI Home Salchipapa (natural y divertida)

**Estado:** InProgress
**Prioridad:** Alta
**Carpeta:** [docs/delivery/PBI-003/](./PBI-003/)

### Descripcion

Actualizar la home con un look natural y divertido, mantener performance y agregar seccion visible de patrocinadores.

### Criterios de Aceptacion

- [ ] Paleta y estilos base coherentes con la marca
- [ ] Seccion de patrocinadores visible y ordenada
- [ ] Logos de participantes visibles con fallback
- [ ] Sin regresiones de performance visibles

### Tareas

- [PBI-003-01](./PBI-003/PBI-003-01.md): Lineamientos visuales y tokens UI
- [PBI-003-02](./PBI-003/PBI-003-02.md): Home refresh + seccion de patrocinadores
- [PBI-003-03](./PBI-003/PBI-003-03.md): Integrar logos participantes y sponsors

---

## PBI-004: Vista pública de participantes

**Estado:** InProgress
**Prioridad:** Alta
**Carpeta:** [docs/delivery/PBI-004/](./PBI-004/)

### Descripcion

Separar una vista pública para consultar la lista de participantes sin OTP, manteniendo el OTP solo para el flujo de votación.

### Criterios de Aceptacion

- [ ] Existe la ruta `/participants` accesible sin OTP
- [ ] La lista de participantes muestra logos con fallback por `slug`
- [ ] Hay un CTA claro para ir a votar (`/`)
- [ ] Hay un enlace desde la home para revisar participantes sin iniciar sesión

### Tareas

- [PBI-004-01](./PBI-004/PBI-004-01.md): Crear vista pública `/participants`

---

## PBI-005: Hardening producción + security cleanup

**Estado:** InProgress
**Prioridad:** Alta
**Carpeta:** [docs/delivery/PBI-005/](./PBI-005/)

### Descripción

Eliminar riesgos de seguridad (telemetría accidental, defaults inseguros), endurecer endpoints sensibles, y dejar el repo listo para escalar en Vercel con auditorías y checks verdes.

### Criterios de Aceptación

- [ ] No hay telemetría/debug accidental en archivos de configuración
- [ ] Secrets requeridos fallan de forma segura (sin fallbacks inseguros)
- [ ] Endpoints sensibles protegidos (cron/admin/export)
- [ ] `pnpm audit` y `npm audit` ejecutados y reportados
- [ ] `pnpm run check` pasa (lint + typecheck + tests)

### Tareas

- [PBI-005-01](./PBI-005/PBI-005-01.md): Hardening seguridad + auditorías + limpieza repo
