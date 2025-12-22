require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// ROUTES
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------------
// 🔥 CORS CONFIG (WORKS ON VERCEL)
// ---------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "http://localhost:5174",
      "https://zerogravity-frontend-peach.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ---------------------------
// Middleware
// ---------------------------
app.use(express.json());

// ---------------------------
// MongoDB Connection
// ---------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
};

connectDB();

// ---------------------------
// Routes
// ---------------------------
app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------------------------
// Health Route
// ---------------------------
app.get("/", (req, res) => {
  res.send("Zero Gravity API is running");
});

// ---------------------------
// Export (required for Vercel)
// ---------------------------
module.exports = app;

// ALSO start server locally (not used on Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}
