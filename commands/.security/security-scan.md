---

description: Escaneo completo de seguridad

allowed-tools: Bash(snyk:\*), Bash(trivy:\*), Bash(poutine:\*)

---



Ejecuta un escaneo completo de seguridad del proyecto usando Snyk, Trivy y Poutine.



\## Pasos a Ejecutar



1\. \*\*Escanear dependencias con Snyk\*\*

```bash

&nbsp;  snyk test --all-projects --severity-threshold=high

```



2\. \*\*Escanear contenedores con Trivy\*\*

```bash

&nbsp;  trivy fs . --severity HIGH,CRITICAL

```



3\. \*\*Escanear supply chain con Poutine\*\*

```bash

&nbsp;  poutine analyze\_local .

```



4\. \*\*Generar reporte consolidado\*\*

&nbsp;  - Contar vulnerabilidades HIGH/CRITICAL

&nbsp;  - Listar top 3 más críticas

&nbsp;  - Sugerir fixes automáticos si existen



\## Output Esperado



Dame un resumen ejecutivo con:

\- ✅ Todo OK / ⚠️ Vulnerabilidades encontradas

\- Top 3 issues críticos (si existen)

\- Comandos exactos para fixear

