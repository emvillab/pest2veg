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
            'Sticky residue',
            'Curled or distorted leaves',
            'Stunted growth'],

        locations: [
            'Leaves',
            'New growth'],

        summary: 'Small sap-sucking insects that can distort new growth and leave sticky honeydew.',

        management: [
            'Check new growth regularly.',
            'Encourage natural predators such as ladybirds and hoverflies.'],

        image: 'assets/pests/aphids.jpg',
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
            'Small insects on leaves',
            'Yellowing leaves',
            'Curled or distorted leaves'],

        locations: [
            'Leaves',
            'New growth'],

        summary: 'A grey-white aphid that feeds on brassicas and can weaken young cabbage plants.',

        management: [
            'Check the underside of leaves.',
            'Remove badly infested leaves where practical.'],

        image: 'assets/pests/mealy-cabbage-aphid.jpg',
        source: 'RHS – Mealy cabbage aphid'
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
            'Small insects on leaves',
            'Sticky residue',
            'Black sooty mould'],

        locations: [
            'Leaves'],

        summary: 'Tiny white sap-feeding insects, commonly found on protected crops.',

        management: [
            'Check leaf undersides regularly.',
            'Remove badly affected leaves and keep plants well ventilated.'],

        image: 'assets/pests/glasshouse-whitefly.jpg',
        source: 'RHS – Glasshouse whitefly'
    },

    {
        id: 'cabbage-caterpillars',
        name: 'Cabbage Caterpillars',
        scientific: 'Pieris brassicae, P. rapae, P. napi',
        type: 'Insect',

        crops: [
            'Cabbage'],

        damage: [
            'Holes in leaves',
            'Caterpillars on leaves'],

        locations: [
            'Leaves'],

        summary: 'Caterpillars of cabbage white butterflies that feed on cabbage leaves.',

        management: [
            'Inspect plants and remove caterpillars where practical.',
            'Use suitable crop netting to reduce egg laying.'],

        image: 'assets/pests/cabbage-caterpillars.jpg',
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
            'Wilting',
            'Stunted growth',
            'Root damage'],

        locations: [
            'Roots',
            'Whole plant'],

        summary: 'The larvae feed on brassica roots, causing young plants to wilt and grow poorly.',

        management: [
            'Use insect-proof mesh or suitable brassica collars.',
            'Rotate brassica crops.'],

        image: 'assets/pests/cabbage-root-fly.jpg',
        source: 'RHS – Cabbage root fly'
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
            'Mottled leaves',
            'Fine webbing'],

        locations: [
            'Leaves'],

        summary: 'Tiny mites that cause pale mottling and fine webbing, especially under cover.',

        management: [
            'Check leaves for fine webbing.',
            'Maintain good plant care and avoid drought stress.'],

        image: 'assets/pests/red-spider-mite.jpg',
        source: 'RHS – Glasshouse red spider mite'
    },

    {
        id: 'thrips',
        name: 'Thrips',
        scientific: 'Thysanoptera (order)',
        type: 'Insect',

        crops: [
            'Tomato',
            'Cucumber'],

        damage: [
            'Silvery patches',
            'Mottled leaves',
            'Curled or distorted leaves'],

        locations: [
            'Leaves',
            'Flowers'],

        summary: 'Small slender insects that damage plant surfaces and can cause silvery patches.',

        management: [
            'Check flowers and young leaves.',
            'Remove badly damaged growth where practical.'],

        image: 'assets/pests/thrips.jpg',
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

        summary: 'Molluscs that usually feed in damp conditions and leave ragged holes or slime trails.',

        management: [
            'Check vulnerable plants after rain or after dark.',
            'Reduce unnecessary hiding places near young plants.'],

        image: 'assets/pests/slugs-and-snails.jpg',
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

        image: 'assets/pests/wireworms.jpg',
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

        image: 'assets/pests/potato-cyst-nematodes.jpg',
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

        image: 'assets/pests/cutworms.jpg',
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