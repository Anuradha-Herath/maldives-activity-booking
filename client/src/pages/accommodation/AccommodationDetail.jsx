import React from 'react';
import { useParams, Link } from 'react-router-dom';

const AccommodationDetail = () => {
    const { id } = useParams();

    // Dummy accommodation data
    const accommodationData = {
        1: {
            name: "Paradise Resort & Spa",
            type: "resort",
            location: "North Male Atoll",
            rating: 5,
            description: "Paradise Resort & Spa is a luxury beachfront resort offering world-class amenities and unparalleled service. Located in the pristine North Male Atoll, our resort provides the perfect escape for couples and families alike.",
            amenities: ["Spa", "Pool", "Restaurant", "Beach Access", "WiFi", "Room Service", "Fitness Center", "Water Sports"],
            rooms: [
                {
                    id: 101,
                    name: "Ocean View Room",
                    type: "Standard",
                    price: 450,
                    capacity: 2,
                    size: "35 sqm",
                    amenities: ["Ocean View", "King Bed", "Mini Bar", "Balcony"],
                    available: true
                },
                {
                    id: 102,
                    name: "Beach Villa",
                    type: "Villa",
                    price: 750,
                    capacity: 4,
                    size: "65 sqm",
                    amenities: ["Beach Access", "Private Pool", "2 Bedrooms", "Kitchen"],
                    available: true
                },
                {
                    id: 103,
                    name: "Overwater Bungalow",
                    type: "Premium",
                    price: 1200,
                    capacity: 2,
                    size: "75 sqm",
                    amenities: ["Overwater", "Glass Floor", "Private Deck", "Butler Service"],
                    available: false
                }
            ]
        }
    };

    const accommodation = accommodationData[id] || accommodationData[1]; // Fallback

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ⭐
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm">
                        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/accommodation" className="text-blue-600 hover:underline">Accommodation</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">{accommodation.name}</span>
                    </nav>
                </div>
            </div>

            {/* Accommodation Header */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-3xl font-bold mb-4">{accommodation.name}</h1>
                            <div className="flex items-center mb-4">
                                {renderStars(accommodation.rating)}
                                <span className="ml-2 text-gray-600">({accommodation.rating} Star {accommodation.type})</span>
                            </div>
                            <p className="text-gray-600 mb-6">📍 {accommodation.location}</p>
                            
                            {/* Image Gallery */}
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                <div className="col-span-2 lg:col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg h-64 flex items-center justify-center text-white">
                                    <span>📸 Main Resort Image</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Amenities</span>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg h-30 flex items-center justify-center text-white text-sm">
                                        <span>📸 Rooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info Sidebar */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">Resort Amenities</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {accommodation.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center text-sm">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">About {accommodation.name}</h2>
                    <p className="text-gray-700 leading-relaxed">{accommodation.description}</p>
                </div>

                {/* Room Listing */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-6">Available Rooms</h2>
                    <div className="space-y-6">
                        {accommodation.rooms.map(room => (
                            <div key={room.id} className={`border rounded-lg p-6 ${!room.available ? 'bg-gray-50 opacity-75' : ''}`}>
                                <div className="grid md:grid-cols-4 gap-4 items-center">
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{room.type} • {room.size} • Up to {room.capacity} guests</p>
                                        <div className="flex flex-wrap gap-2">
                                            {room.amenities.map((amenity, index) => (
                                                <span 
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-2xl font-bold text-blue-600">${room.price}</span>
                                        <p className="text-sm text-gray-500">per night</p>
                                    </div>
                                    <div className="text-center">
                                        {room.available ? (
                                            <div className="space-y-2">
                                                <Link 
                                                    to={`/accommodation/${id}/rooms/${room.id}`}
                                                    className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                                                >
                                                    View Room
                                                </Link>
                                                <Link 
                                                    to={`/accommodation/${id}/rooms/${room.id}/book`}
                                                    className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        ) : (
                                            <span className="text-red-500 font-medium">Not Available</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add to Custom Package Button */}
                <div className="mt-8 text-center">
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                        Add to Custom Travel Package
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetail;
