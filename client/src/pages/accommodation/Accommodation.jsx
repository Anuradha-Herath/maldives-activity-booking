import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Accommodation = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Dummy accommodation data
    const accommodations = [
        {
            id: 1,
            name: "Paradise Resort & Spa",
            type: "resort",
            location: "North Male Atoll",
            rating: 5,
            priceFrom: 450,
            image: "/images/paradise-resort.jpg",
            amenities: ["Spa", "Pool", "Restaurant", "Beach Access", "WiFi"],
            description: "Luxury beachfront resort with world-class amenities"
        },
        {
            id: 2,
            name: "Ocean View Guesthouse",
            type: "guesthouse",
            location: "Maafushi",
            rating: 4,
            priceFrom: 120,
            image: "/images/ocean-guesthouse.jpg",
            amenities: ["WiFi", "Air Conditioning", "Breakfast", "Beach Access"],
            description: "Cozy guesthouse with stunning ocean views"
        },
        {
            id: 3,
            name: "Sunset Villa Resort",
            type: "resort",
            location: "South Ari Atoll",
            rating: 5,
            priceFrom: 650,
            image: "/images/sunset-villa.jpg",
            amenities: ["Private Pool", "Butler Service", "Spa", "Restaurant", "Water Sports"],
            description: "Exclusive villa resort with overwater bungalows"
        },
        {
            id: 4,
            name: "Coral Beach Guesthouse",
            type: "guesthouse",
            location: "Hulhumale",
            rating: 4,
            priceFrom: 80,
            image: "/images/coral-beach.jpg",
            amenities: ["WiFi", "Restaurant", "Tour Desk", "Bicycle Rental"],
            description: "Budget-friendly accommodation near the beach"
        }
    ];

    const filteredAccommodations = activeFilter === 'all' 
        ? accommodations 
        : accommodations.filter(acc => acc.type === activeFilter);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ⭐
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Accommodation</h1>
                    <p className="text-xl">Find the perfect place to stay in the Maldives</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filter Tabs */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setActiveFilter('all')}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                activeFilter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            All Accommodations
                        </button>
                        <button
                            onClick={() => setActiveFilter('resort')}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                activeFilter === 'resort'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Resorts
                        </button>
                        <button
                            onClick={() => setActiveFilter('guesthouse')}
                            className={`px-6 py-2 rounded-full transition-colors ${
                                activeFilter === 'guesthouse'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Guesthouses
                        </button>
                    </div>
                </div>

                {/* Accommodation Listing */}
                <div className="space-y-6">
                    {filteredAccommodations.map(acc => (
                        <div key={acc.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:flex">
                                {/* Image */}
                                <div className="md:w-1/3">
                                    <div className="h-64 md:h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white">
                                        <span className="text-lg">📸 {acc.name}</span>
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="md:w-2/3 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{acc.name}</h3>
                                            <div className="flex items-center mb-2">
                                                {renderStars(acc.rating)}
                                                <span className="ml-2 text-sm text-gray-600">({acc.rating} Star)</span>
                                            </div>
                                            <p className="text-gray-600 mb-2">📍 {acc.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-blue-600">${acc.priceFrom}</span>
                                            <p className="text-sm text-gray-500">per night</p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-700 mb-4">{acc.description}</p>
                                    
                                    {/* Amenities */}
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Amenities:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {acc.amenities.map((amenity, index) => (
                                                <span 
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <Link 
                                            to={`/accommodation/${acc.id}`}
                                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Accommodation;
