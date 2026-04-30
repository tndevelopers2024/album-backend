const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    gallery: {
        type: [String],
        default: []
    },
    features: {
        type: [String],
        default: []
    },
    benefits: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    boxPrice: {
        type: Number,
        required: true,
        default: 500
    },
    frontPageOptions: [{
        id: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, enum: ['text', 'date', 'image'], default: 'text' },
        required: { type: Boolean, default: false }
    }],
    sizes: {
        Square: { type: [String], default: [] },
        Portrait: { type: [String], default: [] },
        Landscape: { type: [String], default: [] }
    },
    paperTypes: {
        type: [String],
        default: ['Glossy', 'Matte', 'Lustre', 'Metallic', 'Fine Art', 'Canvas']
    },
    bindingTypes: {
        type: [String],
        default: ['NT', 'Layflat']
    },
    boxFinishes: {
        type: [String],
        default: ['Regular', 'Matte', 'Glossy']
    },
    colors: [{
        name: { type: String, required: true },
        hex: { type: String },
        gallery: { type: [String], default: [] }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
