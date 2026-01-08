const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    bindingType: {
        type: String,
        enum: ['Layflat', 'NT'],
        required: true
    },
    paperType: {
        type: String,
        enum: ['Glossy', 'Matte', 'Lustre', 'Metallic', 'Fine Art', 'Canvas'],
        required: function () {
            return this.bindingType === 'NT';
        }
    },
    sheetCount: {
        type: Number,
        required: true,
        min: 20,
        max: 60
    },
    additionalPaper: {
        type: String
    },
    coverType: {
        type: String,
        required: false
    },
    albumColor: {
        type: String,
        required: false
    },
    boxType: {
        type: String,
        enum: ['Regular', 'Matte', 'Glossy'],
        required: true
    },
    bagType: {
        type: String
    },
    calendarType: {
        type: String
    },
    acrylicCalendar: {
        type: Boolean,
        default: false
    },
    replicaEbook: {
        type: Boolean,
        default: false
    },
    imageLink: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    calculatedPrice: {
        type: Number,
        required: false
    },
    frontPageCustomization: {
        fullNames: { type: String },
        initials: { type: String },
        coverImage: { type: String },
        date: { type: Date },
        customText: { type: String }
    },
    logo: {
        type: String
    },
    deliveryAddress: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'India'
        }
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
