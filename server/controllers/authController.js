const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { add_user, login };