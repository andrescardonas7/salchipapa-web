# Cursor Hub (`.cursor`)

This folder is the **single source of truth** for your AI rules ecosystem: rules, skills, hooks, agents, and slash commands. It also provides a **universal installer** (`cursor-hub`) to sync these assets into Cursor, VS Code/Copilot, OpenCode, Antigravity, and Claude Code.

**Agent expectation:** Always review relevant **skills** before responding. Agents should actively consult skills to improve answer quality, search accuracy, and implementation decisions.

---

## For the agent: where to look

| Need | Location | Notes |
|------|----------|-------|
| **Behavior rules** (code quality, security, workflows, lang-specific) | [`rules/`](rules/README.md) | Path: `.cursor/rules/` · `.mdc` files; `RULE.md` is the constitution |
| **Skills** (domain workflows, audits, tooling) | [`skills/`](skills/README.md) | Path: `.cursor/skills/` · Each skill is a folder with `SKILL.md` |
| **Hooks** (before/after shell, file edit, stop) | [`.cursor/hooks.json`](hooks.json) + [`hooks/`](hooks/README.md) | Paths: `.cursor/hooks.json`, `.cursor/hooks/` |
| **Agent personas** (architect, reviewer, planner, etc.) | [`agents/`](agents/README.md) | Path: `.cursor/agents/` · One `.md` per role |
| **Slash commands** (`/plan`, `/tdd`, `/code-review`, etc.) | [`commands/`](commands/README.md) | Path: `.cursor/commands/` · One `.md` per command |
| **Build/export/install scripts** | [`scripts/`](scripts/README.md) | Path: `.cursor/scripts/` · `cursor-hub.mjs`, `installer.mjs`, etc. |
| **Tests** (skills, plugins, triggers) | [`tests/`](tests/README.md) | Path: `.cursor/tests/` · Harnesses for Claude Code, OpenCode, skill-triggering |

---

## Folder map (with paths)

```
.cursor/
├── hooks.json           # Path: .cursor/hooks.json (Cursor hooks config)
├── agents/              # Path: .cursor/agents/ (role personas)
├── commands/            # Path: .cursor/commands/ (slash commands)
├── hooks/               # Path: .cursor/hooks/ (hook scripts + Claude Code hooks.json)
├── rules/               # Path: .cursor/rules/ (Cursor .mdc rules + RULE.md)
├── scripts/             # Path: .cursor/scripts/ (installer + export scripts)
├── skills/              # Path: .cursor/skills/ (skills; each has SKILL.md)
└── tests/               # Path: .cursor/tests/ (test harnesses)
```

---

## Installation and sync

- **Full guide (Spanish):** [GUIA-INSTALACION.md](GUIA-INSTALACION.md) — when to use `setup.sh` vs `cursor-hub`, `node` vs `npx`, and all scenarios.
- **Quick (from hub root):**

  ```bash
  node scripts/cursor-hub.mjs export
  node scripts/cursor-hub.mjs install --project "C:\path\to\your\app" --targets cursor,vscode
  ```

- **With npx (from any folder):**

  ```bash
  npx "C:\...\RULES\.cursor" export
  npx "C:\...\RULES\.cursor" install --project "C:\path\to\your\app" --targets cursor,vscode
  ```

**Targets:** `cursor`, `vscode`, `opencode`, `antigravity`, `claude`. Use `--all` for all; non-Cursor targets are inactive by default to avoid double-counting.

---

## How syncing works

- **Cursor / project:** `project/.cursor` is linked (junction or symlink) to this hub. Rules, skills, agents, commands, and `hooks.json` are used from here.
- **Exports:** `.mdc` rules are exported to `dist/exports/rules-md/` as plain Markdown for tools that do not support `.mdc`.
- **VS Code:** `project/.github/copilot-instructions.md` is linked to `dist/exports/vscode/copilot-instructions.md`.

After adding or changing `.mdc` rules, run `export` (or `install`, which runs export) to refresh `dist/exports/`.

---

## setup.sh vs cursor-hub

| Goal | Use |
|------|-----|
| One command: export + install with good defaults (Cursor + VS Code) | `./setup.sh` or `./setup.sh --project "path"` |
| Control targets, `--all`, `--global`, `--inactive-non-cursor`, or only `export` | `node scripts/cursor-hub.mjs` or `npx "path/to/.cursor"` |

`setup.sh` requires bash (Linux, macOS, Git Bash on Windows). On Windows without bash, use `cursor-hub` with `node` or `npx`.
