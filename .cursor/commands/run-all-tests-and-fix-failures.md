\# Run All Tests and Fix Failures



\## Overview

Run the complete test suite and systematically fix any failing tests.



> 💡 \*\*Package Manager:\*\* This guide uses `pnpm`. If you use `npm` or `yarn`, simply replace `pnpm` with your package manager.



\## Initial Setup

```bash

pnpm install

pnpm test -- --clearCache



\## Process



\### 1. Run the full test suite

```bash

\# Run tests

npm test        # if using npm

pnpm test       # if using pnpm

yarn test       # if using yarn



\# Run in watch mode for active development

npm test -- --watch

```



\### 2. Analyze failures

\- \*\*Read error messages carefully\*\* 

\- The stack trace often points to the exact issue

\- \*\*Identify patterns\*\* - Multiple failures may share the same root cause

\- \*\*Group related failures\*\*

&nbsp;- Fix by module/feature for efficiency

\- \*\*Check test output format\*\*:

&nbsp; - ✅ Passing tests

&nbsp; - ❌ Failed tests

&nbsp; - ⚠️ Skipped tests



\### 3. Fix systematically

\*\*Priority order:\*\*

1\. Unit test failures (fastest feedback)

2\. Integration test failures

3\. E2E test failures (slowest but most critical)



\*\*For each failure:\*\*

\- \[ ] Understand what the test expects vs. what it receives

\- \[ ] Determine if the issue is in the code or the test

\- \[ ] Make the minimal change needed

\- \[ ] Run that specific test: `npm test -- path/to/test.spec.js`

\- \[ ] Verify no regressions: run related tests

\- \[ ] Commit the fix with a clear message



\### 4. Handling specific scenarios



\*\*Outdated snapshots:\*\*

```bash

\# Review changes carefully before updating

npm test -- -u

\# or update specific snapshot

npm test -- -u path/to/test.spec.js

```



\*\*Flaky/intermittent tests:\*\*

```bash

\# Run multiple times to reproduce

npm test -- --testNamePattern="flaky test" --runInBand --detectOpenHandles

```



\*\*Async/timing issues:\*\*

\- Use `waitFor`, `findBy\*` instead of `getBy\*`

\- Increase timeout for slow operations: `jest.setTimeout(10000)`

\- Avoid `setTimeout` - use proper async patterns



\*\*Environment-specific failures:\*\*

\- Check `NODE\_ENV` settings

\- Verify test database/mock data setup

\- Review global test configuration



\### 5. Final verification

```bash

\# Full suite with coverage

npm test -- --coverage --verbose



\# Check for unhandled promises

npm test -- --detectOpenHandles



\# Run in CI mode (more strict)

CI=true npm test

```



\*\*Checklist:\*\*

\- \[ ] All tests passing

\- \[ ] No console warnings/errors

\- \[ ] Coverage meets threshold (if configured)

\- \[ ] No tests marked as `.skip()` or `.only()`

\- \[ ] Clean git status (no untracked test files)



\## Debugging Tips



\*\*Isolate the problem:\*\*

```bash



\# Run single test file

npm test -- path/to/test.spec.js



\# Run specific test

npm test -- -t "test name pattern"



\# Run with verbose output

npm test -- --verbose



\# Debug with Node inspector

node --inspect-brk node\_modules/.bin/jest --runInBand

```



\*\*Common commands:\*\*

```bash

\# List all test files

npm test -- --listTests



\# Show configuration

npm test -- --showConfig



\# Bail after first failure

npm test -- --bail

```



\## Prevention



\- \*\*Run tests before committing\*\*: Set up pre-commit hooks

\- \*\*Use watch mode during development\*\*: Catch issues early

\- \*\*Write tests alongside features\*\*: Not as an afterthought

\- \*\*Keep tests independent\*\*: Each test should run in isolation

\- \*\*Regular maintenance\*\*: Update dependencies and fix deprecation warnings



\## When to Update Tests vs. Code



\*\*Update the test when:\*\*

\- Requirements have changed

\- Test is checking implementation details instead of behavior

\- Snapshots reflect intentional UI changes



\*\*Update the code when:\*\*

\- Test correctly validates expected behavior

\- Multiple unrelated tests fail

\- The fix aligns with specifications



\## Resources

\- Test framework docs (Jest, Vitest, etc.)

\- Project testing conventions (if documented)

\- Coverage reports: `./coverage/lcov-report/index.html`





\## Nunca hagas esto:



❌ Actualizar snapshots sin revisar los diffs

❌ Comentar/skip tests que fallan "temporalmente"

❌ Cambiar assertions para que pasen sin entender por qué fallaban

❌ "Re-correr hasta que pase" con tests flaky

