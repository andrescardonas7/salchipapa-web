---

description: Fix automático de vulnerabilidad

argument-hint: \[CVE-ID]

allowed-tools: Bash(npm:\*), Bash(snyk:\*)

---



\# Fix de Vulnerabilidad



Fixea automáticamente la vulnerabilidad: $ARGUMENTS



\## Proceso



1\. \*\*Buscar info de la vulnerabilidad\*\*

```bash

&nbsp;  snyk test --json | jq '.vulnerabilities\[] | select(.id=="$ARGUMENTS")'

```



2\. \*\*Determinar fix disponible\*\*

&nbsp;  - Si upgrade simple → `snyk fix --id=$ARGUMENTS`

&nbsp;  - Si no hay fix → Sugerir alternativas

&nbsp;  - Si es transitive → Esperar parent update



3\. \*\*Aplicar fix\*\*

```bash

&nbsp;  snyk fix --id=$ARGUMENTS

&nbsp;  npm install

```



4\. \*\*Verificar\*\*

```bash

&nbsp;  snyk test --severity-threshold=high

```



5\. \*\*Reportar resultado\*\*

&nbsp;  - ✅ Vulnerabilidad fixeada

&nbsp;  - ⚠️ Requiere acción manual

&nbsp;  - 🔄 Re-escanear necesario



\## Output



Dame:

\- Estado del fix (exitoso/fallido)

\- Comando de commit si exitoso

\- Próximos pasos si fallido

