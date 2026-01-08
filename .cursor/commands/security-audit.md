\# Security Audit



\## Overview

Comprehensive security review of the codebase to identify and fix vulnerabilities.



\## Areas to Check



\### 1. Authentication \& Authorization

\- \[ ] Password storage uses proper hashing

\- \[ ] Session management is secure

\- \[ ] Token expiration is implemented

\- \[ ] Role-based access control works correctly



\### 2. Input Validation

\- \[ ] All user inputs are validated

\- \[ ] SQL injection prevention

\- \[ ] XSS protection in place

\- \[ ] CSRF tokens implemented



\### 3. Data Protection

\- \[ ] Sensitive data is encrypted

\- \[ ] No secrets in code or logs

\- \[ ] Proper HTTPS configuration

\- \[ ] Secure cookie flags set



\### 4. Dependencies

\- \[ ] Run `npm audit` or `pnpm audit`

\- \[ ] Review all dependency vulnerabilities

\- \[ ] Update vulnerable packages

\- \[ ] Check for known CVEs

\- \[ ] Check packages against socket.dev or snyk

&nbsp;	

\### 5. API Security

\- \[ ] Rate limiting implemented

\- \[ ] Input sanitization present

\- \[ ] Error messages don't leak info

\- \[ ] CORS configured properly



\### 6. File Operations

\- \[ ] File upload validation

\- \[ ] Path traversal prevention

\- \[ ] File size limits enforced

\- \[ ] Proper file permissions



\### 7. AI/Prompt Security

\- \[ ] No malicious instructions in logs

\- \[ ] User inputs sanitized before AI processing

\- \[ ] No auto-execution of AI suggestions in production

\- \[ ] Review all .cursorrules files for malicious content



\### 8. Cursor Configuration Security

\- \[ ] Review .cursor/hooks.json for unsafe commands

\- \[ ] Audit MCP server configurations

\- \[ ] No hardcoded secrets in .cursorrules

\- \[ ] Agent auto-run disabled in sensitive repos



\## Tools to Use

\- npm/pnpm audit for dependencies

\- ESLint security plugins

\- OWASP ZAP for web scanning

\- Manual code review







