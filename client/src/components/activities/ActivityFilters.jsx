import React, { useState, useEffect } from 'react';

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

    // Price presets for easier filtering
    const pricePresets = [
        { label: 'All', range: [0, 500] },
        { label: 'Under $50', range: [0, 50] },
        { label: '$50 - $100', range: [50, 100] },
        { label: '$100 - $200', range: [100, 200] },
        { label: '$200+', range: [200, 500] }
    ];
    
    // Duration presets for easier filtering
    const durationPresets = [
        { label: 'All', range: [0, 12] },
        { label: '0-2 hrs', range: [0, 2] },
        { label: '2-4 hrs', range: [2, 4] },
        { label: '4-8 hrs', range: [4, 8] },
        { label: '8+ hrs', range: [8, 12] }
    ];

    // Local state to keep track of slider values
    const [priceRange, setPriceRange] = useState(filters.priceRange);
    const [duration, setDuration] = useState(filters.duration);
    
    // Selected activity types
    const [selectedTypes, setSelectedTypes] = useState(filters.activityTypes || []);
    
    // Implement auto-filter with debounce
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onFilterChange({ priceRange, duration, activityTypes: selectedTypes });
        }, 500);
        
        return () => clearTimeout(debounceTimer);
    }, [priceRange, duration, selectedTypes]);

    // Update activity type filters
    const handleTypeChange = (type) => {
        const updatedTypes = selectedTypes.includes(type) 
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];
        
        setSelectedTypes(updatedTypes);
        onFilterChange({ activityTypes: updatedTypes });
    };    // Handle price range change
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
    
    // Handle direct input for price range
    const handlePriceInput = (e, index) => {
        const value = parseInt(e.target.value) || 0;
        const newPriceRange = [...priceRange];
        
        if (index === 0) {
            newPriceRange[0] = Math.min(value, newPriceRange[1]);
        } else {
            newPriceRange[1] = Math.max(value, newPriceRange[0]);
        }
        
        setPriceRange(newPriceRange);
    };
    
    // Apply price preset
    const applyPricePreset = (preset) => {
        setPriceRange([...preset.range]);
    };    // Handle duration change
    const handleDurationChange = (e, index) => {
        const newDuration = [...duration];
        newDuration[index] = parseFloat(e.target.value);
        
        // Ensure min <= max
        if (index === 0 && newDuration[0] > newDuration[1]) {
            newDuration[0] = newDuration[1];
        } else if (index === 1 && newDuration[1] < newDuration[0]) {
            newDuration[1] = newDuration[0];
        }
        
        setDuration(newDuration);
    };
    
    // Handle direct input for duration
    const handleDurationInput = (e, index) => {
        const value = parseFloat(e.target.value) || 0;
        const newDuration = [...duration];
        
        if (index === 0) {
            newDuration[0] = Math.min(value, newDuration[1]);
        } else {
            newDuration[1] = Math.max(value, newDuration[0]);
        }
        
        setDuration(newDuration);
    };
    
    // Apply duration preset
    const applyDurationPreset = (preset) => {
        setDuration([...preset.range]);
    };    // Reset all filters
    const resetFilters = () => {
        setPriceRange([0, 500]);
        setDuration([0, 12]);
        setSelectedTypes([]);
        // onFilterChange will be automatically triggered by the useEffect
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
            </div>            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 id="price-range-label" className="font-medium mb-3 text-gray-800">Price Range</h3>
                
                {/* Price presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {pricePresets.map((preset, index) => (
                        <button
                            key={index}
                            onClick={() => applyPricePreset(preset)}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
                
                <div className="px-2">                    {/* Price input fields */}
                    <div className="flex justify-between mb-4">
                        <div className="relative w-20">
                            <label htmlFor="min-price" className="sr-only">Minimum Price</label>
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                                id="min-price"
                                type="number"
                                min="0"
                                max="500"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceInput(e, 0)}
                                className="w-full pl-6 pr-2 py-1 border rounded text-sm"
                                aria-label="Minimum price"
                                placeholder="Min"
                            />
                        </div>
                        <span className="self-center text-gray-500">to</span>
                        <div className="relative w-20">
                            <label htmlFor="max-price" className="sr-only">Maximum Price</label>
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                                id="max-price"
                                type="number"
                                min="0"
                                max="500"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceInput(e, 1)}
                                className="w-full pl-6 pr-2 py-1 border rounded text-sm"
                                aria-label="Maximum price"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                    
                    {/* Price slider */}
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
                        <label htmlFor="price-min-slider" className="sr-only">Minimum price slider</label>
                        <input
                            id="price-min-slider"
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                            aria-labelledby="price-range-label"
                            aria-valuemin="0"
                            aria-valuemax="500"
                            aria-valuenow={priceRange[0]}
                        />
                        <label htmlFor="price-max-slider" className="sr-only">Maximum price slider</label>
                        <input
                            id="price-max-slider"
                            type="range"
                            min="0"
                            max="500"
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                            aria-labelledby="price-range-label"
                            aria-valuemin="0"
                            aria-valuemax="500"
                            aria-valuenow={priceRange[1]}
                        />
                    </div>
                </div>
            </div>            {/* Duration Filter */}
            <div className="mb-6">
                <h3 id="duration-range-label" className="font-medium mb-3 text-gray-800">Duration (hours)</h3>
                
                {/* Duration presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {durationPresets.map((preset, index) => (
                        <button
                            key={index}
                            onClick={() => applyDurationPreset(preset)}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                duration[0] === preset.range[0] && duration[1] === preset.range[1]
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
                
                <div className="px-2">                    {/* Duration inputs */}
                    <div className="flex justify-between mb-4">
                        <div className="w-16">
                            <label htmlFor="min-duration" className="sr-only">Minimum Duration</label>
                            <input
                                id="min-duration"
                                type="number"
                                min="0"
                                max="12"
                                step="0.5"
                                value={duration[0]}
                                onChange={(e) => handleDurationInput(e, 0)}
                                className="w-full px-2 py-1 border rounded text-sm"
                                aria-label="Minimum duration"
                                placeholder="Min"
                            />
                        </div>
                        <span className="self-center text-gray-500">to</span>
                        <div className="w-16">
                            <label htmlFor="max-duration" className="sr-only">Maximum Duration</label>
                            <input
                                id="max-duration"
                                type="number"
                                min="0"
                                max="12"
                                step="0.5"
                                value={duration[1]}
                                onChange={(e) => handleDurationInput(e, 1)}
                                className="w-full px-2 py-1 border rounded text-sm"
                                aria-label="Maximum duration"
                                placeholder="Max"
                            />
                        </div>
                        <span className="self-center text-sm text-gray-500">hours</span>
                    </div>
                    
                    {/* Duration slider */}
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
                        <label htmlFor="duration-min-slider" className="sr-only">Minimum duration slider</label>
                        <input
                            id="duration-min-slider"
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={duration[0]}
                            onChange={(e) => handleDurationChange(e, 0)}
                            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                            aria-labelledby="duration-range-label"
                            aria-valuemin="0"
                            aria-valuemax="12"
                            aria-valuenow={duration[0]}
                        />
                        <label htmlFor="duration-max-slider" className="sr-only">Maximum duration slider</label>
                        <input
                            id="duration-max-slider"
                            type="range"
                            min="0"
                            max="12"
                            step="0.5"
                            value={duration[1]}
                            onChange={(e) => handleDurationChange(e, 1)}
                            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer"
                            aria-labelledby="duration-range-label"
                            aria-valuemin="0"
                            aria-valuemax="12"
                            aria-valuenow={duration[1]}
                        />
                    </div>
                </div>
            </div>            {/* No Apply button needed - filters are applied automatically */}
        </div>
    );
};

export default ActivityFilters;
