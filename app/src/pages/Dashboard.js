import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import FilterSectionComponent from '../components/FilterSectionComponent';
import TaskBody from '../components/TaskBody';
import '../styles/Dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [activeCategoryFilter, setActiveCategoryFilter] = useState(null);
    const [activeSort, setActiveSort] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        let filtered = [...tasks];

        // Apply search filter if search term exists
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(term) ||
                (task.description && task.description.toLowerCase().includes(term))
            );
        }

        // Apply priority filter if set
        if (activeFilter) {
            filtered = filtered.filter(task => task.priority === activeFilter);
        }

        // Apply category filter if set
        if (activeCategoryFilter) {
            filtered = filtered.filter(task => task.category === activeCategoryFilter);
        }

        // Apply sorting if set
        if (activeSort) {
            filtered = applySorting(filtered, activeSort);
        }

        setFilteredTasks(filtered);
    }, [tasks, activeFilter, activeCategoryFilter, activeSort, searchTerm]);

    // sorting functions
    const applySorting = (tasks, sortOption) => {
        switch (sortOption) {
            case 'dueDate-asc':
                return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            case 'dueDate-desc':
                return [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
            case 'createdAt-asc':
                return [...tasks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'createdAt-desc':
                return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            default:
                return tasks;
        }
    };

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

    // Function to delete a task
    const deleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/delete-task/${taskId}`);

                setTasks(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
                alert('Task deleted successfully');
            } catch (err) {
                console.error('Error deleting task:', err);
                alert(err.response?.data?.message || 'Failed to delete task');
            }
        }
    };

    const clearAllFilters = () => {
        setActiveFilter(null);
        setActiveCategoryFilter(null);
        setActiveSort(null);
        setSearchTerm('');
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Your Tasks</h1>
            </header>

            <main className="dashboard-content">
                <div className="dashboard-layout">
                    <FilterSectionComponent
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        activeCategoryFilter={activeCategoryFilter}
                        setActiveCategoryFilter={setActiveCategoryFilter}
                        activeSort={activeSort}
                        setActiveSort={setActiveSort}
                        searchTerm={searchTerm}
                        clearAllFilters={clearAllFilters}
                    />

                    <TaskBody
                        filteredTasks={filteredTasks}
                        activeFilter={activeFilter}
                        activeCategoryFilter={activeCategoryFilter}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        isLoading={isLoading}
                        error={error}
                        clearSearch={clearSearch}
                        deleteTask={deleteTask}
                    />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;