const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        enum: ['admin', 'general_user'],
        default: 'general_user'
    },
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);