import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import BookingStatusBadge from '../../components/dashboard/BookingStatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { userBookingsAPI } from '../../utils/api';
import { wakeUpBackend } from '../../utils/wakeUpBackend';

const BookingHistory = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  
  useEffect(() => {
    const initialize = async () => {
      try {
        await wakeUpBackend();
      } catch (err) {
        console.warn('Backend wake-up failed:', err);
      }
      fetchBookingHistory();
    };
    initialize();
  }, [currentUser]);
  
  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const response = await userBookingsAPI.getHistory();
      
      if (response.data.success) {
        console.log('Booking history data:', response.data.data);
        
        // Process bookings to ensure visual status is correct
        const processedBookings = response.data.data.map(booking => {
          // If booking date is in the past and status is confirmed, display as completed
          const bookingDate = new Date(booking.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (bookingDate < today && booking.status === 'confirmed') {
            return { ...booking, status: 'completed' };
          }
          
          return booking;
        });
        
        setBookings(processedBookings || []);
      } else {
        setError('Failed to fetch booking history');
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
      setError('Error connecting to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Extract years from bookings, but ensure dates are valid first
  const getValidYears = () => {
    const validBookings = bookings.filter(booking => 
      booking.date && !isNaN(new Date(booking.date).getTime())
    );
    
    return [...new Set(validBookings.map(booking => 
      new Date(booking.date).getFullYear().toString()
    ))].sort((a, b) => b - a); // Sort in descending order (newest first)
  };
  
  const years = getValidYears();
  
  // Filter bookings by year, with proper date validation
  const filteredBookings = yearFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => {
        // Check if date is valid before filtering
        if (!booking.date || isNaN(new Date(booking.date).getTime())) {
          return false;
        }
        const bookingYear = new Date(booking.date).getFullYear().toString();
        return bookingYear === yearFilter;
      });
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  
  // Check if a booking is past date
  const isPastBooking = (dateString) => {
    try {
      const bookingDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return bookingDate < today;
    } catch (error) {
      return false;
    }
  };
  
  const renderRatingStars = (rating) => {
    if (rating === null || rating === undefined) return 'Not rated';
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <i 
            key={index}
            className={`${index < rating ? 'fas' : 'far'} fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
          ></i>
        ))}
      </div>
    );
  };

  // handle rating submission
  const handleRateBooking = (bookingId) => {
    // In a real implementation, this would open a modal or navigate to rating page
    alert(`Rating functionality for booking ${bookingId} would be implemented here.`);
  };

  // handle booking again
  const handleBookAgain = (activityId) => {
    if (!activityId) {
      alert("Sorry, we couldn't find the activity information for this booking.");
      return;
    }
    window.location.href = `/activities/${activityId}`;
  };

  // Group bookings by status for easier filtering
  const getStatusGroupedBookings = () => {
    const grouped = {
      completed: [],
      cancelled: [],
      past: [] // past bookings that were confirmed but now should be seen as completed
    };
    
    filteredBookings.forEach(booking => {
      if (booking.status === 'completed') {
        grouped.completed.push(booking);
      } else if (booking.status === 'cancelled') {
        grouped.cancelled.push(booking);
      } else if (booking.status === 'confirmed' && isPastBooking(booking.date)) {
        grouped.past.push({...booking, status: 'completed'});
      }
    });
    
    return [...grouped.completed, ...grouped.past, ...grouped.cancelled];
  };
  
  const displayBookings = getStatusGroupedBookings();

  return (
    <DashboardLayout title="Booking History">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Your Past Bookings</h2>
          
          {/* Year Filter */}
          <div className="flex items-center space-x-2">
            <label htmlFor="yearFilter" className="text-sm text-gray-600">Filter by year:</label>
            <select
              id="yearFilter"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-1.5 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
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
        
        {/* Summary Stats */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div>
              <span className="text-sm text-gray-500">Total:</span>{' '}
              <span className="font-medium">{displayBookings.length} past bookings</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Completed:</span>{' '}
              <span className="font-medium text-green-600">
                {displayBookings.filter(b => b.status === 'completed').length}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Cancelled:</span>{' '}
              <span className="font-medium text-red-600">
                {displayBookings.filter(b => b.status === 'cancelled').length}
              </span>
            </div>
          </div>
        </div>
        
        {/* Bookings History Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : displayBookings.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.activity?.title || "Unknown Activity"}</div>
                      <div className="text-xs text-gray-500">ID: {booking.bookingReference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{formatDate(booking.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{booking.guests}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${booking.totalPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {renderRatingStars(booking.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => window.location.href = `/dashboard/booking/${booking._id}`} 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                      
                      {booking.status === 'completed' && !booking.rating && (
                        <button 
                          onClick={() => handleRateBooking(booking._id)} 
                          className="ml-3 text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                        >
                          Rate
                        </button>
                      )}
                      
                      {booking.activity?._id && (
                        <button 
                          onClick={() => handleBookAgain(booking.activity._id)} 
                          className="ml-3 text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          Book Again
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <i className="fas fa-history text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No booking history found</h3>
            <p className="text-gray-600 max-w-sm mx-auto">
              {yearFilter === 'all' 
                ? "You don't have any past bookings yet."
                : `You don't have any bookings for ${yearFilter}.`
              }
            </p>
          </div>
        )}
        
        {/* Refresh Button */}
        {!loading && (
          <div className="mt-6 text-center">
            <button
              onClick={fetchBookingHistory}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh History
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingHistory;
