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
  // Wake up the backend immediately to reduce initial load time
  wakeUpBackend().then(result => {
    if (result.success) {
      console.log('Successfully woke up backend server');
      
      // Keep the backend server awake with regular pings
      keepBackendAwake(10 * 60 * 1000); // Ping every 10 minutes
    }
  });
  
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

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Travel Services
import TravelServices from './pages/travel/TravelServices';
import TravelPackages from './pages/travel/TravelPackages';
import TravelPackageDetail from './pages/travel/TravelPackageDetail';

// Accommodation
import Accommodation from './pages/accommodation/Accommodation';
import AccommodationDetail from './pages/accommodation/AccommodationDetail';
import RoomDetail from './pages/accommodation/RoomDetail';
import RoomReservation from './pages/accommodation/RoomReservation';

// Activities & Experiences
import Activities from './pages/activities/Activities';
import ActivityDetail from './pages/activities/ActivityDetail';

// Blogs
import Blogs from './pages/blogs/Blogs';
import BlogDetail from './pages/blogs/BlogDetail';
import CreateBlog from './pages/blogs/CreateBlog';
import EditBlog from './pages/blogs/EditBlog';

// User Profile & Dashboard
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/auth/Profile';
import Dashboard from './pages/dashboard/Dashboard';
import MyBookings from './pages/dashboard/MyBookings';
import BookingHistory from './pages/dashboard/BookingHistory';
import CustomPackages from './pages/dashboard/CustomPackages';
import EditProfile from './pages/dashboard/EditProfile';

// Services Static Pages
import RealEstate from './pages/services/RealEstate';
import ForeignInvestment from './pages/services/ForeignInvestment';
import BrandRepresentation from './pages/services/BrandRepresentation';
import TourismFacilities from './pages/services/TourismFacilities';
import MediaAdvertising from './pages/services/MediaAdvertising';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Wrapper component to conditionally render Header and Navbar
const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Travel Services */}
          <Route path="/travel-services" element={<TravelServices />} />
          <Route path="/travel-packages" element={<TravelPackages />} />
          <Route path="/travel-packages/:id" element={<TravelPackageDetail />} />
          
          {/* Accommodation */}
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<AccommodationDetail />} />
          <Route path="/accommodation/:id/rooms/:roomId" element={<RoomDetail />} />
          <Route path="/accommodation/:id/rooms/:roomId/book" element={<RoomReservation />} />
          
          {/* Activities & Experiences */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          
          {/* Blogs */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path="/blogs/:id/edit" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
          
          {/* Services Static Pages */}
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/foreign-investment" element={<ForeignInvestment />} />
          <Route path="/brand-representation" element={<BrandRepresentation />} />
          <Route path="/tourism-facilities" element={<TourismFacilities />} />
          <Route path="/media-advertising" element={<MediaAdvertising />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/dashboard/history" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
          <Route path="/dashboard/custom-packages" element={<ProtectedRoute><CustomPackages /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
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