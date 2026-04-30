const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists (skipped in production/serverless)
const uploadDir = 'uploads';
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadDir)) {
    try {
        fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
        console.warn('Upload directory creation skipped:', err.message);
    }
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage });

// Upload Image
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return only the relative path (not full URL)
    // Frontend will prepend the backend URL when displaying
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
};

// Export multer upload middleware
exports.upload = upload;
