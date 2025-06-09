/**
 * User Dashboard Update Fix Verification
 * 
 * This script can be run in the browser console to verify that the user dashboard
 * properly updates after making a booking request in the production environment.
 */

(function() {
  console.log('======== USER DASHBOARD UPDATE VERIFICATION ========');
  
  // Check if we're on the user dashboard page
  const isDashboardPage = window.location.pathname.includes('/dashboard');
  console.log(`Current page: ${window.location.pathname} (${isDashboardPage ? 'Dashboard' : 'Not Dashboard'})`);
  
  // 1. Check authentication
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log('Authentication check:', {
    hasToken: !!token,
    hasUser: !!user,
    tokenValid: token ? token.split('.').length === 3 : false
  });
  
  // 2. Check API configuration
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('API URL configuration:', {
    envApiUrl: apiUrl,
    apiUrlValid: typeof apiUrl === 'string' && !apiUrl.startsWith('VITE_API_URL=')
  });
  
  // 3. Test API connection with authentication
  if (token) {
    console.log('Testing API connection with authentication...');
    fetch(`${apiUrl || 'https://maldives-activity-booking-backend.onrender.com/api/v1'}/user/bookings/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
    .then(response => {
      console.log('API response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Dashboard data received:', data);
    })
    .catch(error => {
      console.error('API connection error:', error);
    });
  } else {
    console.warn('Cannot test API connection: No authentication token found');
  }
  
  // 4. Verify component lifecycle hooks
  if (isDashboardPage) {
    console.log('Checking dashboard component refresh behavior...');
    
    // Count how many active fetch requests are in progress
    const originalFetch = window.fetch;
    let fetchCount = 0;
    
    window.fetch = function(...args) {
      fetchCount++;
      console.log(`Fetch request intercepted (${fetchCount} active): ${args[0]}`);
      
      return originalFetch.apply(this, args).finally(() => {
        fetchCount--;
        console.log(`Fetch request completed (${fetchCount} remaining)`);
      });
    };
    
    // Suggest manual refresh to test update behavior
    console.log('VERIFICATION STEPS:');
    console.log('1. Make a booking on the booking request page');
    console.log('2. Navigate to the dashboard page');
    console.log('3. Check if bookings appear. If not, click the "Refresh Data" button');
    console.log('4. Verify that the dashboard shows your booking(s)');
  }
  
  console.log('======== VERIFICATION COMPLETE ========');
})();
