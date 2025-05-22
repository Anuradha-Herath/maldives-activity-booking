import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
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

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentLink = navLinks.find(link => isActive(link.path));
    return currentLink ? currentLink.text : 'Admin Panel';
  };

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
        {/* Mobile top bar */}
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 flex justify-between items-center bg-white shadow-sm">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="fas fa-bars text-gray-600 text-xl"></i>
          </button>
          
          <div className="px-4 py-2 text-lg font-semibold text-gray-700">
            {getCurrentPageTitle()}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="p-2 mr-2 flex items-center focus:outline-none"
            >
              <span className="inline-block h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                <i className="fas fa-user text-white text-sm"></i>
              </span>
            </button>
            
            {userMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Site</Link>
                <div className="border-t border-gray-100"></div>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Desktop top bar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex-1 flex">
            <div className="w-full bg-white shadow-sm">
              <div className="h-16 flex justify-between px-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-800">{getCurrentPageTitle()}</h1>
                </div>
                <div className="ml-4 flex items-center md:ml-6 space-x-4">
                  {/* Search */}
                  
                  
                  {/* Notification bell */}
                  <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
                    <span className="sr-only">View notifications</span>
                    <i className="fas fa-bell text-lg"></i>
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform -translate-y-1/2 translate-x-1/2"></span>
                  </button>
                  
                  {/* User dropdown */}
                  <div className="ml-3 relative">
                    <div>
                      <button 
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center">
                          <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-md mr-2">
                            <span className="text-white font-medium">
                              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                            </span>
                          </span>
                          <span className="hidden md:block text-sm font-medium text-gray-700 mr-1">{currentUser.name || currentUser.email}</span>
                          <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                        </div>
                      </button>
                    </div>
                    
                    {userMenuOpen && (
                      <div 
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        role="menu" 
                        aria-orientation="vertical" 
                        aria-labelledby="user-menu"
                      >
                        
                        
                        <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Site</Link>
                        <div className="border-t border-gray-100"></div>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
