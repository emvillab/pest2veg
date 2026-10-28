# How the Pest2Veg Code Works: A Beginner's Guide

Oct 17, 2026 · @sakis

## About this guide

This guide explains every piece of logic in the Pest2Veg website, starting from zero. It assumes you have never written JavaScript. Each section builds on the one before, so read it in order the first time.

The guide covers the code in data.js and app.js as they stand after our fixes, and the three pages that use them: Gallery, Identify and Pest. Code samples are shown in boxes. After each one, a plain-English walk-through says what every line does and why.

Note: your team workbook describes a simpler design where a grower taps a crop and sees a card for every pest on it. The code in this guide is the current three-step Identify design. Most of what you learn here (data, loops, filtering, building HTML) carries over to the cards design unchanged.

## 1. The big picture

The website is built from three kinds of file, and each kind has one job. The HTML files are the skeleton, CSS is the paint, and JavaScript is the brain. JavaScript is the only one that makes decisions.

| File | Kind | Its one job |
| --- | --- | --- |
| index.html, gallery.html, identify.html, pest.html, resources.html, about.html | HTML | The structure of each page: headings, empty boxes, dropdowns |
| style.css | CSS | How everything looks: colours, spacing, layout |
| data.js | JavaScript | Stores all the information: the pests and the crops |
| app.js | JavaScript | Reads the information and fills the pages in |

The key idea is that **the HTML pages start nearly empty**. For example, gallery.html contains a box with id="pest-grid" and nothing inside it. When the page opens, app.js runs, reads the pests from data.js, builds the cards and puts them in that box. The words you see are not typed into the HTML. They are created by code.

### Why the order of the script tags matters

The three pages that use JavaScript end with these two lines:
```html
<script src="data.js"></script>
<script src="app.js"></script>
```

The browser runs them top to bottom. data.js must come first because app.js uses the names pests and crops, and those names do not exist until data.js has run. Swap the lines and the site breaks with an error like "pests is not defined".

The scripts sit at the end of the page, not the start, so that the empty boxes already exist when the code goes looking for them.

### One file, five pages

app.js is shared by several pages, but each page only needs part of it. So the file is split into three builder functions:
- buildGallery() for the Gallery page
- buildIdentifier() for the Identify page
- buildPestPage() for the Pest page

All three are called at the very bottom of app.js. Each one starts by checking whether its own page is open, and quietly stops if not. For example, on the Identify page buildGallery() looks for the pest-grid box, does not find it, and stops. (The Home, About and Resources pages do not load app.js at all, because they need no logic.) That one early check is what lets a single file serve every page.

## 2. JavaScript basics you need

This section teaches only the JavaScript ideas the site actually uses. There are eight.

### 2.1 Variables: named boxes

A variable is a named box that holds a value. You make one with var.
```javascript
var chosenCrop = '';
var count = 0;
```

The first line makes a box called chosenCrop holding empty text. The second makes a box called count holding the number 0. Text goes in quotes and is called a **string**. The = sign means "put this value in the box". It does not mean "equals".

### 2.2 Lists (arrays)

A list holds several values in order, written in square brackets with commas between items.
```javascript
var crops = ['Tomato', 'Cabbage', 'Potato'];
```

Items are numbered from **0**, not 1. So crops[0] is 'Tomato' and crops.length is 3.

Two list tools appear all over the site. list.push('Fig') adds an item to the end. list.indexOf('Potato') returns the position of an item, or -1 if it is not there.

### 2.3 Records (objects)

A record groups related facts under labels. It is written in curly brackets, as label: value pairs.
```javascript
var pest = { id: 'aphids', name: 'Aphids', crops: ['Tomato', 'Pepper'] };
```

You read one fact with a dot: pest.name gives 'Aphids'. A value can itself be a list, as crops is here, so pest.crops[0] gives 'Tomato'.

### 2.4 Functions: reusable recipes

A function is a named set of steps you can run whenever you like.
```javascript
function byId(id) {
  return document.getElementById(id);
}
```

byId is the name. id in brackets is the **input** (called a parameter). return hands back the result. You run it by calling it: byId('pest-grid'). A function that finds nothing useful to give back simply stops with return;.

### 2.5 Loops: doing something for every item

```javascript
for (var i = 0; i < pests.length; i++) {
  var p = pests[i];
}
```

Read the bracket as three parts: start i at 0, keep going while i is less than the number of pests, and add 1 to i after each round (i++). Inside, pests[i] is the pest for this round. The loop visits every pest once. The site uses this pattern constantly.

Two words change a loop's flow. continue means "skip the rest of this round and go to the next one". return means "stop the whole function".

### 2.6 Decisions: if and else

```javascript
if (count === 1) {
  text = ' pest found';
} else {
  text = ' pests found';
}
```

The code in the first braces runs only when the bracket is true, otherwise the else part runs. Useful symbols:

| Symbol | Meaning | Example |
| --- | --- | --- |
| === | is exactly equal to | crop === 'Potato' |
| !== | is not equal to | word !== '' |
| && | and (both must be true) | cropOk && nameOk |
| \|\| | or (either may be true) | a \|\| b |
| ! | not (flips true and false) | !has(list, word) |

Beware: one = stores a value, three === compares two values. Mixing them up is the most common beginner bug.

### 2.7 Building text with +

Plus joins strings together, which is how the site assembles HTML.
```javascript
var html = '<li>' + 'Aphids' + '</li>';
```

That makes the string <li>Aphids</li>. The site builds whole cards this way, then hands the finished string to the page.

### 2.8 The page (the DOM) and events

The browser turns the HTML into a tree of objects you can reach from JavaScript. This tree is called the **DOM**. Four things matter:
- document.getElementById('x') finds the one element whose id is x.
- element.innerHTML = '...' replaces what is inside that element with new HTML.
- element.value reads what is chosen in a dropdown.
- element.textContent = '...' sets plain text, with no HTML.

An **event** is something the visitor does, such as a click or choosing from a dropdown. You tell the browser what to do when it happens:
```javascript
byId('find-pest').addEventListener('click', showMatches);
```

This says: when the element find-pest is clicked, run the function showMatches. Note there are no brackets after showMatches. You are handing over the function itself to be run later, not running it now.

## 3. data.js: how the information is stored

Everything the site knows lives in data.js. It holds no logic at all, only information. That is deliberate: to add a pest you change this file and nothing else.

### 3.1 The pests list

pests is a list of records, one per pest. Here is one, trimmed:
```javascript
var pests = [
  {
    id: 'wireworms',
    name: 'Wireworms',
    scientific: 'Agriotes (click beetle larvae)',
    type: 'Insect',
    crops: ['Potato'],
    damage: ['Tunnels in potato tubers'],
    locations: ['Tubers', 'Soil'],
    summary: 'Click-beetle larvae that live in soil ...',
    management: ['Inspect tubers when lifting the crop.', '...'],
    image: 'assets/pests/photos/wireworms.jpg',
    source: 'RHS - Wireworms'
  },
  { ...the next pest... }
];
```

The outer square brackets make the list. Each pair of curly brackets is one pest. Commas separate the pests and also separate the fields inside a pest.

| Field | What it holds | Used for |
| --- | --- | --- |
| id | A short code with no spaces | The web address, pest.html?id=wireworms |
| name | The common name | Headings, card titles, the pest dropdown |
| scientific, type | Scientific name and kind of pest | The Pest page |
| crops | A list of crops it attacks | Gallery filter and Identify step 1 |
| damage | A list of visible signs | Identify step 2 |
| locations | A list of places on the plant | Identify step 3 |
| summary, management | Description and advice | Cards, results and the Pest page |
| image, source | Photo path and where the facts came from | Cards and the Pest page |

The three fields crops, damage and locations drive the whole identification logic. Everything else is just text to display.

### 3.2 The crops list and the photo lookups

```javascript
var crops = ['Tomato', 'Cabbage', 'Potato', 'Lettuce', 'Pepper', 'Cucumber'];

var CROP_PHOTOS = {
  'Tomato': 'assets/crops/photos/tomato.jpg',
  'Potato': 'assets/crops/photos/potato.jpg'
};
```

crops is the master list of crops, used for the dropdown and the picture tiles. CROP_PHOTOS is a **lookup table**: an object where the label is a crop name and the value is a photo path. Writing CROP_PHOTOS['Potato'] gives 'assets/crops/photos/potato.jpg'. CROP_ICONS is a second lookup used only if a photo is missing.

### 3.3 Why the words must match exactly

The code compares words by exact spelling. If one pest says 'Tunnels in potato tubers' and another says 'Tunnels in Potato Tubers', the code treats them as two different damages. A single stray capital letter or space makes a match silently fail. The team workbook says the same: spelling matters.

## 4. The helper functions

At the top of app.js sit seven small functions. Everything else in the file is built from them, so learn these first.

### byId: find an element

```javascript
function byId(id) {
  return document.getElementById(id);
}
```

It is a shorter name for document.getElementById. byId('damage') returns the damage dropdown. If no such element exists on the page it returns null, which is how each page builder checks whether it is the right page.

### fillSelect: fill a dropdown

```javascript
function fillSelect(id, firstLabel, items) {
  var html = '<option value="">' + firstLabel + '</option>';
  for (var i = 0; i < items.length; i++) {
    html = html + '<option>' + items[i] + '</option>';
  }
  byId(id).innerHTML = html;
}
```

Three inputs: which dropdown, the first (blank) label, and the list of choices. It starts a string with the blank choice, loops through the list adding one <option> per item, then puts the finished string inside the dropdown. The blank option has value="", so "nothing chosen" reads as empty text. Many later checks rely on that.

### fillList: fill a bulleted list

The same idea as fillSelect, but it builds <ul><li>...</li></ul>. The Pest page uses it for signs, locations and management advice.

### has: is this word in the list?

```javascript
function has(list, word) {
  return list.indexOf(word) !== -1;
}
```

indexOf returns the position, or -1 when the word is absent. So "not equal to -1" means "it is in the list". has(['Tomato','Potato'], 'Potato') is true. You will see has in nearly every matching decision.

### addOnce: add without duplicates

```javascript
function addOnce(list, word) {
  if (!has(list, word)) {
    list.push(word);
  }
}
```

The ! means "not". So: if the word is not already in the list, add it. Without this, a dropdown would show "Leaves" three times when three pests share it.

### pestLink: build a pest's web address

```javascript
function pestLink(pest) {
  return 'pest.html?id=' + pest.id;
}
```

For Aphids this returns pest.html?id=aphids. Section 7 explains how the Pest page reads that.

### allowed: the potato-only rule

```javascript
function allowed(word, crop) {
  var potatoOnly = (word === TUBER_DAMAGE || word === TUBER_PLACE);
  return !potatoOnly || crop === 'Potato';
}
```

This answers one question: "may this word be offered for this crop?" The two special words are 'Tunnels in potato tubers' and 'Tubers'. For any other word the answer is always yes. For those two, the answer is yes only when the crop is Potato. Section 8 tells the story of why we needed it.

## 5. The Gallery page

The Gallery shows a card for every pest, with two dropdowns to narrow the list. All the logic is in buildGallery().

### Step 1: check we are on the right page

```javascript
if (!byId('pest-grid')) {
  return;
}
```

If there is no pest-grid box, this is not the Gallery, so stop.

### Step 2: fill the two dropdowns

```javascript
var names = [];
for (var i = 0; i < pests.length; i++) {
  names.push(pests[i].name);
}
fillSelect('crop-filter', 'All crops', crops);
fillSelect('search', 'All pests', names);
```

It first makes a list of just the pest names, by looping and pushing each name into names. Then it fills the crop dropdown from crops and the pest dropdown from names.

### Step 3: drawCards, the heart of the page

Inside buildGallery lives a smaller function, drawCards, which redraws the cards. It reads what the visitor has chosen and keeps only the pests that pass both filters.
```javascript
var crop = byId('crop-filter').value;
var name = byId('search').value;

for (var i = 0; i < pests.length; i++) {
  var p = pests[i];
  var cropOk = (crop === '' || has(p.crops, crop));
  var nameOk = (name === '' || p.name === name);
  if (cropOk && nameOk) {
    count++;
    html = html + '<article class="card"> ... </article>';
  }
}
```

The two test lines are the key idea, and each reads as "nothing chosen, **or** a real match":
- crop === '' is true when the visitor left "All crops" selected. An empty choice means no filter, so the pest passes automatically.
- has(p.crops, crop) is true when this pest's crop list contains the chosen crop.
- name === '' or p.name === name works the same way for the pest dropdown.

A pest gets a card only if cropOk && nameOk, which means it must pass both. The loop adds one card of HTML to the html string for each pest that passes, and adds 1 to count.

After the loop, two lines update the page:
```javascript
byId('gallery-count').textContent = count + (count === 1 ? ' pest found' : ' pests found');
byId('pest-grid').innerHTML = html;
```

The ? : is a short if-else called a **ternary**: if count is 1, use the first text, otherwise the second. That is why you see "1 pest found" but "4 pests found".

### Step 4: redraw whenever a dropdown changes

```javascript
byId('crop-filter').addEventListener('change', drawCards);
byId('search').addEventListener('change', drawCards);
drawCards();
```

The two listeners call drawCards each time the visitor picks something. The last line calls it once straight away, so the full gallery shows when the page first opens.

### Worked example

The visitor picks **Cabbage** and leaves the pest dropdown on "All pests". For each pest, cropOk asks "does its crop list include Cabbage?" and nameOk is true for everyone. The pests that pass are Slugs and Snails, Mealy Cabbage Aphid, Cabbage Caterpillars and Cabbage Root Fly. The page shows four cards and the text "4 pests found".

## 6. The Identify page

This is the most important part of the site. The visitor makes three choices in order, and the code shows the pests that match all three.
1. Click a **crop** picture.
1. Choose the **damage** they can see.
1. Choose **where** the damage is, then press the button.

The key design rule is that each choice only offers options that can still lead to a result. Step 2 is built from the chosen crop, and step 3 from the chosen crop and damage together. So the visitor can never reach a combination with no pests.

### 6.1 One remembered value

```javascript
var chosenCrop = '';
```

This box sits outside every function, so all functions can read and change it. It remembers which crop picture was clicked. An empty string means "none yet".

### 6.2 Setting up the page: buildIdentifier

After the usual page check, buildIdentifier() does four things once, when the page opens:
1. Draws the crop pictures, using drawCropTiles().
1. Fills both dropdowns with "Choose a crop first" and no choices, so they start locked.
1. Adds a click listener to the picture area.
1. Adds a change listener to the damage dropdown and a click listener to the button.

### 6.3 Drawing the crop pictures

```javascript
for (var i = 0; i < crops.length; i++) {
  var crop = crops[i];
  var photo = CROP_PHOTOS[crop];
  html = html + '<button type="button" class="crop-tile" data-crop="' + crop + '"> ... </button>';
}
```

For every crop it looks up the photo in the CROP_PHOTOS table, then builds a button containing the picture and the crop name. Inside the button is a ternary: if a photo exists, use it, otherwise use the plain drawing from CROP_ICONS. The attribute data-crop="Potato" stores the crop's name on the button, so the code can read it back later.

### 6.4 Handling a click: event delegation

```javascript
byId('crop-picker').addEventListener('click', function (event) {
  var tile = event.target.closest('.crop-tile');
  if (tile) {
    chooseCrop(tile.getAttribute('data-crop'));
  }
});
```

There is only one listener, on the whole picture area, instead of one per button. event.target is whatever the visitor actually clicked, which might be the photo or the words under it. closest('.crop-tile') climbs up from there to the nearest button. If a button was found, the code reads its data-crop label and passes it to chooseCrop. If the click landed on blank space, tile is empty and nothing happens. This trick is called **event delegation**.

### 6.5 Choice 1: chooseCrop

```javascript
function chooseCrop(crop) {
  chosenCrop = crop;
  fillSelect('damage', 'Choose damage', damageListFor(crop));
  fillSelect('location', 'Choose damage first', []);
  byId('results').innerHTML = '';
  // then mark the chosen tile and un-mark the others
}
```

In order, it remembers the crop, fills the damage dropdown with only the damage that crop's pests can show, locks the location dropdown again by emptying it, and clears any old results. The last part loops over all tiles. The one whose data-crop matches gets the chosen style and aria-pressed="true", and every other tile loses them. aria-pressed tells screen readers which button is selected.

Changing crop always resets the later steps. This stops the visitor keeping an old damage choice that no longer fits.

### 6.6 Building the damage list: damageListFor

```javascript
function damageListFor(crop) {
  var words = [];
  for (var i = 0; i < pests.length; i++) {
    var p = pests[i];
    if (!has(p.crops, crop)) {
      continue;
    }
    for (var d = 0; d < p.damage.length; d++) {
      if (allowed(p.damage[d], crop)) {
        addOnce(words, p.damage[d]);
      }
    }
  }
  words.sort();
  return words;
}
```

Read it as a story. Start with an empty list. Visit every pest. If this pest does not attack the chosen crop, continue skips it. Otherwise visit each of its damage words (this is a loop inside a loop, using d so it does not clash with i). Add each word, but only once, and only if allowed says that crop may see it. At the end, sort() puts the words in A to Z order, and the list is returned.

### 6.7 Choice 2: building the location list

```javascript
byId('damage').addEventListener('change', function () {
  var crop = chosenCrop;
  var damage = byId('damage').value;
  if (crop === '' || damage === '') {
    fillSelect('location', 'Choose damage first', []);
  } else {
    fillSelect('location', 'Choose location', locationListFor(crop, damage));
  }
  byId('results').innerHTML = '';
});
```

When the damage dropdown changes, the code reads both choices. If either is missing it locks the location box. Otherwise it fills it using locationListFor.

locationListFor(crop, damage) is the same pattern as damageListFor, with a stricter filter:
```javascript
if (!has(p.crops, crop) || !has(p.damage, damage)) {
  continue;
}
```

The || means "or", so a pest is skipped if it fails **either** test. Only pests that match both the crop and the damage contribute their locations. That is why every location offered really belongs to a pest that fits.

### 6.8 Choice 3: the button and findMatches

```javascript
function findMatches(crop, damage, location) {
  var found = [];
  for (var i = 0; i < pests.length; i++) {
    var p = pests[i];
    if (has(p.crops, crop) &&
        has(p.damage, damage) &&
        has(p.locations, location) &&
        allowed(damage, crop) &&
        allowed(location, crop)) {
      found.push(p);
    }
  }
  return found;
}
```

This is the final test. A pest is kept only if all five conditions are true: it attacks the crop, it shows the damage, it appears in the location, and neither of the two words is a potato-only word on the wrong crop. The && joins them, so one failure rules the pest out.

showMatches() runs when the button is pressed. It reads the three choices and then makes one of three decisions:
- **A choice is missing:** show "Please choose a crop, damage and damage location." and stop with return.
- **No pests found:** show "No direct match found" and a hint to try the Gallery.
- **One or more pests found:** loop through them, build a result block for each (photo, name, summary and a "View Pest Information" button), and show them under a note that these are possible matches, not a diagnosis. The heading says "match" for one pest and "matches" for several.

### 6.9 Worked example, start to finish

A grower has a potato crop with tunnelled tubers.

| Step | The grower does | The code does | Result |
| --- | --- | --- | --- |
| 1 | Clicks the Potato picture | chooseCrop('Potato') builds the damage list from Slugs and Snails, Wireworms, Potato Cyst Nematodes and Cutworms | Seven damage words offered, from Holes in leaves to Yellowing leaves |
| 2 | Picks Tunnels in potato tubers | locationListFor keeps only Slugs and Snails and Wireworms, then collects their locations | Leaves, Soil, Tubers |
| 3 | Picks Tubers and presses the button | findMatches tests every pest against all three choices | Slugs and Snails, and Wireworms |

The page then shows two result blocks, each with a photo, a summary and a link to the full Pest page.

## 7. The Pest page

There is only one pest.html file, yet it can show any of the pests. The web address tells it which one.

### The address carries the choice

Every link built by pestLink looks like pest.html?id=wireworms. Everything after the question mark is called the **query string**. It says "show the pest whose id is wireworms".

### buildPestPage step by step

```javascript
var query = new URLSearchParams(window.location.search);
var id = query.get('id');
```

window.location.search is the part of the address from the ? onward. URLSearchParams is a built-in tool that splits it up, and query.get('id') returns the text after id=, here 'wireworms'. If there is no id, it returns null.
```javascript
var pest = null;
for (var i = 0; i < pests.length; i++) {
  if (pests[i].id === id) {
    pest = pests[i];
  }
}
```

This searches the list. It starts with pest set to null (meaning "nothing yet"), then visits every pest and swaps in the one whose id matches.
```javascript
if (pest === null) {
  byId('pest-detail').innerHTML = '<div class="message">Pest not found. ...</div>';
  return;
}
```

If the loop found nothing, for example from a mistyped address, the page shows a friendly message and stops. Without this check, the next lines would crash trying to read the name of nothing.

When a pest is found, the rest fills the page:
- document.title = pest.name + ' | Pest2Veg' changes the text on the browser tab.
- One innerHTML assignment builds the photo, the type, the name, the scientific name, the summary and the affected crops. pest.crops.join(', ') turns the list into one string with commas between the items.
- fillList is called three times, to fill the signs, the locations and the management advice.
- textContent sets the source line.

The empty boxes were left in pest.html. This function is what fills them.

## 8. A real bug and its fix: the tuber problem

This is a true story from the project, and a good example of how logic bugs hide.

### The problem

The pest record for Slugs and Snails lists four crops: Cabbage, Potato, Lettuce and Cucumber. Its damage list includes "Tunnels in potato tubers" and its location list includes "Tubers". Those two words only make sense for potatoes. But the code built the damage and location lists from **every pest that attacks the crop**, with no check on the words themselves.

So a cabbage grower who chose "Holes in leaves" was offered "Tubers" as a place to look. Cabbages have no tubers.

### The first, partial fix

The damage list already skipped "Tunnels in potato tubers" for non-potato crops. A constant called TUBER_PLACE was even written down for the location list, but the code never used it. A declared-but-unused name like this is a warning sign: the intention was there, but the job was left half done.

### The full fix

We added one function, allowed(word, crop), and used it in three places:

| Where | What it protects |
| --- | --- |
| damageListFor | The damage dropdown never offers tuber damage to non-potato crops |
| locationListFor | The location dropdown never offers "Tubers" to non-potato crops |
| findMatches | Even if a wrong word got through, the final result still rejects it |

The third place is a safety net. Filtering the dropdowns and filtering the results are separate jobs, and doing both means one cannot silently undo the other.

### Proof it works

We tested the real code with data.js:

| Test | Before the fix | After the fix |
| --- | --- | --- |
| Locations for Cabbage with Holes in leaves | Leaves, Soil, Tubers | Leaves, Soil |
| Locations for Potato with Holes in leaves | Leaves, Soil, Tubers | Leaves, Soil, Tubers |
| Matches for Cabbage, Holes in leaves, Tubers | Slugs and Snails | No match |

Notice the second row. A good fix must not break the case that was already right, so potato still gets its tubers.

### The lesson

Test the **combinations**, not just each dropdown alone. Each dropdown looked fine by itself. The mistake only appeared when crop, damage and location were chosen together.

## 9. Limitations, and how to extend the site

### Known limitations

- **Damage and location are matched separately.** findMatches asks "does this pest have this damage anywhere?" and "does it have this location anywhere?". It never asks whether that damage appears in that location. A pest with damage A at place X and damage B at place Y would still match A at Y. This is acceptable for a prototype, and the About page says so.
- **No ranking.** Every match is treated equally. There is no score or percentage.
- **Exact spelling.** A typo in data.js silently breaks a match (see section 3.3).
- **The potato rule is a patch.** allowed handles two special words by name. A cleaner long-term design would store which crop each damage word belongs to.
- **Data may drift.** The team workbook has newer research, such as changed symptom wording. data.js must be updated by hand to match.
- **The site never checks that photos exist.** A wrong file name gives a broken image.

### How to add a pest

1. Open data.js and copy an existing pest block.
1. Change the id to something unique, lowercase, with no spaces.
1. Fill in the name, crops, damage, locations, summary, management and source. Reuse the exact existing wording for damage and location words wherever they mean the same thing, so they merge in the dropdowns.
1. Put the photo in assets/pests/photos/ and set image to its path.
1. Check the commas. Every field except the last needs one, and the pest blocks need commas between them.
1. Open the Gallery, then the Identify page, and test the new pest.

No change to app.js is needed. This is the benefit of keeping data and logic apart.

### How to add a crop

1. Add the crop's name to the crops list.
1. Add its photo path to CROP_PHOTOS, and its drawing path to CROP_ICONS.
1. Add the crop name to the crops list of every pest that attacks it.
1. Add the photo and the drawing to the assets folder.

The crop tiles, the Gallery filter and the Identify page all update automatically, because they are built from the crops list.

## Glossary and practice

### Glossary

| Term | Plain meaning |
| --- | --- |
| Variable | A named box holding a value |
| String | Text in quotes, like 'Potato' |
| Array (list) | Several values in order, in [ ], counted from 0 |
| Object (record) | Labelled facts in { }, read with a dot |
| Function | A named, reusable set of steps |
| Parameter | An input a function receives |
| Loop | Repeating steps for every item in a list |
| Boolean | A value that is only true or false |
| Ternary | A one-line if-else: test ? yes : no |
| DOM | The browser's tree of page elements that JavaScript can change |
| Element | One item on the page, like a dropdown or a box |
| Event | Something the visitor does, like a click |
| Event listener | An instruction to run a function when an event happens |
| Event delegation | One listener on a parent catching clicks on its children |
| innerHTML | The HTML inside an element, which code can replace |
| Query string | The ?id=... part of a web address |
| Global variable | A variable outside all functions, readable everywhere |
| Guard | An early check that stops a function if conditions are wrong |

### Practice exercises

Try these in a copy of the project, and open the page after each change to see the result. Answers are below.
1. In data.js, change 'Holes in leaves' on the Cabbage Caterpillars record to 'Holes in Leaves' (capital L). Open the Identify page for Cabbage. What changes in the damage dropdown, and why?
1. Which line of buildGallery makes the full gallery appear when the page first opens?
1. What does has(['Tomato','Potato'], 'Cabbage') return?
1. Why does locationListFor take two inputs but damageListFor take only one?
1. In showMatches, what happens if you delete the return; inside the first if?
1. Add a made-up pest called 'Test Bug' for Tomato, with one damage and one location, and find it using the Identify page.

### Answers

1. Two separate entries appear: "Holes in leaves" and "Holes in Leaves". The code compares exact spelling, so it treats them as different words. Cabbage grower results would also split between them.
1. The final line, drawCards();.
1. false, because indexOf returns -1 and -1 !== -1 is false.
1. The damage list depends only on the crop. The location list depends on the crop and the chosen damage, so it needs both.
1. The "Please choose..." message would show, but the function would carry on and run findMatches with an empty choice. It would then replace the message with "No direct match found", which is the wrong advice.
1. Copy a pest block, set a new id, put 'Tomato' in crops, and reuse an existing damage word such as 'Small insects on leaves' and location 'Leaves'. Click Tomato, pick that damage and location, and Test Bug appears beside the other matching pests.
