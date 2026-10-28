# Pest2Veg

Pest2Veg is a UK-focused educational front-end prototype for exploring possible crop-pest matches. It supports tomato, cabbage, potato, lettuce, pepper and cucumber, using 11 curated pest records. Results are possible matches, not a diagnosis or measured probability.

## Run the website

Open `index.html` in a browser. HTML, CSS and JavaScript run locally; no backend, login or build step is required. A local web server such as VS Code Live Server is optional.

## Current features

- Gallery with case-insensitive pest-name search and a crop filter.
- Identification using crop image buttons, one damage description and a required damage location.
- All exact matching pest records are displayed; the user can open pest details.
- Pest details contain descriptions, affected crops, signs, locations, management suggestions and source labels.
- Responsive CSS and a mobile navigation toggle are implemented. Full browser and accessibility verification remains pending.

The website does not provide AI recognition, confidence levels, symptom-name search in the gallery, a dedicated reset button, an administrator interface or clickable research-source links.

## Verification

Install Node.js if needed, then run from this folder:

```sh
node tests/run-checks.cjs
```

The check runner writes results under `docs/testing/` and exits unsuccessfully while known defects remain. Read [test results](docs/testing/test-results.md) and the [manual checklist](docs/testing/manual-checklist.csv); automated passes are not proof of browser usability or factual accuracy.

## Project evidence

- [Evidence index and remaining gaps](docs/evidence-index.md)
- [Current scope and matching limitations](docs/current-scope.md)
- [Requirements and SDLC traceability](docs/requirements-traceability.md)
- [Identification flow](docs/identification-flow.md)
- [Scrum evidence and planned completion work](docs/scrum/README.md)
- [Historical work record](docs/data-review-report.md) (not current test evidence)
- [Image-credit working record](docs/image-credits.md) (verification issues remain)

`data.js` is the runtime dataset. The workbook in `docs/data/` and research in `docs/research/` are supporting inputs; workbook-to-code consistency and source accuracy still require team review. `wireframe/` contains four PNG designs.

## Team roles recorded in the existing README

| Role | Member |
|---|---|
| Front-end Development & Integration | Kamran Mirza |
| JavaScript & Identification Logic | Shafaqat Ali |
| Scrum Master, Wireframes & GitHub Coordination | Marvis Elvis Aigbe |
| Pest Research & Content | Olugbodi Akinwole Ogunsheye Wray |
| Research & Wireframe Support | Ikechukwu Thompson Agwu |

These are recorded assignments, not independent proof of completed contributions. See the Git evidence for author names and changes; aliases require confirmation.

## Collaboration and assessment

Use a short branch and a pull request; request a review from another member. Local merge commits show a PR workflow, but remote review approvals and branch protection have not been verified.

Module: CPU4106-20C. Intended SDG contribution: SDG 2 through access to crop-pest information; no yield improvement has been measured. The group should validate these supporting records. Individual articles and reflections must be the student's own work, following the assessment's authenticity and AI-use rules.
