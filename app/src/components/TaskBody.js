import React from 'react';
import { useNavigate } from 'react-router-dom';

function TaskBody({
    filteredTasks,
    activeFilter,
    activeCategoryFilter,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    clearSearch
}) {
    const navigate = useNavigate();

    // format the heading based on filters
    const getHeadingText = () => {
        if (activeFilter && activeCategoryFilter) {
            return `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Priority ${activeCategoryFilter.charAt(0).toUpperCase() + activeCategoryFilter.slice(1)} Tasks`;
        } else if (activeFilter) {
            return `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Priority Tasks`;
        } else if (activeCategoryFilter) {
            return `${activeCategoryFilter.charAt(0).toUpperCase() + activeCategoryFilter.slice(1)} Tasks`;
        } else {
            return 'All Tasks';
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="tasks-container">
            <h3>{getHeadingText()}</h3>

            {/* Search and Add Task */}
            <div className="task-actions-row">
                {/* Search bar */}
                <div className="task-search-container">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search in titles and descriptions..."
                            className="task-search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {searchTerm && (
                            <button className="search-clear-btn" onClick={clearSearch}>
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Add New Task button */}
                <button
                    className="add-task-btn"
                    onClick={() => navigate('/add-task')}
                >
                    <span className="plus-icon">+</span> Add New Task
                </button>
            </div>

            {isLoading ? (
                <div className="loading-message">Loading tasks...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <p>
                        {searchTerm
                            ? `No tasks matching "${searchTerm}" found.`
                            : activeFilter && activeCategoryFilter
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

                            {/* Task action buttons */}
                            <div className="task-actions">
                                <button className="task-btn details-btn">
                                    Details
                                </button>
                                <button className="task-btn delete-btn">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskBody;