import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminActivities from './pages/admin/Activities';
import ActivityForm from './pages/admin/ActivityForm';
import AdminBookings from './pages/admin/Bookings';
import AdminUsers from './pages/admin/Users';
import AdminActivityView from './pages/admin/AdminActivityView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/activities" element={<Activities />} />
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
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;