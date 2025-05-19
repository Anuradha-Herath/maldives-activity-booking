import React, { useState } from 'react';

const ActivityTabs = ({ activity }) => {
    const [activeTab, setActiveTab] = useState('description');
    
    // Mock data for inclusions and requirements
    const inclusions = [
        "Professional English-speaking guide",
        "Hotel pickup and drop-off",
        "All equipment needed for the activity",
        "Bottled water and refreshments",
        "Safety briefing",
        "Insurance"
    ];
    
    const requirements = [
        "Minimum age: 8 years",
        "Good physical condition",
        "Swimwear and towel",
        "Sunscreen and sunglasses",
        "Comfortable clothing"
    ];
    
    // Location coordinates for the map (mock data)
    const mapCoordinates = {
        lat: 4.1755 + (Math.random() * 0.05),
        lng: 73.5093 + (Math.random() * 0.05)
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex border-b">
                <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'inclusions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('inclusions')}
                >
                    Inclusions
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'requirements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('requirements')}
                >
                    Requirements
                </button>
                <button 
                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'location' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                    onClick={() => setActiveTab('location')}
                >
                    Location
                </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'description' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">About This Activity</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {activity.description}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Experience the beauty of the Maldives with this amazing {activity.type.replace('-', ' ')} activity. 
                            Perfect for travelers looking to make unforgettable memories in one of the world's most beautiful destinations.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Our experienced guides will ensure your safety and enjoyment throughout the {activity.duration}-hour experience.
                            Don't forget to bring your camera to capture the stunning vistas and magical moments!
                        </p>
                    </div>
                )}
                
                {activeTab === 'inclusions' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">What's Included</h3>
                        <ul className="space-y-2">
                            {inclusions.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {activeTab === 'requirements' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Requirements</h3>
                        <ul className="space-y-2">
                            {requirements.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {activeTab === 'location' && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Activity Location</h3>
                        <p className="text-gray-700 mb-4">
                            This activity takes place in {activity.location}, known for its stunning beaches and crystal clear waters.
                        </p>
                        
                        {/* Map Placeholder - In a real app, you'd use react-leaflet */}
                        <div className="border border-gray-300 rounded-lg h-96 overflow-hidden relative bg-blue-50">
                            <div className="absolute inset-0 flex justify-center items-center">
                                <div className="text-center">
                                    <p className="text-blue-700 font-medium mb-2">Map of {activity.location}</p>
                                    <p className="text-gray-600 text-sm">Coordinates: {mapCoordinates.lat.toFixed(4)}, {mapCoordinates.lng.toFixed(4)}</p>
                                    <p className="text-gray-500 text-xs mt-2">(In a real app, a map would be displayed here using react-leaflet)</p>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                                <div className="flex items-center text-gray-700 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Activity starting point
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Meeting Point</h4>
                            <p className="text-gray-700">You'll meet our guide at the main lobby of your resort or a designated pickup point. Exact meeting instructions will be provided after booking.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityTabs;
