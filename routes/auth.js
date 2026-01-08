const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register User
router.post('/register', authController.register);

// Login User
router.post('/login', authController.login);

// Get All Users (Admin)
router.get('/users', authController.getAllUsers);

// Verify User (Admin)
router.post('/verify', authController.verifyUser);

// Get Single User by ID (Admin)
router.get('/users/:userId', authController.getUserById);

// Delete User (Admin)
router.delete('/users/:userId', authController.deleteUser);

module.exports = router;
