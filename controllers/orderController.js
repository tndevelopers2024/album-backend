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
            calculatedPrice
        } = req.body;

        // Use the calculated price from frontend (already includes PAD pricing)
        const finalPrice = calculatedPrice || 0;

        const newOrder = new Order({
            user: userId,
            product: productId,
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
            calculatedPrice: finalPrice
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
        const orders = await Order.find({ user: req.params.userId })
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
        const order = await Order.findById(req.params.orderId)
            .populate('user', 'name email businessName phone')
            .populate('product', 'name image price boxPrice');

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
