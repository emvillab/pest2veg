# Current implementation baseline

Reviewed on 25 October 2026 from local branch `docs/add-wireframes`, HEAD `5ea3571`. The locally recorded `origin/main` is `85a66e0`; the branch adds four wireframe PNGs. No remote fetch was possible, so these are local observations, not confirmation of the latest GitHub state.

## System boundary

Five pages: Home, Pest Gallery, Identify a Pest, Pest Information and About. Runtime files: `app.js`, `data.js`, `style.css` and the HTML pages. The browser reads a bundled JavaScript dataset. There is no database, server-side processing, account system or content-administrator screen. Team members maintain source files outside the running website.

Six crops and eleven pest records are in the current dataset. Vine-weevil assets remain in the repository but vine weevil is not a selectable runtime pest. Crop and pest counts are checked by the automated suite. File hashes in the test summary identify the tested version.

## Matching behaviour

The grower selects one crop, one damage description and one location. A pest is returned only when its `crops`, `damage` and `locations` arrays each contain the selected value. Matching is exact and case-sensitive for these stored values; there is no ranking, confidence percentage or High/Medium/Low label. Gallery name search is case-insensitive and trims surrounding spaces.

The interface derives available choices from the records, excluding potato-tuber damage and the `Tubers` location for non-potato crops. Consequently the normal choice sequence generally offers at least one match. The no-match automated check deliberately forces an incompatible combination to exercise the defensive handler; it does not establish a normal user journey to no results.

Damage and location are independent lists per pest, not validated symptom-location pairs. This is a modelling limitation. Similar descriptions such as `Sooty mould` and `Black sooty mould` are separate exact values. Do not claim the algorithm understands synonyms or has established diagnostic accuracy.

## Worked cases

| Crop | Damage | Location | Expected current results |
|---|---|---|---|
| Potato | Stem cut at soil level | Stem base | Cutworms |
| Pepper | Sticky honeydew | Leaves | Aphids; Glasshouse Whitefly |

Expected results are software checks against the current records, not horticultural validation.

## Design and data changes needing reconciliation

The supplied older screenshot uses a crop dropdown; the current interface uses crop image buttons. Diagrams must show the current boundary and required damage location. Do not present administrator update/confirmation functions as available website features. The original proposal's symptom search, reset control, match reasons, life-cycle detail and source URLs are not all implemented; record these as scope changes or backlog items.

The historical work record describes an earlier eight-crop/twelve-pest architecture. Keep it for provenance, clearly labelled; use current files and fresh tests for present-tense claims.
