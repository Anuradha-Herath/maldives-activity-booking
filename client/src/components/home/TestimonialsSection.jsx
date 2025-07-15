import React from 'react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "New York, USA",
            rating: 5,
            text: "Amazing experience! The travel package was perfectly organized and the accommodations exceeded our expectations. Highly recommend their services.",
            image: "/images/testimonial-1.jpg",
            service: "Romantic Getaway Package"
        },
        {
            id: 2,
            name: "Ahmed Hassan",
            location: "London, UK",
            rating: 5,
            text: "Professional real estate consultation helped us find the perfect investment property. Their local knowledge and expertise made all the difference.",
            image: "/images/testimonial-2.jpg",
            service: "Real Estate Consultation"
        },
        {
            id: 3,
            name: "Maria Garcia",
            location: "Madrid, Spain",
            rating: 5,
            text: "The custom travel package was exactly what we wanted. Great attention to detail and excellent customer service throughout our trip.",
            image: "/images/testimonial-3.jpg",
            service: "Custom Travel Package"
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ⭐
            </span>
        ));
    };

    return (
        <section className="py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Read testimonials from our satisfied clients who experienced the best of the Maldives
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            {renderStars(testimonial.rating)}
                        </div>
                        
                        {/* Testimonial Text */}
                        <p className="text-gray-700 mb-6 italic">
                            "{testimonial.text}"
                        </p>
                        
                        {/* Client Info */}
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                <span className="text-white font-medium">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                <p className="text-sm text-gray-600">{testimonial.location}</p>
                                <p className="text-xs text-blue-600">{testimonial.service}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 bg-blue-600 rounded-lg text-white p-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl font-bold mb-2">500+</div>
                        <div className="text-blue-100">Happy Clients</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-2">50+</div>
                        <div className="text-blue-100">Travel Packages</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-2">25+</div>
                        <div className="text-blue-100">Investment Projects</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-2">10+</div>
                        <div className="text-blue-100">Years Experience</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
