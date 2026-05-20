const mongoose = require('mongoose');
require('dotenv').config();
const MasterSpecification = require('./models/MasterSpecification');

async function updateSpecs() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const core = ['paper_types', 'binding_types', 'square_sizes', 'portrait_sizes', 'landscape_sizes'];
        const packaging = ['box_finishes', 'bag_option', 'box_type'];
        const extras = ['calendar_type'];

        await MasterSpecification.updateMany({ name: { $in: core } }, { category: 'Album Core', required: true });
        await MasterSpecification.updateMany({ name: { $in: packaging } }, { category: 'Packaging & Bags' });
        await MasterSpecification.updateMany({ name: { $in: extras } }, { category: 'Extras & Add-ons' });

        console.log('Specs updated');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateSpecs();
