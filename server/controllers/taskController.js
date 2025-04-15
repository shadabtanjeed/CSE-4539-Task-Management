const Task = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

const createNewTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, category } = req.body;

        if (!title || !dueDate) {
            return res.status(400).json({ message: "Title and due date are required" });
        }

        // Get username from JWT token
        const username = req.user.username;

        const taskId = uuidv4();

        const newTask = new Task({
            taskId,
            title,
            description,
            dueDate,
            priority: priority || 'medium',
            category: category || 'personal',
            createdBy: username
        });

        await newTask.save();

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createNewTask };