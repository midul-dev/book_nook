import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BorrowingWorkflow } from "@/components/home/borrowing-workflow";
import { HeroBanner } from "@/components/home/hero-banner";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const metadata: Metadata = {
  title: "BookNook | Home",
};

const HomePage = () => {
  return (
    <div>
      <HeroBanner />
      <Suspense
        fallback={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
            <LoadingSpinner size="md" message="Loading new arrivals on the shelf..." />
          </div>
        }
      >
        <NewArrivalsSection />
      </Suspense>
      <BorrowingWorkflow />
    </div>
  );
};

export default HomePage;
