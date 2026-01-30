# Tareas - PBI-002

## Indice de tareas

| ID         | Titulo                                              | Estado     |
| ---------- | --------------------------------------------------- | ---------- |
| PBI-002-01 | Configurar proyecto Supabase y variables de entorno | Done       |
| PBI-002-02 | Crear clientes Supabase (server + client)           | Done       |
| PBI-002-03 | Crear lib/email.ts con validacion de dominios       | InProgress |

---

## PBI-002-01: Configurar proyecto Supabase y variables de entorno

**Estado:** Done
**Archivo:** [PBI-002-01.md](./PBI-002-01.md)

### Descripcion (PBI-002-02)

Preparar la configuracion de Supabase y documentar las variables de entorno necesarias para el flujo Email OTP.

### Entregables (PBI-002-02)

- Variables de entorno de Supabase documentadas en `.env.example`
- Pasos de configuracion basicos para Supabase Auth Email OTP
- Test plan con cobertura >= 80% (cuando aplique)

---

## PBI-002-02: Crear clientes Supabase (server + client)

**Estado:** Done
**Archivo:** [PBI-002-02.md](./PBI-002-02.md)

### Descripcion

Crear utilidades de Supabase para uso en el servidor y cliente, con validacion de variables de entorno.

### Entregables

- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- Tests unitarios con TDD

---

## PBI-002-03: Crear lib/email.ts con validacion de dominios

**Estado:** InProgress
**Archivo:** [PBI-002-03.md](./PBI-002-03.md)

### Descripcion (PBI-002-03)

Crear la utilidad de validacion de dominios permitidos para emails.

### Entregables (PBI-002-03)

- `src/lib/email.ts`
- Tests unitarios con TDD
