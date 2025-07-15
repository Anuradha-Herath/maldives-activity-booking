import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RoomReservation = () => {
    const { id, roomId } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    // Dummy room data
    const roomData = {
        101: {
            name: "Ocean View Room",
            type: "Standard",
            price: 450,
            capacity: 2,
            size: "35 sqm"
        }
    };

    const room = roomData[roomId] || roomData[101];
    const accommodationName = "Paradise Resort & Spa";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateNights = () => {
        if (formData.checkIn && formData.checkOut) {
            const checkIn = new Date(formData.checkIn);
            const checkOut = new Date(formData.checkOut);
            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 0;
    };

    const calculateTotal = () => {
        const nights = calculateNights();
        const subtotal = nights * room.price * formData.guests;
        const tax = subtotal * 0.12; // 12% tax
        const serviceFee = 25; // Flat service fee
        return {
            nights,
            subtotal,
            tax,
            serviceFee,
            total: subtotal + tax + serviceFee
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally submit to backend
        alert('Reservation submitted! You will be redirected to payment.');
        // Redirect to a payment page or dashboard
        navigate('/dashboard/bookings');
    };

    const totals = calculateTotal();

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
                        <Link to={`/accommodation/${id}/rooms/${roomId}`} className="text-blue-600 hover:underline">{room.name}</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-500">Reservation</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Complete Your Reservation</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Reservation Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Stay Details */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">Stay Details</h2>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                        <input 
                                            type="date" 
                                            name="checkIn"
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                        <input 
                                            type="date" 
                                            name="checkOut"
                                            value={formData.checkOut}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                                        <select 
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        >
                                            <option value={1}>1 Guest</option>
                                            <option value={2}>2 Guests</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Guest Information */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input 
                                            type="text" 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input 
                                            type="text" 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required 
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                                        <textarea 
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            placeholder="Any special requirements or requests..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <label className="flex items-start">
                                        <input type="checkbox" className="mt-1 mr-2" required />
                                        <span>I agree to the resort's cancellation policy and terms of service</span>
                                    </label>
                                    <label className="flex items-start">
                                        <input type="checkbox" className="mt-1 mr-2" />
                                        <span>I would like to receive promotional emails about special offers</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button 
                                    type="submit"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Reservation Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-semibold mb-4">Reservation Summary</h2>
                            
                            {/* Room Details */}
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="font-medium mb-2">{accommodationName}</h3>
                                <p className="text-gray-600">{room.name}</p>
                                <p className="text-sm text-gray-500">{room.type} • {room.size}</p>
                            </div>

                            {/* Stay Summary */}
                            {formData.checkIn && formData.checkOut && (
                                <div className="mb-6 pb-6 border-b">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Check-in:</span>
                                            <span>{new Date(formData.checkIn).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Check-out:</span>
                                            <span>{new Date(formData.checkOut).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Nights:</span>
                                            <span>{totals.nights}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Guests:</span>
                                            <span>{formData.guests}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Price Breakdown */}
                            {totals.nights > 0 && (
                                <div className="space-y-2 text-sm mb-6">
                                    <div className="flex justify-between">
                                        <span>${room.price} × {totals.nights} nights × {formData.guests} guests</span>
                                        <span>${totals.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Service fee</span>
                                        <span>${totals.serviceFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxes (12%)</span>
                                        <span>${totals.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${totals.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Payment Methods */}
                            <div className="text-sm text-gray-600">
                                <h4 className="font-medium mb-2">Payment Methods Accepted:</h4>
                                <div className="flex space-x-2">
                                    <div className="bg-blue-100 px-2 py-1 rounded text-xs">💳 Visa</div>
                                    <div className="bg-red-100 px-2 py-1 rounded text-xs">💳 MasterCard</div>
                                    <div className="bg-green-100 px-2 py-1 rounded text-xs">💰 PayPal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomReservation;
