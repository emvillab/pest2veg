# Pest2Veg identification flow

Current implementation reviewed on 25 October 2026. This replaces the earlier proposed flow in which damage location was optional.

1. Open Identify a Pest. Six crop-image buttons are shown.
2. Choose one crop. The damage selector appears, using damage values associated with that crop's pest records.
3. Choose one damage description. The location selector appears, derived from the remaining records.
4. Choose a location. Location is required; the Find Possible Pest button becomes available.
5. Select Find Possible Pest. The script returns every record containing all three exact values.
6. Read the possible-match notice and open a pest detail page if useful.

Changing the crop clears results and resets later controls. Changing damage clears results and replaces location options, but currently leaves an already-visible Find button visible (BUG-01). The click handler still rejects missing input. See the defect register and executed tests.

No probability, ranking, AI model or explanatory match-reason field is implemented. Results contain the pest name, photo, summary and a link to its detail page. Similar symptom wording remains separate in the dataset. The display should always be described as possible matches rather than a definitive identification.

Code: `buildIdentifier()` in `app.js`; runtime records: `data.js`. Verification: `tests/project.test.cjs` and `docs/testing/test-results.md`.
