import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    
    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setProfileDropdownOpen(false);
    }, [location]);

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Failed to sign out', error);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileDropdownOpen]);    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm ${scrolled 
            ? 'bg-blue-900/95 shadow-lg py-2' 
            : 'bg-gradient-to-r from-blue-950 to-blue-800 py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <div className="text-2xl font-bold text-white font-display flex items-center">
                            <span className="text-yellow-400 mr-1 group-hover:rotate-12 transition-transform duration-300">
                                <i className="fas fa-umbrella-beach drop-shadow-md"></i>
                            </span>
                            <span className="hidden sm:inline group-hover:text-yellow-100 transition-colors">Maldives</span>
                            <span className="text-yellow-400 ml-1 group-hover:scale-105 transition-transform duration-300">Activities</span>
                        </div>
                    </Link>
                      {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className={`text-white hover:text-yellow-400 transition-colors relative ${
                            location.pathname === '/' 
                            ? 'font-semibold text-yellow-400'
                            : 'hover:scale-105 transform'
                        }`}>
                            Home
                            {location.pathname === '/' && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></span>
                            )}
                            {location.pathname !== '/' && (
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            )}
                        </Link>
                        <Link to="/activities" className={`text-white hover:text-yellow-400 transition-colors relative ${
                            location.pathname === '/activities' 
                            ? 'font-semibold text-yellow-400'
                            : 'hover:scale-105 transform'
                        }`}>
                            Activities
                            {location.pathname === '/activities' && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></span>
                            )}
                            {location.pathname !== '/activities' && (
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            )}
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center text-white hover:text-yellow-400 transition-all hover:scale-105 transform">
                                Destinations <i className="fas fa-chevron-down ml-1 text-xs group-hover:rotate-180 transition-transform duration-300"></i>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-blue-200/20">
                                <div className="py-2">
                                    <Link to="/activities?location=male" className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900">Malé</Link>
                                    <Link to="/activities?location=ari-atoll" className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900">Ari Atoll</Link>
                                    <Link to="/activities?location=baa-atoll" className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900">Baa Atoll</Link>
                                    <Link to="/activities" className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900">All Destinations</Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className={`text-white hover:text-yellow-400 transition-colors relative ${
                            location.pathname === '/about' 
                            ? 'font-semibold text-yellow-400'
                            : 'hover:scale-105 transform'
                        }`}>
                            About
                            {location.pathname === '/about' && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></span>
                            )}
                            {location.pathname !== '/about' && (
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            )}
                        </Link>
                        <Link to="/contact" className={`text-white hover:text-yellow-400 transition-colors relative ${
                            location.pathname === '/contact' 
                            ? 'font-semibold text-yellow-400'
                            : 'hover:scale-105 transform'
                        }`}>
                            Contact
                            {location.pathname === '/contact' && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></span>
                            )}
                            {location.pathname !== '/contact' && (
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                            )}
                        </Link>
                    </div>
                      {/* User Authentication Section */}
                    <div className="hidden md:flex items-center">
                        {currentUser ? (
                            <div className="relative profile-dropdown">
                                <button 
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 text-white hover:text-yellow-400 group"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md group-hover:shadow-yellow-400/30 transition-all border border-yellow-400/20 group-hover:border-yellow-400/50">
                                        <span className="text-white font-bold group-hover:scale-110 transition-transform">
                                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden lg:inline">{currentUser.name || currentUser.email.split('@')[0]}</span>
                                    <i className="fas fa-chevron-down text-xs group-hover:rotate-180 transition-transform duration-300"></i>
                                </button>
                                
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-md shadow-lg z-10 border border-blue-200/20 overflow-hidden animate-fade-in-down">
                                        <div className="py-1">
                                            <Link 
                                                to="/dashboard" 
                                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900 transition-colors"
                                            >
                                                <i className="fas fa-tachometer-alt mr-2 text-blue-600"></i> Dashboard
                                            </Link>
                                            <Link 
                                                to="/profile" 
                                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900 transition-colors"
                                            >
                                                <i className="fas fa-user mr-2 text-blue-600"></i> My Profile
                                            </Link>
                                            <Link 
                                                to="/dashboard/bookings" 
                                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100/80 hover:text-blue-900 transition-colors"
                                            >
                                                <i className="fas fa-bookmark mr-2 text-blue-600"></i> My Bookings
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button 
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-800 transition-colors"
                                            >
                                                <i className="fas fa-sign-out-alt mr-2 text-red-600"></i> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-white mr-4 hover:text-yellow-400 hover:scale-105 transition-transform flex items-center">
                                    <i className="fas fa-user mr-1"></i> Login
                                </Link>
                                <Link to="/activities" className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-blue-900 px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-yellow-400/50 border border-yellow-300/50">
                                    Book Now
                                </Link>
                            </>
                        )}
                    </div>
                      {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-white p-2 focus:outline-none transition-all transform hover:scale-110 active:scale-95"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <i className="fas fa-times text-xl text-yellow-400"></i>
                            ) : (
                                <i className="fas fa-bars text-xl hover:text-yellow-400"></i>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Mobile menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pt-4 animate-fade-in-down`}>
                    <div className="flex flex-col space-y-4 pb-4 bg-blue-900/90 backdrop-blur-sm mt-4 px-4 py-3 rounded-lg shadow-lg border border-blue-800/50">
                        <Link to="/" className={`text-white hover:text-yellow-400 transition-colors flex items-center ${location.pathname === '/' ? 'font-semibold text-yellow-400' : ''}`}>
                            <i className="fas fa-home mr-2"></i> Home
                            {location.pathname === '/' && <i className="fas fa-circle text-xs ml-auto text-yellow-400"></i>}
                        </Link>
                        <Link to="/activities" className={`text-white hover:text-yellow-400 transition-colors flex items-center ${location.pathname === '/activities' ? 'font-semibold text-yellow-400' : ''}`}>
                            <i className="fas fa-water mr-2"></i> Activities
                            {location.pathname === '/activities' && <i className="fas fa-circle text-xs ml-auto text-yellow-400"></i>}
                        </Link>
                        <Link to="/destinations" className={`text-white hover:text-yellow-400 transition-colors flex items-center ${location.pathname === '/destinations' ? 'font-semibold text-yellow-400' : ''}`}>
                            <i className="fas fa-map-marker-alt mr-2"></i> Destinations
                            {location.pathname === '/destinations' && <i className="fas fa-circle text-xs ml-auto text-yellow-400"></i>}
                        </Link>
                        <Link to="/about" className={`text-white hover:text-yellow-400 transition-colors flex items-center ${location.pathname === '/about' ? 'font-semibold text-yellow-400' : ''}`}>
                            <i className="fas fa-info-circle mr-2"></i> About
                            {location.pathname === '/about' && <i className="fas fa-circle text-xs ml-auto text-yellow-400"></i>}
                        </Link>
                        <Link to="/contact" className={`text-white hover:text-yellow-400 transition-colors flex items-center ${location.pathname === '/contact' ? 'font-semibold text-yellow-400' : ''}`}>
                            <i className="fas fa-envelope mr-2"></i> Contact
                            {location.pathname === '/contact' && <i className="fas fa-circle text-xs ml-auto text-yellow-400"></i>}
                        </Link>
                        
                        {currentUser ? (
                            <>
                                <div className="border-t border-blue-700 pt-4 mt-2"></div>
                                <Link to="/dashboard" className="text-white hover:text-yellow-300 transition-colors flex items-center">
                                    <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                                </Link>
                                <Link to="/profile" className="text-white hover:text-yellow-300 transition-colors flex items-center">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                                        <span className="text-white text-xs font-bold">
                                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    My Profile
                                </Link>
                                <Link to="/dashboard/bookings" className="text-white hover:text-yellow-300 transition-colors">
                                    My Bookings
                                </Link>
                                <button 
                                    onClick={handleSignOut} 
                                    className="text-white hover:text-yellow-300 transition-colors text-left"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-yellow-300 transition-colors">
                                    <i className="fas fa-user mr-1"></i> Login
                                </Link>
                                <Link to="/signup" className="text-white hover:text-yellow-300 transition-colors">
                                    <i className="fas fa-user-plus mr-1"></i> Sign Up
                                </Link>
                                <Link to="/activities" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-full font-semibold transition-colors inline-block text-center">
                                    Book Now
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;