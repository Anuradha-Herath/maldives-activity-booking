import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ActivityCategories from '../components/home/ActivityCategories';
import PopularActivities from '../components/home/PopularActivities';
import Testimonials from '../components/home/Testimonials';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    return (
        <div className="bg-background">
            <HeroSection />
            <div className="container mx-auto px-4">
                <ActivityCategories />
                <ErrorBoundary>
                    <PopularActivities />
                </ErrorBoundary>
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;