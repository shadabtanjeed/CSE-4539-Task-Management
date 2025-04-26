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

const getUserTasks = async (req, res) => {
    try {
        const username = req.user.username;


        const tasks = await Task.find({ createdBy: username });


        return res.status(200).json({
            message: "Tasks retrieved successfully",
            count: tasks.length,
            tasks: tasks
        });
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, dueDate, priority, category, completedAt } = req.body;
        const username = req.user.username;

        // Find the task by ID
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user is the owner of the task
        if (task.createdBy !== username) {
            return res.status(403).json({ message: "You don't have permission to update this task" });
        }

        const updateFields = {};

        if (title) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (dueDate) updateFields.dueDate = dueDate;
        if (priority) updateFields.priority = priority;
        if (category) updateFields.category = category;
        if (completedAt !== undefined) updateFields.completedAt = completedAt;

        const updatedTask = await Task.findOneAndUpdate(
            { taskId },
            updateFields,
            { new: true }
        );

        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { createNewTask, getUserTasks, updateTask };