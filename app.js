function byId(id) {
    return document.getElementById(id);
}


function pestLink(pest) {
    return `pest.html?id=${encodeURIComponent(pest.id)}`;
}


function buildGallery() {
    const grid = byId('pest-grid');

    if (!grid) {
        return;
    }

    const cropFilter = byId('crop-filter');

    cropFilter.innerHTML =
        '<option value="">All crops</option>' +
        crops.map(c => `<option>${c}</option>`).join('');


    function showPests() {
        const search = byId('search').value
            .toLowerCase()
            .trim();

        const crop = cropFilter.value;

        const shown = pests.filter(p =>
            (!crop || p.crops.includes(crop)) &&
            (!search || p.name.toLowerCase().includes(search))
        );

        byId('gallery-count').textContent =
            `${shown.length} pest${shown.length === 1 ? '' : 's'} found`;

        grid.innerHTML = shown.map(p => `

            <article class="card">

                <img
                    src="${p.image}"
                    alt="${p.name}">

                <div class="card-body">

                    <h2>${p.name}</h2>

                    <p>
                        ${p.crops.join(', ')}
                    </p>

                    <a
                        class="button"
                        href="${pestLink(p)}">
                        View Pest
                    </a>

                </div>

            </article>

        `).join('');
    }


    byId('search').addEventListener(
        'input',
        showPests
    );

    cropFilter.addEventListener(
        'change',
        showPests
    );

    showPests();
}


function buildIdentifier() {
    if (!byId('crop')) {
        return;
    }

    const cropOptions = byId('crop-options');

    const cropImages = {
    Tomato: 'assets/crops/tomato.jpg',
    Cabbage: 'assets/crops/cabbage.jpg',
    Potato: 'assets/crops/potato.jpg',
    Lettuce: 'assets/crops/lettuce.jpg',
    Pepper: 'assets/crops/pepper.jpg',
    Cucumber: 'assets/crops/cucumber.jpg'
};

cropOptions.innerHTML = crops.map(c => `
    <button
        type="button"
        class="crop-option"
        data-crop="${c}">
        <img src="${cropImages[c]}" alt="${c}">
        <span>${c}</span>
    </button>
`).join('');

cropOptions.addEventListener('click', (event) => {
    const button = event.target.closest('.crop-option');

    if (!button) {
        return;
    }

    cropOptions.querySelectorAll('.crop-option').forEach(option => {
    option.classList.remove('selected');
});

button.classList.add('selected');

    byId('crop').value = button.dataset.crop;

byId('damage-group').hidden = false;
byId('location-group').hidden = true;
byId('find-pest').hidden = true;

updateDamage()
});


    function updateDamage() {
        const crop = byId('crop').value;

        const relevant = pests.filter(p =>
            p.crops.includes(crop)
        );

        const damages = [
            ...new Set(
                relevant.flatMap(p =>
                    p.damage.filter(d =>
                        crop === 'Potato' || d !== 'Tunnels in potato tubers'
                    )
                )
            )
        ].sort();

        byId('damage').innerHTML =
            '<option value="">Choose damage</option>' +
            damages.map(d => `<option>${d}</option>`).join('');

        byId('location').innerHTML =
            '<option value="">Choose damage first</option>';

        byId('results').innerHTML = '';
    }


    function updateLocation() {
        const crop = byId('crop').value;
        const damage = byId('damage').value;
        byId('location-group').hidden = false;

        const relevant = pests.filter(p =>
            p.crops.includes(crop) &&
            p.damage.includes(damage)
        );

        const locations = [
            ...new Set(
                relevant.flatMap(p =>
                    p.locations.filter(l =>
                        crop === 'Potato' || l !== 'Tubers'
                    )
                )
            )
        ].sort();

        byId('location').innerHTML =
            '<option value="">Choose location</option>' +
            locations.map(l => `<option>${l}</option>`).join('');

        byId('results').innerHTML = '';
    }


    byId('crop').addEventListener(
        'change',
        updateDamage
    );

    byId('damage').addEventListener(
        'change',
        updateLocation
    );

    byId('location').addEventListener('change', () => {
    byId('find-pest').hidden = !byId('location').value;
    byId('results').innerHTML = '';
});

    byId('find-pest').addEventListener('click', () => {
        const crop = byId('crop').value;
        const damage = byId('damage').value;
        const location = byId('location').value;

        const results = byId('results');


        if (!crop || !damage || !location) {
            results.innerHTML =
                '<div class="message">Please choose a crop, damage and damage location.</div>';

            return;
        }


        const matches = pests.filter(p =>
            p.crops.includes(crop) &&
            p.damage.includes(damage) &&
            p.locations.includes(location)
        );


        if (!matches.length) {
            results.innerHTML =
                '<div class="message"><strong>No direct match found.</strong><br>Try another damage description or browse the Pest Gallery.</div>';

            return;
        }


        results.innerHTML = `

            <div class="message">

                <strong>
                    Possible pest match${matches.length > 1 ? 'es' : ''}
                </strong>

                <br>

                These are possible matches, not a diagnosis.

            </div>


            <div class="result-list">

                ${matches.map(p => `

                    <div class="result">

                        <img
                            src="${p.image}"
                            alt="${p.name}">

                        <div class="result-info">

                            <h3>${p.name}</h3>

                            <p>
                                ${p.summary}
                            </p>

                            <a
                                class="button"
                                href="${pestLink(p)}">
                                View Pest Information
                            </a>

                        </div>

                    </div>

                `).join('')}

            </div>

        `;
    });
}


function buildPestPage() {
    if (!byId('pest-detail')) {
        return;
    }

    const id =
        new URLSearchParams(window.location.search).get('id');

    const pest = pests.find(p =>
        p.id === id
    );


    if (!pest) {
        byId('pest-detail').innerHTML =
            '<div class="message">Pest not found. Please return to the Pest Gallery.</div>';

        return;
    }


    document.title =
        `${pest.name} | Pest2Veg`;


    byId('pest-detail').innerHTML = `

        <div>

            <img
                src="${pest.image}"
                alt="${pest.name}">

        </div>


        <div>

            <p>
                <strong>${pest.type}</strong>
            </p>

            <h1>${pest.name}</h1>

            <p>
                <em>${pest.scientific}</em>
            </p>

            <p>
                ${pest.summary}
            </p>

            <p>
                <strong>Affected crops:</strong>
                ${pest.crops.join(', ')}
            </p>

        </div>

    `;


    byId('damage-info').innerHTML =
        '<ul>' +
        pest.damage.map(x => `<li>${x}</li>`).join('') +
        '</ul>';

    byId('location-info').innerHTML =
        '<ul>' +
        pest.locations.map(x => `<li>${x}</li>`).join('') +
        '</ul>';

    byId('management-info').innerHTML =
        '<ul>' +
        pest.management.map(x => `<li>${x}</li>`).join('') +
        '</ul>';

    byId('source-info').textContent =
        pest.source;
}

function buildMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (!menuToggle || !nav) {
        return;
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');

        const isOpen = nav.classList.contains('open');

        menuToggle.setAttribute('aria-expanded', isOpen);  

        menuToggle.textContent = isOpen ? '✕' : '☰';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
    buildIdentifier();
    buildPestPage();
    buildMobileMenu();
});