const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Upload endpoint
router.post('/', uploadController.upload.single('image'), uploadController.uploadImage);

module.exports = router;
