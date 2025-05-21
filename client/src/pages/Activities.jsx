import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActivityFilters from '../components/activities/ActivityFilters';
import ActivitySorting from '../components/activities/ActivitySorting';
import ActivityList from '../components/activities/ActivityList';
import { activitiesAPI } from '../utils/api';

const Activities = () => {
    const location = useLocation();
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filters, setFilters] = useState({
        activityTypes: [],
        priceRange: [0, 500],
        duration: [0, 12]
    });
    
    const [sortOption, setSortOption] = useState('popularity');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);    // Fetch activities from the backend API
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // include category query for server filter
                const params = {};
                const category = new URLSearchParams(location.search).get('category');
                if (category) params.type = category;
                const response = await activitiesAPI.getAll(params);
                
                // Check if response has the expected structure
                if (response.data && response.data.data) {
                    setActivities(response.data.data);
                    setFilteredActivities(response.data.data);
                } else {
                    console.error('Unexpected API response structure:', response);
                    setError('Received unexpected data format from server.');
                }
            } catch (err) {
                console.error('Error fetching activities:', err);
                setError('Failed to load activities. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchActivities();
    }, [location.search]);

    // Apply filters and sorting whenever they change
    useEffect(() => {
        if (activities.length > 0) {
            let result = [...activities];
            
            // Apply activity type filter
            if (filters.activityTypes.length > 0) {
                result = result.filter(activity => 
                    filters.activityTypes.includes(activity.type)
                );
            }
            
            // Apply price range filter
            result = result.filter(
                activity => activity.price >= filters.priceRange[0] && 
                            activity.price <= filters.priceRange[1]
            );
            
            // Apply duration filter
            result = result.filter(
                activity => activity.duration >= filters.duration[0] && 
                            activity.duration <= filters.duration[1]
            );
            
            // Apply sorting
            switch (sortOption) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'duration':
                    result.sort((a, b) => a.duration - b.duration);
                    break;
                case 'popularity':
                default:
                    result.sort((a, b) => b.rating - a.rating);
                    break;
            }
            
            setFilteredActivities(result);
        }
    }, [activities, filters, sortOption]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // Handle sort changes
    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-700 font-display">Maldives Activities</h1>
                    <p className="text-gray-600 mt-2">Discover and book the best experiences in the Maldives</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <ActivityFilters 
                            filters={filters} 
                            onFilterChange={handleFilterChange} 
                        />
                    </div>
                    
                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        {/* Sorting and Results Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow">
                            <p className="text-gray-700 mb-3 sm:mb-0">
                                {filteredActivities.length} activities found
                            </p>
                            <ActivitySorting 
                                sortOption={sortOption} 
                                onSortChange={handleSortChange} 
                            />
                        </div>
                          {/* Activity Listings */}
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-md text-center">
                                <p className="text-lg font-medium">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <ActivityList activities={filteredActivities} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;
