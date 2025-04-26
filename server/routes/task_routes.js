const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add-new-task', authenticateToken, taskController.createNewTask);
router.get('/get-tasks', authenticateToken, taskController.getUserTasks);
router.put('/update-task/:taskId', authenticateToken, taskController.updateTask);

module.exports = router;