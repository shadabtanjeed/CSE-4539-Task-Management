import React from 'react';

function FilterSectionComponent({
    activeFilter,
    setActiveFilter,
    activeCategoryFilter,
    setActiveCategoryFilter,
    activeSort,
    setActiveSort,
    searchTerm,
    clearAllFilters
}) {
    const handleFilterClick = (priority) => {
        if (activeFilter === priority) {
            setActiveFilter(null);
        } else {
            setActiveFilter(priority);
        }
    };

    const handleCategoryFilter = (category) => {
        if (activeCategoryFilter === category) {
            setActiveCategoryFilter(null);
        } else {
            setActiveCategoryFilter(category);
        }
    };

    const handleSortChange = (sortOption) => {
        if (sortOption === '') {
            setActiveSort(null);
        } else {
            setActiveSort(sortOption);
        }
    };

    return (
        <div className="filter-sidebar">
            <h3>Filters</h3>

            {/* Sort Section with Dropdown */}
            <div className="filter-group">
                <h4>Sort By</h4>
                <select
                    className="sort-dropdown"
                    value={activeSort || ''}
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="">Default Order</option>
                    <option value="dueDate-asc">Due Date (Earliest)</option>
                    <option value="dueDate-desc">Due Date (Latest)</option>
                    <option value="createdAt-asc">Creation Date (Oldest First)</option>
                    <option value="createdAt-desc">Creation Date (Newest First)</option>
                </select>
            </div>

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

            {/* Category Filter Section */}
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

            {/* Clear Filters Button */}
            <button
                className="clear-filters-btn"
                onClick={clearAllFilters}
                disabled={!activeFilter && !activeCategoryFilter && !activeSort && !searchTerm}
            >
                Clear All Filters
            </button>
        </div>
    );
}

export default FilterSectionComponent;