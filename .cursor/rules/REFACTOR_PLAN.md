# Plan de Refactorización de Estructura de Reglas

## Estado Actual

### Problemas Identificados

1. **Inconsistencia en 04-code-quality/**: Archivos con prefijos 1*, 2*, 03*, 04* mezclados
2. **security/ sin prefijo**: Rompe el orden numérico establecido
3. **README.md desactualizado**: Menciona estructura que no existe
4. **Falta guía de orden**: No está claro qué reglas leer/aplicar primero

## Propuesta de Estructura Estandarizada

### Nivel 1: Carpetas Principales (Prefijo Numérico)

```
.cursor/rules/
├── 00-core/                    # NUEVO: Reglas fundamentales
│   ├── .cursorrules           # Mover desde raíz
│   └── cursor-config.json     # Mover desde raíz
├── 01-domain/                  # ✅ OK
├── 02-front-end/              # ✅ OK
├── 03-specialized-rules/      # ✅ OK
├── 04-code-quality/           # ⚠️ Renombrar archivos internos
├── 05-development-workflows/  # ✅ OK
├── 06-documentation/          # ✅ OK
├── 07-processes/              # ✅ OK
├── 08-problem-solving/        # ✅ OK
├── 09-monitoring/             # ✅ OK
├── 10-security/               # ⚠️ Renombrar de security/
├── README.md                  # ⚠️ Actualizar completamente
└── codacy.mdc                 # Considerar mover a 07-processes/
```

### Nivel 2: Archivos Internos (Prefijo Numérico Consistente)

#### 04-code-quality/ (RENOMBRAR)

**Antes:**

```
04-code-quality/
├── 1_spelling-grammar.mdc
├── 2_linting-formatting.mdc
├── 03_error-handling.mdc
├── 04_code-architecture.mdc
├── 05_code-complexity.mdc
├── 06_code-performance.mdc
├── code-standards.mdc
└── code-testing.mdc
```

**Después:**

```
04-code-quality/
├── 01_code-standards.mdc           # Renombrar: code-standards.mdc
├── 02_linting-formatting.mdc       # ✅ Ya existe
├── 03_error-handling.mdc           # ✅ Ya existe
├── 04_code-architecture.mdc        # ✅ Ya existe
├── 05_code-complexity.mdc          # ✅ Ya existe
├── 06_code-performance.mdc         # ✅ Ya existe
├── 07_code-testing.mdc             # Renombrar: code-testing.mdc
└── 08_spelling-grammar.mdc         # Renombrar: 1_spelling-grammar.mdc
```

#### 10-security/ (RENOMBRAR CARPETA)

**Antes:**

```
security/
├── cybersecurity_rules.mdc
└── security.mdc
```

**Después:**

```
10-security/
├── 01_security.mdc                 # Renombrar: security.mdc
└── 02_cybersecurity_rules.mdc      # Renombrar: cybersecurity_rules.mdc
```

## Orden de Aplicación Propuesto

### 1. Fundamentos (Leer Primero)

```
00-core/
├── .cursorrules              # Reglas principales
└── cursor-config.json        # Configuración base
```

### 2. Estándares de Código (Aplicar Siempre)

```
04-code-quality/              # Calidad de código
10-security/                  # Seguridad
```

### 3. Dominio Específico (Según Proyecto)

```
01-domain/                    # Backend/Mobile
02-front-end/                 # React/Next.js
03-specialized-rules/         # i18n, etc.
```

### 4. Workflows y Procesos

```
05-development-workflows/     # Commits, PRs
06-documentation/             # Docs, ADRs, Mermaid
07-processes/                 # Checks, updates
```

### 5. Resolución de Problemas

```
08-problem-solving/           # Bug fixes, análisis
09-monitoring/                # Logging, performance
```

## Acciones Concretas

### Fase 1: Renombrar Archivos (15 minutos)

```bash
# En 04-code-quality/
mv code-standards.mdc 01_code-standards.mdc
mv 2_linting-formatting.mdc 02_linting-formatting.mdc
mv code-testing.mdc 07_code-testing.mdc
mv 1_spelling-grammar.mdc 08_spelling-grammar.mdc

# Renombrar carpeta security/
mv security/ 10-security/

# Dentro de 10-security/
mv security.mdc 01_security.mdc
mv cybersecurity_rules.mdc 02_cybersecurity_rules.mdc
```

### Fase 2: Crear 00-core/ (5 minutos)

```bash
mkdir 00-core
mv .cursorrules 00-core/
mv cursor-config.json 00-core/
```

### Fase 3: Actualizar README.md (20 minutos)

Ver contenido propuesto abajo.

### Fase 4: Mover codacy.mdc (2 minutos)

```bash
mv codacy.mdc 07-processes/codacy.mdc
```

## Beneficios de la Refactorización

1. **Orden Claro**: Prefijos numéricos consistentes
2. **Navegabilidad**: Fácil saber qué leer primero
3. **Mantenibilidad**: Convenciones claras
4. **Profesionalidad**: Estructura coherente
5. **Escalabilidad**: Fácil agregar nuevas reglas

## Checklist de Implementación

- [ ] Backup de estructura actual
- [ ] Renombrar archivos en 04-code-quality/
- [ ] Renombrar carpeta security/ a 10-security/
- [ ] Renombrar archivos en 10-security/
- [ ] Crear 00-core/ y mover archivos
- [ ] Mover codacy.mdc a 07-processes/
- [ ] Actualizar README.md completo
- [ ] Actualizar referencias en .cursorrules
- [ ] Verificar que todos los links funcionen
- [ ] Commit con mensaje: "refactor: estandarizar estructura de reglas"

## Tiempo Estimado Total: 45 minutos

## Resultado Final

```
.cursor/rules/
├── 00-core/                   ✅ Fundamentos
│   ├── .cursorrules
│   └── cursor-config.json
├── 01-domain/                 ✅ Dominio específico
├── 02-front-end/              ✅ Frontend
├── 03-specialized-rules/      ✅ Reglas especializadas
├── 04-code-quality/           ✅ Calidad (archivos renombrados)
│   ├── 01_code-standards.mdc
│   ├── 02_linting-formatting.mdc
│   ├── 03_error-handling.mdc
│   ├── 04_code-architecture.mdc
│   ├── 05_code-complexity.mdc
│   ├── 06_code-performance.mdc
│   ├── 07_code-testing.mdc
│   └── 08_spelling-grammar.mdc
├── 05-development-workflows/  ✅ Workflows
├── 06-documentation/          ✅ Documentación
├── 07-processes/              ✅ Procesos
│   ├── check.mdc
│   ├── rules.mdc
│   ├── screenshot-automation.mdc
│   ├── update-docs.mdc
│   └── codacy.mdc            ✅ Movido aquí
├── 08-problem-solving/        ✅ Resolución
├── 09-monitoring/             ✅ Monitoreo
├── 10-security/               ✅ Seguridad (renombrado)
│   ├── 01_security.mdc
│   └── 02_cybersecurity_rules.mdc
└── README.md                  ✅ Actualizado
```

**Estructura consistente, navegable, profesional y escalable.**
