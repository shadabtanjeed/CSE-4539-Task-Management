const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    category: {
        type: String,
        enum: [
            'work',
            'personal',
            'study',
            'groceries',
            'errands',
            'misc',
            'other'
        ],
        default: 'personal'
    },
    completedAt: {
        type: Date
    },
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Task', taskSchema);