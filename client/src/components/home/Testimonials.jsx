import React from 'react';

const Testimonials = () => {
    // Add a cache-busting timestamp to prevent caching issues with external images
    // Use either the build timestamp or a version number for production to avoid changing on every page load
    const cacheBuster = `v=${process.env.NODE_ENV === 'production' ? '1.0.0' : Date.now()}`;
    
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "United Kingdom",
            comment: "The snorkeling trip was absolutely magical! We saw so many colorful fish and even spotted a sea turtle. Would highly recommend!",
            rating: 5,
            image: `https://randomuser.me/api/portraits/women/44.jpg?${cacheBuster}`
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Singapore",
            comment: "The sunset cruise exceeded all expectations. The staff was professional and the views were breathtaking. A perfect evening in paradise.",
            rating: 5,
            image: `https://randomuser.me/api/portraits/men/32.jpg?${cacheBuster}`
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            location: "Spain",
            comment: "Island hopping was the highlight of our trip. Each island was more beautiful than the last, and the lunch provided was delicious!",
            rating: 4,
            image: `https://randomuser.me/api/portraits/women/68.jpg?${cacheBuster}`
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-700 font-display mb-4">What Our Guests Say</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Don't just take our word for it - hear from travelers who have experienced the magic of Maldives with us
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div 
                            key={review.id} 
                            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            {/* Quote Icon */}
                            <div className="text-blue-200 mb-4 group-hover:text-blue-300 transition-colors">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                                </svg>
                            </div>
                            
                            <div className="flex mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            
                            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{review.comment}"</p>
                            
                            <div className="flex items-center">
                                <div className="relative">
                                    <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full mr-4 border-2 border-blue-100" />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-blue-800 text-lg">{review.name}</h3>
                                    <p className="text-gray-500 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {review.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Join thousands of satisfied customers</p>
                    <div className="flex justify-center items-center space-x-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            ))}
                        </div>
                        <span className="text-lg font-semibold text-blue-700">4.9/5</span>
                        <span className="text-gray-600">(2,459 reviews)</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
