import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-900 text-white py-2 px-4">
            <div className="container mx-auto flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <i className="fas fa-phone-alt mr-2 text-yellow-300"></i>
                        <span>+960 123 4567</span>
                    </div>
                    <div className="hidden md:flex items-center">
                        <i className="fas fa-envelope mr-2 text-yellow-300"></i>
                        <span>info@maldivesactivities.com</span>
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="hidden md:block">
                        <Link to="/help" className="text-white hover:text-yellow-300 transition-colors mr-4">
                            Help Center
                        </Link>
                        <Link to="/currency" className="text-white hover:text-yellow-300 transition-colors">
                            USD <i className="fas fa-chevron-down ml-1 text-xs"></i>
                        </Link>
                    </div>
                    <div className="flex space-x-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;