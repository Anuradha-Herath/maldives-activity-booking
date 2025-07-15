
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary text-white p-4 footer">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand and Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <i className="fas fa-umbrella-beach text-yellow-400 mr-2"></i>
                            IsleKey Tourism
                        </h3>
                        <p className="text-sm">
                            Your gateway to unforgettable experiences in the Maldives, offering travel packages, accommodations, real estate, investment support, and global brand representation.
                        </p>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
                            <li><Link to="/activities" className="hover:text-yellow-300 transition-colors">Activities</Link></li>
                            <li><Link to="/travel-packages" className="hover:text-yellow-300 transition-colors">Travel Packages</Link></li>
                            <li><Link to="/accommodation" className="hover:text-yellow-300 transition-colors">Accommodation</Link></li>
                            <li><Link to="/real-estate" className="hover:text-yellow-300 transition-colors">Real Estate</Link></li>
                            <li><Link to="/investment" className="hover:text-yellow-300 transition-colors">Investment Support</Link></li>
                            <li><Link to="/brand-representation" className="hover:text-yellow-300 transition-colors">Brand Representation</Link></li>
                            <li><Link to="/travel-services" className="hover:text-yellow-300 transition-colors">Travel Services</Link></li>
                        </ul>
                    </div>
                    
                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <i className="fas fa-phone-alt mr-2 text-yellow-400"></i>
                                <span>+960 123 4567</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-2 text-yellow-400"></i>
                                <span>info@islekeytourism.com</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2 text-yellow-400"></i>
                                <span>Malé, Maldives</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/islekeytourism" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110" aria-label="Visit our Facebook page" title="Facebook">
                                <i className="fab fa-facebook-f"></i>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="https://x.com/islekeytourism" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110" aria-label="Visit our X page" title="X">
                                <i className="fab fa-x-twitter"></i>
                                <span className="sr-only">X</span>
                            </a>
                            <a href="https://instagram.com/islekeytourism" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110" aria-label="Visit our Instagram page" title="Instagram">
                                <i className="fab fa-instagram"></i>
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://linkedin.com/company/islekeytourism" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors transform hover:scale-110" aria-label="Visit our LinkedIn page" title="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="border-t border-blue-800 mt-8 pt-4 text-center text-sm">
                    <p>© {new Date().getFullYear()} IsleKey Tourism. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
