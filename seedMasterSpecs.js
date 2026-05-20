const mongoose = require('mongoose');
const MasterSpecification = require('./models/MasterSpecification');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zerogravity';

const seedSpecs = [
    {
        name: 'paper_types',
        label: 'Paper Types',
        options: [
            { label: 'Glossy', price: 0 },
            { label: 'Matte', price: 0 },
            { label: 'Lustre', price: 0 },
            { label: 'Metallic', price: 0 },
            { label: 'Feather', price: 0 },
            { label: 'Multi', price: 0 },
            { label: 'Texture-Sand', price: 0 },
            { label: 'Texture-Linen', price: 0 }
        ]
    },
    {
        name: 'binding_types',
        label: 'Binding Types',
        options: [
            { label: 'NT', price: 0 },
            { label: 'Layflat', price: 0 }
        ]
    },
    {
        name: 'box_finishes',
        label: 'Box Finishes',
        options: [
            { label: 'Regular', price: 0 },
            { label: 'Matte', price: 0 },
            { label: 'Glossy', price: 0 }
        ]
    },
    {
        name: 'square_sizes',
        label: 'Square Sizes',
        options: [
            { label: '12x24', price: 0 }
        ]
    },
    {
        name: 'portrait_sizes',
        label: 'Portrait Sizes',
        options: [
            { label: '15x24', price: 0 },
            { label: '16x24', price: 0 },
            { label: '18x24', price: 0 }
        ]
    },
    {
        name: 'landscape_sizes',
        label: 'Landscape Sizes',
        options: [
            { label: '12x30', price: 0 },
            { label: '12x34', price: 0 },
            { label: '12x36', price: 0 }
        ]
    }
];

async function seed() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        for (const spec of seedSpecs) {
            const existing = await MasterSpecification.findOne({ name: spec.name });
            if (!existing) {
                await MasterSpecification.create(spec);
                console.log(`Created spec: ${spec.label}`);
            } else {
                console.log(`Spec already exists: ${spec.label}`);
            }
        }

        console.log('Seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
