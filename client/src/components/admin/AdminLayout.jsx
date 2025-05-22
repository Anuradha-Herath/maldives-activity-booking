import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Check if user is admin, if not redirect to home
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Sidebar links
  const navLinks = [
    { path: '/admin/dashboard', icon: 'fa-tachometer-alt', text: 'Dashboard' },
    { path: '/admin/activities', icon: 'fa-umbrella-beach', text: 'Activities' },
    { path: '/admin/bookings', icon: 'fa-calendar-check', text: 'Bookings' },
    { path: '/admin/users', icon: 'fa-users', text: 'Users' },
    
  ];

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`} aria-hidden="true">
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <i className="fas fa-times text-white"></i>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center justify-center px-6 py-4 border-b border-blue-700/50">
              <Link to="/" className="flex items-center group">
                <div className="text-2xl font-bold text-white font-display flex items-center">
                  <span className="text-yellow-400 mr-1 group-hover:rotate-12 transition-transform duration-300">
                    <i className="fas fa-umbrella-beach drop-shadow-md"></i>
                  </span>
                  <span className="group-hover:text-yellow-100 transition-colors">Maldives</span>
                  <span className="text-yellow-400 ml-1 group-hover:scale-105 transition-transform duration-300">Activities</span>
                </div>
              </Link>
            </div>
            <nav className="mt-6 px-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white shadow-sm border-l-4 border-yellow-400'
                      : 'text-blue-100 hover:bg-white/5 hover:border-l-4 hover:border-yellow-400/50'
                  }`}
                >
                  <i className={`fas ${link.icon} mr-4 ${isActive(link.path) ? 'text-yellow-400' : 'text-blue-300 group-hover:text-yellow-400'}`}></i>
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-blue-700/50 p-4 bg-blue-900/30">
            <Link to="/" className="flex-shrink-0 group block w-full">
              <div className="flex items-center">
                <div>
                  <span className="inline-block h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                    <i className="fas fa-user text-blue-200"></i>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">
                    {currentUser?.name || currentUser?.email}
                  </p>
                  <p className="text-sm font-medium text-blue-200 group-hover:text-blue-100 flex items-center">
                    <i className="fas fa-external-link-alt text-xs mr-1"></i> View site
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72">
          <div className="flex flex-col h-0 flex-1 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-xl">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-6 py-4 border-b border-blue-700/50">
                <Link to="/" className="flex items-center group">
                  <div className="text-2xl font-bold text-white font-display flex items-center">
                    <span className="text-yellow-400 mr-1 group-hover:rotate-12 transition-transform duration-300">
                      <i className="fas fa-umbrella-beach drop-shadow-md"></i>
                    </span>
                    <span className="group-hover:text-yellow-100 transition-colors">Maldives</span>
                    <span className="text-yellow-400 ml-1 group-hover:scale-105 transition-transform duration-300">Activities</span>
                  </div>
                </Link>
              </div>
              <nav className="mt-6 flex-1 px-3 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-white/10 text-white shadow-sm border-l-4 border-yellow-400'
                        : 'text-blue-100 hover:bg-white/5 hover:border-l-4 hover:border-yellow-400/50'
                    }`}
                  >
                    <i className={`fas ${link.icon} mr-3 ${isActive(link.path) ? 'text-yellow-400' : 'text-blue-300 group-hover:text-yellow-400'}`}></i>
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-blue-700/50 p-4 bg-blue-900/30">
              <Link to="/" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <span className="inline-block h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                      <i className="fas fa-user text-blue-200"></i>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {currentUser?.name || currentUser?.email}
                    </p>
                    <p className="text-xs font-medium text-blue-200 group-hover:text-blue-100 flex items-center">
                      <i className="fas fa-external-link-alt text-xs mr-1"></i> View site
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="fas fa-bars text-gray-600 text-xl"></i>
          </button>
        </div>
        
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
