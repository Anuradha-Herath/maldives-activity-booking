import React, { useState } from 'react';

const ActivityFilters = ({ filters, onFilterChange }) => {
    const activityTypes = [
        { id: 'water-sports', name: 'Water Sports' },
        { id: 'diving', name: 'Diving & Snorkeling' },
        { id: 'cruises', name: 'Cruises & Boat Tours' },
        { id: 'island-tours', name: 'Island Tours' },
        { id: 'adventure', name: 'Adventure Activities' },
        { id: 'wellness', name: 'Wellness & Spa' },
        { id: 'cultural', name: 'Cultural Experiences' }
    ];

    // Local state to keep track of slider values
    const [priceRange, setPriceRange] = useState(filters.priceRange);
    const [duration, setDuration] = useState(filters.duration);
    
    // Selected activity types
    const [selectedTypes, setSelectedTypes] = useState(filters.activityTypes || []);

    // Update activity type filters
    const handleTypeChange = (type) => {
        const updatedTypes = selectedTypes.includes(type) 
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
        
        setSelectedTypes(updatedTypes);
        onFilterChange({ activityTypes: updatedTypes });
    };

    // Handle price range change
    const handlePriceChange = (e, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = parseInt(e.target.value);
        
        // Ensure min <= max
        if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
            newPriceRange[0] = newPriceRange[1];
        } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
            newPriceRange[1] = newPriceRange[0];
        }
        
        setPriceRange(newPriceRange);
    };

    // Apply price filter when slider stops
    const handlePriceChangeComplete = () => {
        onFilterChange({ priceRange });
    };

    // Handle duration change
    const handleDurationChange = (e, index) => {
        const newDuration = [...duration];
        newDuration[index] = parseInt(e.target.value);
        
        // Ensure min <= max
        if (index === 0 && newDuration[0] > newDuration[1]) {
            newDuration[0] = newDuration[1];
        } else if (index === 1 && newDuration[1] < newDuration[0]) {
            newDuration[1] = newDuration[0];
        }
        
        setDuration(newDuration);
    };

    // Apply duration filter when slider stops
    const handleDurationChangeComplete = () => {
        onFilterChange({ duration });
    };

    // Reset all filters
    const resetFilters = () => {
        setPriceRange([0, 500]);
        setDuration([0, 12]);
        setSelectedTypes([]);
        onFilterChange({
            activityTypes: [],
            priceRange: [0, 500],
            duration: [0, 12]
        });
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 sticky top-24">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-blue-800">Filters</h2>
                <button 
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Reset All
                </button>
            </div>

            {/* Activity Types */}
            <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800">Activity Type</h3>
                <div className="space-y-2">
                    {activityTypes.map((type) => (
                        <div key={type.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`type-${type.id}`}
                                checked={selectedTypes.includes(type.id)}
                                onChange={() => handleTypeChange(type.id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`type-${type.id}`} className="ml-2 text-sm text-gray-700">
                                {type.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800">Price Range</h3>
                <div className="px-2">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                    <div className="relative mb-4 h-2 bg-gray-200 rounded">
                        <div 
                            className="absolute h-2 bg-blue-500 rounded" 
                            style={{
                                left: `${(priceRange[0] / 500) * 100}%`, 
                                width: `${((priceRange[1] - priceRange[0]) / 500) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            onMouseUp={handlePriceChangeComplete}
                            onTouchEnd={handlePriceChangeComplete}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            onMouseUp={handlePriceChangeComplete}
                            onTouchEnd={handlePriceChangeComplete}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Duration Filter */}
            <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-800">Duration (hours)</h3>
                <div className="px-2">
                    <div className="flex justify-between mb-2 text-sm text-gray-600">
                        <span>{duration[0]} hr</span>
                        <span>{duration[1]} hr</span>
                    </div>
                    <div className="relative mb-4 h-2 bg-gray-200 rounded">
                        <div 
                            className="absolute h-2 bg-blue-500 rounded" 
                            style={{
                                left: `${(duration[0] / 12) * 100}%`, 
                                width: `${((duration[1] - duration[0]) / 12) * 100}%`
                            }}
                        ></div>
                    </div>
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={duration[0]}
                            onChange={(e) => handleDurationChange(e, 0)}
                            onMouseUp={handleDurationChangeComplete}
                            onTouchEnd={handleDurationChangeComplete}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                        <input
                            type="range"
                            min="0"
                            max="12"
                            value={duration[1]}
                            onChange={(e) => handleDurationChange(e, 1)}
                            onMouseUp={handleDurationChangeComplete}
                            onTouchEnd={handleDurationChangeComplete}
                            className="absolute w-full h-2 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            
            <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => {
                    onFilterChange({ priceRange, duration, activityTypes: selectedTypes });
                }}
            >
                Apply Filters
            </button>
        </div>
    );
};

export default ActivityFilters;
