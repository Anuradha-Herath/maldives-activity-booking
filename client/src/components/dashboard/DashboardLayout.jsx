import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = ({ children, title }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
    { path: '/dashboard/bookings', icon: 'fas fa-calendar-check', label: 'My Bookings' },
    { path: '/dashboard/history', icon: 'fas fa-history', label: 'Booking History' },
    { path: '/dashboard/profile', icon: 'fas fa-user-edit', label: 'Edit Profile' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-800 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold font-display">{title}</h1>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 focus:outline-none"
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar (desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-4 p-2 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : currentUser?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{currentUser?.name || 'User'}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-[140px]">{currentUser?.email}</p>
                </div>
              </div>

              <nav>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                          isActive(item.path) 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <i className={`${item.icon} w-6`}></i>
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt w-6"></i>
                      <span className="ml-2">Logout</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-md p-4 mb-6">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`flex items-center py-3 px-4 rounded-lg transition-colors ${
                        isActive(item.path) 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`${item.icon} w-6`}></i>
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt w-6"></i>
                    <span className="ml-2">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
