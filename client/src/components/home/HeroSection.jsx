import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm, 'on date:', date);
        // In a real app, this would navigate to search results page
    };

    return (
        <div className="relative bg-gradient-to-b from-blue-900 via-blue-700 to-blue-600 text-white">
            {/* Background image overlay */}
            <div 
                className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" 
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
                }}
            ></div>
            
            {/* Content */}
            <div className="relative z-10 py-24 md:py-32 text-center px-4">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight animate-fade-in">
                        Discover Paradise in <span className="text-yellow-300">Maldives</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-delay">
                        Book unforgettable experiences and activities in the world's most beautiful archipelago
                    </p>
                    
                    {/* Search form */}
                    <form 
                        onSubmit={handleSearch}
                        className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 max-w-3xl mx-auto mb-12 shadow-lg animate-slide-up"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search activities..."
                                    className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="date"
                                    className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="h-12 px-6 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-lg transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    
                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-delay-2">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                            <div className="text-yellow-300 text-3xl mb-3">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Top-rated Experiences</h3>
                            <p className="text-blue-100">Curated selection of the highest quality activities</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                            <div className="text-yellow-300 text-3xl mb-3">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
                            <p className="text-blue-100">Secure your spot instantly with immediate confirmation</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                            <div className="text-yellow-300 text-3xl mb-3">
                                <i className="fas fa-money-bill-wave"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Best Price Guarantee</h3>
                            <p className="text-blue-100">Find it cheaper elsewhere and we'll match the price</p>
                        </div>
                    </div>
                    
                    {/* CTA Button */}
                    <Link to="/activities" className="inline-block mt-12 bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-full font-bold text-lg transition-colors animate-bounce-slow">
                        Explore All Activities
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;