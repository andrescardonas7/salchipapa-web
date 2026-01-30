# Skills (`.cursor/skills`)

This folder contains **skills**: domain-specific workflows, tooling, and guidance for AI agents. Each skill is a **folder with a `SKILL.md`** file. Cursor (and the Agent Skills standard) uses the **`description`** in the frontmatter to decide when to trigger a skill.

---

## What lives here

- **One folder per skill** (e.g. `backend-patterns/`, `differential-review/`).
- **`SKILL.md`** in each folder: YAML frontmatter (`name`, `description`) and markdown body (when to use, instructions, examples).
- Optional: `references/`, `workflows/`, `scripts/`, `resources/` inside a skill.

---

## Folder guide (what each skill is for)

Use this as a quick map. Each folder contains a `SKILL.md` entry point unless noted.

### Development and UI

- **`backend-patterns/`** — Path: `.cursor/skills/backend-patterns/` — Backend architecture, APIs, and server-side best practices
- **`frontend-patterns/`** — Path: `.cursor/skills/frontend-patterns/` — Frontend patterns for React/Next.js and UI workflows
- **`coding-standards/`** — Path: `.cursor/skills/coding-standards/` — Universal coding standards and patterns
- **`react-best-practices/`** — Path: `.cursor/skills/react-best-practices/` — React/Next.js performance optimization guidance
- **`vercel-react-best-practices/`** — Path: `.cursor/skills/vercel-react-best-practices/` — Vercel-specific React/Next.js performance rules
- **`UI/`** — Path: `.cursor/skills/UI/` — Opinionated constraints for building better interfaces
- **`web-design-guidelines/`** — Path: `.cursor/skills/web-design-guidelines/` — UI/UX and accessibility review guidelines
- **`humanizer/`** — Path: `.cursor/skills/humanizer/` — Make writing sound more natural and human

### Workflow and planning

- **`ask-questions-if-underspecified/`** — Path: `.cursor/skills/ask-questions-if-underspecified/` — Ask clarifying questions before implementation
- **`brainstorming/`** — Path: `.cursor/skills/brainstorming/` — Explore intent and design before building
- **`writing-plans/`** — Path: `.cursor/skills/writing-plans/` — Create implementation plans
- **`executing-plans/`** — Path: `.cursor/skills/executing-plans/` — Execute a written plan with checkpoints
- **`dispatching-parallel-agents/`** — Path: `.cursor/skills/dispatching-parallel-agents/` — Split independent work across subagents
- **`subagent-driven-development/`** — Path: `.cursor/skills/subagent-driven-development/` — Run tasks via subagents with review loops
- **`finishing-a-development-branch/`** — Path: `.cursor/skills/finishing-a-development-branch/` — Decide merge/PR/cleanup when implementation completes
- **`using-git-worktrees/`** — Path: `.cursor/skills/using-git-worktrees/` — Worktrees for isolated feature work
- **`using-superpowers/`** — Path: `.cursor/skills/using-superpowers/` — Use skills and tooling at session start
- **`skill-creator/`** — Path: `.cursor/skills/skill-creator/` — Create new skills with correct structure
- **`writing-skills/`** — Path: `.cursor/skills/writing-skills/` — Guidance for writing and testing skills
- **`receiving-code-review/`** — Path: `.cursor/skills/receiving-code-review/` — Interpret and validate review feedback
- **`requesting-code-review/`** — Path: `.cursor/skills/requesting-code-review/` — Request code review before merge
- **`verification-before-completion/`** — Path: `.cursor/skills/verification-before-completion/` — Require verification before claiming done

### Testing and quality

- **`test-driven-development/`** — Path: `.cursor/skills/test-driven-development/` — TDD workflow and rules
- **`tdd-workflow/`** — Path: `.cursor/skills/tdd-workflow/` — Step-by-step TDD enforcement
- **`property-based-testing/`** — Path: `.cursor/skills/property-based-testing/` — Property-based testing guidance
- **`systematic-debugging/`** — Path: `.cursor/skills/systematic-debugging/` — Structured debugging process

### Security, audits, and compliance

- **`security-review/`** — Path: `.cursor/skills/security-review/` — Security review checklist and patterns
- **`differential-review/`** — Path: `.cursor/skills/differential-review/` — Security-focused diff/PR review
- **`fix-review/`** — Path: `.cursor/skills/fix-review/` — Verify audit remediations in fix branches
- **`audit-context-building/`** — Path: `.cursor/skills/audit-context-building/` — Deep context building before audits
- **`audit-prep-assistant/`** — Path: `.cursor/skills/audit-prep-assistant/` — Prepare codebase for security review
- **`guidelines-advisor/`** — Path: `.cursor/skills/guidelines-advisor/` — Security best-practice advisory guidance
- **`secure-workflow-guide/`** — Path: `.cursor/skills/secure-workflow-guide/` — Secure development workflow guidance
- **`spec-to-code-compliance/`** — Path: `.cursor/skills/spec-to-code-compliance/` — Spec-to-code alignment checks
- **`entry-point-analyzer/`** — Path: `.cursor/skills/entry-point-analyzer/` — Identify state-changing entry points in contracts
- **`variant-analysis/`** — Path: `.cursor/skills/variant-analysis/` — Find bug variants and build queries
- **`sharp-edges/`** — Path: `.cursor/skills/sharp-edges/` — Identify footguns and unsafe defaults

### Documents and formats

- **`docx/`** — Path: `.cursor/skills/docx/` — Create and edit Word documents
- **`pdf/`** — Path: `.cursor/skills/pdf/` — Extract and manipulate PDFs
- **`pptx/`** — Path: `.cursor/skills/pptx/` — Create and edit PowerPoint presentations

### Tools and analysis

- **`burpsuite-project-parser/`** — Path: `.cursor/skills/burpsuite-project-parser/` — Parse Burp Suite project files
- **`constant-time-analysis/`** — Path: `.cursor/skills/constant-time-analysis/` — Detect timing side-channel risks
- **`static-analysis/`** — Path: `.cursor/skills/static-analysis/` — CodeQL, Semgrep, SARIF workflows
- **`semgrep-rule-creator/`** — Path: `.cursor/skills/semgrep-rule-creator/` — Build Semgrep rules
- **`testing-handbook-skills/`** — Path: `.cursor/skills/testing-handbook-skills/` — Fuzzing, sanitizers, and testing tools
- **`dwarf-expert/`** — Path: `.cursor/skills/dwarf-expert/` — DWARF debug format guidance
- **`culture-index/`** — Path: `.cursor/skills/culture-index/` — Interpret Culture Index profiles

### Smart contract scanners and token checks

- **`token-integration-analyzer/`** — Path: `.cursor/skills/token-integration-analyzer/` — Analyze token integration patterns
- **`algorand-vulnerability-scanner/`** — Path: `.cursor/skills/algorand-vulnerability-scanner/` — Scan Algorand contracts for common issues
- **`cairo-vulnerability-scanner/`** — Path: `.cursor/skills/cairo-vulnerability-scanner/` — Scan Cairo/StarkNet contracts
- **`cosmos-vulnerability-scanner/`** — Path: `.cursor/skills/cosmos-vulnerability-scanner/` — Scan Cosmos SDK / CosmWasm issues
- **`solana-vulnerability-scanner/`** — Path: `.cursor/skills/solana-vulnerability-scanner/` — Scan Solana programs
- **`substrate-vulnerability-scanner/`** — Path: `.cursor/skills/substrate-vulnerability-scanner/` — Scan Substrate pallets
- **`ton-vulnerability-scanner/`** — Path: `.cursor/skills/ton-vulnerability-scanner/` — Scan TON contracts

---

## Main groups

- **Development**: `backend-patterns`, `frontend-patterns`, `coding-standards`, `react-best-practices`, `vercel-react-best-practices`, `UI`, `web-design-guidelines`
- **Workflow and planning**: `writing-plans`, `executing-plans`, `dispatching-parallel-agents`, `subagent-driven-development`, `brainstorming`, `finishing-a-development-branch`, `using-superpowers`, `using-git-worktrees`, `skill-creator`, `writing-skills`
- **Security and audits**: `security-review`, `differential-review`, `fix-review`, `entry-point-analyzer`, `variant-analysis`, `audit-context-building`, `building-secure-contracts`, `sharp-edges`, `spec-to-code-compliance`
- **Documents**: `docx`, `pdf`, `pptx`
- **Testing and QA**: `test-driven-development`, `tdd-workflow`, `property-based-testing`, `receiving-code-review`, `requesting-code-review`, `verification-before-completion`, `systematic-debugging`
- **Clarify and gate**: `ask-questions-if-underspecified`
- **Tools and analysis**: `burpsuite-project-parser`, `constant-time-analysis`, `static-analysis`, `semgrep-rule-creator`, `testing-handbook-skills`, `dwarf-expert`, `culture-index`, `humanizer`

---

## Plugin-style packs (nested skills)

Some folders host **multiple skills** in a shared layout:

- **`building-secure-contracts/`** — Audit prep, guidelines, token integration, and chain-specific scanners (Algorand, Cairo, Cosmos, Solana, Substrate, TON).
- **`constant-time-analysis/`** — Timing side-channel analysis for crypto code (C, C++, Go, Rust, JS, Python, etc.).
- **`culture-index/`** — Interpreting Culture Index surveys and profiles.
- **`dwarf-expert/`** — DWARF debug format and tooling.
- **`semgrep-rule-creator/`** — Create Semgrep rules.
- **`sharp-edges/`** — API and config footguns, secure-by-default.
- **`static-analysis/`** — CodeQL, Semgrep, SARIF parsing.
- **`testing-handbook-skills/`** — Fuzzing, sanitizers, Wycheproof, coverage, etc.

Each of these has its own `SKILL.md` (sometimes under `skills/<name>/` inside the pack). Cursor picks up skills that follow the **`skills/<folder>/SKILL.md`** pattern at the first level; nested ones depend on Cursor supporting recursive discovery.

---

## `SecOps/`

`SecOps/` mirrors many of the skills above for a SecOps-oriented layout. The **`description`** in each `SKILL.md` is what the agent uses to choose when to run a skill.

---

## For the agent

- **Triggering:** The agent sees each skill’s **`description`** (and optionally `name`). Use it when the user’s goal or the current task matches that description.
- **Entry point:** Open the skill’s **`SKILL.md`** for “When to use”, “When NOT to use”, and step-by-step instructions.
- **Extra material:** Use `references/`, `workflows/`, and `scripts/` as referenced from `SKILL.md`; don’t load everything up front.
