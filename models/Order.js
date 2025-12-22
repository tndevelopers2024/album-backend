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
        enum: ['Layflat', 'Absolute Layflat', 'V-Cut', 'Book'],
        required: true
    },
    paperType: {
        type: String,
        required: true
    },
    additionalPaper: {
        type: String
    },
    coverType: {
        type: String,
        required: true
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
