// Album Pricing Configuration
const ALBUM_PRICING = {
    // Sheet types with pricing per sheet
    sheetTypes: {
        Layflat: {
            pricePerSheet: 120,
            description: 'Premium seamless binding'
        },
        NT: {
            description: 'Normal Type binding',
            paperTypes: {
                'Glossy': 80,
                'Matte': 85,
                'Lustre': 90,
                'Metallic': 100,
                'Fine Art': 110,
                'Canvas': 95
            }
        }
    },

    // Cover and Box (PAD) base costs
    coverBoxCosts: {
        'Hardcover': 500,
        'Softcover': 300,
        'Leather Jacket': 800,
        'Acrylic Cover': 1000,
        'Canvas Cover': 600
    },

    // Box finish types (no additional cost, included in cover)
    boxTypes: ['Regular', 'Matte', 'Glossy'],

    // Available colors
    colors: [
        { name: 'Charcoal Gray', hex: '#3D4F58' },
        { name: 'Warm Taupe', hex: '#8B7E74' },
        { name: 'Sage Green', hex: '#9CAF88' },
        { name: 'Navy Blue', hex: '#2C3E50' },
        { name: 'Sky Blue', hex: '#87CEEB' },
        { name: 'Caramel', hex: '#C68E5C' },
        { name: 'Mustard Yellow', hex: '#E1AD01' },
        { name: 'Stone Gray', hex: '#928E85' }
    ],

    // Available sizes by orientation
    sizes: {
        Square: ['12X12'],
        Portrait: ['8X12', '10X15', '12X18'],
        Landscape: ['12X8', '12X20', '12X24']
    },

    // Sheet count constraints
    minSheets: 20,
    maxSheets: 60
};

// Helper function to calculate order price
const calculateOrderPrice = (bindingType, paperType, sheetCount, coverType) => {
    let sheetCost = 0;
    let coverBoxCost = 0;

    // Calculate sheet cost
    if (bindingType === 'Layflat') {
        sheetCost = ALBUM_PRICING.sheetTypes.Layflat.pricePerSheet * sheetCount;
    } else if (bindingType === 'NT' && paperType) {
        const paperPrice = ALBUM_PRICING.sheetTypes.NT.paperTypes[paperType];
        if (paperPrice) {
            sheetCost = paperPrice * sheetCount;
        }
    }

    // Add cover/box cost
    if (coverType && ALBUM_PRICING.coverBoxCosts[coverType]) {
        coverBoxCost = ALBUM_PRICING.coverBoxCosts[coverType];
    }

    return {
        sheetCost,
        coverBoxCost,
        totalPrice: sheetCost + coverBoxCost
    };
};

module.exports = {
    ALBUM_PRICING,
    calculateOrderPrice
};
