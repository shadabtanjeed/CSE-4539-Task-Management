const express = require('express');
const router = express.Router();
const { createNewTask } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add_new_task', authenticateToken, createNewTask);

module.exports = router;