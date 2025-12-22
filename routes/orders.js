const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create Order
router.post('/', async (req, res) => {
    try {
        const {
            userId,
            productId,
            title,
            size,
            bindingType,
            paperType,
            additionalPaper,
            coverType,
            boxType,
            bagType,
            calendarType,
            acrylicCalendar,
            replicaEbook,
            imageLink,
            quantity,
            logo,
            deliveryAddress
        } = req.body;

        const newOrder = new Order({
            user: userId,
            product: productId,
            title,
            size,
            bindingType,
            paperType,
            additionalPaper,
            coverType,
            boxType,
            bagType,
            calendarType,
            acrylicCalendar,
            replicaEbook,
            imageLink,
            quantity,
            logo,
            deliveryAddress
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get User Orders
router.get('/my-orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId })
            .populate('product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get All Orders (Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email businessName')
            .populate('product', 'name image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
