import { BorrowingWorkflow } from '@/components/home/borrowing-workflow';
import { HeroBanner } from '@/components/home/hero-banner';
import { NewArrivalsSection } from '@/components/home/new-arrivals-section';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <NewArrivalsSection/>
            <BorrowingWorkflow />
        </div>
    );
};

export default HomePage;