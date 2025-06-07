import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import authDiagnostic from './utils/authDiagnostic';
import AuthMonitor from './components/auth/AuthMonitor';

// Import environment checker for development debugging
if (import.meta.env.DEV) {
  import('./utils/envCheck.js');
}

// Run auth diagnostics in production
if (!import.meta.env.DEV) {
  // Initial diagnostic check with a small delay to allow app to initialize
  setTimeout(() => {
    authDiagnostic.testApiConnection()
      .then(result => {
        if (result.success) {
          console.log('API connection test successful');
        } else {
          console.warn('API connection test failed, authentication may not work properly');
        }
      })
      .catch(error => console.error('Error testing API connection:', error));
  }, 2000);
}

import Home from './pages/Home';
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import BookingRequest from './pages/BookingRequest';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/auth/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import MyBookings from './pages/dashboard/MyBookings';
import BookingHistory from './pages/dashboard/BookingHistory';
import EditProfile from './pages/dashboard/EditProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminActivities from './pages/admin/Activities';
import ActivityForm from './pages/admin/ActivityForm';
import AdminBookings from './pages/admin/Bookings';
import AdminBookingDetail from './pages/admin/BookingDetail'; // Add this import
import AdminUsers from './pages/admin/Users';
import AdminActivityView from './pages/admin/AdminActivityView';

// Wrapper component to conditionally render Header and Navbar
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      <main className={`flex-grow ${isAdminRoute ? 'h-screen' : ''}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/booking/:id" element={<BookingRequest />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/dashboard/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/activities" element={<AdminRoute><AdminActivities /></AdminRoute>} />
          <Route path="/admin/activities/new" element={<AdminRoute><ActivityForm /></AdminRoute>} />
          <Route path="/admin/activities/:id" element={<AdminRoute><ActivityForm /></AdminRoute>} />
          <Route path="/admin/activities/view/:id" element={<AdminRoute><AdminActivityView /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/bookings/:id" element={<AdminRoute><AdminBookingDetail /></AdminRoute>} /> {/* Add this line */}
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <AuthMonitor />
      </Router>
    </AuthProvider>
  );
}

export default App;