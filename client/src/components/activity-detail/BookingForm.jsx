import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ activity }) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('');    const [guests, setGuests] = useState(2);
    const [totalPrice, setTotalPrice] = useState(activity.price * 2);
    // Use maxParticipants from the database or fallback to 10
    const maxGuests = activity.maxParticipants || 10;
    
    // Update total price when guests or activity changes
    useEffect(() => {
        setTotalPrice(activity.price * guests);
    }, [guests, activity]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedDate) {
            alert('Please select a date');
            return;
        }
        
        // Navigate to booking page with selected information
        navigate(`/booking/${activity.id}`, {
            state: {
                selectedDate,
                guests
            }
        });
    };
    
    // Generate array of numbers for guest dropdown
    const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1);
    
    // Calculate dates for the next 30 days (excluding today)
    const generateDateOptions = () => {
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        
        return dates;
    };
    
    const availableDates = generateDateOptions();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="bg-blue-600 text-white p-4">
                <div className="text-2xl font-bold">${activity.price}</div>
                <div className="text-sm opacity-75">per person</div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Date Picker */}
                <div>
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Select Date</label>
                    <select
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a date</option>
                        {availableDates.map((date, index) => (
                            <option 
                                key={index} 
                                value={date.toISOString().split('T')[0]}
                            >
                                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Number of Guests */}
                <div>
                    <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">Number of Guests</label>
                    <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {guestOptions.map((num) => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'guest' : 'guests'}
                            </option>
                        ))}
                    </select>
                </div>
                
                {/* Price Calculation */}
                <div className="border-t border-b border-gray-200 py-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-700">${activity.price} × {guests} guests</span>
                        <span className="font-medium">${activity.price * guests}</span>
                    </div>
                    <div className="flex justify-between text-blue-800 font-bold">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
                
                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Continue to Book
                </button>
                
                <p className="text-gray-500 text-sm mt-4">
                    You won't be charged yet. Complete your booking on the next page.
                </p>
            </form>
        </div>
    );
};

export default BookingForm;
