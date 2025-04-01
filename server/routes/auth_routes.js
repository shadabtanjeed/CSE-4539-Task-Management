const express = require('express');
const router = express.Router();
const { add_user } = require('../controllers/authController');

router.post('/add_user', add_user);


module.exports = router;