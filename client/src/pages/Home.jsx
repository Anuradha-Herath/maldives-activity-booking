import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularActivities from '../components/home/PopularActivities';
import ActivityCategories from '../components/home/ActivityCategories';
import Testimonials from '../components/home/Testimonials';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    return (
        <div className="bg-background">
            <HeroSection />
            <ErrorBoundary>
                <PopularActivities />
            </ErrorBoundary>
            <div className="container mx-auto px-4">
                <ErrorBoundary>
                    <div className="py-12">
                        <ActivityCategories />
                    </div>
                </ErrorBoundary>
                <Testimonials />
            </div>
        </div>
    );
};

export default Home;