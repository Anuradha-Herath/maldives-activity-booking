import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ActivityDetail = () => {
    const { id } = useParams();
    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState(1);

    // Dummy activity data
    const activityData = {
        1: {
            name: "Sunset Dolphin Cruise",
            category: "Marine Life",
            location: "North Male Atoll",
            price: 85,
            duration: "3 hours",
            rating: 4.8,
            description: "Experience the magic of Maldivian sunsets while watching playful dolphins in their natural habitat. Our expert guides will take you to the best spots where dolphins are frequently spotted, offering you an unforgettable wildlife encounter combined with breathtaking sunset views.",
            amenities: [
                "Professional snorkeling equipment",
                "Complimentary refreshments",
                "Experienced marine life guide",
                "Life jackets and safety equipment",
                "Underwater photography tips",
                "Light refreshments"
            ],
            islands: [
                { name: "Male", description: "Capital city departure point" },
                { name: "Hulhumale", description: "Airport island with easy access" },
                { name: "Maafushi", description: "Popular local island destination" }
            ],
            schedule: [
                "15:30 - Departure from jetty",
                "16:00 - Arrive at dolphin watching area",
                "16:30 - Dolphin spotting begins",
                "17:30 - Sunset viewing",
                "18:00 - Optional snorkeling",
                "18:30 - Return journey"
            ],
            includes: [
                "Hotel pickup and drop-off",
                "Experienced guide",
                "Snorkeling equipment",
                "Refreshments",
                "Life jackets"
            ],
            excludes: [
                "Gratuities",
                "Personal expenses",
                "Underwater camera rental",
                "Alcoholic beverages"
            ]
        }
    };

    const activity = activityData[id] || activityData[1]; // Fallback

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

    const handleReservation = (e) => {
        e.preventDefault();
        alert('Reservation submitted! Redirecting to booking confirmation.');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm">
                        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/activities" className="text-blue-600 hover:underline">Activities</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">{activity.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Activity Header */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h1 className="text-3xl font-bold mb-4">{activity.name}</h1>
                            <div className="flex items-center justify-between mb-4">
                                {renderStars(activity.rating)}
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {activity.category}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">📍 {activity.location}</p>
                            
                            {/* Activity Images */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="col-span-2 lg:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg h-64 flex items-center justify-center text-white">
                                    <span className="text-lg">📸 Main Activity Photo</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Equipment</span>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Location</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {activity.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Available Islands & Atolls */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Available Islands & Atolls</h2>
                            <div className="space-y-4">
                                {activity.islands.map((island, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="font-semibold">{island.name}</h3>
                                        <p className="text-gray-600">{island.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Daily Schedule</h2>
                            <div className="space-y-2">
                                {activity.schedule.map((item, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Includes & Excludes */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 text-green-600">✅ What's Included</h3>
                                    <ul className="space-y-2">
                                        {activity.includes.map((item, index) => (
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
                                        {activity.excludes.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-red-500 mr-2">✗</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <span className="text-3xl font-bold text-blue-600">${activity.price}</span>
                                <p className="text-gray-500">per person</p>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3 mb-6 pb-6 border-b">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium">{activity.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="font-medium">{activity.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Location:</span>
                                    <span className="font-medium">{activity.location}</span>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <form onSubmit={handleReservation} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                                    <input 
                                        type="date" 
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                    <select 
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        {[1,2,3,4,5,6].map(num => (
                                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Total Price */}
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex justify-between items-center">
                                        <span>Total ({guests} guest{guests > 1 ? 's' : ''})</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            ${(activity.price * guests).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Book Now
                                </button>
                            </form>

                            {/* Additional Actions */}
                            <div className="mt-4 space-y-2">
                                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                    Add to Custom Package
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    Contact for Info
                                </button>
                            </div>

                            {/* Policy Info */}
                            <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                                <p>• Free cancellation up to 24 hours before activity</p>
                                <p>• Weather dependent - full refund if cancelled due to weather</p>
                                <p>• Confirmation received at time of booking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
