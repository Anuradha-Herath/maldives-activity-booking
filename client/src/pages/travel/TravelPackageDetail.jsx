import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TravelPackageDetail = () => {
    const { id } = useParams();
    const [selectedTab, setSelectedTab] = useState('itinerary');

    // Dummy package data
    const packageData = {
        1: {
            title: "Romantic Getaway Package",
            duration: "5 Days 4 Nights",
            price: 2500,
            destinations: ["Male", "Hulhumale", "Maafushi"],
            activities: ["Sunset Cruise", "Spa Treatment", "Beach Dinner", "Snorkeling"],
            hotels: ["Paradise Resort", "Ocean View Hotel"],
            itinerary: [
                {
                    day: 1,
                    title: "Arrival & Welcome",
                    activities: ["Airport pickup", "Check-in at Paradise Resort", "Welcome dinner", "Sunset viewing"]
                },
                {
                    day: 2,
                    title: "Island Exploration",
                    activities: ["Island hopping tour", "Snorkeling session", "Local lunch", "Beach relaxation"]
                },
                {
                    day: 3,
                    title: "Romantic Experience",
                    activities: ["Couple's spa treatment", "Private beach dinner", "Stargazing", "Night fishing"]
                },
                {
                    day: 4,
                    title: "Adventure Day",
                    activities: ["Water sports", "Dolphin watching", "Cultural visit", "Farewell party"]
                },
                {
                    day: 5,
                    title: "Departure",
                    activities: ["Final breakfast", "Souvenir shopping", "Airport transfer", "Departure"]
                }
            ],
            inclusions: [
                "Airport transfers",
                "4 nights accommodation",
                "All meals as per itinerary",
                "Guided tours and activities",
                "Snorkeling equipment",
                "Welcome drink"
            ],
            exclusions: [
                "International flights",
                "Travel insurance",
                "Personal expenses",
                "Optional activities",
                "Alcoholic beverages",
                "Tips and gratuities"
            ]
        }
    };

    const pkg = packageData[id] || packageData[1]; // Fallback to first package

    const tabs = [
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'summary', label: 'Tour Summary' },
        { id: 'inclusions', label: 'Inclusions & Exclusions' },
        { id: 'booking', label: 'Booking' }
    ];

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'itinerary':
                return (
                    <div className="space-y-6">
                        {pkg.itinerary.map((day, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                                <h3 className="text-xl font-semibold mb-2">Day {day.day}: {day.title}</h3>
                                <ul className="space-y-1">
                                    {day.activities.map((activity, actIndex) => (
                                        <li key={actIndex} className="text-gray-600">• {activity}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                );
            case 'summary':
                return (
                    <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">
                            Experience the perfect romantic getaway in the Maldives with our carefully curated 5-day package. 
                            This package combines luxury, adventure, and romance to create unforgettable memories.
                        </p>
                        <h3 className="text-lg font-semibold mb-2">Package Highlights:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-600">
                            <li>Private sunset cruise with champagne</li>
                            <li>Couple's spa treatment at luxury resort</li>
                            <li>Private beach dinner under the stars</li>
                            <li>Snorkeling in crystal clear waters</li>
                            <li>Cultural experience with local communities</li>
                            <li>Comfortable accommodation with ocean views</li>
                        </ul>
                    </div>
                );
            case 'inclusions':
                return (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-green-600">✅ What's Included</h3>
                            <ul className="space-y-2">
                                {pkg.inclusions.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-red-600">❌ What's Not Included</h3>
                            <ul className="space-y-2">
                                {pkg.exclusions.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case 'booking':
                return (
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Book This Package</h3>
                        <form className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                    <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                    <select className="w-full border border-gray-300 rounded-md p-2">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4 Guests</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                                <textarea 
                                    rows="3" 
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    placeholder="Any special requirements or requests..."
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                                    <span className="text-gray-500 ml-2">per person</span>
                                </div>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                    Book Now & Pay
                                </button>
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm">
                        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/travel-packages" className="text-blue-600 hover:underline">Travel Packages</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">{pkg.title}</span>
                    </nav>
                </div>
            </div>

            {/* Package Header */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center">
                                    <span className="font-medium">📅 {pkg.duration}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium">💰 ${pkg.price} per person</span>
                                </div>
                            </div>
                            
                            {/* Photos Section */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                <div className="col-span-2 lg:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg h-64 flex items-center justify-center text-white">
                                    <span>📸 Main Destination Photo</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Activities</span>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Hotels</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info Sidebar */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Package Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium">Destinations:</span>
                                    <p className="text-gray-600">{pkg.destinations.join(", ")}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Activities:</span>
                                    <p className="text-gray-600">{pkg.activities.join(", ")}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Hotels:</span>
                                    <p className="text-gray-600">{pkg.hotels.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md">
                    {/* Tab Navigation */}
                    <div className="border-b">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`py-4 border-b-2 font-medium text-sm ${
                                        selectedTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelPackageDetail;
