
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PopularServices from '../components/home/PopularServices';
import ServiceCategories from '../components/home/ServiceCategories';
import Testimonials from '../components/home/Testimonials';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Home = () => {
    return (
        <div className="bg-background">
            <HeroSection />
            <div className="container mx-auto px-4">
                <ErrorBoundary>
                    <div className="py-12">
                        <PopularServices />
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className="py-12">
                        <ServiceCategories />
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div className="py-12">
                        <Testimonials />
                    </div>
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default Home;
