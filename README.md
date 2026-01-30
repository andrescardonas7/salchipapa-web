# 🍟 Desafío Salchipapa - Plataforma de Votación

Sistema de votación seguro con verificación OTP por WhatsApp para el desafío de la mejor salchipapa.

## Características

- ✅ **Un voto por persona**: Verificación por número de WhatsApp
- 📱 **OTP por WhatsApp**: Códigos de verificación de 4 dígitos vía Twilio
- 🔒 **Seguro**: Rate limiting, hashing de datos sensibles, tokens JWT
- 📊 **Métricas en tiempo real**: Panel de administración interno
- 🏆 **Ranking automático**: Resultados publicables al final del reto
- 📥 **Exportación**: CSV y JSON para auditoría

## Stack Tecnológico

- **Frontend/Backend**: Next.js 16 (App Router)
- **Base de datos**: PostgreSQL (Supabase/Neon)
- **ORM**: Prisma
- **OTP**: Twilio WhatsApp API
- **Hosting**: Vercel

## Requisitos Previos

1. **Cuenta de Twilio** con WhatsApp Business API habilitado
2. **Base de datos PostgreSQL** (Supabase, Neon, o similar)
3. **Cuenta de Vercel** para despliegue

## Configuración Local

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd web-salchiipapa
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Base de datos
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Twilio WhatsApp
TWILIO_ACCOUNT_SID="ACxxxxxxxxxx"
TWILIO_AUTH_TOKEN="xxxxxxxxxx"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# JWT Secret (mínimo 32 caracteres)
JWT_SECRET="tu-secreto-super-seguro-min-32-caracteres"

# Admin password
ADMIN_PASSWORD="tu-password-de-admin"

# Opcional: Cloudflare Turnstile (captcha)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""
```

### 3. Configurar base de datos

```bash
# Generar cliente Prisma
pnpm prisma generate

# Aplicar esquema a la base de datos
pnpm db:push

# Cargar datos iniciales (negocios)
pnpm db:seed
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## Despliegue en Vercel

### 1. Conectar repositorio

1. Ve a [vercel.com](https://vercel.com) y crea un nuevo proyecto
2. Conecta tu repositorio de GitHub/GitLab

### 2. Configurar variables de entorno en Vercel

En la configuración del proyecto, agrega las siguientes variables:

| Variable                 | Descripción                                  |
| ------------------------ | -------------------------------------------- |
| `DATABASE_URL`           | URL de conexión PostgreSQL                   |
| `TWILIO_ACCOUNT_SID`     | SID de cuenta Twilio                         |
| `TWILIO_AUTH_TOKEN`      | Token de autenticación Twilio                |
| `TWILIO_WHATSAPP_FROM`   | Número de WhatsApp de Twilio                 |
| `JWT_SECRET`             | Secreto para tokens JWT                      |
| `ADMIN_PASSWORD`         | Contraseña del panel admin                   |
| `CRON_SECRET`            | Secreto para autenticar cron jobs (opcional) |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN de Sentry (opcional, para errores)       |

### 3. Deploy

Vercel desplegará automáticamente cuando hagas push a la rama principal.

### 4. Ejecutar seed en producción

Después del primer deploy, ejecuta el seed para cargar los negocios:

```bash
# Desde tu máquina local con DATABASE_URL de producción
DATABASE_URL="tu-url-de-produccion" pnpm db:seed
```

## Sentry (opcional)

- Agrega `NEXT_PUBLIC_SENTRY_DSN` en `.env` / Vercel para habilitar captura de errores.
- Para subir sourcemaps (cuando conectemos GitHub/Vercel), configura además: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`.

## Rutas de la Aplicación

| Ruta       | Descripción                                   |
| ---------- | --------------------------------------------- |
| `/`        | Página principal de votación                  |
| `/results` | Resultados públicos (cuando estén publicados) |
| `/admin`   | Panel de administración                       |

## API Endpoints

| Método | Endpoint             | Descripción                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/otp/request`   | Solicitar código OTP        |
| POST   | `/api/otp/verify`    | Verificar código OTP        |
| POST   | `/api/vote`          | Registrar voto              |
| GET    | `/api/businesses`    | Listar negocios activos     |
| GET    | `/api/results`       | Obtener resultados públicos |
| POST   | `/api/admin/login`   | Login de admin              |
| GET    | `/api/admin/metrics` | Métricas (protegido)        |
| GET    | `/api/admin/export`  | Exportar datos (protegido)  |
| POST   | `/api/admin/publish` | Publicar/ocultar resultados |

## Negocios Participantes

La lista inicial incluye:

- El Cerdito
- Chanfle
- El Sombrero
- El Picotazo
- Desmecha-2
- Salchipapa San Jeronimo
- Salchicriolla
- SAEMI
- La Carreta Picnic
- Qarepa
- Sr Pig
- J&C
- Sazon Urbano
- Roasted Asados
- Salchipaisas
- Centella

Para agregar más negocios, edita `prisma/seed.ts` y vuelve a ejecutar el seed.

## Configuración de Twilio WhatsApp

### Sandbox (Desarrollo)

1. Ve a la [Consola de Twilio](https://console.twilio.com)
2. Navega a Messaging > Try it out > Send a WhatsApp message
3. Sigue las instrucciones para unirte al sandbox
4. Usa el número del sandbox como `TWILIO_WHATSAPP_FROM`

### Producción

1. Solicita un número de WhatsApp Business en Twilio
2. Configura las plantillas de mensaje (aprobación de Meta)
3. Actualiza `TWILIO_WHATSAPP_FROM` con tu número aprobado

## Panel de Administración

Accede a `/_admin` e ingresa la contraseña configurada en `ADMIN_PASSWORD`.

Funcionalidades:

- 📊 Métricas en tiempo real
- 🏆 Ranking de negocios
- 📢 Publicar/ocultar resultados
- 📥 Exportar datos (CSV/JSON)

## Seguridad

- **Rate Limiting**: 3 OTP por número cada 15 min, 10 por IP
- **Hashing**: Códigos OTP, teléfonos (para auditoría), IPs
- **JWT**: Tokens de corta duración (15 min) para sesiones de votación
- **Cookies HTTP-Only**: Tokens de sesión seguros

## Soporte

Para problemas o preguntas, abre un issue en el repositorio.

---

Desarrollado para el 🍟 **Desafío Salchipapa**
