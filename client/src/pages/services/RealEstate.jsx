import React from 'react';
import { Link } from 'react-router-dom';

const RealEstate = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Real Estate Consultation</h1>
                    <p className="text-xl mb-8">Your trusted partner for property investments in the Maldives</p>
                    <Link 
                        to="/contact" 
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Get Consultation
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Our Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🏡</div>
                            <h3 className="text-lg font-semibold mb-3">Property Guidance</h3>
                            <p className="text-gray-600 text-sm">
                                Expert guidance on purchasing or leasing residential, commercial, or hospitality properties.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-semibold mb-3">Regulatory Info</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive information on property regulations and legal requirements in the Maldives.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-lg font-semibold mb-3">Market Insights</h3>
                            <p className="text-gray-600 text-sm">
                                Latest market trends, investment opportunities, and potential locations for your investment.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-lg font-semibold mb-3">Partner Network</h3>
                            <p className="text-gray-600 text-sm">
                                Connect with trusted real estate agencies, developers, and legal professionals.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Detailed Services */}
                <section className="mb-16">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-6">Property Investment Guidance</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">✓</span>
                                    <div>
                                        <h4 className="font-medium">Residential Properties</h4>
                                        <p className="text-gray-600 text-sm">Guidance on apartments, villas, and land for personal use or rental income.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">✓</span>
                                    <div>
                                        <h4 className="font-medium">Commercial Properties</h4>
                                        <p className="text-gray-600 text-sm">Office spaces, retail locations, and commercial developments.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">✓</span>
                                    <div>
                                        <h4 className="font-medium">Hospitality Projects</h4>
                                        <p className="text-gray-600 text-sm">Resorts, hotels, and guesthouse investment opportunities.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">✓</span>
                                    <div>
                                        <h4 className="font-medium">Legal Compliance</h4>
                                        <p className="text-gray-600 text-sm">Ensure all transactions comply with Maldivian property laws.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-6">Market Intelligence</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="text-blue-500 mr-3 mt-1">📊</span>
                                    <div>
                                        <h4 className="font-medium">Current Market Trends</h4>
                                        <p className="text-gray-600 text-sm">Stay updated with the latest property values and market movements.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-blue-500 mr-3 mt-1">🎯</span>
                                    <div>
                                        <h4 className="font-medium">Investment Hotspots</h4>
                                        <p className="text-gray-600 text-sm">Identify emerging areas with high growth potential.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-blue-500 mr-3 mt-1">💡</span>
                                    <div>
                                        <h4 className="font-medium">ROI Analysis</h4>
                                        <p className="text-gray-600 text-sm">Detailed return on investment calculations for informed decisions.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-blue-500 mr-3 mt-1">🏝️</span>
                                    <div>
                                        <h4 className="font-medium">Location Analysis</h4>
                                        <p className="text-gray-600 text-sm">Comprehensive evaluation of different atolls and islands.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Invest in Maldives */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Invest in Maldives Real Estate</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">🌴 Paradise Location</h3>
                                <p className="text-gray-600">
                                    Invest in one of the world's most sought-after tropical destinations with year-round appeal.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">📈 Growing Tourism</h3>
                                <p className="text-gray-600">
                                    Benefit from the Maldives' ever-growing tourism industry and increasing property demand.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">🏖️ Limited Supply</h3>
                                <p className="text-gray-600">
                                    Limited land availability creates scarcity value and potential for appreciation.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">💰 Rental Income</h3>
                                <p className="text-gray-600">
                                    Strong rental yields from vacation rentals and long-term leasing opportunities.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">🏛️ Stable Government</h3>
                                <p className="text-gray-600">
                                    Political stability and investor-friendly policies support property investments.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-blue-600">🌍 Global Appeal</h3>
                                <p className="text-gray-600">
                                    International recognition ensures sustained demand from global investors.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Opportunities */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Current Investment Opportunities</h2>
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-3">🏨 Resort Development Projects</h3>
                            <p className="text-gray-700 mb-4">
                                Several uninhabited islands are available for resort development, offering unique opportunities 
                                for hospitality investors looking to create world-class destinations.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <strong>Investment Range:</strong> $10M - $100M+
                                </div>
                                <div>
                                    <strong>Lease Period:</strong> 50-99 years
                                </div>
                                <div>
                                    <strong>Expected ROI:</strong> 12-18%
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-3">🏘️ Residential Developments</h3>
                            <p className="text-gray-700 mb-4">
                                Growing demand for housing in inhabited islands presents opportunities for residential 
                                developments catering to both locals and expatriates.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <strong>Investment Range:</strong> $500K - $5M
                                </div>
                                <div>
                                    <strong>Target Market:</strong> Local & Expat
                                </div>
                                <div>
                                    <strong>Expected ROI:</strong> 8-12%
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-3">🏢 Commercial Properties</h3>
                            <p className="text-gray-700 mb-4">
                                Commercial spaces in Male and other developed islands offer steady rental income 
                                and potential for capital appreciation.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <strong>Investment Range:</strong> $200K - $2M
                                </div>
                                <div>
                                    <strong>Rental Yield:</strong> 6-10%
                                </div>
                                <div>
                                    <strong>Lease Terms:</strong> 5-25 years
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-blue-600 text-white rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Explore Real Estate Opportunities?</h2>
                    <p className="text-xl mb-8">
                        Get personalized consultation and detailed market analysis for your investment goals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/contact" 
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Schedule Consultation
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Request Market Report
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RealEstate;
