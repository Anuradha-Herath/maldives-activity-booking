// Production Dashboard Update Test Script
// This script helps verify that the dashboard update fix is working correctly

function testDashboardFixes() {
  console.log("=== Testing Production Dashboard Update Fix ===");
  
  // Test BookingEventEmitter
  if (typeof bookingEvents !== 'undefined') {
    console.log("✅ BookingEventEmitter is available");
    
    // Create mock booking data
    const mockBooking = {
      _id: "test-" + Date.now(),
      reference: "TEST-" + Math.floor(100000 + Math.random() * 900000),
      activity: {
        title: "Test Activity",
        image: "https://example.com/image.jpg",
        _id: "act-" + Date.now()
      },
      date: new Date().toISOString(),
      guests: 2,
      totalPrice: 200,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Test event emission
    console.log("Testing event emission...");
    bookingEvents.on('booking_created', (data) => {
      console.log("✅ Event listener received booking_created event:", data);
    });
    
    bookingEvents.emit('booking_created', mockBooking);
    
    // Test localStorage persistence
    console.log("\nTesting localStorage persistence...");
    const storedEvent = localStorage.getItem('booking_event');
    if (storedEvent) {
      console.log("✅ Event stored in localStorage:", JSON.parse(storedEvent));
    } else {
      console.log("❌ Event not stored in localStorage");
    }
  } else {
    console.log("❌ BookingEventEmitter not found. Are you running this script in the correct environment?");
  }
  
  // Test service worker registration
  console.log("\nTesting service worker...");
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      if (registrations.length > 0) {
        console.log("✅ Service worker(s) registered:", registrations.map(r => r.scope));
      } else {
        console.log("❌ No service workers registered");
      }
    });
  } else {
    console.log("❌ Service workers not supported in this browser");
  }
  
  // Check for all required flags
  console.log("\nChecking storage flags...");
  const flags = [
    'new_booking_created',
    'latest_booking',
    'prefetched_dashboard_data',
    'prefetched_upcoming_bookings',
    'force_dashboard_refresh',
    'booking_completed_at'
  ];
  
  flags.forEach(flag => {
    const localValue = localStorage.getItem(flag);
    const sessionValue = sessionStorage.getItem(flag);
    
    console.log(`${flag}: ${localValue ? '✅ in localStorage' : '❌ not in localStorage'}, ${sessionValue ? '✅ in sessionStorage' : '❌ not in sessionStorage'}`);
  });
  
  // Test URL parameter generation
  console.log("\nTesting URL parameter generation...");
  const timestamp = Date.now();
  const testUrl = `/dashboard?refresh=${timestamp}`;
  console.log(`✅ Test URL with refresh parameter: ${testUrl}`);
  
  console.log("\n=== Dashboard Update Test Complete ===");
}

// Auto-run the test
setTimeout(() => {
  testDashboardFixes();
}, 1000);
