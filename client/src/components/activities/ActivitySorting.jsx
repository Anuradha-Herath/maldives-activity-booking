import React, { useState } from 'react';

const ActivitySorting = ({ sortOption, onSortChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const sortOptions = [
        { value: 'popularity', label: 'Popularity', icon: 'fa-fire' },
        { value: 'price-asc', label: 'Price: Low to High', icon: 'fa-arrow-up-short-wide' },
        { value: 'price-desc', label: 'Price: High to Low', icon: 'fa-arrow-down-wide-short' },
        { value: 'duration', label: 'Duration', icon: 'fa-clock' }
    ];
    
    const handleSelect = (value) => {
        onSortChange(value);
        setDropdownOpen(false);
    };
    
    // Find the current selected option label
    const currentOption = sortOptions.find(option => option.value === sortOption);
    
    return (
        <div className="relative">
            <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-700 mr-2 font-medium">Sort by:</label>
                <div className="relative">
                    <button 
                        type="button" 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center justify-between w-48 bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-3 py-2 transition-all hover:bg-gray-50"
                        aria-haspopup="true" 
                        aria-expanded={dropdownOpen}
                    >
                        <span className="flex items-center">
                            <i className={`fas ${currentOption?.icon} text-blue-600 mr-2`}></i>
                            {currentOption?.label}
                        </span>
                        <i className={`fas fa-chevron-down ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    {dropdownOpen && (
                        <>
                            <div 
                                className="fixed inset-0 z-10"
                                onClick={() => setDropdownOpen(false)}
                                aria-hidden="true"
                            ></div>
                            <div 
                                className="absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 transition-all transform origin-top-right"
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSelect(option.value)}
                                            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
                                                sortOption === option.value
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                            role="menuitem"
                                        >
                                            <i className={`fas ${option.icon} ${
                                                sortOption === option.value ? 'text-blue-600' : 'text-gray-400'
                                            } mr-3 w-5`}></i>
                                            {option.label}
                                            {sortOption === option.value && (
                                                <i className="fas fa-check ml-auto text-blue-600"></i>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivitySorting;
