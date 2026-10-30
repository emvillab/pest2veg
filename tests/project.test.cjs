// Checks the actual project scripts with a small DOM substitute, not a browser.
// TODO cases execute and expose known defects without presenting them as passes.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');

function setup(ids = [], query = '') {
  const elements = new Map();
  function element(id) {
    return {
      id, value: '', textContent: '', hidden: false, events: {}, attributes: {},
      _html: '',
      get innerHTML() { return this._html; },
      set innerHTML(text) {
        this._html = text;
        // Native selects return to their first option when options are replaced.
        if (['damage', 'location', 'crop-filter'].includes(id)) {
          const option = text.match(/<option(?: value="([^"]*)")?>([^<]*)<\/option>/);
          this.value = option ? (option[1] ?? option[2]) : '';
        }
      },
      addEventListener(name, callback) { this.events[name] = callback; },
      setAttribute(name, value) { this.attributes[name] = String(value); },
      querySelectorAll() { return []; }
    };
  }
  ids.forEach(id => elements.set(id, element(id)));
  const context = vm.createContext({
    document: {
      getElementById: id => elements.get(id) ?? null,
      addEventListener() {}, querySelector() { return null; }, title: ''
    },
    window: { location: { search: query } }, URLSearchParams
  });
  vm.runInContext(read('data.js') + '\n' + read('app.js'), context);
  const pests = JSON.parse(vm.runInContext('JSON.stringify(pests)', context));
  const crops = JSON.parse(vm.runInContext('JSON.stringify(crops)', context));
  return { elements, context, pests, crops, run: code => vm.runInContext(code, context) };
}

function identifier() {
  const page = setup(['crop', 'crop-options', 'damage-group', 'location-group',
    'find-pest', 'damage', 'location', 'results']);
  page.run('buildIdentifier()');
  page.chooseCrop = crop => {
    page.selected = { dataset: { crop }, attributes: {},
      classList: { add() {} },
      setAttribute(k, v) { this.attributes[k] = String(v); }
    };
    page.elements.get('crop-options').events.click({ target: {
      closest: () => page.selected
    } });
  };
  page.damage = value => {
    page.elements.get('damage').value = value;
    page.elements.get('damage').events.change();
  };
  page.location = value => {
    page.elements.get('location').value = value;
    page.elements.get('location').events.change();
  };
  page.find = () => {
    page.elements.get('find-pest').events.click();
    return page.elements.get('results').innerHTML;
  };
  return page;
}

test('DATA-01: current scope is six crops and eleven distinct pest IDs', () => {
  const { pests, crops } = setup();
  assert.deepEqual(crops, ['Tomato', 'Cabbage', 'Potato', 'Lettuce', 'Pepper', 'Cucumber']);
  assert.equal(pests.length, 11);
  assert.equal(new Set(pests.map(p => p.id)).size, pests.length);
});
test('DATA-02: records contain the fields used by the application', () => {
  for (const pest of setup().pests) {
    for (const key of ['id', 'name', 'scientific', 'type', 'summary', 'image', 'source'])
      assert.ok(typeof pest[key] === 'string' && pest[key].trim(), `${pest.id}: ${key}`);
    for (const key of ['crops', 'damage', 'locations', 'management'])
      assert.ok(Array.isArray(pest[key]) && pest[key].length, `${pest.id}: ${key}`);
  }
});
test('DATA-03: every pest crop is selectable and every crop has coverage', () => {
  const { pests, crops } = setup();
  for (const pest of pests) for (const crop of pest.crops) assert.ok(crops.includes(crop));
  for (const crop of crops) assert.ok(pests.some(p => p.crops.includes(crop)));
});
test('ASSET-01: every pest and selectable crop has a local image', () => {
  const { pests, crops } = setup();
  for (const pest of pests) assert.ok(fs.existsSync(path.join(root, pest.image)), pest.image);
  for (const crop of crops) assert.ok(fs.existsSync(path.join(root, `assets/crops/${crop.toLowerCase()}.jpg`)));
});
test('LINK-01: local HTML resource links resolve to existing files', () => {
  for (const file of fs.readdirSync(root).filter(n => n.endsWith('.html'))) {
    for (const match of read(file).matchAll(/(?:href|src)="([^"]+)"/g)) {
      const link = match[1];
      if (/^(https?:|javascript:|#)/.test(link)) continue;
      assert.ok(fs.existsSync(path.join(root, link.split(/[?#]/)[0])), `${file}: ${link}`);
    }
  }
});
test('GALLERY-01: initial gallery renders all pests', () => {
  const p = setup(['pest-grid', 'crop-filter', 'search', 'gallery-count']);
  p.run('buildGallery()');
  assert.equal(p.elements.get('gallery-count').textContent, '11 pests found');
  assert.equal((p.elements.get('pest-grid').innerHTML.match(/<article /g) || []).length, 11);
});
test('GALLERY-02: name search ignores case and surrounding spaces', () => {
  const p = setup(['pest-grid', 'crop-filter', 'search', 'gallery-count']);
  p.run('buildGallery()');
  p.elements.get('search').value = '  WHITEFLY  ';
  p.elements.get('search').events.input();
  assert.equal(p.elements.get('gallery-count').textContent, '1 pest found');
  assert.match(p.elements.get('pest-grid').innerHTML, /Glasshouse Whitefly/);
});
test('GALLERY-03: name and crop filters combine; incompatible query gives zero', () => {
  const p = setup(['pest-grid', 'crop-filter', 'search', 'gallery-count']);
  p.run('buildGallery()');
  p.elements.get('search').value = 'whitefly';
  p.elements.get('crop-filter').value = 'Potato';
  p.elements.get('crop-filter').events.change();
  assert.equal(p.elements.get('gallery-count').textContent, '0 pests found');
  assert.equal(p.elements.get('pest-grid').innerHTML, '');
});
test('ID-01: crop tiles include all six crops', () => {
  const p = identifier();
  for (const crop of p.crops) assert.ok(p.elements.get('crop-options').innerHTML.includes(`data-crop="${crop}"`));
});
test('ID-02: potato stem-base case returns Cutworms', () => {
  const p = identifier(); p.chooseCrop('Potato'); p.damage('Stem cut at soil level'); p.location('Stem base');
  const html = p.find();
  assert.match(html, /Cutworms/); assert.doesNotMatch(html, /Wireworms/);
  assert.match(html, /not a diagnosis/);
});
test('ID-03: overlapping pepper honeydew case returns both possible pests', () => {
  const p = identifier(); p.chooseCrop('Pepper'); p.damage('Sticky honeydew'); p.location('Leaves');
  const html = p.find();
  assert.match(html, /Aphids/); assert.match(html, /Glasshouse Whitefly/);
  assert.equal((html.match(/class="result"/g) || []).length, 2);
});
test('ID-04: non-potato crop does not offer potato-tuber damage', () => {
  const p = identifier(); p.chooseCrop('Cucumber');
  assert.doesNotMatch(p.elements.get('damage').innerHTML, /Tunnels in potato tubers/);
});
test('ID-05: missing inputs are rejected by the handler', () => {
  const p = identifier(); assert.match(p.find(), /Please choose a crop/);
});
test('ID-06: forced unmatched combination is handled without a crash', () => {
  const p = identifier(); p.chooseCrop('Potato'); p.damage('Fine webbing'); p.location('Leaves');
  assert.match(p.find(), /No direct match found/);
});
test('ID-07: changing crop clears earlier results and hides later steps', () => {
  const p = identifier(); p.chooseCrop('Potato'); p.damage('Stem cut at soil level'); p.location('Stem base'); p.find();
  p.chooseCrop('Pepper');
  assert.equal(p.elements.get('results').innerHTML, '');
  assert.equal(p.elements.get('location-group').hidden, true);
  assert.equal(p.elements.get('find-pest').hidden, true);
});
test('ID-08: changing damage hides the Find button until a location is selected',
  { todo: 'BUG-01: updateLocation does not hide the previous Find button' }, () => {
    const p = identifier(); p.chooseCrop('Potato'); p.damage('Stem cut at soil level'); p.location('Stem base'); p.find();
    p.damage(''); assert.equal(p.elements.get('find-pest').hidden, true);
  });

for (const pest of setup().pests) {
  test(`DETAIL-${pest.id}: valid ID renders its own record and guidance`, () => {
    const p = setup(['pest-detail', 'damage-info', 'location-info', 'management-info', 'source-info'], `?id=${pest.id}`);
    p.run('buildPestPage()');
    assert.ok(p.elements.get('pest-detail').innerHTML.includes(pest.name));
    assert.equal(p.context.document.title, `${pest.name} | Pest2Veg`);
    assert.equal(p.elements.get('source-info').textContent, pest.source);
    assert.ok(p.elements.get('management-info').innerHTML.includes(pest.management[0]));
  });
}
test('DETAIL-invalid: unknown ID produces a useful message', () => {
  const p = setup(['pest-detail'], '?id=unknown'); p.run('buildPestPage()');
  assert.match(p.elements.get('pest-detail').innerHTML, /Pest not found/);
});
test('DETAIL-missing: absent ID produces a useful message', () => {
  const p = setup(['pest-detail']); p.run('buildPestPage()');
  assert.match(p.elements.get('pest-detail').innerHTML, /Pest not found/);
});
test('A11Y-01: selected crop exposes its selected state',
  { todo: 'BUG-02: selected class is visual only; use aria-pressed or radio semantics' }, () => {
    const p = identifier(); p.chooseCrop('Potato');
    assert.ok(p.selected.attributes['aria-pressed'] === 'true' || p.selected.attributes['aria-checked'] === 'true');
  });
test('A11Y-02: dynamic result and gallery count regions can announce updates',
  { todo: 'BUG-03: no live-region or status semantics on result/count containers' }, () => {
    assert.match(read('identify.html'), /<[^>]*id="results"[^>]*(?:aria-live=|role="status")/);
    assert.match(read('gallery.html'), /<[^>]*id="gallery-count"[^>]*(?:aria-live=|role="status")/);
  });
test('A11Y-03: button text has a contrast ratio of at least 4.5',
  { todo: 'BUG-04: white on #76b947 is approximately 2.39:1' }, () => {
    const css = read('style.css').match(/\.button\s*\{([^}]+)\}/)[1];
    const foreground = /color:\s*white/.test(css) ? 'ffffff' : css.match(/color:\s*#([0-9a-f]{6})/i)[1];
    const background = css.match(/background:\s*#([0-9a-f]{6})/i)[1];
    const lum = hex => hex.match(/../g).map(x => parseInt(x,16)/255)
      .map(x => x <= .04045 ? x/12.92 : ((x+.055)/1.055)**2.4)
      .reduce((sum,x,i) => sum+x*[.2126,.7152,.0722][i],0);
    const values = [lum(foreground),lum(background)].sort((a,b) => b-a);
    assert.ok((values[0]+.05)/(values[1]+.05) >= 4.5);
  });
