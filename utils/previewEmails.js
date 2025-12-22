/**
 * Email Template Preview Generator
 * 
 * This file helps you preview the email templates in your browser.
 * Run this file with: node utils/previewEmails.js
 * Then open the generated HTML files in your browser.
 */

const fs = require('fs');
const path = require('path');
const {
    adminNewUserTemplate,
    userRegistrationConfirmationTemplate,
    userApprovedTemplate,
    userRejectedTemplate,
    passwordResetTemplate
} = require('./emailTemplates');

// Sample user data for testing
const sampleUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    businessName: 'Doe Photography Studio',
    gstNo: '29ABCDE1234F1Z5',
    username: 'johndoe'
};

// Create previews directory if it doesn't exist
const previewDir = path.join(__dirname, '../email-previews');
if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir);
}

// Generate preview files
const templates = [
    {
        name: '1-admin-new-user-notification',
        html: adminNewUserTemplate(sampleUserData)
    },
    {
        name: '2-user-registration-confirmation',
        html: userRegistrationConfirmationTemplate(sampleUserData)
    },
    {
        name: '3-user-account-approved',
        html: userApprovedTemplate(sampleUserData)
    },
    {
        name: '4-user-account-rejected',
        html: userRejectedTemplate(sampleUserData, 'Incomplete business verification documents')
    },
    {
        name: '5-password-reset',
        html: passwordResetTemplate(sampleUserData, 'https://zerogravity.com/reset-password?token=abc123xyz')
    }
];

// Write each template to a file
templates.forEach(template => {
    const filePath = path.join(previewDir, `${template.name}.html`);
    fs.writeFileSync(filePath, template.html);
    console.log(`✓ Generated: ${template.name}.html`);
});

console.log(`\n🎉 All email previews generated successfully!`);
console.log(`📁 Location: ${previewDir}`);
console.log(`\n💡 Tip: Open these HTML files in your browser to preview the emails.`);
