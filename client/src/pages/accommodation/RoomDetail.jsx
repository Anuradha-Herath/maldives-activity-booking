import React from 'react';
import { useParams, Link } from 'react-router-dom';

const RoomDetail = () => {
    const { id, roomId } = useParams();

    // Dummy room data
    const roomData = {
        101: {
            name: "Ocean View Room",
            type: "Standard",
            price: 450,
            capacity: 2,
            size: "35 sqm",
            description: "Elegantly designed room with stunning ocean views. Perfect for couples seeking a romantic getaway with modern amenities and breathtaking sunset views.",
            amenities: ["Ocean View", "King Bed", "Mini Bar", "Balcony", "Air Conditioning", "WiFi", "Safe", "Coffee Machine"],
            features: [
                "Floor-to-ceiling windows",
                "Private balcony with ocean view",
                "Marble bathroom with rain shower",
                "Work desk with ergonomic chair",
                "Complimentary WiFi",
                "24/7 room service"
            ]
        }
    };

    const room = roomData[roomId] || roomData[101]; // Fallback
    const accommodationName = "Paradise Resort & Spa"; // This would come from parent data

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
                        <Link to={`/accommodation/${id}`} className="text-blue-600 hover:underline">{accommodationName}</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">{room.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
                        <p className="text-lg text-gray-600 mb-6">{room.type} Room at {accommodationName}</p>

                        {/* Room Images */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="col-span-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg h-64 flex items-center justify-center text-white">
                                <span className="text-lg">📸 {room.name} Main View</span>
                            </div>
                            <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg h-32 flex items-center justify-center text-white text-sm">
                                <span>📸 Bathroom</span>
                            </div>
                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg h-32 flex items-center justify-center text-white text-sm">
                                <span>📸 Balcony View</span>
                            </div>
                        </div>

                        {/* Room Description */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Room Description</h2>
                            <p className="text-gray-700 leading-relaxed mb-6">{room.description}</p>
                            
                            <h3 className="text-lg font-semibold mb-3">Room Features</h3>
                            <ul className="space-y-2">
                                {room.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Room Amenities */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">Room Amenities</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {room.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <span className="text-3xl font-bold text-blue-600">${room.price}</span>
                                <p className="text-gray-500">per night</p>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3 mb-6 pb-6 border-b">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Room Size:</span>
                                    <span className="font-medium">{room.size}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Capacity:</span>
                                    <span className="font-medium">{room.capacity} guests</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Room Type:</span>
                                    <span className="font-medium">{room.type}</span>
                                </div>
                            </div>

                            {/* Booking Form */}
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                    <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                    <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                    <select className="w-full border border-gray-300 rounded-md p-2">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                    </select>
                                </div>
                            </form>

                            {/* Action Buttons */}
                            <div className="space-y-3 mt-6">
                                <Link 
                                    to={`/accommodation/${id}/rooms/${roomId}/book`}
                                    className="block w-full bg-blue-600 text-white py-3 text-center rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Reserve Room
                                </Link>
                                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                                    Add to Custom Package
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                    Contact Resort
                                </button>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                                <p>• Free cancellation up to 24 hours before check-in</p>
                                <p>• No prepayment needed</p>
                                <p>• Confirmation is immediate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
