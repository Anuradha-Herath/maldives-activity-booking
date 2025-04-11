import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedActivities from '../components/home/FeaturedActivities';

const Home = () => {
    return (
        <div className="bg-background">
            <HeroSection />
            <FeaturedActivities />
        </div>
    );
};

export default Home;