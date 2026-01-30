# Scripts (`.cursor/scripts`)

This folder contains **build, export, and installation scripts** for the hub. They are used by `cursor-hub` and related workflows.

---

## What lives here

| Script | Purpose |
|--------|---------|
| **`cursor-hub.mjs`** | CLI entry: `export`, `install --project`, `install --global`, `doctor`. Parses args and calls `installer.mjs`. |
| **`installer.mjs`** | Core install logic: `installProject` (link `.cursor`, `.github`; handle targets), `installGlobal`, `exportAll`, `doctorProject`. Uses `fs-link.mjs` and `mdc-to-md.mjs`. |
| **`fs-link.mjs`** | Create links (junctions on Windows, symlinks where possible) and fallback to copy. `ensureLinkedDirectory`, `ensureLinkedFile`, `ensureCopiedDirectory`, `ensureCopiedFile`, etc. |
| **`mdc-to-md.mjs`** | Export Cursor `.mdc` rules to plain Markdown under `dist/exports/rules-md/`. Also builds `dist/exports/vscode/copilot-instructions.md` for VS Code. |
| **`skill-discovery.mjs`** | Find skills in `skills/` (e.g. for OpenCode). Detects `SKILL.md` and plugin layout; `isOpenCodeSkillName` and similar helpers. |

---

## How to run

From the hub root (`.cursor`):

```bash
node scripts/cursor-hub.mjs export
node scripts/cursor-hub.mjs install --project "C:\path\to\app" --targets cursor,vscode
node scripts/cursor-hub.mjs install --global
node scripts/cursor-hub.mjs doctor --project "C:\path\to\app"
```

Or via `npx` with the hub path:

```bash
npx "C:\...\RULES\.cursor" export
npx "C:\...\RULES\.cursor" install --project "C:\path\to\app" --targets cursor,vscode
```

`setup.sh` (when available) calls `cursor-hub` with default arguments.
