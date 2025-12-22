require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI is not defined in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        const adminEmail = 'admin@gmail.com';
        const adminPassword = '123456';

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists.');

            // Optional: Update existing user to be admin if they aren't
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                existingAdmin.status = 'approved';
                await existingAdmin.save();
                console.log('✅ Updated existing user to Admin role.');
            }

            process.exit(0);
        }

        // Create Admin
        const newAdmin = new User({
            name: 'Super Admin',
            email: adminEmail,
            phone: '0000000000',
            businessName: 'Zero Gravity HQ',
            gstNo: 'N/A',
            username: 'admin',
            password: adminPassword, // In production, hash this!
            role: 'admin',
            status: 'approved'
        });

        await newAdmin.save();
        console.log('✅ Admin user created successfully.');
        console.log(`📧 Email: ${adminEmail}`);
        console.log(`🔑 Password: ${adminPassword}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
