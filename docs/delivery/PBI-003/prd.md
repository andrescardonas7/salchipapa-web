# PRD: PBI-003 - Mejora UI Home Salchipapa (natural y divertida)

## Resumen

Este PBI mejora la experiencia visual de la home para que se sienta natural, divertida y coherente con la marca Salchipapa, sin sacrificar velocidad ni estabilidad.

## Problema

La UI actual es funcional pero no transmite identidad propia ni genera un efecto agradable al entrar. El look se percibe generico y no aprovecha elementos de marca (comida, textura, calidez). Ademas, necesitamos asegurar que la pagina siga siendo rapida y sin cuelgues.

## Solucion

1. Ajustar el lenguaje visual (paleta calida, contrastes amigables, micro detalles) en globals.css.
2. Mejorar la estructura de la home con jerarquia clara y una seccion de patrocinadores visible pero ordenada.
3. Mostrar logos de empresas participantes durante la seleccion, con fallback si no hay imagen.
4. Mantener animaciones sutiles (solo CSS) y evitar librerias pesadas como Theatre.js.

## Alcance

### En alcance

- Refresh visual de la home (tipografia, colores, fondos, botones, cards).
- Seccion de patrocinadores ubicada encima del footer en la home.
- Integracion de logos de participantes en la lista de negocios.
- Convencion clara para guardar logos en public/.

### Fuera de alcance

- Cambios al flujo OTP o rutas API.
- Cambios al panel admin.
- Animaciones avanzadas con Theatre.js.
- Cambios de infraestructura o base de datos.

## Archivos clave

| Archivo                                      | Proposito                                  |
| -------------------------------------------- | ------------------------------------------ |
| src/app/globals.css                        | Tokens de color, estilos base              |
| src/app/page.tsx                           | Layout y seccion de patrocinadores          |
| src/components/BusinessSelect.tsx          | Render de participantes con logo           |
| src/components/SponsorStrip.tsx            | Nuevo componente de patrocinadores         |
| public/participants/                       | Logos participantes (SVG/PNG)              |
| public/sponsors/                           | Logos patrocinadores (SVG/PNG)             |
| docs/delivery/PBI-003/guides/assets-logos.md | Guia de naming y rutas de logos         |

## Dependencias

- Logos de participantes y patrocinadores (SVG preferido, PNG/JPG permitido).
- Sin dependencias nuevas de librerias UI.

## Metricas de exito

- Home con identidad visual clara y consistente.
- Carga rapida sin bloqueos ni animaciones pesadas.
- Layout estable (sin saltos visibles).
- Seccion de patrocinadores visible y ordenada.
- Logos de participantes visibles con fallback cuando no existan.
