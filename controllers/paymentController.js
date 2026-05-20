const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Order = require('../models/Order');

const getRazorpay = () => new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payments/create-order
// Creates a Razorpay order, saves the DB order as payment_pending, returns order details to frontend
exports.createOrder = async (req, res) => {
    try {
        const {
            userId, productId, calculatedPrice,
            title, size, bindingType, paperType, sheetCount, additionalPaper,
            albumColor, coverType, boxType, bagType, calendarType, acrylicCalendar,
            replicaEbook, imageLink, quantity, logo, frontPageCustomization,
            deliveryAddress, dynamicSpecs, dynamicSpecsCost
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid User or Product ID' });
        }

        const amountInPaise = Math.round((calculatedPrice || 0) * 100);
        if (amountInPaise < 100) {
            return res.status(400).json({ message: 'Order amount must be at least ₹1' });
        }

        // Create Razorpay order
        const razorpayOrder = await getRazorpay().orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        });

        // Save order to DB with payment_pending status
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
            bagType,
            calendarType,
            acrylicCalendar,
            replicaEbook,
            imageLink,
            quantity: quantity || 1,
            logo,
            frontPageCustomization,
            deliveryAddress,
            calculatedPrice: calculatedPrice || 0,
            dynamicSpecs,
            dynamicSpecsCost,
            paymentStatus: 'payment_pending',
            razorpayOrderId: razorpayOrder.id
        });

        await newOrder.save();

        res.status(201).json({
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            dbOrderId: newOrder._id,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Payment create-order error:', error);
        const errDetail = error?.error?.description || error?.message || JSON.stringify(error);
        res.status(500).json({ message: 'Failed to create payment order', error: errDetail });
    }
};

// POST /api/payments/verify
// Verifies Razorpay HMAC signature, marks order as paid
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const expectedSignature = hmac.digest('hex');

        if (expectedSignature !== razorpay_signature) {
            await Order.findByIdAndUpdate(dbOrderId, { paymentStatus: 'failed' });
            return res.status(400).json({ message: 'Payment verification failed' });
        }

        const order = await Order.findByIdAndUpdate(
            dbOrderId,
            { paymentStatus: 'paid', razorpayPaymentId: razorpay_payment_id, status: 'pending' },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json({ message: 'Payment verified successfully', order });
    } catch (error) {
        console.error('Payment verify error:', error);
        const errDetail = error?.error?.description || error?.message || JSON.stringify(error);
        res.status(500).json({ message: 'Payment verification error', error: errDetail });
    }
};

// POST /api/payments/retry/:orderId
// Re-creates a Razorpay order for an existing payment_pending DB order
exports.retryPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        if (order.paymentStatus === 'paid') return res.status(400).json({ message: 'Order already paid' });

        const amountInPaise = Math.round((order.calculatedPrice || 0) * 100);
        if (amountInPaise < 100) return res.status(400).json({ message: 'Invalid order amount' });

        const razorpayOrder = await getRazorpay().orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `retry_${Date.now()}`,
        });

        order.razorpayOrderId = razorpayOrder.id;
        order.paymentStatus = 'payment_pending';
        await order.save();

        res.json({
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            dbOrderId: order._id,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Retry payment error:', error);
        const errDetail = error?.error?.description || error?.message || JSON.stringify(error);
        res.status(500).json({ message: 'Failed to retry payment', error: errDetail });
    }
};
