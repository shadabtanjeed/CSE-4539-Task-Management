import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch tasks when component mounts
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/tasks/get-tasks');
            setTasks(response.data.tasks);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Get priority color based on task priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return '#ff6b6b';
            case 'medium':
                return '#f9ca24';
            case 'low':
                return '#2ecc71';
            default:
                return '#2ecc71';
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Your Tasks</h1>
            </header>

            <main className="dashboard-content">
                {isLoading ? (
                    <div className="loading-message">Loading tasks...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : tasks.length === 0 ? (
                    <div className="empty-state">
                        <p>You don't have any tasks yet.</p>
                    </div>
                ) : (
                    <div className="task-cards">
                        {tasks.map(task => (
                            <div className="task-card" key={task.taskId}>
                                <div className="task-card-header">
                                    <h3 className="task-title">{task.title}</h3>
                                    <span
                                        className="priority-indicator"
                                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                                    >
                                        {task.priority}
                                    </span>
                                </div>

                                <p className="task-description">
                                    {task.description || 'No description provided'}
                                </p>

                                <div className="task-meta">
                                    <div className="task-meta-item">
                                        <span className="meta-label">Due:</span>
                                        <span className="meta-value">{formatDate(task.dueDate)}</span>
                                    </div>

                                    <div className="task-meta-item">
                                        <span className="meta-label">Category:</span>
                                        <span className="meta-value">{task.category}</span>
                                    </div>

                                    <div className="task-meta-item">
                                        <span className="meta-label">Created:</span>
                                        <span className="meta-value">{formatDate(task.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;