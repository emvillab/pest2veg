# Pest2Veg ÔÇö Technical Overview and Testing Summary

**Student:** Shafaqat Ali  
**Project:** Pest2Veg, a pest information web app for UK growers  
**Module:** CPU4106-20C Group Project  
**SDG:** 2 ÔÇö Zero Hunger

---

## 1. What the site does

Pest2Veg is a front-end educational prototype. A grower chooses the affected crop, the damage they can see and where the damage appears. The site then lists possible pest matches. It does not diagnose a pest, so every page reminds users to confirm with a trusted source.

It covers six crops (tomato, cabbage, potato, lettuce, pepper, cucumber) and eleven pests. It uses plain HTML, CSS and JavaScript, with no build step or server.

## 2. Site structure

| Page | Purpose |
|---|---|
| `index.html` | Home page and how it works |
| `gallery.html` | Browse every pest, filter by crop or pest |
| `identify.html` | Three-step identification: crop, damage, location |
| `pest.html?id=ÔÇª` | Details for one pest, built from the data |
| `resources.html` | Links to Garden Organic, AHDB and the RHS |
| `about.html` | Purpose, how identification works, limitations |

## 3. How identification works

1. **The grower clicks a crop picture.** The damage list is built from the pests that affect that crop.
2. **The grower picks the damage.** The location list is built only from pests that match both the crop and the damage, so no choice can lead to an empty result.
3. **The grower presses Find Possible Pest.** The site shows every pest whose crops, damage and locations all contain the three choices.

### Potato-only words

Slugs and Snails attack cabbage, lettuce, cucumber and potato, and their record includes *"Tunnels in potato tubers"* and *"Tubers"*. One helper function, `allowed()`, hides these two words for every crop except Potato. This is applied to the damage list, the location list and the final matching.

### Known limitation

Damage and location are checked **separately**. A pest can match a damage and a location that it does not show together. This is acceptable for a prototype and is stated on the About page.

## 4. Data structure

Each pest in `data.js` is one record. To add a pest, copy a block, change the words and add a photo to `assets/pests/photos/`.

| Field | Meaning |
|---|---|
| `id` | Lowercase, no spaces; used in the web address |
| `name`, `scientific`, `type` | Common name, scientific name and kind of pest |
| `crops` | Crops the pest affects |
| `damage` | Visible signs, used in step 2 |
| `locations` | Where the damage appears, used in step 3 |
| `summary`, `management` | Short description and prevention advice |
| `image`, `source` | Photo path and research source |

## 5. Review changes made

| Change | Reason |
|---|---|
| Tubers hidden for non-potato crops | A cabbage grower was offered "Tubers" as a damage location |
| Result images styled | Pest photos in the results had no size rule and appeared full size |
| Button colour darkened to `#2e6b34` | White on the old green was about 2.2:1, below the 4.5:1 accessibility minimum |
| Focus outlines added | Buttons, links and drop-downs had no visible keyboard focus |
| Results announced to screen readers | `aria-live` added to the results area |
| Crop tiles use `aria-pressed` | Shows which crop is selected to assistive technology |
| Tile photos given empty `alt` text | The crop name is already in the text under the picture |
| "Search pests" relabelled "Pest" | It is a drop-down, not a search box |
| `pest-details.html` removed | Old static mockup replaced by `pest.html` |
| `resources.html` finished and linked in every nav | Fixed logo path, replaced dead `#` links with the three research sources |
| README rewritten | Now matches the project name, files and data format |

## 6. Testing

The matching logic was checked by running `data.js` and `app.js` outside the browser. The results below also make a good manual test script in the browser.

| Test | Expected | Result |
|---|---|---|
| Cabbage, Holes in leaves: locations | Leaves, Soil (no Tubers) | **Pass** |
| Potato, Holes in leaves: locations | Leaves, Soil, Tubers | **Pass** |
| Cabbage, Holes in leaves, Tubers | No match | **Pass** |
| Potato, Tunnels in tubers, Tubers | Slugs and Snails, Wireworms | **Pass** |
| Cabbage, Holes in leaves, Leaves | Slugs and Snails, Cabbage Caterpillars | **Pass** |

### Still to check in a browser

- All 11 pest photos and 6 crop photos load from the `assets` folder.
- Every page works at phone width and with the keyboard only.
- Gallery filters, pest links and the "Pest not found" message behave correctly.

## 7. Sources

- **Garden Organic**, Pests and Diseases ÔÇö <https://www.gardenorganic.org.uk/expert-advice/garden-management/pests-and-diseases>
- **AHDB**, Sources, Spread and Survival of Pathogens, Pests and Weeds in Ornamental Crops ÔÇö <https://horticulture.ahdb.org.uk/knowledge-library/sources-spread-survival-pathogens-pests-weeds-ornamentals>
- **RHS**, 2020's Top Garden Pests and Diseases Revealed ÔÇö <https://www.rhs.org.uk/science/articles/2020-pests-and-diseases>
