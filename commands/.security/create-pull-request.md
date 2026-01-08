\# Create Pull Request



\## Overview

Create a well-structured pull request with all necessary context and information for reviewers.



\## Steps



1\. \*\*Review your changes\*\*

&nbsp;  - Run `git diff` to see all modifications

&nbsp;  - Ensure all changes are intentional

&nbsp;  - Check for any debug code or temporary changes



2\. \*\*Write a descriptive title\*\*

&nbsp;  - Use present tense (e.g., "Add user authentication")

&nbsp;  - Keep it concise but informative

&nbsp;  - Reference ticket number if applicable



3\. \*\*Provide context\*\*

&nbsp;  - Explain WHY this change is needed

&nbsp;  - Describe WHAT was changed

&nbsp;  - Mention any breaking changes



4\. \*\*Add testing notes\*\*

&nbsp;  - List steps to test the changes

&nbsp;  - Include edge cases

&nbsp;  - Mention any setup requirements



5\. \*\*Overview\*\*

   	Problem: Why this change is needed (business or technical motivation)

&nbsp;	Solution: High-level approach taken

&nbsp;	Impact: What systems/users are affected

6\. \*\*Size Matters\*\*

&nbsp;	Large PRs (200+ lines) lead to superficial reviews and missed issues. Break work into logical, reviewable 	chunks.



\## Checklist

\- \[ ] All tests pass

\- \[ ] Code follows project style guide

\- \[ ] Documentation updated if needed

\- \[ ] No sensitive data in the code

\- \[ ] Branch is up to date with main

\- \[ ] PR is focused on single concern (add this)

\- \[ ] Self-reviewed before requesting review (add this)





