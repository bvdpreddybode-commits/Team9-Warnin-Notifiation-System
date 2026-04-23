const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: message
        });

        console.log(`📧 EMAIL SENT → ${to}`);
        return "SENT";

    } catch (err) {
        console.log(`❌ EMAIL ERROR → ${to}:`, err.message);
        return "FAILED";
    }
};