const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
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
        required: false,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
