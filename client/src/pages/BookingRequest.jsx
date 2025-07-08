import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { activitiesAPI, bookingsAPI, userBookingsAPI } from '../utils/api';
import ConfirmationModal from '../components/booking/ConfirmationModal';

const BookingRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        date: '',
        guests: 2,
        fullName: '',
        email: '',
        phone: '',
        specialRequests: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingReference, setBookingReference] = useState('');
    const [bookingId, setBookingId] = useState('');

    // Get pre-selected data from state if available (from the activity detail page)
    useEffect(() => {
        if (location.state?.selectedDate) {
            setFormData(prev => ({
                ...prev,
                date: location.state.selectedDate,
                guests: location.state.guests || 2
            }));
        }
    }, [location.state]);

    // Fetch activity data
    useEffect(() => {
        const fetchActivity = async () => {
            setLoading(true);
            try {
                // Get the activity by its ID using the API
                const activityResponse = await activitiesAPI.getById(id);
                const foundActivity = activityResponse.data.data;
                
                if (foundActivity) {
                    setActivity(foundActivity);
                }
            } catch (error) {
                console.error('Error fetching activity details:', error);
                setError('Failed to load activity details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchActivity();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        
        // Generate a random booking reference
        const reference = `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
        
        try {
            // Create booking data object
            const bookingData = {
                activityId: id,
                bookingReference: reference,
                date: formData.date,
                guests: parseInt(formData.guests),
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                specialRequests: formData.specialRequests,
                totalPrice: activity.price * formData.guests
            };
              // Send booking data to the API
            const response = await bookingsAPI.create(bookingData);
            
            if (response.data.success) {
                setBookingReference(reference);
                setBookingId(response.data.data._id);
                
                // Prefetch the user's updated dashboard data to make sure it refreshes properly
                try {
                    // Ensure user booking stats are refreshed
                    await userBookingsAPI.getStats();
                    // Also refresh the user's booking lists
                    await userBookingsAPI.getUpcoming();
                    await userBookingsAPI.getHistory();
                    
                    console.log('Dashboard data refreshed after booking creation');
                } catch (refreshError) {
                    console.error('Error refreshing dashboard data:', refreshError);
                }
                
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            setError('Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Redirect to home page after successful booking
        navigate('/');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h2 className="text-xl font-bold mb-2">Activity Not Found</h2>
                    <p>Sorry, we couldn't find the activity you're looking for.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-800 mb-2 font-display">Complete Your Booking</h1>
                    <p className="text-gray-600 mb-8">Please review the details and fill in your information to complete your booking request.</p>
                    
                    {/* Activity Summary */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 mb-4 md:mb-0">
                                <img 
                                    src={activity.image} 
                                    alt={activity.title} 
                                    className="w-full h-32 object-cover rounded"
                                />
                            </div>
                            <div className="md:w-3/4 md:pl-6">
                                <h2 className="text-xl font-bold text-blue-700">{activity.title}</h2>
                                <div className="flex items-center mt-1 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-sm text-gray-600">{activity.rating} ({activity.reviewCount} reviews)</span>
                                </div>
                                <div className="text-gray-700 mb-1">
                                    <span className="font-medium">Location:</span> {activity.location}
                                </div>
                                <div className="text-gray-700 mb-1">
                                    <span className="font-medium">Duration:</span> {activity.duration} hour{activity.duration !== 1 ? 's' : ''}
                                </div>
                                <div className="text-blue-700 font-bold text-lg mt-2">
                                    ${activity.price} per person
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Booking Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Date Selection */}
                            <div>
                                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            
                            {/* Number of Guests */}
                            <div>
                                <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">Number of Guests *</label>
                                <select
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Full Name */}
                            <div>
                                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                            
                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                        
                        {/* Special Requests */}
                        <div className="mb-6">
                            <label htmlFor="specialRequests" className="block text-gray-700 font-medium mb-2">Special Requests (Optional)</label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                                placeholder="Any specific dietary requirements, accessibility needs, or other requests..."
                            ></textarea>
                        </div>
                        
                        {/* Price Calculation */}
                        <div className="border-t border-b border-gray-200 py-4 mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-700">${activity.price} × {formData.guests} guests</span>
                                <span className="font-medium">${activity.price * formData.guests}</span>
                            </div>
                            <div className="flex justify-between text-blue-800 font-bold">
                                <span>Total</span>
                                <span>${activity.price * formData.guests}</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => navigate(`/activities/${id}`)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                disabled={submitting}
                            >
                                Back to Activity
                            </button>
                            
                            <button
                                type="submit"
                                className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg ${
                                    submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                } transition-colors`}
                                disabled={submitting}
                            >
                                {submitting ? 'Processing...' : 'Send Booking Request'}
                            </button>
                        </div>
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
            
            {/* Confirmation Modal */}
            <ConfirmationModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose}
                bookingReference={bookingReference}
                activityTitle={activity.title}
                date={formData.date}
                guests={formData.guests}
                totalPrice={activity.price * formData.guests}
                bookingId={bookingId}
            />
        </div>
    );
};

export default BookingRequest;
