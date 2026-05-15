const nodemailer = require("nodemailer");

const createTransporter = () => {
    // Check if credentials are provided, if not, we'll log a warning and return null
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        console.warn("[Email Service] Missing EMAIL_USER or EMAIL_APP_PASSWORD in .env file. Falling back to console logging.");
        return null;
    }

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });
};

const sendResetCodeEmail = async (toEmail, code) => {
    const transporter = createTransporter();

    if (!transporter) {
        // Fallback for local development if credentials aren't set
        console.log(`\n======================================`);
        console.log(`[PASSWORD RESET] Code for ${toEmail}: ${code}`);
        console.log(`======================================\n`);
        return true; 
    }

    const mailOptions = {
        from: `"Appitat Kitchen" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Your Appitat Password Reset Code",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #fcf9f2; border-radius: 12px; border: 1px solid #e2ddd1;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4a4138; margin-bottom: 5px; font-size: 28px;">Appitat</h1>
                    <p style="color: #6d6153; margin-top: 0; font-size: 16px;">Password Reset Request</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <p style="font-size: 16px; margin-bottom: 25px;">You requested a password reset. Here is your 6-digit verification code:</p>
                    
                    <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #f5824a; background-color: #fff6ef; padding: 20px; border-radius: 8px; display: inline-block; margin-bottom: 25px;">
                        ${code}
                    </div>
                    
                    <p style="font-size: 14px; color: #6d6153; margin-bottom: 0;">This code will expire in <strong>10 minutes</strong>.</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>&copy; ${new Date().getFullYear()} Appitat. All rights reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email Service] Reset code sent successfully to ${toEmail}`);
        return true;
    } catch (error) {
        console.error("[Email Service] Error sending email:", error);
        throw new Error("Failed to send verification email. Please try again later.");
    }
};

const sendSignupVerificationEmail = async (toEmail, code) => {
    const transporter = createTransporter();

    if (!transporter) {
        // Fallback for local development if credentials aren't set
        console.log(`\n======================================`);
        console.log(`[SIGNUP VERIFICATION] Code for ${toEmail}: ${code}`);
        console.log(`======================================\n`);
        return true; 
    }

    const mailOptions = {
        from: `"Appitat Kitchen" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Welcome to Appitat! Verify Your Email",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background-color: #fcf9f2; border-radius: 12px; border: 1px solid #e2ddd1;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4a4138; margin-bottom: 5px; font-size: 28px;">Appitat</h1>
                    <p style="color: #6d6153; margin-top: 0; font-size: 16px;">Welcome to the kitchen!</p>
                </div>
                
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <p style="font-size: 16px; margin-bottom: 25px;">Thanks for signing up! Please verify your email address by entering the following 6-digit code:</p>
                    
                    <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #f5824a; background-color: #fff6ef; padding: 20px; border-radius: 8px; display: inline-block; margin-bottom: 25px;">
                        ${code}
                    </div>
                    
                    <p style="font-size: 14px; color: #6d6153; margin-bottom: 0;">This code will expire in <strong>10 minutes</strong>.</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>&copy; ${new Date().getFullYear()} Appitat. All rights reserved.</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email Service] Signup verification code sent successfully to ${toEmail}`);
        return true;
    } catch (error) {
        console.error("[Email Service] Error sending email:", error);
        throw new Error("Failed to send verification email. Please try again later.");
    }
};

module.exports = { sendResetCodeEmail, sendSignupVerificationEmail };
