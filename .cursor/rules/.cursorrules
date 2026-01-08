# AI Coding Agent

> **Authority:** User = Product Owner + Final Authority | AI_Agent = Senior Dev + QA
> All changes require authorized task linked to agreed PBI. No unapproved changes.

## 1. Core Principles (Non-Negotiable)

**SOLID + Clean Code:**
- Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- DRY (define once), KISS (minimal solutions), YAGNI (explicit requirements only)
- TDD: Tests before code, always. Task cannot be Done without passing tests

**Authority Hierarchy:**
- User defines requirements and approves changes
- AI_Agent executes via PBIs/tasks, documents dependencies, ensures quality
- Report PRD discrepancies immediately

## 2. Work Item Management

### PBI Structure
docs/delivery/backlog.md # Single source of truth
docs/delivery/<PBI-ID>/
├── prd.md # Mini-PRD (when Agreed)
├── tasks.md # Task index
├── guides/ # External package guides
└── <PBI-ID>-<TaskNum>.md # Individual tasks

text

**Status Flow:** Proposed → Agreed → InProgress → InReview → Done/Rejected

### Task Requirements
- **Granularity:** Minimal, testable, independent, estimable
- **Version Control:** Commit `<task_id> <description>` | PR `[<task_id>] <description>`
- **Conventional Commits:** `feat:`, `fix:`, `chore:`, `test:`, `docs:`
- **Test Plan:** Every code task needs `## Test Plan` section with >80% coverage

## 3. Code Standards

### TypeScript Strict Mode
// ✅ Good
const processData = (data: UserData): ProcessedData => {
try {
return transform(data);
} catch (error) {
logger.error('Processing failed', { error, userId: data.id });
throw new ProcessingError('Failed to process user data');
}
};

// ❌ Bad: any type, console.log, no error context
const processData = (data: any) => {
console.log('Processing...');
return transform(data);
};

text

### General Rules
- **File size:** Max 300 lines/file, 50 lines/function
- **Constants:** Use named constants for repeated values. Mark single-assignment as `const`/`readonly`
- **Imports:** Group as node → third-party → internal. Use absolute imports
- **Naming:** Constants `UPPER_SNAKE_CASE`, functions `camelCase`, classes `PascalCase`, files `kebab-case`

### React/JSX
// ❌ Bad
arr.map((item, idx) => <Item key={idx} />);
<input type="text" />

// ✅ Good
arr.map(item => <Item key={item.id} />);
<label htmlFor="username">Username</label>
<input id="username" type="text" />

text

### Testing
- **Max 4 levels** of describe/it nesting
- **Test Pyramid:** Unit (majority) → Integration → E2E (critical paths only)
- **Locations:** `test/unit/`, `test/integration/`
- Mock external dependencies in unit tests

## 4. Package Management & Dependencies

**Package Manager:** `pnpm` exclusively (not npm/yarn)

**Critical Commands:**
pnpm add <package> --exact # Pin exact version
pnpm verify # Run after every install

text

**Rules:**
- Identical, pinned versions within package ecosystems
- Verify compatibility before upgrades
- Never use `--force`, `--no-verify`, `--legacy-peer-deps`

## 5. Security & Error Handling

### Security Checklist
- ✅ HTTPS for all requests
- ✅ CORS with specific origin whitelist (not `cors()`)
- ✅ Validate all external inputs (API, forms, CLI args)
- ✅ Sanitize dynamic HTML/DOM injections
- ✅ Never expose `.env` secrets to frontend
- ✅ Never commit tokens/credentials

### Error Handling Pattern
try {
const result = await apiCall();
return result;
} catch (error) {
logger.error('API call failed', {
error,
endpoint: '/api/users',
userId: context.userId
});
throw new ApiError('Failed to fetch user data');
}

text

## 6. Documentation Standards

### Structure
docs/
├── project-overview.md # Purpose and key files
├── architecture.md # System organization
├── testing.md # Test approach
├── development.md # Dev environment
└── deployment.md # Distribution

text

### Requirements
- Single source of truth (DRY documentation)
- External packages: Create `<task_id>-<package>-guide.md` with API usage, date-stamp, source links
- Document functions/classes using JSDoc or TSDoc
- Timestamp format: `<!-- Generated: YYYY-MM-DD HH:MM:SS UTC -->`

## 7. Git Workflows

### Pre-commit Checks
pnpm verify # Dependency integrity
tsc --noEmit # TypeScript compilation
eslint . # Linting
prettier --check . # Formatting
pnpm test # Tests

text

**Branch Naming:** `feat/<task-id>`, `fix/<issue-description>`, `chore/<description>`

### Bug Fix Process
1. Create issue with descriptive title
2. Branch: `fix/<issue-description>`
3. Write failing test (TDD)
4. Implement fix
5. Verify tests pass
6. Commit: `fix: <description> (#<issue>)`
7. PR: `Fixes #<issue-number>`

## 8. Definition of Done

A task is Done when:
- [ ] All Test Plan tests pass
- [ ] `tsc --noEmit` passes (no TypeScript errors)
- [ ] `eslint` and `prettier` checks pass
- [ ] Test coverage >80% for critical code
- [ ] Code review approved
- [ ] Documentation updated
- [ ] Status synchronized across all files
- [ ] `pnpm verify` passes

## 9. Automation Requirements

### Toolchain
{
"packageManager": "pnpm",
"formatter": "prettier",
"linter": "eslint + @typescript-eslint",
"typeChecker": "tsc --noEmit",
"gitHooks": "husky",
"preCommit": "lint-staged"
}

text

### lint-staged Config
"lint-staged": {
"/*.{ts,tsx,js,jsx,json,md}": ["prettier --write", "eslint --fix"],
"/*.{ts,tsx}": ["tsc --noEmit"]
}

text

## 10. Quick Reference

### 🚫 Never Use
- `npm install` or `yarn install` (use `pnpm`)
- `any` or `unknown` types without justification
- `console.log` in production (use logger)
- Array index as React key
- `execSync` with unsanitized input (use `execFileSync`)
- Force flags: `--force`, `--no-verify`

### ⚠️ Scripts Must Respect .gitignore
Scripts must never generate files that are ignored by Git. Always check `.gitignore` before creating output files.

### Environment Config
- Use `.env.development`, `.env.production` (never commit `.env` files)
- Validate all environment variables on startup

## 11. Accessibility

- All h1-h6 must contain visible text or `aria-label`
- Every form input needs associated `<label htmlFor="...">`
- Prefer semantic HTML over ARIA roles
- No `tabIndex="0"` on non-interactive elements