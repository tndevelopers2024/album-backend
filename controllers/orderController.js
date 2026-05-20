const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');

// Create Order
exports.createOrder = async (req, res) => {
    try {
        const {
            userId,
            productId,
            title,
            size,
            bindingType,
            paperType,
            sheetCount,
            additionalPaper,
            albumColor,
            coverType,
            boxType,
            bagType,
            calendarType,
            acrylicCalendar,
            replicaEbook,
            imageLink,
            quantity,
            logo,
            frontPageCustomization,
            deliveryAddress,
            calculatedPrice,
            dynamicSpecs,
            dynamicSpecsCost
        } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid User or Product ID' });
        }

        // Use the calculated price from frontend (already includes PAD pricing)
        const finalPrice = calculatedPrice || 0;

        const newOrder = new Order({
            user: userId,
            product: productId,
            title,
            size: size || dynamicSpecs?.['square_sizes'] || dynamicSpecs?.['portrait_sizes'] || dynamicSpecs?.['landscape_sizes'],
            bindingType: bindingType || dynamicSpecs?.['binding_types'],
            paperType: paperType || dynamicSpecs?.['paper_types'],
            sheetCount,
            additionalPaper,
            albumColor,
            coverType,
            boxType: boxType || dynamicSpecs?.['box_finishes'],
            bagType: bagType || dynamicSpecs?.['bag_types'],
            calendarType,
            acrylicCalendar,
            replicaEbook,
            imageLink,
            quantity: quantity || 1,
            logo,
            frontPageCustomization,
            deliveryAddress,
            calculatedPrice: finalPrice,
            dynamicSpecs,
            dynamicSpecsCost
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }
        const orders = await Order.find({ user: userId })
            .populate('product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email businessName')
            .populate('product', 'name image')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Single Order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: 'Invalid Order ID' });
        }
        const order = await Order.findById(orderId)
            .populate('user', 'name email businessName phone logo')
            .populate({
                path: 'product',
                select: 'name image price boxPrice specifications',
                populate: { path: 'specifications.spec', model: 'MasterSpecification' }
            });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Order Status (Admin)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        ).populate('user', 'name email')
            .populate('product', 'name');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Order (Admin)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
