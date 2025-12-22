// Email Templates for Albums by Zero Gravity

const baseTemplate = (content, preheader = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Albums by Zero Gravity</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }
        
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .email-header {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 4px solid #d4af37;
        }
        
        .logo {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin: 0;
        }
        
        .logo-accent {
            color: #d4af37;
        }
        
        .tagline {
            color: #a1a1aa;
            font-size: 12px;
            margin-top: 8px;
            text-transform: uppercase;
            letter-spacing: 3px;
        }
        
        .email-body {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 24px;
            font-weight: 700;
            color: #0a0a0a;
            margin-bottom: 20px;
            font-family: 'Outfit', sans-serif;
        }
        
        .content-text {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 20px;
            line-height: 1.8;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #d4af37;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
        }
        
        .highlight-box p {
            margin: 0;
            color: #78350f;
            font-weight: 500;
        }
        
        .info-card {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .info-row {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 140px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-value {
            color: #1f2937;
            font-weight: 500;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #d4af37 0%, #b5952f 100%);
            color: #000000 !important;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 25px 0;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }
        
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .status-success {
            background-color: #d1fae5;
            color: #065f46;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #78350f;
        }
        
        .status-error {
            background-color: #fee2e2;
            color: #991b1b;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            margin: 30px 0;
        }
        
        .email-footer {
            background-color: #0a0a0a;
            color: #a1a1aa;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-link {
            color: #d4af37;
            text-decoration: none;
            margin: 0 15px;
            font-weight: 500;
        }
        
        .footer-link:hover {
            color: #b5952f;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #a1a1aa;
            text-decoration: none;
        }
        
        .copyright {
            margin-top: 20px;
            font-size: 12px;
            color: #6b7280;
        }
        
        @media only screen and (max-width: 600px) {
            .email-header,
            .email-body,
            .email-footer {
                padding: 20px !important;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .content-text {
                font-size: 14px;
            }
            
            .info-row {
                flex-direction: column;
            }
            
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>
    <div class="email-wrapper">
        <div class="email-header">
            <h1 class="logo">ZERO<span class="logo-accent">GRAVITY</span></h1>
            <p class="tagline">Photo Album Excellence</p>
        </div>
        <div class="email-body">
            ${content}
        </div>
        <div class="email-footer">
            <div class="footer-links">
                <a href="#" class="footer-link">Website</a>
                <a href="#" class="footer-link">Support</a>
                <a href="#" class="footer-link">Contact</a>
            </div>
            <div class="social-links">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">Twitter</a>
            </div>
            <div class="divider"></div>
            <p class="copyright">
                © ${new Date().getFullYear()} Albums by Zero Gravity. All rights reserved.<br>
                This email was sent to you as a registered user of Albums by Zero Gravity.
            </p>
        </div>
    </div>
</body>
</html>
`;

// 1. Admin Notification - New User Registration
const adminNewUserTemplate = (userData) => {
    const content = `
        <h2 class="greeting">🎉 New User Registration</h2>
        <p class="content-text">
            A new user has registered on the Albums by Zero Gravity platform and is awaiting your approval.
        </p>
        
        <div class="info-card">
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${userData.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${userData.email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Business Name:</span>
                <span class="info-value">${userData.businessName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">GST Number:</span>
                <span class="info-value">${userData.gstNo}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${userData.phone || 'Not provided'}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="status-badge status-pending">Pending Approval</span>
            </div>
        </div>
        
        <p class="content-text">
            Please review this registration and take appropriate action from your admin dashboard.
        </p>
        
        <center>
            <a href="${process.env.ADMIN_URL || 'http://localhost:5175/admin/users'}" class="cta-button">
                Review Registration →
            </a>
        </center>
        
        <div class="divider"></div>
        
        <p class="content-text" style="font-size: 14px; color: #6b7280;">
            <strong>Quick Actions:</strong> You can approve or reject this user directly from your admin panel.
        </p>
    `;

    return baseTemplate(content, 'New user registration awaiting approval');
};

// 2. User Registration Confirmation
const userRegistrationConfirmationTemplate = (userData) => {
    const content = `
        <h2 class="greeting">Welcome to Albums by Zero Gravity! 👋</h2>
        <p class="content-text">
            Hi <strong>${userData.name}</strong>,
        </p>
        <p class="content-text">
            Thank you for registering with Albums by Zero Gravity! We're excited to have you join our community of photo album professionals.
        </p>
        
        <div class="highlight-box">
            <p>
                ✓ Your registration has been received successfully!<br>
                ⏳ Your account is currently pending approval from our team.
            </p>
        </div>
        
        <p class="content-text">
            Here's a summary of your registration details:
        </p>
        
        <div class="info-card">
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${userData.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${userData.email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Business Name:</span>
                <span class="info-value">${userData.businessName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="status-badge status-pending">Pending Approval</span>
            </div>
        </div>
        
        <div class="divider"></div>
        
        <h3 style="font-family: 'Outfit', sans-serif; color: #0a0a0a; margin-bottom: 15px;">What happens next?</h3>
        <p class="content-text">
            📋 Our team will review your registration details<br>
            ✅ You'll receive an email notification once your account is approved<br>
            🚀 After approval, you can start using all features of Albums by Zero Gravity
        </p>
        
        <p class="content-text">
            This process typically takes 24-48 hours. We appreciate your patience!
        </p>
        
        <p class="content-text" style="margin-top: 30px;">
            If you have any questions, feel free to reach out to our support team.
        </p>
    `;

    return baseTemplate(content, 'Your registration is being reviewed');
};

// 3. User Account Approved
const userApprovedTemplate = (userData) => {
    const content = `
        <h2 class="greeting">🎉 Your Account Has Been Approved!</h2>
        <p class="content-text">
            Hi <strong>${userData.name}</strong>,
        </p>
        <p class="content-text">
            Great news! Your Albums by Zero Gravity account has been approved and is now active. You can start exploring all the features we have to offer!
        </p>
        
        <div class="highlight-box">
            <p>
                <strong>🎊 Congratulations!</strong><br>
                Your account is now fully activated and ready to use.
            </p>
        </div>
        
        <div class="info-card">
            <div class="info-row">
                <span class="info-label">Account Name:</span>
                <span class="info-value">${userData.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Username:</span>
                <span class="info-value">${userData.username}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${userData.email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Business:</span>
                <span class="info-value">${userData.businessName}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Status:</span>
                <span class="status-badge status-success">✓ Approved</span>
            </div>
        </div>
        
        <center>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5175/login'}" class="cta-button">
                Login to Your Account →
            </a>
        </center>
        
        <div class="divider"></div>
        
        <h3 style="font-family: 'Outfit', sans-serif; color: #0a0a0a; margin-bottom: 15px;">Getting Started</h3>
        <p class="content-text">
            📸 Browse our extensive photo album collection<br>
            💼 Manage your business orders efficiently<br>
            📊 Track your order history and analytics<br>
            🎨 Customize albums to match your brand
        </p>
        
        <p class="content-text" style="margin-top: 30px;">
            Welcome aboard! We're thrilled to have you as part of the Albums by Zero Gravity family.
        </p>
    `;

    return baseTemplate(content, 'Your account is now active!');
};

// 4. User Account Rejected
const userRejectedTemplate = (userData, reason = '') => {
    const content = `
        <h2 class="greeting">Registration Status Update</h2>
        <p class="content-text">
            Hi <strong>${userData.name}</strong>,
        </p>
        <p class="content-text">
            Thank you for your interest in Albums by Zero Gravity. After careful review, we regret to inform you that we are unable to approve your registration at this time.
        </p>
        
        <div class="info-card">
            <div class="info-row">
                <span class="info-label">Application Status:</span>
                <span class="status-badge status-error">Not Approved</span>
            </div>
            ${reason ? `
            <div class="info-row">
                <span class="info-label">Reason:</span>
                <span class="info-value">${reason}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="divider"></div>
        
        <h3 style="font-family: 'Outfit', sans-serif; color: #0a0a0a; margin-bottom: 15px;">What can you do?</h3>
        <p class="content-text">
            📧 Contact our support team for more information<br>
            🔄 Review your registration details and reapply<br>
            💬 Reach out if you believe this was an error
        </p>
        
        <center>
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5175/register'}" class="cta-button">
                Contact Support →
            </a>
        </center>
        
        <p class="content-text" style="margin-top: 30px;">
            We appreciate your understanding. If you have any questions or concerns, please don't hesitate to reach out to our support team.
        </p>
    `;

    return baseTemplate(content, 'Registration status update');
};

// 5. Password Reset Email (bonus template)
const passwordResetTemplate = (userData, resetLink) => {
    const content = `
        <h2 class="greeting">🔐 Password Reset Request</h2>
        <p class="content-text">
            Hi <strong>${userData.name}</strong>,
        </p>
        <p class="content-text">
            We received a request to reset your password for your Albums by Zero Gravity account. If you didn't make this request, you can safely ignore this email.
        </p>
        
        <div class="highlight-box">
            <p>
                <strong>⚠️ Security Notice:</strong><br>
                This password reset link will expire in 1 hour for your security.
            </p>
        </div>
        
        <center>
            <a href="${resetLink}" class="cta-button">
                Reset Your Password →
            </a>
        </center>
        
        <p class="content-text" style="margin-top: 30px; font-size: 14px; color: #6b7280;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetLink}" style="color: #d4af37; word-break: break-all;">${resetLink}</a>
        </p>
        
        <div class="divider"></div>
        
        <p class="content-text" style="font-size: 14px; color: #6b7280;">
            <strong>Didn't request this?</strong> Your account is still secure. You can safely ignore this email.
        </p>
    `;

    return baseTemplate(content, 'Reset your password');
};

module.exports = {
    adminNewUserTemplate,
    userRegistrationConfirmationTemplate,
    userApprovedTemplate,
    userRejectedTemplate,
    passwordResetTemplate
};
