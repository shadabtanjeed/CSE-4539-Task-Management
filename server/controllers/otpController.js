const OTP = require('../models/otpModel');
const crypto = require('crypto');
require('dotenv').config();

// Create OTP and save to db
const generate_otp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Generate random 6-digit OTP
        const randomOTP = crypto.randomInt(100000, 999999).toString();

        // set expiration time to 10 minutes
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 10 * 60 * 1000);

        // Check if OTP record already exists for this email
        let otpRecord = await OTP.findOne({ email });

        // If OTP record exists, update it
        if (otpRecord) {

            otpRecord.otp = randomOTP;
            otpRecord.generated_at = now;
            otpRecord.expires_at = expirationTime;
            otpRecord.verified = false;
            await otpRecord.save();
        }
        // Create new OTP record 
        else {

            otpRecord = new OTP({
                email,
                otp: randomOTP,
                generated_at: now,
                expires_at: expirationTime,
                verified: false
            });
            await otpRecord.save();
        }


        return res.status(200).json({
            message: "OTP generated successfully",
            email,
            otp: randomOTP
        });

    } catch (error) {
        console.error('Error generating OTP:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Verify the input OTP
const verify_otp = async (req, res) => {
    try {
        const { email, otp } = req.body;


        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }


        const otpRecord = await OTP.findOne({ email });

        // Check if OTP exists
        if (!otpRecord) {
            return res.status(400).json({ message: "No OTP found for this email" });
        }

        // Check if OTP is expired
        const now = new Date();
        if (now > otpRecord.expires_at) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // Check if OTP matches
        if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Mark OTP as verified
        otpRecord.verified = true;
        await otpRecord.save();

        return res.status(200).json({
            message: "Email verified successfully",
            email
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { generate_otp, verify_otp };