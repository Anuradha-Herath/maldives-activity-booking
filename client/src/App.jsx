
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useEffect } from 'react';
import authDiagnostic from './utils/authDiagnostic';
import AuthMonitor from './components/auth/AuthMonitor';
import { wakeUpBackend, keepBackendAwake } from './utils/wakeUpBackend';

// Import environment checker for development debugging
if (import.meta.env.DEV) {
  import('./utils/envCheck.js');
}

// Run auth diagnostics and wake up the backend in production
if (import.meta.env.PROD) {
  wakeUpBackend().then(result => {
    if (result.success) {
      console.log('Successfully woke up backend server');
      keepBackendAwake(10 * 60 * 1000); // Ping every 10 minutes
    }
  });

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
import Services from './pages/Services'; // New unified services page
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';
import TravelPackages from './pages/TravelPackages'; // New
import TravelPackageDetail from './pages/TravelPackageDetail'; // New
import Accommodation from './pages/Accommodation'; // New
import AccommodationDetail from './pages/AccommodationDetail'; // New
import RealEstate from './pages/RealEstate'; // New
import RealEstateDetail from './pages/RealEstateDetail'; // New
import Investment from './pages/Investment'; // New
import InvestmentDetail from './pages/InvestmentDetail'; // New
import BrandRepresentation from './pages/BrandRepresentation'; // New
import BrandRepresentationDetail from './pages/BrandRepresentationDetail'; // New
import TravelServices from './pages/TravelServices'; // New
import TravelServicesDetail from './pages/TravelServicesDetail'; // New
import BookingRequest from './pages/BookingRequest';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/auth/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import MyBookings from './pages/dashboard/MyBookings';
import MyTravelPackages from './pages/dashboard/MyTravelPackages'; // New
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
import AdminActivityView from './pages/admin/AdminActivityView';
import AdminTravelPackages from './pages/admin/TravelPackages'; // New
import TravelPackageForm from './pages/admin/TravelPackageForm'; // New
import AdminAccommodation from './pages/admin/Accommodation'; // New
import AccommodationForm from './pages/admin/AccommodationForm'; // New
import AdminBookings from './pages/admin/Bookings';
import AdminBookingDetail from './pages/admin/BookingDetail';
import AdminUsers from './pages/admin/Users';
import AdminEnquiries from './pages/admin/Enquiries'; // New

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
          <Route path="/services" element={<Services />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/travel-packages" element={<TravelPackages />} />
          <Route path="/travel-packages/:id" element={<TravelPackageDetail />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetail />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/real-estate/:id" element={<RealEstateDetail />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/investment/:id" element={<InvestmentDetail />} />
          <Route path="/brand-representation" element={<BrandRepresentation />} />
          <Route path="/brand-representation/:id" element={<BrandRepresentationDetail />} />
          <Route path="/travel-services" element={<TravelServices />} />
          <Route path="/travel-services/:id" element={<TravelServicesDetail />} />
          <Route path="/booking/:id" element={<BookingRequest />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/dashboard/travel-packages" element={<ProtectedRoute><MyTravelPackages /></ProtectedRoute>} />
          <Route path="/dashboard/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/activities" element={<AdminRoute><AdminActivities /></AdminRoute>} />
          <Route path="/admin/activities/new" element={<AdminRoute><ActivityForm /></AdminRoute>} />
          <Route path="/admin/activities/:id" element={<AdminRoute><ActivityForm /></AdminRoute>} />
          <Route path="/admin/activities/view/:id" element={<AdminRoute><AdminActivityView /></AdminRoute>} />
          <Route path="/admin/travel-packages" element={<AdminRoute><AdminTravelPackages /></AdminRoute>} />
          <Route path="/admin/travel-packages/new" element={<AdminRoute><TravelPackageForm /></AdminRoute>} />
          <Route path="/admin/travel-packages/:id" element={<AdminRoute><TravelPackageForm /></AdminRoute>} />
          <Route path="/admin/accommodation" element={<AdminRoute><AdminAccommodation /></AdminRoute>} />
          <Route path="/admin/accommodation/new" element={<AdminRoute><AccommodationForm /></AdminRoute>} />
          <Route path="/admin/accommodation/:id" element={<AdminRoute><AccommodationForm /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/bookings/:id" element={<AdminRoute><AdminBookingDetail /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/enquiries" element={<AdminRoute><AdminEnquiries /></AdminRoute>} />

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
