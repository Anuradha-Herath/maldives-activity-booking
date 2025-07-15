import React from 'react';

const TravelServices = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Travel Services</h1>
                    <p className="text-xl">Comprehensive travel planning and concierge services for your perfect Maldivian experience</p>
                </div>
            </div>

            {/* Services Overview */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Travel Planning */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-blue-600 text-4xl mb-4">✈️</div>
                        <h3 className="text-xl font-semibold mb-3">Travel Planning</h3>
                        <p className="text-gray-600">Personalized itinerary planning and travel consultation services</p>
                    </div>

                    {/* Concierge Services */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-blue-600 text-4xl mb-4">🏨</div>
                        <h3 className="text-xl font-semibold mb-3">Concierge Services</h3>
                        <p className="text-gray-600">24/7 support and assistance during your stay in the Maldives</p>
                    </div>

                    {/* Custom Packages */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="text-blue-600 text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-3">Custom Packages</h3>
                        <p className="text-gray-600">Tailored travel packages to suit your preferences and budget</p>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                                <p className="text-gray-600 mb-6">
                                    With years of experience in the Maldivian tourism industry, we provide insider knowledge 
                                    and authentic experiences that you won't find elsewhere.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Personalized Service</h3>
                                <p className="text-gray-600 mb-6">
                                    Every traveler is unique, and we craft personalized experiences that match your 
                                    preferences, budget, and travel style.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                                <p className="text-gray-600 mb-6">
                                    Our dedicated team is available around the clock to ensure your trip runs smoothly 
                                    from start to finish.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Best Rates</h3>
                                <p className="text-gray-600 mb-6">
                                    Through our extensive network of partners, we secure the best rates for 
                                    accommodations, activities, and transfers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelServices;
