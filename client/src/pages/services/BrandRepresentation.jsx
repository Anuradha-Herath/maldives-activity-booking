import React from 'react';
import { Link } from 'react-router-dom';

const BrandRepresentation = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">International Brand Representation</h1>
                    <p className="text-xl mb-8">Your gateway to the Maldivian market for international brands</p>
                    <Link 
                        to="/contact" 
                        className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Partner With Us
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Our Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Brand Representation Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-lg font-semibold mb-3">Market Entry Strategy</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive market analysis and strategic planning for successful brand entry into the Maldivian market.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-3">Sales & Distribution</h3>
                            <p className="text-gray-600 text-sm">
                                Establish robust distribution networks and sales channels across the Maldives' unique geography.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📢</div>
                            <h3 className="text-lg font-semibold mb-3">Marketing & Promotion</h3>
                            <p className="text-gray-600 text-sm">
                                Culturally-sensitive marketing campaigns that resonate with local audiences and tourists.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">⚖️</div>
                            <h3 className="text-lg font-semibold mb-3">Regulatory Compliance</h3>
                            <p className="text-gray-600 text-sm">
                                Navigate local regulations, import procedures, and licensing requirements seamlessly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Industries We Serve */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">🏨 Hospitality & Tourism</h3>
                            <p className="text-gray-700 mb-4">
                                Specialized expertise in representing hospitality brands in the world's premier luxury tourism destination.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Luxury Brands</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Resort management companies</li>
                                        <li>• Luxury hotel chains</li>
                                        <li>• High-end service providers</li>
                                        <li>• Premium amenity brands</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">F&B Brands</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• International restaurant chains</li>
                                        <li>• Beverage companies</li>
                                        <li>• Specialty food suppliers</li>
                                        <li>• Gourmet product lines</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Experience Providers</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Water sports equipment</li>
                                        <li>• Spa and wellness brands</li>
                                        <li>• Marine activity operators</li>
                                        <li>• Entertainment systems</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-green-600">🛍️ Consumer Products</h3>
                            <p className="text-gray-700 mb-4">
                                Comprehensive representation for consumer brands targeting both resident and tourist markets.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Lifestyle & Fashion</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Fashion and apparel brands</li>
                                        <li>• Luxury accessories</li>
                                        <li>• Beauty and cosmetics</li>
                                        <li>• Lifestyle products</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Electronics & Technology</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Consumer electronics</li>
                                        <li>• Mobile devices and accessories</li>
                                        <li>• Home appliances</li>
                                        <li>• Smart home solutions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Health & Wellness</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Pharmaceutical products</li>
                                        <li>• Health supplements</li>
                                        <li>• Fitness equipment</li>
                                        <li>• Medical devices</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-purple-600">🏗️ Industrial & Infrastructure</h3>
                            <p className="text-gray-700 mb-4">
                                Supporting infrastructure development with international industrial and construction brands.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Construction & Building</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Construction materials</li>
                                        <li>• Building systems</li>
                                        <li>• Architectural products</li>
                                        <li>• Sustainable building solutions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Marine & Transportation</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Marine equipment</li>
                                        <li>• Transportation solutions</li>
                                        <li>• Logistics systems</li>
                                        <li>• Renewable energy systems</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Approach */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Strategic Approach</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🔍</span>
                                </div>
                                <h3 className="font-semibold mb-3">Market Research</h3>
                                <p className="text-sm text-gray-600">
                                    Deep analysis of market dynamics, consumer behavior, and competitive landscape
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <h3 className="font-semibold mb-3">Strategic Planning</h3>
                                <p className="text-sm text-gray-600">
                                    Customized go-to-market strategies aligned with brand objectives and local needs
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="font-semibold mb-3">Partnership Building</h3>
                                <p className="text-sm text-gray-600">
                                    Establish strong relationships with key stakeholders and distribution partners
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="font-semibold mb-3">Growth Management</h3>
                                <p className="text-sm text-gray-600">
                                    Ongoing optimization and scaling strategies for sustainable market growth
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-lg font-semibold mb-3">Luxury Resort Chain</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Successfully introduced a premium international resort brand, achieving 85% occupancy rates within the first year.
                            </p>
                            <div className="text-sm text-orange-600 font-medium">
                                → 200% ROI in Year 1
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-lg font-semibold mb-3">Technology Brand</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Established market presence for a global electronics brand across 50+ retail locations nationwide.
                            </p>
                            <div className="text-sm text-orange-600 font-medium">
                                → 40% Market Share in 18 Months
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-4xl mb-4">🍽️</div>
                            <h3 className="text-lg font-semibold mb-3">F&B Chain</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Launched international restaurant chain with culturally-adapted menu, now operating 15 locations.
                            </p>
                            <div className="text-sm text-orange-600 font-medium">
                                → 15 Locations Nationwide
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us as Your Representative</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-orange-600">Local Expertise</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Deep Market Knowledge</h4>
                                            <p className="text-sm text-gray-600">15+ years of experience in the Maldivian market</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Cultural Understanding</h4>
                                            <p className="text-sm text-gray-600">Navigate local customs and business practices</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Government Relations</h4>
                                            <p className="text-sm text-gray-600">Strong relationships with key authorities</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-6 text-orange-600">Proven Track Record</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">50+ Successful Representations</h4>
                                            <p className="text-sm text-gray-600">Diverse portfolio across multiple industries</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">95% Client Retention Rate</h4>
                                            <p className="text-sm text-gray-600">Long-term partnerships built on results</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 mt-1 mr-3">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Multi-Channel Network</h4>
                                            <p className="text-sm text-gray-600">Established distribution and retail partnerships</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-orange-600 text-white rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Enter the Maldivian Market?</h2>
                    <p className="text-xl mb-8">
                        Let us be your trusted partner for successful brand representation in the Maldives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/contact" 
                            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Schedule Brand Consultation
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                        >
                            Request Market Analysis
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BrandRepresentation;
