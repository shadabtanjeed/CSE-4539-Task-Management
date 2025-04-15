const express = require('express');
const router = express.Router();
const { createNewTask, getUserTasks } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.post('/add-new-task', authenticateToken, createNewTask);
router.get('/get-tasks', authenticateToken, getUserTasks);

module.exports = router;