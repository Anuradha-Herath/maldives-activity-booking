import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TravelPackages = () => {
    const [filters, setFilters] = useState({
        duration: '',
        priceRange: '',
        category: ''
    });

    // Dummy data for travel packages
    const packages = [
        {
            id: 1,
            title: "Romantic Getaway Package",
            duration: "5 Days 4 Nights",
            price: 2500,
            image: "/images/romantic-package.jpg",
            destinations: ["Male", "Hulhumale", "Maafushi"],
            category: "Romance"
        },
        {
            id: 2,
            title: "Adventure Explorer Package",
            duration: "7 Days 6 Nights",
            price: 3200,
            image: "/images/adventure-package.jpg",
            destinations: ["Male", "Fulidhoo", "Gulhi"],
            category: "Adventure"
        },
        {
            id: 3,
            title: "Family Fun Package",
            duration: "6 Days 5 Nights",
            price: 2800,
            image: "/images/family-package.jpg",
            destinations: ["Male", "Maafushi", "Huraa"],
            category: "Family"
        },
        {
            id: 4,
            title: "Luxury Escape Package",
            duration: "4 Days 3 Nights",
            price: 4500,
            image: "/images/luxury-package.jpg",
            destinations: ["Male", "Private Resort"],
            category: "Luxury"
        }
    ];

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Travel Packages</h1>
                    <p className="text-xl">Discover our curated travel packages for the perfect Maldivian experience</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Filter Packages</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <select 
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={filters.duration}
                                onChange={(e) => handleFilterChange('duration', e.target.value)}
                            >
                                <option value="">All Durations</option>
                                <option value="3-4">3-4 Days</option>
                                <option value="5-6">5-6 Days</option>
                                <option value="7+">7+ Days</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <select 
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            >
                                <option value="">All Prices</option>
                                <option value="budget">Under $2000</option>
                                <option value="mid">$2000 - $3500</option>
                                <option value="luxury">$3500+</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select 
                                className="w-full border border-gray-300 rounded-md p-2"
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Romance">Romance</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Family">Family</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Package Listing */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                <span className="text-lg">📸 Package Image</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                                <p className="text-gray-600 mb-2">{pkg.duration}</p>
                                <p className="text-2xl font-bold text-blue-600 mb-3">${pkg.price} <span className="text-sm text-gray-500">per person</span></p>
                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">Destinations: </span>
                                    <span className="text-sm">{pkg.destinations.join(", ")}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{pkg.category}</span>
                                    <Link 
                                        to={`/travel-packages/${pkg.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelPackages;
