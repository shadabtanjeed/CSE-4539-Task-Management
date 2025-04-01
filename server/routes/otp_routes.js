const express = require('express');
const router = express.Router();
const { generate_otp, verify_otp } = require('../controllers/otpController');

router.post('/generate_otp', generate_otp);
router.post('/verify_otp', verify_otp);

module.exports = router;