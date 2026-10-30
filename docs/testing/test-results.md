# Automated test results

Executed: 2026-10-25T13:30:27.908Z. Runtime: v24.19.0.

**28 passed; 4 known defects; 0 unexpected failures; 0 skipped; 32 total.**

Release gate: **NOT READY**. TODO checks execute; they are unresolved defects, not passes. Node treats TODO failures as nonfatal, so this wrapper deliberately returns a failing release gate while any remain.

Method: Node built-in test runner; actual scripts in VM with minimal DOM substitute; not browser testing. This run checks the current file hashes in [automated-summary.json](automated-summary.json). It does not verify visual layout, actual keyboard interaction, assistive technology, remote links, horticultural accuracy or image permissions.

Run from the project folder: `node tests/run-checks.cjs`. Raw output: [automated-results.tap](automated-results.tap).

- ok 1 - DATA-01: current scope is six crops and eleven distinct pest IDs
- ok 2 - DATA-02: records contain the fields used by the application
- ok 3 - DATA-03: every pest crop is selectable and every crop has coverage
- ok 4 - ASSET-01: every pest and selectable crop has a local image
- ok 5 - LINK-01: local HTML resource links resolve to existing files
- ok 6 - GALLERY-01: initial gallery renders all pests
- ok 7 - GALLERY-02: name search ignores case and surrounding spaces
- ok 8 - GALLERY-03: name and crop filters combine; incompatible query gives zero
- ok 9 - ID-01: crop tiles include all six crops
- ok 10 - ID-02: potato stem-base case returns Cutworms
- ok 11 - ID-03: overlapping pepper honeydew case returns both possible pests
- ok 12 - ID-04: non-potato crop does not offer potato-tuber damage
- ok 13 - ID-05: missing inputs are rejected by the handler
- ok 14 - ID-06: forced unmatched combination is handled without a crash
- ok 15 - ID-07: changing crop clears earlier results and hides later steps
- not ok 16 - ID-08: changing damage hides the Find button until a location is selected  TODO BUG-01: updateLocation does not hide the previous Find button
- ok 17 - DETAIL-aphids: valid ID renders its own record and guidance
- ok 18 - DETAIL-mealy-cabbage-aphid: valid ID renders its own record and guidance
- ok 19 - DETAIL-glasshouse-whitefly: valid ID renders its own record and guidance
- ok 20 - DETAIL-cabbage-caterpillars: valid ID renders its own record and guidance
- ok 21 - DETAIL-cabbage-root-fly: valid ID renders its own record and guidance
- ok 22 - DETAIL-red-spider-mite: valid ID renders its own record and guidance
- ok 23 - DETAIL-thrips: valid ID renders its own record and guidance
- ok 24 - DETAIL-slugs-and-snails: valid ID renders its own record and guidance
- ok 25 - DETAIL-wireworms: valid ID renders its own record and guidance
- ok 26 - DETAIL-potato-cyst-nematodes: valid ID renders its own record and guidance
- ok 27 - DETAIL-cutworms: valid ID renders its own record and guidance
- ok 28 - DETAIL-invalid: unknown ID produces a useful message
- ok 29 - DETAIL-missing: absent ID produces a useful message
- not ok 30 - A11Y-01: selected crop exposes its selected state  TODO BUG-02: selected class is visual only; use aria-pressed or radio semantics
- not ok 31 - A11Y-02: dynamic result and gallery count regions can announce updates  TODO BUG-03: no live-region or status semantics on result/count containers
- not ok 32 - A11Y-03: button text has a contrast ratio of at least 4.5  TODO BUG-04: white on \76b947 is approximately 2.39:1
