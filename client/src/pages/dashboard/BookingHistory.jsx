import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import BookingStatusBadge from '../../components/dashboard/BookingStatusBadge';
import { useAuth } from '../../contexts/AuthContext';

const BookingHistory = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('all');
  
  useEffect(() => {
    // In a real app, fetch bookings history from your API
    const fetchBookingHistory = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API call
        const mockBookings = [
          {
            id: 'bk001',
            activityName: 'Island Hopping Adventure',
            date: '2023-08-15',
            guests: 2,
            status: 'completed',
            totalPrice: 349,
            rating: 5
          },
          {
            id: 'bk002',
            activityName: 'Sunset Fishing Experience',
            date: '2023-05-22',
            guests: 3,
            status: 'completed',
            totalPrice: 267,
            rating: 4
          },
          {
            id: 'bk003',
            activityName: 'Underwater Photography Tour',
            date: '2023-03-10',
            guests: 1,
            status: 'cancelled',
            totalPrice: 159,
            rating: null
          },
          {
            id: 'bk004',
            activityName: 'Jet Ski Adventure',
            date: '2022-12-05',
            guests: 2,
            status: 'completed',
            totalPrice: 219,
            rating: 5
          },
          {
            id: 'bk005',
            activityName: 'Traditional Dhoni Sunset Cruise',
            date: '2022-10-18',
            guests: 4,
            status: 'completed',
            totalPrice: 316,
            rating: 3
          }
        ];
        
        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setLoading(false);
      }
    };
    
    fetchBookingHistory();
  }, [currentUser]);
  
  // Filter bookings by year
  const filteredBookings = yearFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => {
        const bookingYear = new Date(booking.date).getFullYear().toString();
        return bookingYear === yearFilter;
      });
  
  // Get array of unique years from booking dates
  const years = [...new Set(bookings.map(booking => 
    new Date(booking.date).getFullYear().toString()
  ))].sort((a, b) => b - a); // Sort in descending order (newest first)
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const renderRatingStars = (rating) => {
    if (rating === null) return 'Not rated';
    
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
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.activityName}</div>
                      <div className="text-xs text-gray-500">ID: {booking.id}</div>
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
      </div>
    </DashboardLayout>
  );
};

export default BookingHistory;
