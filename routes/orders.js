const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create Order
router.post('/', orderController.createOrder);

// Get User Orders
router.get('/my-orders/:userId', orderController.getUserOrders);

// Get All Orders (Admin)
router.get('/', orderController.getAllOrders);

// Get Single Order by ID
router.get('/:orderId', orderController.getOrderById);

// Update Order Status (Admin)
router.put('/:orderId/status', orderController.updateOrderStatus);

// Delete Order (Admin)
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
