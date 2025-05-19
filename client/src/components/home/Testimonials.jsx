import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "United Kingdom",
            comment: "The snorkeling trip was absolutely magical! We saw so many colorful fish and even spotted a sea turtle. Would highly recommend!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Singapore",
            comment: "The sunset cruise exceeded all expectations. The staff was professional and the views were breathtaking. A perfect evening in paradise.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            location: "Spain",
            comment: "Island hopping was the highlight of our trip. Each island was more beautiful than the last, and the lunch provided was delicious!",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4 text-blue-700 font-display">What Our Customers Say</h2>
                <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Read reviews from travelers who have experienced our activities</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
                            <div className="flex items-center mb-4">
                                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="font-bold text-blue-800">{review.name}</h3>
                                    <p className="text-gray-500 text-sm">{review.location}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
