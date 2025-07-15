import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesOverview from '../components/home/ServicesOverview';
import TravelPackagesPreview from '../components/home/TravelPackagesPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    return (
        <div className="bg-background">
            <HeroSection />
            <ErrorBoundary>
                <ServicesOverview />
            </ErrorBoundary>
            <ErrorBoundary>
                <TravelPackagesPreview />
            </ErrorBoundary>
            <div className="container mx-auto px-4">
                <TestimonialsSection />
            </div>
        </div>
    );
};

export default Home;