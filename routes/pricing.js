const express = require('express');
const router = express.Router();
const { ALBUM_PRICING } = require('../config/albumPricing');

// Get pricing configuration
router.get('/pricing', (req, res) => {
    res.json(ALBUM_PRICING);
});

module.exports = router;
