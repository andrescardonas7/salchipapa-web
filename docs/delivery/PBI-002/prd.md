# PRD: PBI-002 - Migracion a Email OTP con Supabase Auth

## Resumen

Este PBI cubre la migracion del flujo de verificacion OTP desde WhatsApp (Twilio) hacia Email OTP usando Supabase Auth, con el objetivo de verificar un voto por persona via email.

## Problema

El flujo actual depende de WhatsApp OTP. Se requiere migrar a verificacion por email con Supabase Auth para simplificar onboarding y soportar el evento con unicamente correo.

## Solucion

1. Configurar Supabase Auth con Email OTP
2. Actualizar variables de entorno y clientes Supabase
3. Ajustar frontend y rutas API al nuevo flujo
4. Aplicar RLS y restricciones para 1 voto por usuario

## Alcance

### En alcance

- Configuracion de variables de entorno de Supabase
- Integracion de Email OTP con Supabase Auth
- Validacion de dominios permitidos
- Integracion de Turnstile en el flujo de verificacion
- RLS y restriccion de voto unico
- Actualizacion de documentacion y tests asociados

### Fuera de alcance

- Proveedor alterno de email (solo Supabase Auth)
- Cambios de diseno UI/UX no ligados al flujo OTP
- Migraciones de datos fuera del flujo de votacion

## Archivos clave

| Archivo                         | Proposito                                  |
| ------------------------------- | ------------------------------------------ |
| `src/lib/supabase/server.ts`    | Cliente Supabase server-side               |
| `src/lib/supabase/client.ts`    | Cliente Supabase client-side               |
| `src/lib/email.ts`              | Validacion de dominios de email            |
| `src/app/api/vote/route.ts`     | Insercion de voto usando auth.uid()        |
| `src/components/EmailEntry.tsx` | Entrada de email y envio de OTP            |
| `src/components/OtpVerify.tsx`  | Verificacion de codigo OTP por email       |
| `.env.example`                  | Variables de entorno de Supabase y captcha |

## Dependencias

- Proyecto Supabase con Auth habilitado
- Turnstile configurado (opcional pero recomendado)
- Base de datos Supabase con RLS activa

## Metricas de exito

- Email OTP envia y verifica correctamente
- No se permite mas de un voto por usuario
- Validacion de dominios bloquea correos no permitidos
- Documentacion clara para configurar Supabase
