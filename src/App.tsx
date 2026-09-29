/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustIntro } from './components/TrustIntro';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedGallery } from './components/FeaturedGallery';
import { WhyTait } from './components/WhyTait';
import { JobsiteEducation } from './components/JobsiteEducation';
import { SocialProofSection } from './components/SocialProofSection';
import { BookingSystem } from './components/BookingSystem';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingModal } from './components/BookingModal';
import { QuoteModal } from './components/QuoteModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { LightboxModal } from './components/LightboxModal';
import { ConfigModal } from './components/ConfigModal';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  return (
    <ConfigProvider>
      <div className="min-h-screen flex flex-col bg-[#FDFDFE] text-[#0d2030] selection:bg-[#2A9FE4] selection:text-[#FDFDFE]">
        {/* Minimal Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1 w-full">
          {/* Hero Section */}
          <Hero />

          {/* Section 1: Trust / Intro */}
          <TrustIntro />

          {/* Section 2: Services Showcase */}
          <ServicesSection />

          {/* Section 3: Featured Work / Visual Gallery */}
          <FeaturedGallery />

          {/* Section 4: Why Tait Maintained */}
          <WhyTait />

          {/* Section 5: Plumbing & Heating Education */}
          <JobsiteEducation />

          {/* Section 6: Social Proof / Community */}
          <SocialProofSection />

          {/* Section 7: Multi-Step Booking Experience */}
          <section id="booking-section" className="scroll-mt-16">
            <BookingSystem />
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Contact Button */}
        <FloatingWhatsApp />

        {/* Mobile Sticky Quick Action Bar */}
        <MobileStickyBar />

        {/* Interactive Modals & Drawers */}
        <BookingModal />
        <QuoteModal />
        <ServiceDetailModal />
        <LightboxModal />
        <ConfigModal />
        <SearchModal />
        <Toast />
      </div>
    </ConfigProvider>
  );
}
