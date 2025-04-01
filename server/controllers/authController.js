const User = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

// add user to db
const add_user = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        let user_type = req.body.user_type || 'general_user';

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email already in use" });
            }
            return res.status(400).json({ message: "Username already taken" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            user_type: user_type
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { add_user };