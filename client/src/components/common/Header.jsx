import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 text-white py-2 px-4 shadow-sm border-b border-blue-800">
            <div className="container mx-auto flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center group">
                        <i className="fas fa-phone-alt mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors"></i>
                        <span className="group-hover:text-yellow-100 transition-colors">+960 123 4567</span>
                    </div>
                    <div className="hidden md:flex items-center group">
                        <i className="fas fa-envelope mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors"></i>
                        <span className="group-hover:text-yellow-100 transition-colors">info@maldivesactivities.com</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                        <Link to="/help" className="text-white hover:text-yellow-300 transition-colors mr-4 relative group">
                            Help Center
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/currency" className="text-white hover:text-yellow-300 transition-colors relative group">
                            USD <i className="fas fa-chevron-down ml-1 text-xs"></i>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                    <div className="flex space-x-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;