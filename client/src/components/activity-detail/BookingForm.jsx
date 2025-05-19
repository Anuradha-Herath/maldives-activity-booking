import React, { useState, useEffect } from 'react';

const BookingForm = ({ activity }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [guests, setGuests] = useState(2);
    const [totalPrice, setTotalPrice] = useState(activity.price * 2);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const maxGuests = 10;
    
    // Update total price when guests or activity changes
    useEffect(() => {
        setTotalPrice(activity.price * guests);
    }, [guests, activity]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedDate) {
            setMessage({ type: 'error', text: 'Please select a date' });
            return;
        }
        
        setLoading(true);
        setMessage(null);
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            setLoading(false);
            setMessage({ 
                type: 'success', 
                text: 'Your booking request has been sent! You will receive a confirmation email shortly.' 
            });
            
            // Reset form
            setSelectedDate('');
            setGuests(2);
        }, 1500);
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
                    className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : 'Send Booking Request'}
                </button>
                
                {/* Success/Error Message */}
                {message && (
                    <div className={`mt-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {message.text}
                    </div>
                )}
                
                <p className="text-gray-500 text-sm mt-4">
                    You won't be charged yet. We'll confirm availability and payment details via email.
                </p>
            </form>
        </div>
    );
};

export default BookingForm;
