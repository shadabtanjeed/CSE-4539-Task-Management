import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import '../styles/NewTask.css'; // Reuse existing styles

function TaskDetailsPage() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [originalTask, setOriginalTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        category: ''
    });
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch task details when component mounts
    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/tasks/get-tasks`);
                const task = response.data.tasks.find(t => t.taskId === taskId);

                if (!task) {
                    setError('Task not found');
                    return;
                }

                // Store the original task for comparison
                setOriginalTask(task);

                // Format the date for the date input (YYYY-MM-DD)
                const dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';

                setFormData({
                    title: task.title || '',
                    description: task.description || '',
                    dueDate: dueDate,
                    priority: task.priority || '',
                    category: task.category || ''
                });
            } catch (err) {
                console.error('Error fetching task details:', err);
                setError('Failed to load task details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTaskDetails();
    }, [taskId]);

    // Check for changes when formData updates
    useEffect(() => {
        if (originalTask) {
            // Format the date for comparison
            const originalDueDate = originalTask.dueDate ?
                new Date(originalTask.dueDate).toISOString().split('T')[0] : '';

            const hasChanged =
                formData.title !== originalTask.title ||
                formData.description !== originalTask.description ||
                formData.dueDate !== originalDueDate ||
                formData.priority !== originalTask.priority ||
                formData.category !== originalTask.category;

            setHasChanges(hasChanged);
        }
    }, [formData, originalTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasChanges) {
            return;
        }

        try {
            setIsSubmitting(true);
            await api.put(`/tasks/update-task/${taskId}`, formData);

            alert('Task updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update task. Please try again.';
            alert(errorMessage);
            console.error('Error updating task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    // Format dates for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="new-task-container">
                <header className="new-task-header">
                    <h1>Task Details</h1>
                    <button className="back-button" onClick={handleBack}>
                        Back to Dashboard
                    </button>
                </header>
                <div className="new-task-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading task details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="new-task-container">
                <header className="new-task-header">
                    <h1>Task Details</h1>
                    <button className="back-button" onClick={handleBack}>
                        Back to Dashboard
                    </button>
                </header>
                <div className="new-task-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="new-task-container">
            <header className="new-task-header">
                <h1>Task Details</h1>
                <button className="back-button" onClick={handleBack}>
                    Back to Dashboard
                </button>
            </header>

            <main className="new-task-content">
                <form className="task-form" onSubmit={handleSubmit}>
                    {/* Read-only task info */}
                    <div className="task-meta-compact">

                        <div className="meta-pair">
                            <span className="meta-label">Created: </span>
                            <span className="meta-value">{formatDate(originalTask?.createdAt)}</span>
                        </div>
                        <div className="meta-pair">
                            <span className="meta-label">Updated: </span>
                            <span className="meta-value">{formatDate(originalTask?.updatedAt)}</span>
                        </div>
                    </div>

                    {/* Editable fields */}
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            rows="6"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="study">Study</option>
                            <option value="groceries">Groceries</option>
                            <option value="errands">Errands</option>
                            <option value="misc">Miscellaneous</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority *</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        >
                            <option value="" disabled>Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date *</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={handleBack}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting || !hasChanges}
                            style={{ opacity: hasChanges ? 1 : 0.5 }}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Task'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default TaskDetailsPage;