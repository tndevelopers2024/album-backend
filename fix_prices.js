const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });
const mongoose = require('mongoose');
const Product = require('../server/models/Product');

const MONGO_URI = process.env.MONGO_URI;

async function fixPrices() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await Product.updateMany({ price: 2500 }, { price: 0 });
        console.log(`Updated ${result.modifiedCount} products from price 2500 to 0`);

        process.exit(0);
    } catch (err) {
        console.error('Failed to fix prices:', err);
        process.exit(1);
    }
}

fixPrices();
