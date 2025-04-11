import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-primary text-white py-16 text-center hero-section">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-4 font-display">Experience the Maldives</h1>
                <p className="text-xl mb-8">Discover and book the best activities in paradise</p>
                <button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-background transition-colors">
                    Explore Activities
                </button>
            </div>
        </div>
    );
};

export default HeroSection;