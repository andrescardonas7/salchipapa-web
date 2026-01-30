# Tests (`.cursor/tests`)

This folder contains **verification scripts and harnesses** for the hub: skills loading, plugin loading, skill-triggering behavior, and subagent-driven workflows.

---

## What lives here

| Folder / file | Purpose |
|---------------|---------|
| **`claude-code/`** | Tests for Claude Code: skill loading, subagent-driven-development (fast and integration). Uses `claude -p` and `test-helpers.sh`. |
| **`opencode/`** | OpenCode-oriented tests: plugin loading, skill discovery, priority, tools. `run-tests.sh`, `setup.sh`, `test-*.sh`. |
| **`skill-triggering/`** | Check that skills fire for the right prompts. Prompts in `prompts/` (e.g. `dispatching-parallel-agents.txt`, `writing-plans.txt`). `run-all.sh`, `run-test.sh`. |
| **`explicit-skill-requests/`** | Multi-turn tests for explicit “use skill X” requests. Prompts in `prompts/`; `run-all.sh`, `run-test.sh`, `run-multiturn-test.sh`, etc. |
| **`subagent-driven-dev/`** | Subagent-driven development flows: `go-fractals/`, `svelte-todo/` with `design.md`, `plan.md`, `scaffold.sh`. `run-test.sh`. |

---

## When to run

- After changing **installer logic**, **exports**, or **skill layout** — run the relevant target (e.g. `claude-code`, `opencode`) to ensure discovery and loading still work.
- After changing **skill text** or **triggers** — run `skill-triggering` and/or `explicit-skill-requests` to avoid regressions.
- **Requirements:** bash, and for `claude-code`: Claude Code CLI in PATH; for `opencode`: OpenCode environment as in `opencode/setup.sh`.

---

## Running (examples)

```bash
# Claude Code – fast skill tests
./claude-code/run-skill-tests.sh

# Claude Code – integration (slow)
./claude-code/run-skill-tests.sh --integration

# OpenCode
./opencode/run-tests.sh

# Skill triggering
./skill-triggering/run-all.sh

# Explicit skill requests
./explicit-skill-requests/run-all.sh

# Subagent-driven dev
./subagent-driven-dev/run-test.sh
```

Exact flags and deps are in each folder’s scripts and, for `claude-code`, in `claude-code/README.md`.
