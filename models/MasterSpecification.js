const mongoose = require('mongoose');

const MasterSpecificationSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    options: [{
        label: { type: String, required: true },
        price: { type: Number, default: 0 }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('MasterSpecification', MasterSpecificationSchema);
