'use client';
import { BorrowingWorkflow } from '@/components/home/borrowing-workflow';
import { HeroBanner } from '@/components/home/hero-banner';
import { NewArrivalsSection } from '@/components/home/new-arrivals-section';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <NewArrivalsSection
                books={[]}
                onViewDetails={() => {}}
                onOpenAddBook={() => {}}
            />
            <BorrowingWorkflow />
        </div>
    );
};

export default HomePage;