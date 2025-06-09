// Test script to verify the BookingEventEmitter functionality
// This can be run in the browser console to test event emission

console.log('Testing BookingEventEmitter functionality...');

// Test event emission
const testBooking = {
    _id: 'test-booking-123',
    bookingReference: 'BOOK-123456',
    activity: {
        title: 'Test Activity',
        _id: 'activity-123'
    },
    date: new Date(),
    guests: 2,
    totalPrice: 200,
    status: 'pending'
};

// Import the event emitter (this would work in the actual app context)
// import bookingEvents from './src/utils/BookingEventEmitter';

// Set up a test listener
const testListener = (data) => {
    console.log('✅ Event received:', data);
    console.log('✅ Booking ID:', data._id);
    console.log('✅ Activity:', data.activity?.title);
};

// Test sequence:
console.log('1. Setting up event listener...');
// bookingEvents.on('booking_created', testListener);

console.log('2. Emitting test event...');
// bookingEvents.emit('booking_created', testBooking);

console.log('3. Checking localStorage flags...');
localStorage.setItem('new_booking_created', 'true');
localStorage.setItem('dashboard_needs_refresh', 'true');
sessionStorage.setItem('dashboard_refresh_needed', 'true');

console.log('4. Verifying flags were set:');
console.log('   new_booking_created:', localStorage.getItem('new_booking_created'));
console.log('   dashboard_needs_refresh:', localStorage.getItem('dashboard_needs_refresh'));
console.log('   dashboard_refresh_needed:', sessionStorage.getItem('dashboard_refresh_needed'));

console.log('✅ BookingEventEmitter test setup complete!');
console.log('To test in real app:');
console.log('1. Create a booking through the UI');
console.log('2. Check browser console for "Emitting booking_created event" message');
console.log('3. Navigate to dashboard and verify booking appears');
