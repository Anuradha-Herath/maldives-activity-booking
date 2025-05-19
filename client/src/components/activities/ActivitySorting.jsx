import React from 'react';

const ActivitySorting = ({ sortOption, onSortChange }) => {
    const handleChange = (e) => {
        onSortChange(e.target.value);
    };
    
    return (
        <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-700 mr-2">Sort by:</label>
            <select
                id="sort"
                value={sortOption}
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2"
            >
                <option value="popularity">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration</option>
            </select>
        </div>
    );
};

export default ActivitySorting;
