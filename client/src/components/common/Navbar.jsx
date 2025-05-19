import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    
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
    }, [location]);

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-blue-800 shadow-lg py-2' : 'bg-blue-900 py-4'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <div className="text-2xl font-bold text-white font-display flex items-center">
                            <span className="text-yellow-300 mr-1">
                                <i className="fas fa-umbrella-beach"></i>
                            </span>
                            <span className="hidden sm:inline">Maldives</span>
                            <span className="text-yellow-300 ml-1">Activities</span>
                        </div>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/' ? 'font-semibold border-b-2 border-yellow-300' : ''}`}>
                            Home
                        </Link>
                        <Link to="/activities" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/activities' ? 'font-semibold border-b-2 border-yellow-300' : ''}`}>
                            Activities
                        </Link>
                        <div className="relative group">
                            <button className="flex items-center text-white hover:text-yellow-300 transition-colors">
                                Destinations <i className="fas fa-chevron-down ml-1 text-xs"></i>
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <div className="py-2">
                                    <Link to="/destinations/male" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Malé</Link>
                                    <Link to="/destinations/ari-atoll" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Ari Atoll</Link>
                                    <Link to="/destinations/baa-atoll" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Baa Atoll</Link>
                                    <Link to="/destinations/all" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">All Destinations</Link>
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/about' ? 'font-semibold border-b-2 border-yellow-300' : ''}`}>
                            About
                        </Link>
                        <Link to="/contact" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/contact' ? 'font-semibold border-b-2 border-yellow-300' : ''}`}>
                            Contact
                        </Link>
                    </div>
                    
                    {/* Login/Register Button */}
                    <div className="hidden md:flex items-center">
                        <Link to="/login" className="text-white mr-4 hover:text-yellow-300">
                            <i className="fas fa-user mr-1"></i> Login
                        </Link>
                        <Link to="/booking" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-full font-semibold transition-colors">
                            Book Now
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="text-white p-2 focus:outline-none"
                        >
                            {isOpen ? (
                                <i className="fas fa-times text-xl"></i>
                            ) : (
                                <i className="fas fa-bars text-xl"></i>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Mobile menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pt-4`}>
                    <div className="flex flex-col space-y-4 pb-4">
                        <Link to="/" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/' ? 'font-semibold' : ''}`}>
                            Home
                        </Link>
                        <Link to="/activities" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/activities' ? 'font-semibold' : ''}`}>
                            Activities
                        </Link>
                        <Link to="/destinations" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/destinations' ? 'font-semibold' : ''}`}>
                            Destinations
                        </Link>
                        <Link to="/about" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/about' ? 'font-semibold' : ''}`}>
                            About
                        </Link>
                        <Link to="/contact" className={`text-white hover:text-yellow-300 transition-colors ${location.pathname === '/contact' ? 'font-semibold' : ''}`}>
                            Contact
                        </Link>
                        <Link to="/login" className="text-white hover:text-yellow-300 transition-colors">
                            <i className="fas fa-user mr-1"></i> Login
                        </Link>
                        <Link to="/booking" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-4 py-2 rounded-full font-semibold transition-colors inline-block text-center">
                            Book Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;