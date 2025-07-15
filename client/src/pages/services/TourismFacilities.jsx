import React from 'react';
import { Link } from 'react-router-dom';

const TourismFacilities = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Tourism Facilities Development</h1>
                    <p className="text-xl mb-8">Comprehensive development solutions for world-class tourism infrastructure</p>
                    <Link 
                        to="/contact" 
                        className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Start Your Project
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Core Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Tourism Development Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🏖️</div>
                            <h3 className="text-lg font-semibold mb-3">Resort Development</h3>
                            <p className="text-gray-600 text-sm">
                                End-to-end resort development from concept design to operational launch, specializing in luxury and eco-friendly properties.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">⚓</div>
                            <h3 className="text-lg font-semibold mb-3">Marina & Waterfront</h3>
                            <p className="text-gray-600 text-sm">
                                Design and construction of marinas, seaplane bases, and waterfront facilities for enhanced guest accessibility.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🌊</div>
                            <h3 className="text-lg font-semibold mb-3">Water Sports Centers</h3>
                            <p className="text-gray-600 text-sm">
                                State-of-the-art water sports facilities including diving centers, surf schools, and marine adventure hubs.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🍽️</div>
                            <h3 className="text-lg font-semibold mb-3">F&B Facilities</h3>
                            <p className="text-gray-600 text-sm">
                                Restaurant design and kitchen facilities optimized for tropical environments and diverse culinary experiences.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🧘</div>
                            <h3 className="text-lg font-semibold mb-3">Spa & Wellness</h3>
                            <p className="text-gray-600 text-sm">
                                Luxury spa and wellness centers incorporating traditional Maldivian healing practices with modern amenities.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🏃</div>
                            <h3 className="text-lg font-semibold mb-3">Recreation Facilities</h3>
                            <p className="text-gray-600 text-sm">
                                Tennis courts, fitness centers, kids' clubs, and entertainment venues designed for tropical environments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Development Categories */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Development Categories</h2>
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">🏨 Luxury Resort Properties</h3>
                            <p className="text-gray-700 mb-6">
                                Premium resort developments that set new standards for luxury hospitality in tropical destinations.
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Overwater Villas</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Sustainable pile foundation systems</li>
                                        <li>• Glass floor viewing panels</li>
                                        <li>• Private infinity pools</li>
                                        <li>• Direct lagoon access</li>
                                        <li>• Smart home integration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Beach Villas</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Natural ventilation systems</li>
                                        <li>• Private beach frontage</li>
                                        <li>• Outdoor rain showers</li>
                                        <li>• Tropical garden courtyards</li>
                                        <li>• Solar power integration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Presidential Suites</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Multi-level layouts</li>
                                        <li>• Private butler quarters</li>
                                        <li>• Helicopter landing pads</li>
                                        <li>• Exclusive dining pavilions</li>
                                        <li>• Private yacht berths</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-green-600">🌿 Eco-Sustainable Resorts</h3>
                            <p className="text-gray-700 mb-6">
                                Environmentally responsible resort development with minimal ecological impact and maximum sustainability.
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Renewable Energy</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Solar panel installations</li>
                                        <li>• Wind energy systems</li>
                                        <li>• Energy storage solutions</li>
                                        <li>• LED lighting systems</li>
                                        <li>• Smart energy management</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Water Conservation</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Rainwater harvesting</li>
                                        <li>• Greywater recycling</li>
                                        <li>• Desalination plants</li>
                                        <li>• Low-flow fixtures</li>
                                        <li>• Irrigation optimization</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Waste Management</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Waste sorting facilities</li>
                                        <li>• Composting systems</li>
                                        <li>• Recycling programs</li>
                                        <li>• Biogas generation</li>
                                        <li>• Plastic-free initiatives</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-purple-600">🚁 Transportation Infrastructure</h3>
                            <p className="text-gray-700 mb-6">
                                Comprehensive transportation solutions connecting guests seamlessly from arrival to accommodation.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-purple-600">Aviation Facilities</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Seaplane terminals and lounges</li>
                                        <li>• Helicopter landing platforms</li>
                                        <li>• Private jet terminal facilities</li>
                                        <li>• Ground handling services</li>
                                        <li>• Customs and immigration facilities</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-purple-600">Marine Transportation</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• High-speed boat terminals</li>
                                        <li>• Yacht and superyacht berths</li>
                                        <li>• Ferry terminals with amenities</li>
                                        <li>• Floating pontoon systems</li>
                                        <li>• Marine fuel and maintenance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Development Process */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-6 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Site Analysis</h3>
                                <p className="text-sm text-gray-600">Comprehensive environmental and feasibility assessment</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Master Planning</h3>
                                <p className="text-sm text-gray-600">Integrated resort design and landscape architecture</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">EIA & Permits</h3>
                                <p className="text-sm text-gray-600">Environmental impact assessment and regulatory approvals</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">4️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Construction</h3>
                                <p className="text-sm text-gray-600">Project management and construction execution</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">5️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Pre-Opening</h3>
                                <p className="text-sm text-gray-600">Staff training, system testing, and soft opening</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">6️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Operations</h3>
                                <p className="text-sm text-gray-600">Ongoing support and facility management</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specialized Features */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Specialized Tourism Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">🐠</div>
                            <h3 className="font-semibold mb-2">Marine Discovery Centers</h3>
                            <p className="text-sm text-gray-600">Interactive marine life exhibits and educational facilities</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">🌅</div>
                            <h3 className="font-semibold mb-2">Sunset Pavilions</h3>
                            <p className="text-sm text-gray-600">Romantic dining and event spaces with panoramic ocean views</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">🎭</div>
                            <h3 className="font-semibold mb-2">Cultural Centers</h3>
                            <p className="text-sm text-gray-600">Authentic Maldivian cultural experiences and performances</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">🌙</div>
                            <h3 className="font-semibold mb-2">Observatory Decks</h3>
                            <p className="text-sm text-gray-600">Stargazing facilities and astronomical observation points</p>
                        </div>
                    </div>
                </section>

                {/* Sustainability Standards */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Sustainability Standards</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-600">Environmental Protection</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Coral reef preservation protocols</li>
                                    <li>• Native vegetation conservation</li>
                                    <li>• Marine turtle nesting protection</li>
                                    <li>• Minimal site disturbance construction</li>
                                    <li>• Carbon footprint reduction targets</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-blue-600">Community Integration</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Local employment priority</li>
                                    <li>• Skills development programs</li>
                                    <li>• Local supplier partnerships</li>
                                    <li>• Cultural heritage preservation</li>
                                    <li>• Community benefit sharing</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-purple-600">Quality Certifications</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Green Building Council certification</li>
                                    <li>• EarthCheck environmental standards</li>
                                    <li>• LEED sustainability rating</li>
                                    <li>• ISO 14001 environmental management</li>
                                    <li>• Blue Flag marine certification</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-teal-600 text-white rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Develop Your Tourism Project?</h2>
                    <p className="text-xl mb-8">
                        Transform your vision into a world-class tourism destination with our comprehensive development expertise.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/contact" 
                            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Schedule Project Consultation
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors"
                        >
                            Request Development Proposal
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TourismFacilities;
