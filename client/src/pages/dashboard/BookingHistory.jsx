import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import BookingStatusBadge from '../../components/dashboard/BookingStatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { userBookingsAPI } from '../../utils/api';

const BookingHistory = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  
  useEffect(() => {
    fetchBookingHistory();
  }, [currentUser]);
  
  const fetchBookingHistory = async () => {
    setLoading(true);
    try {
      const response = await userBookingsAPI.getHistory();
      
      if (response.data.success) {
        setBookings(response.data.data);
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
  
  // Get array of unique years from booking dates
  const years = [...new Set(bookings.map(booking => 
    new Date(booking.date).getFullYear().toString()
  ))].sort((a, b) => b - a); // Sort in descending order (newest first)
  
  // Filter bookings by year
  const filteredBookings = yearFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => {
        const bookingYear = new Date(booking.date).getFullYear().toString();
        return bookingYear === yearFilter;
      });
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
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

  return (
    <DashboardLayout title="Booking History">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Past Bookings</h2>
          
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
        
        {/* Bookings History Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
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
                {filteredBookings.map((booking) => (
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
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                      {booking.status === 'completed' && !booking.rating && (
                        <button className="ml-3 text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                          Rate
                        </button>
                      )}
                      {booking.status === 'completed' && (
                        <button className="ml-3 text-green-600 hover:text-green-800 text-sm font-medium">
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
