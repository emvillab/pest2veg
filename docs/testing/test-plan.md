# Test plan

Baseline: current app/data/HTML/CSS copied from the reviewed local project; exact hashes are recorded by the runner. Created 25 October 2026.

## Automated checks

Run `node tests/run-checks.cjs` from the project root with Node.js (the audit used the bundled runtime; see summary for version). No npm packages are needed. The suite runs the actual `app.js` and `data.js` in isolated VM contexts with a minimal DOM substitute. It checks dataset structure and crop coverage, local resources, gallery filtering, known and overlapping matches, defensive input handling, change/reset behaviour, all eleven detail records and invalid/missing IDs. Static accessibility checks expose selected-state, live-region and contrast gaps.

The DOM substitute models only the behaviour needed for these tests. It cannot establish real browser rendering, keyboard focus, native select semantics beyond the model, assistive-technology behaviour or responsive layouts. The no-match and missing-input handler tests deliberately bypass the normal guided controls.

Four TODO cases run assertions against known defects. Node reports these separately; they are not passes. The wrapper returns a nonzero release gate while TODO cases or unexpected failures remain. Once a defect is corrected, remove its TODO marker and keep the assertion as a regression check. Do not delete tests to make a report green.

## Manual verification

Complete manual-checklist.csv in actual desktop and mobile browsers. Record date, tester, browser/device, actual result, status and an evidence filename for every case. Use screenshots where they demonstrate the outcome. Review image identity, source accuracy and image permission statements against the original sources. All manual cases currently remain NOT RUN.

## Completion criteria

No unexpected automated failures and no unresolved release-critical defects; required journeys demonstrated in browsers; manual results recorded; sourcing issues resolved or explicitly scoped; team review recorded. The button contrast acceptance target is 4.5:1 for the current small text. Passing these checks alone does not certify accessibility or diagnostic accuracy.

Known issue details and proposed ownership are in ../scrum/risk-register.csv and ../scrum/backlog.csv. Software/data source files were not changed in this documentation and evidence task.
