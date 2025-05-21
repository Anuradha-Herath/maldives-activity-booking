import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState('');
    const [activityType, setActivityType] = useState('');
    const [location, setLocation] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    // Sample locations for autocomplete
    const popularLocations = [
        "Male", "Baa Atoll", "South Ari Atoll", "North Male Atoll", 
        "Addu Atoll", "Lhaviyani Atoll", "Raa Atoll"
    ];

    // Background images for carousel effect
    const backgroundImages = [
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    ];

    // Activity types from our model
    const activityTypes = [
        { value: "", label: "All Activity Types" },
        { value: "cruises", label: "Cruises" },
        { value: "diving", label: "Diving" },
        { value: "island-tours", label: "Island Tours" },
        { value: "water-sports", label: "Water Sports" },
        { value: "adventure", label: "Adventure" },
        { value: "cultural", label: "Cultural" },
        { value: "wellness", label: "Wellness" }
    ];

    // Filter suggestions based on input
    const filteredLocations = popularLocations
        .filter(loc => loc.toLowerCase().includes(location.toLowerCase()));

    // Carousel effect for background images
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex(prev => (prev + 1) % backgroundImages.length);
        }, 8000);
        
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        
        // Build query parameters
        const queryParams = new URLSearchParams();
        
        if (searchTerm) queryParams.append('search', searchTerm);
        if (date) queryParams.append('date', date);
        if (activityType) queryParams.append('type', activityType);
        if (location) queryParams.append('location', location);
        
        // Simulate loading state
        setTimeout(() => {
            navigate(`/activities?${queryParams.toString()}`);
        }, 600);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        setShowSuggestions(true);
        setIsTyping(true);
        clearTimeout(window.locationTimeout);
        window.locationTimeout = setTimeout(() => {
            setIsTyping(false);
        }, 500);
    };

    const selectLocation = (loc) => {
        setLocation(loc);
        setShowSuggestions(false);
    };

    return (
        <div className="relative bg-gradient-to-b from-blue-950 via-blue-800 to-blue-700 text-white">
            {/* Background image carousel with transition */}
            <div className="absolute inset-0 bg-black/30 z-0"></div>
            {backgroundImages.map((image, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                        index === backgroundIndex ? 'opacity-30' : 'opacity-0'
                    }`} 
                    style={{ backgroundImage: `url('${image}')` }}
                ></div>
            ))}
            
            {/* Background image indicators */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                {backgroundImages.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setBackgroundIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === backgroundIndex 
                                ? 'bg-white w-6' 
                                : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            
            {/* Content */}
            <div className="relative z-10 py-24 md:py-32 text-center px-4">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight animate-fade-in text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        Discover Paradise in <span className="text-yellow-400 inline-block hover:scale-105 transition-transform cursor-pointer drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">Maldives</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-delay text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        Book unforgettable experiences and activities in the world's most beautiful archipelago
                    </p>
                    
                    {/* Enhanced Search form */}
                    <form 
                        onSubmit={handleSearch}
                        className="bg-white/30 backdrop-blur-md rounded-xl p-4 md:p-6 max-w-4xl mx-auto mb-12 shadow-lg shadow-black/20 animate-slide-up hover:shadow-xl transition-all transform hover:-translate-y-1 border border-white/20"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="What would you like to do?"
                                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-map-marker-alt text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Where? (e.g., Male Atoll)"
                                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={location}
                                    onChange={handleLocationChange}
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                />
                                {/* Location Suggestions Dropdown */}
                                {showSuggestions && filteredLocations.length > 0 && (
                                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        <ul>
                                            {filteredLocations.map((loc, index) => (
                                                <li 
                                                    key={index}
                                                    className="px-4 py-2 hover:bg-blue-50 text-gray-800 cursor-pointer text-left"
                                                    onMouseDown={() => selectLocation(loc)}
                                                >
                                                    <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                                                    {loc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-calendar text-gray-400"></i>
                                </div>
                                <input
                                    type="date"
                                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-tag text-gray-400"></i>
                                </div>
                                <select
                                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                    value={activityType}
                                    onChange={(e) => setActivityType(e.target.value)}
                                >
                                    {activityTypes.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <i className="fas fa-chevron-down text-gray-400"></i>
                                </div>
                            </div>
                            
                            <div className="md:col-span-2 lg:col-span-4">
                                <button 
                                    type="submit" 
                                    className={`w-full h-12 px-6 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg ${isSearching ? 'opacity-80 cursor-wait' : ''}`}
                                    disabled={isSearching}
                                >
                                    {isSearching ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="animate-pulse">Searching for adventures...</span>
                                        </>
                                    ) : (
                                        <><span className="relative group">Find Perfect Activities <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all"></span></span> <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                    
                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-delay-2">
                        <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg cursor-pointer group hover:bg-white/25 border border-white/30 shadow-md">
                            <div className="text-yellow-400 text-3xl mb-3 group-hover:text-yellow-300 transition-colors transform group-hover:scale-110 group-hover:rotate-3 duration-300 drop-shadow-md">
                                <i className="fas fa-star"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors drop-shadow-sm">Top-rated Experiences</h3>
                            <p className="text-white transition-colors">Curated selection of the highest quality activities</p>
                            <div className="mt-3 h-0.5 w-0 bg-yellow-400 group-hover:w-1/2 transition-all duration-300"></div>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg cursor-pointer group hover:bg-white/25 border border-white/30 shadow-md">
                            <div className="text-yellow-400 text-3xl mb-3 group-hover:text-yellow-300 transition-colors transform group-hover:scale-110 group-hover:rotate-3 duration-300 drop-shadow-md">
                                <i className="fas fa-calendar-check"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors drop-shadow-sm">Instant Booking</h3>
                            <p className="text-white transition-colors">Secure your spot instantly with immediate confirmation</p>
                            <div className="mt-3 h-0.5 w-0 bg-yellow-400 group-hover:w-1/2 transition-all duration-300"></div>
                        </div>
                        
                        <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg cursor-pointer group hover:bg-white/25 border border-white/30 shadow-md">
                            <div className="text-yellow-400 text-3xl mb-3 group-hover:text-yellow-300 transition-colors transform group-hover:scale-110 group-hover:rotate-3 duration-300 drop-shadow-md">
                                <i className="fas fa-money-bill-wave"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors drop-shadow-sm">Best Price Guarantee</h3>
                            <p className="text-white transition-colors">Find it cheaper elsewhere and we'll match the price</p>
                            <div className="mt-3 h-0.5 w-0 bg-yellow-400 group-hover:w-1/2 transition-all duration-300"></div>
                        </div>
                    </div>
                    
                    {/* Trending Activity Types */}
                    <div className="mt-12 mb-8 animate-fade-in-delay-2">
                        <h3 className="text-xl font-semibold mb-6 drop-shadow-md">Trending Activity Types</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {activityTypes.filter(type => type.value).map((type, index) => (
                                <Link 
                                    key={type.value}
                                    to={`/activities?type=${type.value}`}
                                    className="relative px-4 py-2 bg-white/25 backdrop-blur-md rounded-full transition-all hover:scale-105 hover:shadow-lg group border border-yellow-300 shadow-sm hover:bg-yellow-400 hover:text-blue-900"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <span className="relative z-10 font-medium drop-shadow-sm">{type.label}</span>
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300/0 via-yellow-300/20 to-yellow-300/0 group-hover:from-yellow-300/50 group-hover:via-yellow-300/50 group-hover:to-yellow-300/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    {/* CTA Button */}
                    <Link 
                        to="/activities" 
                        className="relative inline-block mt-8 group"
                    >
                        <span className="absolute inset-0 rounded-full bg-yellow-400 blur-md opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-blue-950 px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg border border-yellow-300/50">
                            Explore All Activities
                            <i className="fas fa-chevron-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;