# Rules (`.cursor/rules`)

This folder contains **behavior rules** for AI agents and humans: code quality, security, workflows, and language- or domain-specific guidance. Cursor loads `.mdc` (and some `.md`) from here.

---

## What lives here

- **`*.mdc`** — Cursor rule format: frontmatter (`description`, `globs`, `alwaysApply`) and markdown body.
- **`RULE.md`** — Top-level “constitution”: authority, principles, workflows, code standards.
- **`react-best-practices/`** — Pack of React/Next.js performance and best-practice rules (`.mdc`).
- **`cursor-config.json`** — Project config (workflows, file limits, testing, etc.); not a rule file.
- **`performance.md`** — Plain Markdown rule.

---

## Folder layout

| Folder / file | Contents |
|---------------|----------|
| `01-domain/` | `backend-api-standards.mdc`, `mobile.mdc` |
| `02-front-end/` | `react-patterns.mdc`, `ui-components.mdc` |
| `03-specialized-rules/` | `i18n.mdc` |
| `04-code-quality/` | Standards, linting, error handling, architecture, complexity, performance, testing, spelling |
| `05-development-workflows/` | `commit.mdc`, `pr-review.mdc` |
| `06-documentation/` | `adr.mdc`, `create-docs.mdc`, `mermaid.mdc` |
| `07-processes/` | `check.mdc`, `codacy.mdc`, `rules.mdc`, `screenshot-automation.mdc`, `update-docs.mdc` |
| `08-problem-solving/` | `analyze-issue.mdc`, `bug-fix.mdc`, `five.mdc` |
| `09-monitoring/` | `logging.mdc`, `performance-profiling.mdc` |
| `10-security/` | `codescene-standards.mdc`, `cybersecurity_rules.mdc`, `security.mdc` |
| `react-best-practices/` | 40+ `.mdc` rules (async, bundle, server, client, rerender, rendering, js) |
| Root | `agents.mdc`, `cursor-agent-orchestration.mdc`, `minimax-m2-*.mdc`, `*-development.mdc`, `testing.mdc`, etc. |

---

## Exports (for non-Cursor tools)

Some tools do not support `.mdc`. The hub exports rules to plain Markdown:

- **Path:** `../dist/exports/rules-md/`
- **Generate:** from hub root, run  
  `node scripts/cursor-hub.mjs export`  
  (or any `install`, which runs `export`).

Use `dist/exports/rules-md/` in other tools; do not edit the exports by hand.

---

## Conventions

- Prefer **small, focused** rule files over a few large docs.
- Rules should be **actionable** and **testable**.
- Use **`description`** and **`alwaysApply`** / **`globs`** in frontmatter so Cursor can choose when to apply them.
