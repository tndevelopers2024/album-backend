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
        required: true
    },
    boxPrice: {
        type: Number,
        required: true,
        default: 500
    },
    frontPageOptions: {
        showFullNames: { type: Boolean, default: false },
        showInitials: { type: Boolean, default: false },
        showImage: { type: Boolean, default: false },
        showDate: { type: Boolean, default: false },
        showCustomText: { type: Boolean, default: false }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
