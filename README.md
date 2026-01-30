# 🍟 Desafío Salchipapa - Plataforma de Votación

Sistema de votación seguro con verificación OTP para el desafío de la mejor salchipapa.

## Características

- ✅ **Un voto por persona**: Verificación por número de teléfono
- 📱 **OTP**: Códigos de verificación de 4 dígitos
- 🔒 **Seguro**: Rate limiting, hashing de datos sensibles, tokens JWT
- 📊 **Métricas en tiempo real**: Panel de administración interno
- 🏆 **Ranking automático**: Resultados publicables al final del reto
- 📥 **Exportación**: CSV y JSON para auditoría
- 🐛 **Monitoreo**: Sentry para captura de errores

## Stack Tecnológico

- **Frontend/Backend**: Next.js 16 (App Router)
- **Base de datos**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Rate Limiting**: Upstash Redis
- **Monitoreo**: Sentry
- **Hosting**: Vercel

## Requisitos Previos

1. **Base de datos PostgreSQL** (Supabase)
2. **Cuenta de Vercel** para despliegue
3. **Upstash Redis** para rate limiting (opcional)

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

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJxxx"
SUPABASE_SERVICE_ROLE_KEY="eyJxxx"

# JWT Secret (mínimo 32 caracteres)
JWT_SECRET="tu-secreto-super-seguro-min-32-caracteres"

# Admin password
ADMIN_PASSWORD="tu-password-de-admin"

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""

# Sentry (monitoreo de errores)
NEXT_PUBLIC_SENTRY_DSN=""
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

| Variable                       | Descripción                            |
| ------------------------------ | -------------------------------------- |
| `DATABASE_URL`                 | URL de conexión PostgreSQL             |
| `NEXT_PUBLIC_SUPABASE_URL`     | URL de tu proyecto Supabase            |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| Anon key de Supabase                   |
| `SUPABASE_SERVICE_ROLE_KEY`    | Service role key de Supabase           |
| `JWT_SECRET`                   | Secreto para tokens JWT                |
| `ADMIN_PASSWORD`               | Contraseña del panel admin             |
| `UPSTASH_REDIS_REST_URL`       | URL de Upstash Redis (rate limiting)   |
| `UPSTASH_REDIS_REST_TOKEN`     | Token de Upstash Redis                 |
| `NEXT_PUBLIC_SENTRY_DSN`       | DSN de Sentry (monitoreo de errores)   |
| `SENTRY_AUTH_TOKEN`            | Token para source maps (opcional)      |
| `SENTRY_ORG`                   | Organización en Sentry                 |
| `SENTRY_PROJECT`               | Proyecto en Sentry                     |

### 3. Deploy

Vercel desplegará automáticamente cuando hagas push a la rama principal.

### 4. Ejecutar seed en producción

Después del primer deploy, ejecuta el seed para cargar los negocios:

```bash
# Desde tu máquina local con DATABASE_URL de producción
DATABASE_URL="tu-url-de-produccion" pnpm db:seed
```

## Sentry (Monitoreo de Errores)

Sentry está configurado para capturar errores en cliente, servidor y edge runtime.

- Agrega `NEXT_PUBLIC_SENTRY_DSN` en Vercel para habilitar captura de errores
- Para source maps legibles, configura: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`

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
