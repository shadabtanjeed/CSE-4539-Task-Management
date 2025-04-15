const express = require('express');
const router = express.Router();
const { add_user, login } = require('../controllers/authController');

router.post('/add_user', add_user);
router.post('/login', login);

module.exports = router;