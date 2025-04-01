const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },
    generated_at: {
        type: Date,
        default: Date.now,
    },
    expires_at: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { collection: 'otps' });

module.exports = mongoose.model('OTP', otpSchema);  