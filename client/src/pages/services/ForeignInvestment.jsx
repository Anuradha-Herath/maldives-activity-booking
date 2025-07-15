import React from 'react';
import { Link } from 'react-router-dom';

const ForeignInvestment = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Foreign Investment Support</h1>
                    <p className="text-xl mb-8">Comprehensive support for international investors in the Maldives</p>
                    <Link 
                        to="/contact" 
                        className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Start Your Investment Journey
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Comprehensive Support */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Support for Investors</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🏢</div>
                            <h3 className="text-lg font-semibold mb-3">Business Setup</h3>
                            <p className="text-gray-600 text-sm">
                                Complete guidance on legal requirements, company registration, and licensing procedures.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="text-lg font-semibold mb-3">Local Partnerships</h3>
                            <p className="text-gray-600 text-sm">
                                Connect with trusted local partners and established developers for joint ventures.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-lg font-semibold mb-3">Regulatory Compliance</h3>
                            <p className="text-gray-600 text-sm">
                                Ensure full compliance with Maldivian laws and international investment regulations.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-lg font-semibold mb-3">Ongoing Support</h3>
                            <p className="text-gray-600 text-sm">
                                Continuous assistance for business operations and growth strategies.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Investment Opportunities */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Investment Opportunities</h2>
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">🏨 Tourism & Hospitality</h3>
                            <p className="text-gray-700 mb-4">
                                The tourism sector offers the most lucrative opportunities for foreign investors in the Maldives.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Resort Development</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Luxury resort projects</li>
                                        <li>• Eco-friendly developments</li>
                                        <li>• Overwater villa concepts</li>
                                        <li>• Wellness retreat centers</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Tourism Services</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Tour operations</li>
                                        <li>• Water sports facilities</li>
                                        <li>• Yacht charter services</li>
                                        <li>• Diving centers</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Hospitality Infrastructure</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Airport transfer services</li>
                                        <li>• Marina developments</li>
                                        <li>• Restaurant chains</li>
                                        <li>• Spa and wellness centers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-green-600">🏡 Real Estate Development</h3>
                            <p className="text-gray-700 mb-4">
                                Growing demand for housing and commercial spaces creates opportunities for developers.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Residential Projects</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Affordable housing developments</li>
                                        <li>• Luxury residential complexes</li>
                                        <li>• Serviced apartments</li>
                                        <li>• Mixed-use developments</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Commercial Spaces</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Shopping centers</li>
                                        <li>• Office complexes</li>
                                        <li>• Industrial facilities</li>
                                        <li>• Logistics centers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-purple-600">💡 Infrastructure & Technology</h3>
                            <p className="text-gray-700 mb-4">
                                Investment opportunities in essential infrastructure and emerging technologies.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-2">Infrastructure Development</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Renewable energy projects</li>
                                        <li>• Water management systems</li>
                                        <li>• Waste management facilities</li>
                                        <li>• Transportation infrastructure</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Technology & Innovation</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Digital banking solutions</li>
                                        <li>• E-commerce platforms</li>
                                        <li>• Telecommunications</li>
                                        <li>• Educational technology</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Investment Process */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Investment Process</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-5 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Initial Consultation</h3>
                                <p className="text-sm text-gray-600">Discuss your investment goals and assess opportunities</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Market Analysis</h3>
                                <p className="text-sm text-gray-600">Comprehensive market research and feasibility studies</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Legal Framework</h3>
                                <p className="text-sm text-gray-600">Establish legal entity and obtain necessary permits</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">4️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Implementation</h3>
                                <p className="text-sm text-gray-600">Execute investment plan with local partners</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">5️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Ongoing Support</h3>
                                <p className="text-sm text-gray-600">Continuous monitoring and growth assistance</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Government Partners */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Affiliated Authorities & Partners</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏛️</div>
                                <h3 className="font-semibold mb-2">Ministry of Economic Development</h3>
                                <p className="text-sm text-gray-600">Investment policy and business registration</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏪</div>
                                <h3 className="font-semibold mb-2">Business Registration Office</h3>
                                <p className="text-sm text-gray-600">Company incorporation and licensing</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏦</div>
                                <h3 className="font-semibold mb-2">Maldives Monetary Authority</h3>
                                <p className="text-sm text-gray-600">Financial services and banking</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏝️</div>
                                <h3 className="font-semibold mb-2">Ministry of Tourism</h3>
                                <p className="text-sm text-gray-600">Tourism investment approvals</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">⚖️</div>
                                <h3 className="font-semibold mb-2">Legal Partners Network</h3>
                                <p className="text-sm text-gray-600">Qualified legal firms and advisors</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🤝</div>
                                <h3 className="font-semibold mb-2">Local Developer Network</h3>
                                <p className="text-sm text-gray-600">Established development partners</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-purple-600 text-white rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Invest in the Maldives?</h2>
                    <p className="text-xl mb-8">
                        Get expert guidance and comprehensive support for your investment journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/contact" 
                            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Schedule Investment Consultation
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
                        >
                            Request Investment Guide
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ForeignInvestment;
