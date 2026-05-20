const mongoose = require('mongoose');
const Product = require('../models/Product');
const MasterSpecification = require('../models/MasterSpecification');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/zerogravity';

// Landscape sizes per product (all others share 12x30, 12x34, 12x36)
const landscapeOverrides = {
    'FS03':  ['12x30', '12x34', '12x37'],
    'LFS01': ['12x30', '12x34', '12x39'],
    'LFS02': ['12x30', '12x34', '12x40'],
    'LFS03': ['12x30', '12x34', '12x41'],
    'LFS04': ['12x30', '12x34', '12x42'],
    'SS01':  ['12x30', '12x34', '12x43'],
    'SS02':  ['12x30', '12x34', '12x44'],
    'BRS01': ['12x30', '12x34', '12x45'],
    'BRS02': ['12x30', '12x34', '12x46'],
    'BRS03': ['12x30', '12x34', '12x47'],
    'BRS04': ['12x30', '12x34', '12x48'],
    'BRS05': ['12x30', '12x34', '12x49'],
    'BRS06': ['12x30', '12x34', '12x50'],
    'BRS07': ['12x30', '12x34', '12x51'],
    'BRS08': ['12x30', '12x34', '12x52'],
    'BRS09': ['12x30', '12x34', '12x53'],
    'BRS10': ['12x30', '12x34', '12x54'],
    'BRS11': ['12x30', '12x34', '12x55'],
    'BRS12': ['12x30', '12x34', '12x56'],
    'BRS13': ['12x30', '12x34', '12x57'],
    'BRS14': ['12x30', '12x34', '12x58'],
    'BRS15': ['12x30', '12x34', '12x59'],
    'BRS16': ['12x30', '12x34', '12x60'],
    'MLS01': ['12x30', '12x34', '12x61'],
    'MLS02': ['12x30', '12x34', '12x62'],
    'MLS03': ['12x30', '12x34', '12x63'],
    'MLS04': ['12x30', '12x34', '12x64'],
    'MLS05': ['12x30', '12x34', '12x65'],
    'MLS06': ['12x30', '12x34', '12x66'],
    'MLS07': ['12x30', '12x34', '12x67'],
    'MLS08': ['12x30', '12x34', '12x68'],
    'MLS09': ['12x30', '12x34', '12x69'],
    'MLS10': ['12x30', '12x34', '12x70'],
    'MLS11': ['12x30', '12x34', '12x71'],
    'PS01':  ['12x30', '12x34', '12x72'],
};

const DEFAULT_LANDSCAPE = ['12x30', '12x34', '12x36'];

async function run() {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Load all master specs
    const specs = await MasterSpecification.find({ isActive: true });
    const specMap = {};
    for (const s of specs) {
        specMap[s.label] = s._id;
    }

    const required = ['Paper Type', 'Binding Type', 'Square Sizes', 'Portrait Sizes', 'Landscape Sizes'];
    for (const label of required) {
        if (!specMap[label]) {
            console.error(`ERROR: Master spec "${label}" not found! Run seedMasterSpecs.js first.`);
            process.exit(1);
        }
    }

    console.log('Master specs found:', Object.entries(specMap).map(([l, id]) => `${l}: ${id}`).join(', '));

    const products = await Product.find();
    console.log(`Found ${products.length} products`);

    let updated = 0;
    let skipped = 0;

    for (const product of products) {
        const productName = product.name.trim().toUpperCase();
        const landscapeSizes = landscapeOverrides[productName] || DEFAULT_LANDSCAPE;

        const specifications = [
            { spec: specMap['Paper Type'],     enabledOptions: ['Glossy', 'Matte', 'Feather', 'Multi', 'Texture-Sand', 'Texture-Linen'] },
            { spec: specMap['Binding Type'],   enabledOptions: ['NT', 'Layflat'] },
            { spec: specMap['Square Sizes'],   enabledOptions: ['12x24'] },
            { spec: specMap['Portrait Sizes'], enabledOptions: ['15x24', '16x24', '18x24'] },
            { spec: specMap['Landscape Sizes'], enabledOptions: landscapeSizes },
        ];

        await Product.findByIdAndUpdate(product._id, { specifications });
        console.log(`Updated: ${product.name} → landscape: [${landscapeSizes.join(', ')}]`);
        updated++;
    }

    console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
    await mongoose.disconnect();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
