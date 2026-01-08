# 🎯 Cursor Rules - Guías de Desarrollo Profesional

Sistema completo de reglas y estándares de desarrollo para Cursor AI IDE.

## 📊 Nivel: Senior (8/10)

**Características:**

- ✅ Ejemplos de código concretos y funcionales
- ✅ Principios SOLID y Clean Code
- ✅ TDD como estándar
- ✅ Arquitectura bien documentada
- ⚠️ Requiere estandarización de nombres (ver REFACTOR_PLAN.md)

## 📁 Estructura Actual

```
.cursor/rules/
├── 00-core/                    # 🎯 FUNDAMENTOS (Leer primero)
│   ├── .cursorrules           # Reglas principales de Cursor
│   └── cursor-config.json     # Configuración base del proyecto
│
├── 01-domain/                  # 🏗️ DOMINIO ESPECÍFICO
│   ├── backend-api-standards.mdc
│   └── mobile.mdc
│
├── 02-front-end/              # ⚛️ FRONTEND
│   ├── react-patterns.mdc     # React 18+ y Next.js 14+
│   └── ui-components.mdc      # TailwindCSS y shadcn/ui
│
├── 03-specialized-rules/      # 🎨 REGLAS ESPECIALIZADAS
│   └── i18n.mdc               # Internacionalización
│
├── 04-code-quality/           # ✨ CALIDAD DE CÓDIGO
│   ├── 01_code-standards.mdc
│   ├── 02_linting-formatting.mdc
│   ├── 03_error-handling.mdc
│   ├── 04_code-architecture.mdc
│   ├── 05_code-complexity.mdc
│   ├── 06_code-performance.mdc
│   ├── 07_code-testing.mdc
│   └── 08_spelling-grammar.mdc
│
├── 05-development-workflows/  # 🔄 WORKFLOWS
│   ├── commit.mdc             # Commits convencionales
│   └── pr-review.mdc          # Revisión multi-perspectiva
│
├── 06-documentation/          # 📚 DOCUMENTACIÓN
│   ├── create-docs.mdc        # Guía de documentación
│   ├── mermaid.mdc            # Diagramas Mermaid
│   └── adr.mdc                # Architecture Decision Records
│
├── 07-processes/              # ⚙️ PROCESOS
│   ├── check.mdc              # Verificaciones de calidad
│   ├── rules.mdc              # Gestión de reglas
│   ├── update-docs.mdc        # Actualización de docs
│   ├── screenshot-automation.mdc
│   └── codacy.mdc             # Integración con Codacy
│
├── 08-problem-solving/        # 🔧 RESOLUCIÓN DE PROBLEMAS
│   ├── bug-fix.mdc            # Workflow de bug fixing
│   ├── analyze-issue.mdc      # Análisis de issues
│   └── five.mdc               # Análisis de causa raíz (5 Whys)
│
├── 09-monitoring/             # 📈 MONITOREO
│   ├── logging.mdc            # Logging estructurado
│   └── performance-profiling.mdc
│
├── 10-security/               # 🔒 SEGURIDAD
│   ├── 01_security.mdc        # Estándares básicos
│   └── 02_cybersecurity_rules.mdc  # Reglas avanzadas
│
└── README.md                  # Esta guía
```

## 🚀 Inicio Rápido

### 1. Lectura Esencial (15 minutos)

```
1. 00-core/.cursorrules           # Reglas principales
2. 04-code-quality/01_code-standards.mdc
3. 05-development-workflows/commit.mdc
4. 10-security/01_security.mdc
```

### 2. Configuración Inicial

```bash
# 1. Copiar .cursorrules a la raíz del proyecto
cp .cursor/rules/00-core/.cursorrules .cursorrules

# 2. Instalar dependencias (si usas pnpm)
pnpm install

# 3. Configurar git hooks
pnpm prepare

# 4. Verificar configuración
pnpm lint
pnpm typecheck
pnpm test
```

### 3. Uso Diario

**Al crear nueva funcionalidad:**

```
1. Leer: 08-problem-solving/analyze-issue.mdc
2. Aplicar: 04-code-quality/* (estándares)
3. Seguir: 05-development-workflows/commit.mdc
```

**Al corregir bugs:**

```
1. Seguir: 08-problem-solving/bug-fix.mdc
2. Aplicar: 08-problem-solving/five.mdc (análisis)
3. Documentar: 06-documentation/create-docs.mdc
```

**Al hacer PR:**

```
1. Revisar: 05-development-workflows/pr-review.mdc
2. Verificar: 07-processes/check.mdc
```

## 📖 Guía por Perfil

### 🎨 Frontend Developer

**Leer:**

- `02-front-end/react-patterns.mdc`
- `02-front-end/ui-components.mdc`
- `04-code-quality/06_code-performance.mdc`

**Aplicar Siempre:**

- `04-code-quality/01_code-standards.mdc`
- `10-security/01_security.mdc` (XSS, CSRF)

### ⚙️ Backend Developer

**Leer:**

- `01-domain/backend-api-standards.mdc`
- `04-code-quality/03_error-handling.mdc`
- `09-monitoring/logging.mdc`

**Aplicar Siempre:**

- `10-security/01_security.mdc` (SQL injection, Auth)
- `10-security/02_cybersecurity_rules.mdc`

### 📱 Mobile Developer

**Leer:**

- `01-domain/mobile.mdc`
- `04-code-quality/06_code-performance.mdc`

### 🔧 DevOps Engineer

**Leer:**

- `09-monitoring/` (completo)
- `10-security/02_cybersecurity_rules.mdc`
- `07-processes/check.mdc`

### 👨‍💼 Tech Lead

**Leer:**

- `00-core/` (completo)
- `06-documentation/adr.mdc`
- `05-development-workflows/pr-review.mdc`

## 🎯 Principios Fundamentales

### 1. SOLID + Clean Code

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### 2. DRY, KISS, YAGNI

- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It

### 3. TDD (Test-Driven Development)

```
1. Write failing test
2. Implement minimal code
3. Refactor while keeping tests green
```

### 4. Definition of Done

**Una tarea está Done cuando:**

- [ ] Todos los tests del Test Plan pasan
- [ ] `tsc --noEmit` pasa (sin errores TypeScript)
- [ ] `eslint` y `prettier` checks pasan
- [ ] Cobertura >80% para código crítico
- [ ] Code review aprobado
- [ ] Documentación actualizada
- [ ] `pnpm verify` pasa

## 🔄 Workflows Principales

### Commit Workflow

```bash
# 1. Hacer cambios
git add .

# 2. Commit con formato convencional
git commit -m "✨ feat(auth): add OAuth2 login support"

# Pre-commit hooks ejecutan automáticamente:
# - pnpm verify (integridad de dependencias)
# - tsc --noEmit (compilación TypeScript)
# - eslint . (linting)
# - prettier --check . (formateo)
# - pnpm test (tests)
```

**Formato**: `<emoji> <type>(<scope>): <description>`

**Tipos**: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`

### Pull Request Workflow

```
1. Crear PR con título descriptivo
2. Vincular issue: "Fixes #123"
3. Revisión multi-perspectiva:
   - Product Manager
   - Developer
   - QA Engineer
   - Security Engineer
   - DevOps
   - UI/UX Designer
4. Aprobar o solicitar cambios
```

### Bug Fix Workflow

```
1. Crear issue en GitHub
2. Crear rama: git checkout -b fix/issue-description
3. Escribir test que falla (TDD)
4. Implementar fix
5. Verificar que test pasa
6. Commit: git commit -m "🐛 fix: description (#issue)"
7. PR: "Fixes #issue-number"
```

## 📊 Métricas de Calidad

### Targets

| Métrica               | Target     | Herramienta             |
| --------------------- | ---------- | ----------------------- |
| Test Coverage         | >80%       | Jest/Vitest             |
| Cyclomatic Complexity | <10        | ESLint                  |
| File Size             | <300 lines | ESLint                  |
| Function Size         | <50 lines  | ESLint                  |
| Build Time            | <2 min     | CI/CD                   |
| Bundle Size           | <250KB gz  | webpack-bundle-analyzer |
| LCP                   | <2.5s      | web-vitals              |
| FID                   | <100ms     | web-vitals              |
| CLS                   | <0.1       | web-vitals              |

### Comandos de Verificación

```bash
# Calidad de código
pnpm lint              # ESLint
pnpm typecheck         # TypeScript
pnpm format:check      # Prettier

# Testing
pnpm test              # Tests unitarios
pnpm test:coverage     # Cobertura
pnpm test:e2e          # Tests E2E

# Seguridad
pnpm audit             # Vulnerabilidades
pnpm verify            # Integridad

# Performance
pnpm build --analyze   # Análisis de bundle
```

## 🔒 Seguridad

### Checklist Básico

- [ ] HTTPS para todas las peticiones
- [ ] Validar todas las entradas externas
- [ ] Sanitizar HTML/DOM dinámico
- [ ] Usar consultas parametrizadas (SQL)
- [ ] No exponer secrets en frontend
- [ ] CORS con whitelist específica
- [ ] Headers de seguridad configurados

### Herramientas

- **Dependabot**: Actualizaciones automáticas
- **Snyk/GitHub Security**: Escaneo de vulnerabilidades
- **git-secrets**: Detección de secretos en commits

## 📚 Recursos Adicionales

### Documentación Externa

- [Cursor Documentation](https://cursor.sh/docs)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Clean Code (Robert C. Martin)](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [TDD by Example (Kent Beck)](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)

### Mejores Prácticas

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## 🤝 Contribución

### Para Mejorar Estas Reglas

1. Crear rama: `git checkout -b feat/improve-rules`
2. Hacer cambios siguiendo estas mismas reglas
3. Actualizar README si es necesario
4. Commit: `✨ feat(rules): add new security guidelines`
5. PR con descripción detallada

### Reportar Problemas

1. Crear issue con template
2. Incluir contexto y ejemplos
3. Sugerir solución si es posible

## 📝 Changelog

### v2.0.0 (Propuesto - ver REFACTOR_PLAN.md)

- Estandarización de nombres con prefijos numéricos
- Creación de 00-core/
- Renombrado de security/ a 10-security/
- README completamente actualizado

### v1.0.0 (Actual)

- Estructura inicial con 10 categorías
- Reglas completas y ejemplos concretos
- Integración con Cursor

## 📞 Soporte

**Preguntas frecuentes:**

1. ¿Cómo empiezo? → Ver "Inicio Rápido" arriba
2. ¿Qué leo primero? → Ver "Lectura Esencial"
3. ¿Cómo adapto a mi proyecto? → Copiar .cursorrules y ajustar

**Para consultas específicas:**

- Crear issue en el repositorio
- Etiquetar apropiadamente (bug, question, enhancement)

---

**Última actualización**: 2024
**Mantenedor**: [Tu nombre/equipo]
**Licencia**: [Tu licencia]

**Nota**: Estas reglas están diseñadas para ser aplicadas automáticamente por Cursor durante el desarrollo, asegurando calidad consistente, documentación apropiada y colaboración efectiva.
