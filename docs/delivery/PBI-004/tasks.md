# Tareas - PBI-004

## Indice de tareas

| ID         | Titulo                              | Estado     |
| ---------- | ----------------------------------- | ---------- |
| PBI-004-01 | Crear vista pública `/participants` | InProgress |

---

## PBI-004-01: Crear vista pública `/participants`

**Estado:** InProgress
**Archivo:** [PBI-004-01.md](./PBI-004-01.md)

### Descripcion

Crear una ruta pública para visualizar participantes sin pasar por OTP, manteniendo OTP únicamente para votar.

### Entregables

- `src/app/participants/page.tsx` creado
- `src/components/ParticipantsList.tsx` creado (UI lista/filtrado)
- Link desde `src/app/page.tsx` hacia `/participants`
- Helper + tests para fallback de logos
- Test plan con cobertura >= 80% (aplica a lógica nueva testeada)
