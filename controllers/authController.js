const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const {
    adminNewUserTemplate,
    userRegistrationConfirmationTemplate,
    userApprovedTemplate,
    userRejectedTemplate
} = require('../utils/emailTemplates');

// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, phone, businessName, gstNo, username, password, logo } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create User
        const newUser = new User({
            name, email, phone, businessName, gstNo, username, password, logo
        });
        await newUser.save();

        // Prepare user data for email templates
        const userData = {
            name,
            email,
            phone,
            businessName,
            gstNo,
            username
        };

        // Notify Admin with beautiful template
        const adminEmailHTML = adminNewUserTemplate(userData);
        await sendEmail(
            process.env.ADMIN_EMAIL || 'admin@zerogravity.com',
            '🎉 New User Registration - Zero Gravity',
            `New user ${name} from ${businessName} has registered and is awaiting approval.`,
            adminEmailHTML
        );

        // Notify User with beautiful template
        const userEmailHTML = userRegistrationConfirmationTemplate(userData);
        await sendEmail(
            email,
            '👋 Welcome to Zero Gravity - Registration Received',
            'Your registration has been received and is pending approval.',
            userEmailHTML
        );

        res.status(201).json({ message: 'Registration successful. Please wait for admin approval.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('🔐 Login attempt:', { username, password: '***' });

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            console.log('❌ User not found:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('✅ User found:', { username: user.username, role: user.role, status: user.status });

        // Check password (In production, use bcrypt to compare hashes)
        if (user.password !== password) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('✅ Password matched');

        // Check status (allow login if approved OR admin)
        if (user.status !== 'approved' && user.role !== 'admin') {
            console.log('❌ Account not approved');
            return res.status(403).json({ message: 'Account not approved yet' });
        }

        console.log('✅ Login successful');

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Users (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify User (Admin)
exports.verifyUser = async (req, res) => {
    try {
        const { userId, action } = req.body; // action: 'approve' or 'reject'

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Prepare user data for email templates
        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            businessName: user.businessName,
            gstNo: user.gstNo,
            username: user.username
        };

        if (action === 'approve') {
            user.status = 'approved';

            // Send approval email with beautiful template
            const approvalEmailHTML = userApprovedTemplate(userData);
            await sendEmail(
                user.email,
                '🎉 Your Zero Gravity Account Has Been Approved!',
                `Congratulations! Your account has been approved. Username: ${user.username}`,
                approvalEmailHTML
            );
        } else if (action === 'reject') {
            user.status = 'rejected';

            // Send rejection email with beautiful template
            const rejectionEmailHTML = userRejectedTemplate(userData);
            await sendEmail(
                user.email,
                'Zero Gravity Registration Status Update',
                'We regret to inform you that your registration was not approved.',
                rejectionEmailHTML
            );
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await user.save();
        res.json({ message: `User ${action}d successfully`, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Single User by ID (Admin)
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete User (Admin)
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
