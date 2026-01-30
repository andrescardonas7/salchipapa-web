# Guia de assets de logos (participantes y sponsors)

## Ubicacion recomendada

- Participantes: public/participants/
- Patrocinadores: public/sponsors/

Los archivos en public/ se sirven directamente por URL. Ejemplo:

- public/participants/mi-salchi.svg -> /participants/mi-salchi.svg
- public/sponsors/patrocinador-1.png -> /sponsors/patrocinador-1.png

## Formatos

- Preferido: SVG
- Permitido: PNG/JPG (con fondo transparente si aplica)

## Convencion de naming

- Usar kebab-case y evitar espacios
- Ejemplos:
  - la-salchi-pro.svg
  - patrocinador-1.png

## Uso en datos

El campo imageUrl debe apuntar al path publico:

- imageUrl: '/participants/la-salchi-pro.svg'
- imageUrl: '/participants/mi-salchi.png'

Si imageUrl esta vacio, la UI intenta usar '/participants/<slug>.svg' como fallback.
Por eso es importante que el nombre del archivo coincida con el slug.

## Recomendaciones de tamano

- Logos participantes: 128x128 (o equivalente)
- Sponsors principales: 220x120 (o equivalente)

## Nota sobre performance

Mantener los SVG optimizados y evitar archivos muy pesados.
