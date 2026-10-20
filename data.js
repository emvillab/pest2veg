const pests = [

    {
        id: 'aphids',
        name: 'Aphids',
        scientific: 'Aphidoidea (superfamily)',
        type: 'Insect',

        crops: [
            'Tomato',
            'Lettuce',
            'Pepper',
            'Cucumber'],

        damage: [
            'Small insects on leaves',
            'Sticky honeydew',
            'Curled or distorted leaves',
            'Yellowing leaves',
            'Stunted growth',
            'Sooty mould'],

        locations: [
    'Leaves',
    'Undersides of leaves',
            'New growth'],

        summary: 'Small sap-sucking insects that feed on leaves and young growth. Large colonies can cause distorted growth and produce sticky honeydew.',

        management: [
            'Check leaves, especially their undersides and new growth, regularly for developing colonies.',
            'Encourage natural predators such as ladybirds, lacewings and hoverflies.',
            'Small colonies can sometimes be removed by hand or carefully washed off with water.'],

        image: 'assets/pests/photos/aphids.jpg',
        source: 'RHS – Aphids'
    },

    {
        id: 'mealy-cabbage-aphid',
        name: 'Mealy Cabbage Aphid',
        scientific: 'Brevicoryne brassicae',
        type: 'Insect',

        crops: [
            'Cabbage'],

        damage: [
            'Pale or yellowing areas on leaves',
            'Crumpled or distorted foliage',
            'Stunted young plants'],

        locations: [
            'Leaves',
            'Developing growth'],

        summary: 'A sap-feeding aphid found on cabbage and other brassicas. It has a distinctive greyish-white, waxy appearance and can cause distorted growth.',

        management: [
            'Check plants regularly for developing colonies.',
            'Encourage natural enemies such as ladybirds, hoverflies and parasitic wasps.'],

        image: 'assets/pests/photos/mealy-cabbage-aphid.jpg',
        source: 'AHDB – Biology and management of the mealy cabbage aphid'
    },

    {
        id: 'glasshouse-whitefly',
        name: 'Glasshouse Whitefly',
        scientific: 'Trialeurodes vaporariorum',
        type: 'Insect',

        crops: [
            'Tomato',
            'Pepper',
            'Cucumber'],

        damage: [
            'Small white insects on leaves',
            'Sticky honeydew',
            'Black sooty mould',
            'Yellowing leaves'],

        locations: [
            'Leaves',
            'Undersides of leaves'],

        summary: 'Tiny white sap-feeding insects commonly found on protected crops. Their feeding can weaken plants and the honeydew they produce can lead to sooty mould.',

        management: [
            'Check the undersides of leaves regularly for adults and developing colonies.',
            'Remove badly affected leaves where practical.',
            'Keep growing areas clean and control weeds that may harbour whiteflies.'],

        image: 'assets/pests/photos/glasshouse-whitefly.jpg',
        source: 'RHS – Glasshouse whitefly'
    },

    {
        id: 'cabbage-caterpillars',
        name: 'Cabbage Caterpillars',
        scientific: 'Pieris brassicae, Pieris rapae, Mamestra brassicae',
        type: 'Insect',

        crops: [
            'Cabbage'],

        damage: [
            'Holes in leaves',
            'Chewed outer foliage',
            'Damage to inner leaves or the cabbage heart',
            'Caterpillars or droppings may be visible'],

        locations: [
            'Outer leaves',
            'Inner leaves',
            'Cabbage heart'],

        summary: 'The caterpillars of several butterfly and moth species feed on cabbage and other brassicas. Their appearance and feeding behaviour can vary.',

        management: [
            'Check plants regularly for eggs, caterpillars and fresh feeding damage.',
            'Fine-mesh crop covers can help protect plants from egg-laying adults when used correctly.'],

        image: 'assets/pests/photos/cabbage-caterpillars.jpg',
        source: 'RHS – Cabbage caterpillars'
    },

    {
        id: 'cabbage-root-fly',
        name: 'Cabbage Root Fly',
        scientific: 'Delia radicum',
        type: 'Insect',

        crops: [
            'Cabbage'],

        damage: [
            'Poor growth',
            'Wilting',
            'Severe attacks can kill young plants',
            'Root damage may be present even when above-ground symptoms are limited'],

        locations: [
            'Roots',
            'Soil around the base of the plant'],

        summary: 'A brassica pest whose larvae feed mainly on roots below ground. Young and recently transplanted cabbage plants are particularly vulnerable.',

        management: [
            'Monitor young plants carefully.',
            'Fine-mesh crop covers can help reduce egg laying.',
            'Inspect roots when unexplained wilting or poor growth occurs.'],

        image: 'assets/pests/photos/cabbage-root-fly.jpg',
        source: 'AHDB – Cabbage root fly biology and management in brassica crops'
    },

    {
        id: 'red-spider-mite',
        name: 'Red Spider Mite',
        scientific: 'Tetranychus urticae',
        type: 'Mite',

        crops: [
            'Tomato',
            'Pepper',
            'Cucumber'],

        damage: [
            'Pale or mottled leaves',
            'Fine webbing',
            'Early leaf drop'],

        locations: [
            'Leaves',
            'Undersides of leaves'],

        summary: 'Tiny mites that feed on leaves, causing pale mottling and fine webbing, especially on plants grown under cover.',

        management: [
            'Check the undersides of leaves regularly for mottling, mites and fine webbing.',
            'Maintain good plant care and avoid drought stress.',
            'Suitable biological controls can be used in protected growing environments.'],

        image: 'assets/pests/photos/red-spider-mite.jpg',
        source: 'RHS – Glasshouse red spider mite'
    },

    {
        id: 'thrips',
        name: 'Thrips',
        scientific: 'Thysanoptera (order)',
        type: 'Insect',

        crops: [
            'Tomato',
            'Cucumber',
            'Pepper'],

        damage: [
            'Silvery patches',
            'Mottled leaves',
            'Curled or distorted leaves',
            'Damaged or distorted flowers'],

        locations: [
            'Leaves',
            'Flowers',
            'Buds and new growth'],

        summary: 'Small slender insects that feed on plant tissue and can cause silvery patches, distorted growth and damage to flowers.',

        management: [
            'Check flowers, buds and young leaves regularly for signs of thrips.',
            'Remove badly damaged growth where practical.',
            'Encourage or use suitable biological controls where appropriate.'],

        image: 'assets/pests/photos/thrips.jpg',
        source: 'RHS – Thrips'
    },

    {
        id: 'slugs-and-snails',
        name: 'Slugs and Snails',
        scientific: 'Gastropoda (class)',
        type: 'Mollusc',

        crops: [
            'Cabbage',
            'Potato',
            'Lettuce',
            'Cucumber'],

        damage: [
            'Holes in leaves',
            'Slime trails',
            'Tunnels in potato tubers'],

        locations: [
            'Leaves',
            'Soil',
            'Tubers'],

        summary: 'Molluscs that feed mainly at night or in damp conditions, leaving irregular holes in leaves, slime trails and sometimes damage to potato tubers.',

        management: [
            'Check vulnerable plants after rain, in damp weather or after dark.',
            'Reduce unnecessary hiding places such as weeds and plant debris near vulnerable plants.',
            'Protect young plants and seedlings where practical.',
            'Water in the morning rather than evening to reduce damp conditions overnight.'],

        image: 'assets/pests/photos/slugs-and-snails.jpg',
        source: 'RHS – Slugs and snails'
    },

    {
        id: 'wireworms',
        name: 'Wireworms',
        scientific: 'Agriotes (click beetle larvae)',
        type: 'Insect',

        crops: [
            'Potato'],

        damage: [
            'Tunnels in potato tubers'],

        locations: [
            'Tubers',
            'Soil'],

        summary: 'Click-beetle larvae that live in soil and can tunnel into potato tubers.',

        management: [
            'Inspect tubers when lifting the crop.',
            'Use crop rotation and appropriate soil management.'],

        image: 'assets/pests/photos/wireworms.jpg',
        source: 'RHS – Wireworms'
    },

    {
        id: 'potato-cyst-nematodes',
        name: 'Potato Cyst Nematodes',
        scientific: 'Globodera rostochiensis and G. pallida',
        type: 'Nematode',

        crops: [
            'Potato',
            'Tomato'],

        damage: [
            'Yellowing leaves',
            'Wilting',
            'Stunted growth'],

        locations: [
            'Roots',
            'Whole plant'],

        summary: 'Microscopic plant-parasitic nematodes that affect roots and can cause weak, yellow or wilting plants.',

        management: [
            'Use crop rotation.',
            'Avoid moving potentially infested soil to clean ground.'],

        image: 'assets/pests/photos/potato-cyst-nematodes.jpg',
        source: 'RHS – Potato cyst nematodes'
    },

    {
        id: 'cutworms',
        name: 'Cutworms',
        scientific: 'Agrotis segetum and Noctua pronuba',
        type: 'Insect',

        crops: [
            'Lettuce',
            'Potato'],

        damage: [
            'Wilting',
            'Stem cut at soil level'],

        locations: [
            'Stem base',
            'Soil'],

        summary: 'Soil-living caterpillars that can feed around the base of young plants.',

        management: [
            'Check around damaged seedlings and stem bases.',
            'Remove caterpillars found around affected plants.'],

        image: 'assets/pests/photos/cutworms.jpg',
        source: 'RHS – Cutworms'
    }

];

const crops = [
    'Tomato',
    'Cabbage',
    'Potato',
    'Lettuce',
    'Pepper',
    'Cucumber'
];