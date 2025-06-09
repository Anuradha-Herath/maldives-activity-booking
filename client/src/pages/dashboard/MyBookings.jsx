import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import BookingStatusBadge from '../../components/dashboard/BookingStatusBadge';
import { userBookingsAPI } from '../../utils/api';

const MyBookings = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
    const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    fetchBookings();
  }, [currentUser, retryCount]);
  
  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Check for authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found when trying to fetch bookings');
      } else {
        console.log('Token exists, attempting to fetch bookings data');
      }
      
      const response = await userBookingsAPI.getUpcoming();
      
      if (response.data.success) {
        console.log('Fetched bookings:', response.data.data);
        setBookings(response.data.data);
        setError('');
      } else {
        setError('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Error connecting to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = () => {
    setRetryCount(prevCount => prevCount + 1);
  };
  
  // Filter bookings based on the active tab
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

  // Count bookings by status for the tabs
  const bookingCounts = {
    all: bookings.length,
    pending: bookings.filter(booking => booking.status === 'pending').length,
    confirmed: bookings.filter(booking => booking.status === 'confirmed').length,
    cancelled: bookings.filter(booking => booking.status === 'cancelled').length
  };
  
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await userBookingsAPI.cancelBooking(bookingId);
      
      if (response.data.success) {
        // Replace the cancelled booking with the updated one from the server
        const updatedBooking = response.data.data;
        
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId ? updatedBooking : booking
          )
        );
        
        // Show a success message
        alert('Booking cancelled successfully');
      } else {
        setError('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout title="My Bookings">
      <div>
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Bookings ({bookingCounts.all})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({bookingCounts.pending})
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'confirmed' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Confirmed ({bookingCounts.confirmed})
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cancelled' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cancelled ({bookingCounts.cancelled})
            </button>
          </nav>
        </div>        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex justify-between items-start">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
              <button 
                onClick={handleRefresh} 
                className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
              >
                Refresh Data
              </button>
            </div>
          </div>
        )}
              <div className="ml-auto pl-3">
                <button onClick={() => setError('')} className="text-red-500 hover:text-red-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map(booking => (
              <div key={booking._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Activity Image */}
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={booking.activity?.image} 
                      alt={booking.activity?.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div className="mb-2 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-800">{booking.activity?.title || "Unknown Activity"}</h3>
                        <p className="text-gray-600 flex items-center text-sm mt-1">
                          <i className="fas fa-map-marker-alt mr-1 text-blue-500"></i> {booking.activity?.location || "Location not available"}
                        </p>
                      </div>
                      <BookingStatusBadge status={booking.status} />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{formatDate(booking.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Reference</p>
                        <p className="font-medium">{booking.bookingReference}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'person' : 'people'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="font-medium">${booking.totalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Booked on: <span className="font-medium">{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="space-x-3">
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => handleCancelBooking(booking._id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          onClick={() => window.location.href = `/dashboard/booking/${booking._id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <i className="fas fa-calendar-times text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 max-w-sm mx-auto mb-6">
              {activeTab === 'all' 
                ? "You haven't made any bookings yet. Ready to plan your next adventure?"
                : `You don't have any ${activeTab} bookings at the moment.`
              }
            </p>
            <a 
              href="/activities" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Browse Activities <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        )}

        {/* Refresh Button */}
        {!loading && (
          <div className="mt-6 text-center">
            <button
              onClick={fetchBookings}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Bookings
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
