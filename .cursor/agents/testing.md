---
name: testing
model: default
---

# AGENTS.md

## Project overview

- Este repositorio prioriza la entrega de software de alta calidad con **full stack testing** en toda la pila (UI, APIs, lógica de negocio, datos, móvil e infraestructura). [file:21]
- Usa este archivo como referencia principal para cualquier agente que trabaje con este código (Cursor, Claude Code, etc.). [web:25][web:39]

## Code style

- Usa **TypeScript** para todos los archivos nuevos siempre que sea posible.
- Prefiere **functional components** en React.
- Utiliza `snake_case` para columnas de base de datos.
- Respeta el formateo y reglas del linter configurados en el proyecto (no las sobrescribas salvo que se indique lo contrario en la base de código).

## Architecture

- Sigue el **repository pattern** para acceso a datos.
- Mantén la lógica de negocio en **service layers**; evita lógica compleja en controladores, componentes de UI o repositorios.
- Minimiza dependencias circulares y acoplamiento fuerte entre módulos.
- Cuando no tengas claro dónde colocar una nueva pieza de lógica, sugiere una breve estructura y pregúntalo antes de crearla.

## Testing

- Considera la calidad como **responsabilidad compartida**: cada cambio significativo debe incluir o actualizar pruebas. [file:21]
- Sigue la estrategia descrita en `.cursor/rules/full_stack_testing.mdc`:
  - Prefiere muchos tests pequeños y rápidos (unidad/servicio) frente a pocos E2E lentos y frágiles.
  - Usa APIs y UI para cubrir solo flujos de negocio críticos y escenarios de integración. [file:21]
- Cuando el usuario pida “escribe tests” o “mejora la cobertura”:
  - Pregunta primero por el área de mayor riesgo/negocio.
  - Propón una mezcla de pruebas unitarias, integración/contrato y, solo si aporta valor, E2E/UI. [file:21]
- No inventes resultados de ejecución de tests; solo razona hipotéticamente salvo que se proporcionen logs o salidas reales. [file:21]

## Build & test commands

- Revisa el `README.md` y los workflows de CI para los comandos exactos de build y test. [web:25][web:43]
- Siempre que sugieras cambios de código:
  - Indica cómo ejecutar los tests relevantes (por ejemplo, `npm test`, `mvn test`, `pytest`, etc., según el stack del repo). [file:21]
  - Intenta mantener los cambios compatibles con la suite de tests existente.

## Workflow with agents

- Antes de escribir código:
  - Lee los archivos relevantes y, si es necesario, resume el plan o la estrategia de testing que vas a seguir. [web:13]
- Mientras implementas:
  - Genera o actualiza tests siguiendo las reglas de `.cursor/rules/full_stack_testing.mdc`. [file:21]
- Antes de finalizar:
  - Asegúrate de que los comandos de tests que indiques puedan ejecutarse y que tu propuesta no requiera pasos manuales innecesarios.

## When in doubt

- Si las reglas de este archivo y las de `.cursor/rules` parecieran entrar en conflicto, **prioriza**:
  1. Reglas específicas del stack/proyecto en `.cursor/rules`.
  2. Luego, las guías generales de este `AGENTS.md`. [web:23][web:25]
- Cuando no tengas suficiente contexto, pide aclaraciones breves al usuario en lugar de asumir.
