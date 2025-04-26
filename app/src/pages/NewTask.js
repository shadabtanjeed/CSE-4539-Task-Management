import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NewTask.css';

function NewTask() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task data to submit:', formData);
        navigate('/dashboard');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="new-task-container">
            <header className="new-task-header">
                <h1>Add New Task</h1>
                <button className="back-button" onClick={handleBack}>
                    Back to Dashboard
                </button>
            </header>

            <main className="new-task-content">
                <form className="task-form" onSubmit={handleSubmit}>
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
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter task description"
                            rows="4"
                            required
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
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={handleBack}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Task
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default NewTask;