import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import BookingStatusBadge from '../../components/dashboard/BookingStatusBadge';

const MyBookings = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // In a real app, fetch bookings from your API
    const fetchBookings = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API call
        const mockBookings = [
          {
            id: 'bk1',
            activityId: 'act1',
            activityName: 'Whale Shark Snorkeling',
            activityImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: '2023-10-15',
            time: '09:00 AM',
            guests: 2,
            status: 'confirmed',
            totalPrice: 298,
            location: 'South Ari Atoll'
          },
          {
            id: 'bk2',
            activityId: 'act2',
            activityName: 'Sunset Dolphin Cruise',
            activityImage: 'https://images.unsplash.com/photo-1570155308259-f4480a5c3643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: '2023-10-22',
            time: '04:30 PM',
            guests: 2,
            status: 'pending',
            totalPrice: 178,
            location: 'Male Atoll'
          },
          {
            id: 'bk3',
            activityId: 'act3',
            activityName: 'Manta Ray Snorkeling Trip',
            activityImage: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: '2023-11-05',
            time: '10:00 AM',
            guests: 3,
            status: 'cancelled',
            totalPrice: 267,
            location: 'Hanifaru Bay, Baa Atoll'
          },
          {
            id: 'bk4',
            activityId: 'act4',
            activityName: 'Sandbank Picnic Experience',
            activityImage: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: '2023-11-10',
            time: '11:30 AM',
            guests: 4,
            status: 'confirmed',
            totalPrice: 396,
            location: 'North Male Atoll'
          }
        ];
        
        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
        // Handle error, show notification, etc.
      }
    };
    
    fetchBookings();
  }, [currentUser]);
  
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);
  
  const handleCancelBooking = (bookingId) => {
    // In a real app, make API call to cancel booking
    console.log('Cancelling booking:', bookingId);
    
    // Update the local state to reflect the change
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );
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
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'confirmed' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cancelled' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cancelled
            </button>
          </nav>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Activity Image */}
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={booking.activityImage} 
                      alt={booking.activityName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div className="mb-2 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-800">{booking.activityName}</h3>
                        <p className="text-gray-600 flex items-center text-sm mt-1">
                          <i className="fas fa-map-marker-alt mr-1 text-blue-500"></i> {booking.location}
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
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{booking.time}</p>
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
                        Booking ID: <span className="font-medium">{booking.id}</span>
                      </div>
                      <div className="space-x-3">
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
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
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
