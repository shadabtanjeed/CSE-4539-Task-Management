const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.mongodb_url);

// Configure CORS to work with the frontend
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Import routes
const authRoutes = require('./routes/auth_routes');

app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});