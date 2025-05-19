import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const PopularActivities = () => {
    // Reference to the carousel container
    const carouselRef = useRef(null);
    
    const activities = [
        {
            id: 1,
            title: "Sunset Dolphin Cruise",
            image: "https://images.unsplash.com/photo-1564329494258-55936fbe4b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Experience the magic of dolphins swimming alongside your boat as the sun sets.",
            price: 89,
            rating: 4.8
        },
        {
            id: 2,
            title: "Scuba Diving Adventure",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Dive into the crystal clear waters and discover vibrant coral reefs.",
            price: 149,
            rating: 4.9
        },
        {
            id: 3,
            title: "Luxury Island Hopping",
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Visit multiple stunning islands in one day with a private boat.",
            price: 199,
            rating: 4.7
        },
        {
            id: 4,
            title: "Underwater Sea Walking",
            image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Walk on the ocean floor with specialized breathing equipment. No diving experience needed!",
            price: 129,
            rating: 4.6
        },
        {
            id: 5,
            title: "Parasailing Adventure",
            image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Soar high above the turquoise waters for a breathtaking aerial view of the Maldives.",
            price: 110,
            rating: 4.5
        },
        {
            id: 6,
            title: "Sunset Fishing Trip",
            image: "https://images.unsplash.com/photo-1540448093347-3f6183fd2a32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Try traditional Maldivian line fishing as the sun sets on the horizon.",
            price: 75,
            rating: 4.4
        }
    ];

    const handleBookNow = (id) => {
        console.log(`Booking activity ${id}`);
        // In a real app, this would navigate to booking page or open a modal
    };
    
    // Function to scroll the carousel left
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };
    
    // Function to scroll the carousel right
    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white rounded-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-700 font-display">Popular Activities</h2>
                    <Link to="/activities" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                        View All <span className="ml-1">→</span>
                    </Link>
                </div>
                
                <div className="relative">
                    {/* Left Arrow */}
                    <button 
                        onClick={scrollLeft} 
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:outline-none transition-all duration-300"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    {/* Carousel */}
                    <div 
                        ref={carouselRef} 
                        className="flex overflow-x-auto pb-6 space-x-6 hide-scrollbar scroll-smooth"
                    >
                        {activities.map(activity => (
                            <div key={activity.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-48">
                                    <img 
                                        src={activity.image} 
                                        alt={activity.title} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full font-bold">
                                        ${activity.price}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold text-blue-700">{activity.title}</h3>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm ml-1 text-gray-600">{activity.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                                    <button 
                                        onClick={() => handleBookNow(activity.id)}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Right Arrow */}
                    <button 
                        onClick={scrollRight} 
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:outline-none transition-all duration-300"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularActivities;
