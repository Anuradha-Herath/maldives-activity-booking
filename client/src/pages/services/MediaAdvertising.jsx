import React from 'react';
import { Link } from 'react-router-dom';

const MediaAdvertising = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Media & Advertising Solutions</h1>
                    <p className="text-xl mb-8">Strategic marketing and advertising services for the Maldivian market</p>
                    <Link 
                        to="/contact" 
                        className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                    >
                        Launch Your Campaign
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Core Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Media & Advertising Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📺</div>
                            <h3 className="text-lg font-semibold mb-3">Digital Marketing</h3>
                            <p className="text-gray-600 text-sm">
                                Comprehensive digital marketing strategies including social media, SEO, content marketing, and online advertising.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📸</div>
                            <h3 className="text-lg font-semibold mb-3">Creative Production</h3>
                            <p className="text-gray-600 text-sm">
                                High-quality photo and video production services showcasing the beauty of the Maldives for marketing campaigns.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-lg font-semibold mb-3">Brand Strategy</h3>
                            <p className="text-gray-600 text-sm">
                                Strategic brand development and positioning to establish strong market presence in the tourism industry.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-lg font-semibold mb-3">Marketing Analytics</h3>
                            <p className="text-gray-600 text-sm">
                                Data-driven marketing insights and performance analytics to optimize campaigns and maximize ROI.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Service Categories */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Service Portfolio</h2>
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-blue-600">🌐 Digital Marketing Solutions</h3>
                            <p className="text-gray-700 mb-6">
                                Complete digital marketing ecosystem to establish and grow your online presence in the competitive tourism market.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Social Media Marketing</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Instagram marketing for visual storytelling</li>
                                        <li>• Facebook advertising campaigns</li>
                                        <li>• YouTube channel development</li>
                                        <li>• TikTok marketing strategies</li>
                                        <li>• Influencer partnerships</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Search Engine Marketing</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• SEO optimization for travel keywords</li>
                                        <li>• Google Ads campaigns</li>
                                        <li>• Local business optimization</li>
                                        <li>• Travel blog content marketing</li>
                                        <li>• Review management systems</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-blue-600">Email & Content Marketing</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Email newsletter campaigns</li>
                                        <li>• Travel guide content creation</li>
                                        <li>• Blog writing and management</li>
                                        <li>• Customer journey automation</li>
                                        <li>• Personalization strategies</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-green-600">📷 Creative Production Services</h3>
                            <p className="text-gray-700 mb-6">
                                Professional visual content creation that captures the essence and beauty of Maldivian experiences.
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Photography Services</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Resort and hotel photography</li>
                                        <li>• Underwater photography</li>
                                        <li>• Aerial drone photography</li>
                                        <li>• Food and beverage styling</li>
                                        <li>• Guest experience documentation</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Video Production</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Resort promotional videos</li>
                                        <li>• Activity and experience videos</li>
                                        <li>• Guest testimonial filming</li>
                                        <li>• Time-lapse and cinematic shots</li>
                                        <li>• Virtual tours and 360° videos</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-green-600">Design Services</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Brand identity development</li>
                                        <li>• Marketing collateral design</li>
                                        <li>• Website and app UI/UX</li>
                                        <li>• Print advertising materials</li>
                                        <li>• Social media graphics</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold mb-4 text-purple-600">📱 Digital Platform Management</h3>
                            <p className="text-gray-700 mb-6">
                                Comprehensive management of digital platforms and online presence for tourism businesses.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3 text-purple-600">Website & App Development</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Responsive website design</li>
                                        <li>• Booking system integration</li>
                                        <li>• Mobile app development</li>
                                        <li>• CMS and admin panels</li>
                                        <li>• Payment gateway integration</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3 text-purple-600">Online Presence Management</h4>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Social media account management</li>
                                        <li>• Online reputation monitoring</li>
                                        <li>• Customer service automation</li>
                                        <li>• Digital asset management</li>
                                        <li>• Performance tracking & reporting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Industry Expertise */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Industry Expertise</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-3">🏨</div>
                            <h3 className="font-semibold mb-2">Resort Marketing</h3>
                            <p className="text-sm text-gray-600">Specialized marketing for luxury resorts and hospitality brands</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-3">🚤</div>
                            <h3 className="font-semibold mb-2">Activity Providers</h3>
                            <p className="text-sm text-gray-600">Marketing for water sports, diving, and adventure experiences</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-3">🍽️</div>
                            <h3 className="font-semibold mb-2">F&B Establishments</h3>
                            <p className="text-sm text-gray-600">Restaurant and culinary experience marketing campaigns</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="text-3xl mb-3">✈️</div>
                            <h3 className="font-semibold mb-2">Travel Agencies</h3>
                            <p className="text-sm text-gray-600">Tour operator and travel agency digital marketing solutions</p>
                        </div>
                    </div>
                </section>

                {/* Marketing Strategy Process */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Marketing Strategy Process</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-5 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">1️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Market Research</h3>
                                <p className="text-sm text-gray-600">Analyze target audience, competitors, and market trends</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">2️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Strategy Development</h3>
                                <p className="text-sm text-gray-600">Create comprehensive marketing strategy and campaign plans</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">3️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Content Creation</h3>
                                <p className="text-sm text-gray-600">Develop high-quality visual and written content</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">4️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Campaign Launch</h3>
                                <p className="text-sm text-gray-600">Execute multi-channel marketing campaigns</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">5️⃣</span>
                                </div>
                                <h3 className="font-semibold mb-2">Optimization</h3>
                                <p className="text-sm text-gray-600">Monitor performance and optimize for better results</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Metrics */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Track Record</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-pink-600 mb-2">200+</div>
                                <div className="text-gray-600">Successful Campaigns</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-600 mb-2">150%</div>
                                <div className="text-gray-600">Average ROI Increase</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-600 mb-2">2M+</div>
                                <div className="text-gray-600">Content Engagements</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
                                <div className="text-gray-600">Client Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Case Studies */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-32"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-3">Luxury Resort Campaign</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Increased bookings by 300% through targeted social media campaigns and influencer partnerships.
                                </p>
                                <div className="text-sm text-pink-600 font-medium">
                                    → 300% Booking Increase
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-3">Activity Provider Rebrand</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Complete brand transformation and digital presence overhaul leading to market leadership.
                                </p>
                                <div className="text-sm text-pink-600 font-medium">
                                    → #1 Market Position
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-32"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-3">Restaurant Chain Launch</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Successful launch of international restaurant chain with integrated marketing approach.
                                </p>
                                <div className="text-sm text-pink-600 font-medium">
                                    → 8 Locations in Year 1
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-pink-600 text-white rounded-lg p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Amplify Your Brand?</h2>
                    <p className="text-xl mb-8">
                        Let's create compelling marketing campaigns that drive results for your tourism business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/contact" 
                            className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Start Your Campaign
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
                        >
                            Request Marketing Audit
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MediaAdvertising;
