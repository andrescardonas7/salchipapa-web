---
name: codescene-standards
model: default
---

# Proyecto: Sistema DevSecOps

## Stack Tecnológico
- CI/CD: GitHub Actions
- Seguridad: SonarQube, OWASP ZAP, Snyk, Trivy
- Análisis de Código: CodeScene

## Workflow de Desarrollo
1. Desarrollo local con pre-commit hooks
2. PR triggers CodeScene analysis automático
3. Revisión de security tools antes de merge
4. Deploy solo si todos los gates pasan

## Reglas CodeScene
- Code Health mínimo: 6.0
- No hacer merge con hotspots críticos sin resolver
- Refactorizar antes de agregar features en código complejo
```

### **🌟 Para AMBOS (Estándar Universal):**
```
AGENT.md                        ← Estándar compartido entre tools
