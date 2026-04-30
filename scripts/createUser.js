const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import User model
const User = require('../models/User');

async function createUsers() {
    try {
        // Create admin user
        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@zerogravity.com',
            phone: '9876543210',
            businessName: 'Zero Gravity HQ',
            gstNo: '29ABCDE1234F1Z5',
            username: 'admin',
            password: 'admin123', // Will be hashed by pre-save hook
            status: 'approved',
            role: 'admin'
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: admin');
        console.log('Password: admin123');
        console.log('Email: admin@zerogravity.com');
        console.log('Role: admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Create regular user
        const regularUser = new User({
            name: 'Test User',
            email: 'user@test.com',
            phone: '9876543211',
            businessName: 'Test Business',
            gstNo: '29ABCDE1234F1Z6',
            username: 'testuser',
            password: 'user123', // Will be hashed by pre-save hook
            status: 'approved',
            role: 'user'
        });

        await regularUser.save();
        console.log('✅ Regular user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Username: testuser');
        console.log('Password: user123');
        console.log('Email: user@test.com');
        console.log('Role: user');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        console.log('\n✅ All users created successfully! You can now login.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating users:', error.message);
        if (error.code === 11000) {
            console.log('⚠️  Users already exist in database');
            console.log('Try logging in with:');
            console.log('Username: admin | Password: admin123');
            console.log('OR');
            console.log('Username: testuser | Password: user123');
        }
        process.exit(1);
    }
}

createUsers();
