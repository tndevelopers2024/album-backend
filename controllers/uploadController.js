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
const storage = process.env.NODE_ENV === 'production' 
    ? multer.memoryStorage() 
    : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

const upload = multer({ storage: storage });

// Upload Image
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    if (process.env.NODE_ENV === 'production') {
        // In production, we don't have local persistence.
        // This is a placeholder until a cloud storage service is integrated.
        return res.json({ 
            imageUrl: 'https://placehold.co/600x400?text=Cloud+Storage+Required',
            message: 'Local uploads are disabled in production. Please integrate Cloudinary.'
        });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
};

// Export multer upload middleware
exports.upload = upload;
