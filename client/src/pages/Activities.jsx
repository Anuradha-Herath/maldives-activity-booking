import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActivityFilters from '../components/activities/ActivityFilters';
import ActivitySorting from '../components/activities/ActivitySorting';
import ActivityList from '../components/activities/ActivityList';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { activitiesAPI } from '../utils/api';

const Activities = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [filters, setFilters] = useState({
        activityTypes: [],
        priceRange: [0, 500],
        duration: [0, 12]
    });
    
    const [sortOption, setSortOption] = useState('popularity');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Parse URL search parameters
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const dateParam = queryParams.get('date');
    const typeParam = queryParams.get('type');
    const locationParam = queryParams.get('location');
    const categoryParam = queryParams.get('category');
    
    // Fetch activities from the backend API with search params
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Build params object from URL query parameters
                const params = {};
                
                // Handle activity type from either type or category param
                const type = typeParam || categoryParam;
                if (type) params.type = type;
                
                // Handle location search
                if (locationParam) params.location = locationParam;
                  // If there's a search term, we'll filter results client-side
                const response = await activitiesAPI.getAll(params);
                
                // Set initial data - ensure response data exists and has the expected structure
                const activitiesData = response?.data?.data || [];
                setActivities(activitiesData);
                
                // Handle client-side filtering for search term
                let filtered = activitiesData;
                if (searchQuery) {
                    filtered = activitiesData.filter(activity => 
                        activity?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        activity?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        activity?.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                }
                
                // Update active filters based on URL parameters
                const updatedFilters = {...filters};
                if (type) {
                    updatedFilters.activityTypes = [type];
                }
                setFilters(updatedFilters);
                
                setFilteredActivities(filtered);
            } catch (err) {
                console.error('Error fetching activities:', err);
                setError('Failed to load activities. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchActivities();
    }, [location.search]);
      // Apply filters, search query, and sorting whenever relevant values change
    useEffect(() => {
        if (activities && activities.length > 0) {
            let result = [...activities];
            // Apply search query filter first
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                result = result.filter(activity =>
                    activity?.title?.toLowerCase().includes(q) ||
                    activity?.description?.toLowerCase().includes(q) ||
                    activity?.shortDescription?.toLowerCase().includes(q)
                );
            }
            // Apply activity type filter
            if (filters.activityTypes && filters.activityTypes.length > 0) {
                result = result.filter(activity => filters.activityTypes.includes(activity?.type));
            }
             
             // Apply price range filter
             result = result.filter(
                 activity => (activity?.price || 0) >= filters.priceRange[0] && 
                             (activity?.price || 0) <= filters.priceRange[1]
             );
             
             // Apply duration filter
             result = result.filter(
                 activity => (activity?.duration || 0) >= filters.duration[0] && 
                             (activity?.duration || 0) <= filters.duration[1]
             );
             
             // Apply sorting
             switch (sortOption) {
                 case 'price-asc':
                     result.sort((a, b) => (a?.price || 0) - (b?.price || 0));
                     break;
                 case 'price-desc':
                     result.sort((a, b) => (b?.price || 0) - (a?.price || 0));
                     break;
                 case 'duration':
                     result.sort((a, b) => (a?.duration || 0) - (b?.duration || 0));
                     break;
                 case 'popularity':
                 default:
                     result.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
                     break;
             }
             
             setFilteredActivities(result);
         }
    }, [activities, filters, sortOption, searchQuery]);

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
                    <div className="w-full lg:w-3/4">                        {/* Search Info and Results Count */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-lg shadow transition-all hover:shadow-md">
                            <div>
                                {searchQuery && (
                                    <div className="mb-2">
                                        <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full mr-2">
                                            <i className="fas fa-search mr-1"></i> {searchQuery}
                                        </span>
                                        {typeParam && (
                                            <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full mr-2">
                                                <i className="fas fa-tag mr-1"></i> {typeParam.replace('-', ' ')}
                                            </span>
                                        )}
                                        {locationParam && (
                                            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                                <i className="fas fa-map-marker-alt mr-1"></i> {locationParam}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <p className="text-gray-700 mb-3 sm:mb-0 font-medium">
                                    <span className="text-2xl font-bold text-blue-600 mr-1">{filteredActivities.length}</span> 
                                    activities found {searchQuery && <span>for <span className="italic">"{searchQuery}"</span></span>}
                                </p>
                            </div>
                            <ActivitySorting 
                                sortOption={sortOption} 
                                onSortChange={handleSortChange} 
                            />
                        </div>                        {/* Activity Listings */}
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                                <p className="text-blue-600 font-medium animate-pulse">Finding perfect activities for you...</p>
                                {searchQuery && (
                                    <p className="text-gray-500 mt-2">Searching for "{searchQuery}"</p>
                                )}
                            </div>
                        ): error ? (
                            <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow-md text-center">
                                <p className="text-lg font-medium">{error}</p>
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>                        ) : (
                            <ErrorBoundary>
                                <ActivityList activities={filteredActivities} />
                            </ErrorBoundary>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activities;
