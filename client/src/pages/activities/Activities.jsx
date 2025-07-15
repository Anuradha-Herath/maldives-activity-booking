import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Activities = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');

    // Dummy activities data
    const activities = [
        {
            id: 1,
            name: "Sunset Dolphin Cruise",
            category: "Marine Life",
            location: "North Male Atoll",
            price: 85,
            duration: "3 hours",
            rating: 4.8,
            image: "/images/dolphin-cruise.jpg",
            amenities: ["Snorkeling Equipment", "Refreshments", "Guide", "Life Jackets"],
            description: "Experience the magic of Maldivian sunsets while watching playful dolphins in their natural habitat.",
            islands: ["Male", "Hulhumale", "Maafushi"]
        },
        {
            id: 2,
            name: "Scuba Diving Adventure",
            category: "Water Sports",
            location: "South Ari Atoll",
            price: 120,
            duration: "4 hours",
            rating: 4.9,
            image: "/images/scuba-diving.jpg",
            amenities: ["Full Equipment", "Certified Instructor", "Underwater Camera", "Certificate"],
            description: "Explore the vibrant underwater world of the Maldives with our professional diving team.",
            islands: ["Dhigurah", "Mahibadhoo"]
        },
        {
            id: 3,
            name: "Island Hopping Tour",
            category: "Sightseeing",
            location: "Lhaviyani Atoll",
            price: 95,
            duration: "Full Day",
            rating: 4.7,
            image: "/images/island-hopping.jpg",
            amenities: ["Boat Transfer", "Lunch", "Snorkeling", "Guide"],
            description: "Discover multiple pristine islands and experience local culture in this comprehensive tour.",
            islands: ["Hinnavaru", "Naifaru", "Maafilaafushi"]
        },
        {
            id: 4,
            name: "Spa & Wellness Retreat",
            category: "Wellness",
            location: "Baa Atoll",
            price: 200,
            duration: "4 hours",
            rating: 4.9,
            image: "/images/spa-retreat.jpg",
            amenities: ["Spa Treatment", "Yoga Session", "Healthy Lunch", "Meditation"],
            description: "Rejuvenate your mind and body with traditional Maldivian spa treatments and wellness activities.",
            islands: ["Dharavandhoo", "Kamadhoo"]
        },
        {
            id: 5,
            name: "Night Fishing Experience",
            category: "Fishing",
            location: "Vaavu Atoll",
            price: 60,
            duration: "4 hours",
            rating: 4.6,
            image: "/images/night-fishing.jpg",
            amenities: ["Fishing Equipment", "Boat", "Guide", "Fish Cooking"],
            description: "Try traditional Maldivian night fishing and enjoy your catch prepared by local chefs.",
            islands: ["Felidhoo", "Fulidhoo"]
        }
    ];

    const categories = ['all', 'Marine Life', 'Water Sports', 'Sightseeing', 'Wellness', 'Fishing'];
    const locations = ['all', 'North Male Atoll', 'South Ari Atoll', 'Lhaviyani Atoll', 'Baa Atoll', 'Vaavu Atoll'];

    const filteredActivities = activities.filter(activity => {
        const categoryMatch = selectedCategory === 'all' || activity.category === selectedCategory;
        const locationMatch = selectedLocation === 'all' || activity.location === selectedLocation;
        return categoryMatch && locationMatch;
    });

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        return (
            <div className="flex items-center">
                {Array.from({ length: fullStars }, (_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                ))}
                {hasHalfStar && <span className="text-yellow-400">⭐</span>}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Activities & Experiences</h1>
                    <p className="text-xl">Discover unforgettable adventures and authentic experiences in the Maldives</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Filter Activities</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {category === 'all' ? 'All Categories' : category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <select 
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                {locations.map(location => (
                                    <option key={location} value={location}>
                                        {location === 'all' ? 'All Locations' : location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActivities.map(activity => (
                        <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Activity Image */}
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                <span className="text-lg">📸 {activity.name}</span>
                            </div>
                            
                            {/* Activity Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
                                <div className="flex items-center justify-between mb-2">
                                    {renderStars(activity.rating)}
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {activity.category}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 mb-3">📍 {activity.location}</p>
                                <p className="text-gray-700 text-sm mb-4">{activity.description}</p>
                                
                                {/* Activity Details */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-medium">{activity.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Available Islands:</span>
                                        <span className="font-medium">{activity.islands.length} locations</span>
                                    </div>
                                </div>
                                
                                {/* Amenities Preview */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {activity.amenities.slice(0, 3).map((amenity, index) => (
                                            <span 
                                                key={index}
                                                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                        {activity.amenities.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{activity.amenities.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Price and Actions */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-blue-600">${activity.price}</span>
                                        <span className="text-sm text-gray-500"> per person</span>
                                    </div>
                                    <Link 
                                        to={`/activities/${activity.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No activities found</h3>
                        <p className="text-gray-500">Try adjusting your filters to see more options.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Activities;
