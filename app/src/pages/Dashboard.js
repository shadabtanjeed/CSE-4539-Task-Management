import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import '../styles/Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        let filtered = [...tasks];

        // Apply priority filter if set
        if (activeFilter) {
            filtered = filtered.filter(task => task.priority === activeFilter);
        }

        // Apply category filter if set
        if (activeCategoryFilter) {
            filtered = filtered.filter(task => task.category === activeCategoryFilter);
        }

        setFilteredTasks(filtered);
    }, [tasks, activeFilter, activeCategoryFilter]);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/tasks/get-tasks');
            setTasks(response.data.tasks);
            setFilteredTasks(response.data.tasks);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterClick = (priority) => {
        if (activeFilter === priority) {
            // If clicking the active filter, clear it
            setActiveFilter(null);
        } else {
            // Apply the new filter
            setActiveFilter(priority);
        }
    };

    const handleCategoryFilter = (category) => {
        if (activeCategoryFilter === category) {
            // If clicking the active filter, clear it
            setActiveCategoryFilter(null);
        } else {
            // Apply the new filter
            setActiveCategoryFilter(category);
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
                <div className="dashboard-layout">
                    <div className="filter-sidebar">
                        <h3>Filters</h3>

                        {/* Priority Filter Section */}
                        <div className="filter-group">
                            <h4>Priority</h4>
                            <div className="filter-options">
                                <div
                                    className="filter-option"
                                    onClick={() => handleFilterClick('high')}
                                    style={{ color: activeFilter === 'high' ? '#ff6b6b' : '' }}
                                >
                                    <span className="priority-dot" style={{ backgroundColor: '#ff6b6b' }}></span>
                                    <span>High</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleFilterClick('medium')}
                                    style={{ color: activeFilter === 'medium' ? '#f9ca24' : '' }}
                                >
                                    <span className="priority-dot" style={{ backgroundColor: '#f9ca24' }}></span>
                                    <span>Medium</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleFilterClick('low')}
                                    style={{ color: activeFilter === 'low' ? '#2ecc71' : '' }}
                                >
                                    <span className="priority-dot" style={{ backgroundColor: '#2ecc71' }}></span>
                                    <span>Low</span>
                                </div>
                            </div>
                        </div>

                        {/* Category Filter Section - Without colors */}
                        <div className="filter-group">
                            <h4>Category</h4>
                            <div className="filter-options">
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('work')}
                                    style={{ color: activeCategoryFilter === 'work' ? '#fff' : '' }}
                                >
                                    <span>Work</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('personal')}
                                    style={{ color: activeCategoryFilter === 'personal' ? '#fff' : '' }}
                                >
                                    <span>Personal</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('study')}
                                    style={{ color: activeCategoryFilter === 'study' ? '#fff' : '' }}
                                >
                                    <span>Study</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('groceries')}
                                    style={{ color: activeCategoryFilter === 'groceries' ? '#fff' : '' }}
                                >
                                    <span>Groceries</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('errands')}
                                    style={{ color: activeCategoryFilter === 'errands' ? '#fff' : '' }}
                                >
                                    <span>Errands</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('misc')}
                                    style={{ color: activeCategoryFilter === 'misc' ? '#fff' : '' }}
                                >
                                    <span>Miscellaneous</span>
                                </div>
                                <div
                                    className="filter-option"
                                    onClick={() => handleCategoryFilter('other')}
                                    style={{ color: activeCategoryFilter === 'other' ? '#fff' : '' }}
                                >
                                    <span>Other</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tasks-container">
                        <h3>
                            {/* Update header to show both filters if active */}
                            {activeFilter && activeCategoryFilter
                                ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Priority ${activeCategoryFilter.charAt(0).toUpperCase() + activeCategoryFilter.slice(1)} Tasks`
                                : activeFilter
                                    ? `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Priority Tasks`
                                    : activeCategoryFilter
                                        ? `${activeCategoryFilter.charAt(0).toUpperCase() + activeCategoryFilter.slice(1)} Tasks`
                                        : 'All Tasks'}
                        </h3>

                        {isLoading ? (
                            <div className="loading-message">Loading tasks...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : filteredTasks.length === 0 ? (
                            <div className="empty-state">
                                <p>
                                    {activeFilter && activeCategoryFilter
                                        ? `No ${activeFilter} priority ${activeCategoryFilter} tasks found.`
                                        : activeFilter
                                            ? `No ${activeFilter} priority tasks found.`
                                            : activeCategoryFilter
                                                ? `No ${activeCategoryFilter} tasks found.`
                                                : "You don't have any tasks yet."
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="task-cards">
                                {filteredTasks.map(task => (
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
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;