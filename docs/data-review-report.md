# Historical work record status

Archived-context notice added 25 October 2026. The original record below is preserved as received. It describes a different eight-crop/twelve-pest architecture and claims 30 passing tests. Those tests, source layout, confidence labels and page counts have not been reproduced in the current project. These are historical claims, not current validation or independently confirmed meeting evidence.

Use [current scope](current-scope.md), [executed tests](testing/test-results.md) and [evidence index](evidence-index.md) for the present implementation. The original author attribution does not imply authorship of this notice.

---

# Work Record — research, findings and changes

**Author:** Shafaqat Ali
**Dates covered:** 13–14 October 2026
**Purpose:** one document the whole team can read to know exactly what has been done, what we found, what changed, and what is still open.

> Written to save the rest of the team re-reading everything. Each section says what we did, what we found, and what changed as a result. Where a decision was argued out, the reasoning is recorded, because that is the part worth keeping.

---

## 1. Where the project stands

| | Start of this work | Now |
| --- | --- | --- |
| Crops | 11 | **8** |
| Pests | 8 (generic) | **12** (sourced UK species) |
| Symptoms a grower can tick | 10 (our own wording) | **16** (researched, exact) |
| Pest photographs | 0 real | **12 real photographs** |
| Sourced references | 0 | **21 RHS sources** |
| Automated tests | 17 | **30** |
| Repository size | 0.34 MB | 1.04 MB |

Everything now passes: **30 tests, 0 failures.**

---

## 2. The data rebuild

### 2.1 Why

Our pest data was a draft. Symptoms, sizes and colours were placeholders and
**not one plant–pest link had ever been checked against a source.** Two problems
followed: a grower could be shown a match we could not defend, and we could not
answer "where did this come from?" — which is the first question a marker or a
user should be able to ask.

### 2.2 What the research changed

**Crops cut from 11 to 8.** Aubergine, beans and onion were removed.

**Records removed as too vague:**

| Removed | Why |
| --- | --- |
| Beetles (*Coleoptera*) | An order with over 400,000 species. No grower can act on "beetles". |
| Leaf Miners (generic) | Crop-specific leaf miners are handled by species records instead. |

**Records renamed to match what the sources actually document:** Whiteflies →
Glasshouse Whitefly, Spider Mites → Red Spider Mite, Caterpillars → Cabbage
Caterpillars.

**Links removed because no source supported them.** This is the most important
part of the rebuild:

| Link we had | What the source says | Action |
| --- | --- | --- |
| Vine Weevil → Potato | RHS names strawberries. Potato is not mentioned at all. | Removed |
| Wireworms → Strawberry, Spinach | RHS: *"the main damage is to potatoes"*. Plants affected given only as *"roots of various plants"*. | Removed |
| Aphids → Cabbage | That link belongs to Mealy Cabbage Aphid (*Brevicoryne brassicae*), a separate record. | Removed |

**Rule the team agreed:** a source that does not mention a plant is **evidence
against** listing it — not merely "we could not find it".

### 2.3 The 12 pests, with scientific names

| Pest | Scientific group | Type | Crops | Symp. |
| --- | --- | --- | --- | --- |
| Aphids | Aphidoidea (superfamily) | Insect | Tomato, Lettuce, Pepper, Cucumber, Strawberry | 4 |
| Mealy Cabbage Aphid | *Brevicoryne brassicae* | Insect | Cabbage | 3 |
| Glasshouse Whitefly | *Trialeurodes vaporariorum* | Insect | Tomato, Pepper, Cucumber | 3 |
| Cabbage Caterpillars | *Pieris brassicae, P. rapae, P. napi* | Insect | Cabbage | 2 |
| Cabbage Root Fly | *Delia radicum* | Insect | Cabbage | 3 |
| Red Spider Mite | *Tetranychus urticae* | Mite | Tomato, Pepper, Cucumber | 2 |
| Thrips | Thysanoptera (order) | Insect | Tomato, Cucumber | 4 |
| Slugs and Snails | Gastropoda (class) | Mollusc | Cabbage, Potato, Lettuce, Cucumber, Strawberry, Spinach | 3 |
| Wireworms | *Agriotes* (click beetle larvae) | Insect | Potato | 1 |
| Potato Cyst Nematodes | *Globodera rostochiensis* and *G. pallida* | Nematode | Potato, Tomato | 2 |
| Vine Weevil | *Otiorhynchus sulcatus* | Insect | Strawberry | 2 |
| Cutworms | *Agrotis segetum*, *Noctua pronuba* | Insect | Lettuce, Potato | 2 |

We label the field **"scientific group"** rather than "scientific name" because
our names map to different taxonomic ranks. *Thysanoptera* is an order;
*Gastropoda* is a class. Calling either a "scientific name" would be wrong.

**New pest type added:** Nematode. Potato cyst nematodes are neither insects nor
mites, and the gallery type filter now offers it.

---

## 3. The symptom decision, and a mistake we caught

We briefly had the website publishing 10 symptoms instead of the 16 we
researched. The team argued it back to 16, and the argument was worth having,
because keeping 10 would have forced us into something we should not do.

**We had substituted "Yellowing leaves" for Cabbage Root Fly and Red Spider
Mite**, to stop their symptom lists looking thin. Neither substitution is
supported:

- **Cabbage Root Fly** — RHS gives wilting, slow growth and tunnelled roots. It
  does not say yellowing.
- **Red Spider Mite** — RHS gives fine pale mottling and fine silk webbing. It
  says leaves *"lose most of their green colour"*, which is not the same thing.

Cutting to 10 also **silently broke a working case**: Slugs and Snails lost
*"Tunnelled roots or tubers"*, the only symptom tying slugs to potato. After the
fix, a potato grower who ticks that symptom correctly gets both slugs and
wireworms.

> **Rule agreed: drop a symptom rather than substitute a different one.** An
> unsourced symptom is worse than a missing one, because it puts a claim in front
> of a grower we cannot stand behind.

We also removed **"Pale tunnels in leaves"** — it existed for leaf miners, and
with no leaf miner among the twelve pests, nothing could ever match it.

---

## 4. Decisions we deliberately did not take

**We kept Wireworms with a single symptom.** It will therefore never be a High
match. The team considered swapping it and decided against: the sourced
alternatives (Root Aphids, Cabbage Whitefly, Flea Beetles) have 2, 2 and 1
symptoms, so we would trade one thin record for another. Dropping a main UK
potato pest would leave Potato with three and would not match a grower's
expectations. **Padding it with invented symptoms was rejected for the same
reason as section 3.**

A **Low** label is the honest outcome — "possible, check the other signs" — which
is true for a pest with one visible sign.

**We did not add a second spinach pest.** Spinach has only one (Slugs and
Snails), the weakest coverage in the tool. Olu checked the RHS spinach
grow-your-own page: it names slugs, birds and pigeons but **no second insect
pest**, so there was nothing sourced to add. Recorded as a known gap.

**We still do not use machine learning.** Not revisited, but the reason holds:
rules let us show a reason for every result, so a grower can challenge it. A
classifier returns one answer with a confidence number and no way to argue.

---

## 5. Photographs — and why we had to change them

### 5.1 What happened

We first gathered 12 candidate photographs from ordinary websites. **Nine could
not be used**, and the reasons are worth reading because they are the kind of
thing that looks fine until someone checks.

| Candidate | Publisher | Why rejected | Link to the original |
| --- | --- | --- | --- |
| Aphids | Bob Vila | Commercial site, all rights reserved | https://www.bobvila.com/articles/how-to-get-rid-of-aphids |
| Cabbage caterpillars | Wildlife Insight | **Wrong species** — captioned *Mamestra brassicae*, a different genus to our record | https://www.wildlifeinsight.com/british-moths/cabbage-moth-mamestra-brassicae/ |
| Cabbage root fly | David Domoney | Personal blog, no licence published | https://www.daviddomoney.com/a-pest-disease-guide-to-cabbage-root-fly |
| Cutworms | Plantura Garden UK | Commercial retailer | Site is now `plantura.garden/uk`; the original page URL did not survive, so no link given |
| Glasshouse whitefly | Ideal Home | Commercial magazine | https://www.idealhome.co.uk/garden/garden-advice/how-to-get-rid-of-glasshouse-whitefly.html |
| Slugs and snails | Discover Wildlife | Commercial publisher | https://www.discoverwildlife.com/animal-facts/insects-invertebrates/slug-vs-snail/ |
| Thrips | Eutrema | Commercial blog, no licence published | https://www.eutrema.co.uk/thrips-tiny-insects-big-problems-in-crop-protection/ |
| Vine Weevil | Andermatt Garden | Commercial retailer | https://andermattgarden.co.uk/blog/spests/vine-weevil-how-to-identify-and-get-rid-of/ |
| Wireworms | Food Gardening Network | Independent site, no licence published | None — the domain no longer resolves |

Three were usable and are in the site: **Red Spider Mite** from Pexels (free
licence), **Mealy Cabbage Aphid** from UMass Amherst, **Potato Cyst Nematodes**
from Business Queensland. The original files are still on the machine in
`pest pics/` for anyone who wants to compare them.

### 5.2 How we fixed it

We switched to **Wikimedia Commons**, which states the licence on every file, so
each image can be checked *before* use. All twelve pests now have a real
photograph, and every author is credited on the page as CC BY and CC BY-SA
require. Full citations are in **[docs/image-credits.md](image-credits.md)**.

All images were resized to 800px and re-encoded, which cut the photograph
weight from 10.5 MB to 707 KB.

### 5.3 The lesson — three images passed every check and still looked wrong

This is the part worth remembering. After replacing the nine, three images were
**correctly licensed and taxonomically valid** but were replaced again:

| Pest | The image we had | Why it was wrong |
| --- | --- | --- |
| Thrips | A numbered figure plate from a scientific paper, panels 9 and 11 | A paper figure, not a photograph a grower would recognise |
| Wireworms | A 1900s line-drawing plate, black and white | Looked nothing like the other nine, all colour photographs |
| Cabbage root fly | A fly isolated on a yellow flower | No crop in shot, so no context for a brassica pest |

**None of these were caught by reading filenames or licence text. Only looking at
the rendered pages caught them.** The team spotted that three images did not look
like the other nine.

> **Standing instruction: every photograph gets an eyes-on check before it
> ships.** The contact sheet (`scripts/build-photo-sheet.py`) exists for exactly
> that, and should be regenerated whenever images change.

---

## 6. Other changes made

**Identify page layout fixed.** The crop tiles were laid out six across on
desktop, which with eight crops left the last two hanging on the left. They are
now **four on top and four below, centred**. Narrow screens get two across,
which is also balanced.

**A back link on every page.** Added in `js/nav.js` in one place rather than
copied into six files, so it can never fall out of step. Pest pages return to the
gallery, or to Identify if the page was reached from there.

**An optional "Telling it apart from a similar pest" panel.** Reading the RHS
wireworm page gave a genuinely useful distinction — wireworm tunnels run
straight through a tuber, while slug damage leaves small openings leading to
cavities. Added to both pest pages as advice, deliberately **not** as a tick-box
symptom, so it does not affect matching.

**Documentation corrected.** `matching-rules.md` described two match levels when
the code had three, and its worked example did not match the real output.
`README.md` claimed 17 tests when there were 25. All corrected.

---

## 7. What the tests caught, and what they now guard

The tests are not decoration. Going from 17 to 30 was driven by real faults:

- **A crop-tile bug.** The Identify page built tiles from the icon list instead
  of the crop list, so five crops had pests but could not be chosen. A crop
  nobody can pick is a pest nobody can find.
- **Two stale expectations.** One asserted an old reason string; another still
  expected "Medium" for a search the rewritten rules correctly return "Low" for.
- **Nine failures when the dataset changed** — the correct outcome. They caught
  every place where documentation and tests still described the old data.

Tests added since then guard the integrity rules directly: that the look-alike
note is never used as a matchable symptom, that only two pests carry one, that
result order is stable across runs, and that a vague single symptom can never
reach a High match.

---

## 8. Verification performed

Every page was opened and checked on 14 October:

| Check | Result |
| --- | --- |
| All 9 pages load, one `<h1>` each on content pages | Pass |
| No broken images anywhere | Pass |
| Every pest page shows its photograph | Pass, 12 of 12 |
| Alt text present on all content images | Pass |
| Back link present on all pages except the home page | Pass |
| Unknown pest id shows "Pest not found" rather than breaking | Pass |
| No horizontal scrolling | Pass |
| Crop tiles: 4 top, 4 bottom, centred | Pass |
| Automated tests | 30 passed, 0 failed |

**One bug found and fixed during verification.** The "Pest not found" page carried
`<img src="">`. An empty `src` is treated by browsers as a broken image, so an
unknown pest id showed a broken image icon. The image figure now starts hidden in
the HTML and `pest-page.js` only reveals it once a pest has actually been found.

**One minor item found and not yet fixed:** on pest pages there are two `<h1>`
elements in the DOM at once — one in the visible panel and one in the hidden
"not found" panel. Only one is ever seen, but a screen reader could encounter
both. Changing the hidden one to an `<h2>` would fix it. Left alone for now
because it alters heading size and should be a deliberate decision.

---

## 9. Open items, by owner

| Item | Owner | Note |
| --- | --- | --- |
| Spinach has only one pest | Olu | Needs a working source. RHS spinach page names no second insect pest. |
| Wireworms cannot reach High | Olu | Accepted deliberately. A sourced third symptom would fix it; none exists yet. |
| Confirm photo credit lines on UMass and Queensland images | Ike | Their pages loaded only partly when checked. |
| Summaries and management tips need a read-through | Olu | Sourced facts are verified; our own wording is not. |
| Hidden `<h1>` on pest pages | Shafaqat | Deliberate decision needed before changing heading levels. |
| Second `<h1>` check across other templates | Kamran | Only found on pest pages so far. |
| Branch protection on `main` | Marvis | The single highest-value GitHub setting. See github-guide.md (docs/github-guide.md). |
| Automated browser script re-run | Marvis | Last full run was 11 Oct, before all these changes. |

---

## 10. Next steps, in priority order

1. **Get the repository on GitHub.** Everything is ready: 75 files, 1.04 MB, no
   secrets, `.gitignore` excludes the study notes. Follow
   github-guide.md (docs/github-guide.md).
2. **Everyone works on a branch and opens a pull request** — not straight to
   `main`. Turn on branch protection first so it is enforced.
3. **Add the other four members as collaborators.**
4. **Olu to verify spinach and the pest data** using the "To verify" sheet in the
   workbook.
5. **Re-run the manual test checklist** — it was written for an earlier dataset.
6. **Ike to look at the photo contact sheet** and confirm each image shows the
   right pest.

---

## 11. Where everything is

| Document | What it covers |
| --- | --- |
| **[image-credits.md](image-credits.md)** | Every photograph: author, licence, citation, and why rejected candidates were rejected |
| **matching-rules.md (docs/matching-rules.md)** | How a search becomes a match, with worked examples |
| **data-fields.md (docs/data-fields.md)** | What every field in the data file means |
| **page-contract.md (docs/page-contract.md)** | The ids and classes the scripts expect in the HTML |
| **test-results.md (docs/test-results.md)** | Test coverage and what the tests have caught |
| **github-guide.md (docs/github-guide.md)** | GitHub from zero, for anyone new |
| **manual-test-checklist.md (docs/manual-test-checklist.md)** | Checks a machine cannot judge |
| `Pest2Veg_UK_12_pests_v3.xlsx` | Data workbook: pest–crop and pest–symptom grids, a reference number in every cell, all 21 sources |
| `js/pests-data.js` | The live data the website actually loads |

---

## 12. Honest summary

The dataset is now sourced and checkable, and every plant–pest claim traces to a
numbered reference. Every pest has a real photograph with a verified licence.
The matching logic is documented accurately, and tests now fail if the
documentation drifts from the code.

What it is not: complete. Eight crops and twelve pests cover common UK pests,
not all of them. Spinach is thin. Six of twelve pests can never be a High match
because they have two symptoms or fewer. The photographs are licensed, but a
human still needs to confirm each one shows the right insect — as three of ours
demonstrated.
