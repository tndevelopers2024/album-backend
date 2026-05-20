
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
        required: false
    },
    bindingType: {
        type: String,
        required: false
    },
    paperType: {
        type: String,
        required: false
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
        required: false
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
        type: Map,
        of: String
    },
    logo: {
        type: String
    },
    dynamicSpecs: {
        type: Map,
        of: String
    },
    dynamicSpecsCost: {
        type: Number,
        default: 0
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
    paymentStatus: {
        type: String,
        enum: ['payment_pending', 'paid', 'failed'],
        default: 'payment_pending'
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
