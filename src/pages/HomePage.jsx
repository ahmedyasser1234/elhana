import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import StackSection from '../components/StackSection';
import { HeroSection } from '../components/home/HeroSection';
import TripStack from '../components/TripStack';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ServicesListSection } from '../components/home/ServicesListSection';
import { DesertAdventuresSection } from '../components/home/DesertAdventuresSection';
import { SeaAdventuresSection } from '../components/home/SeaAdventuresSection';
import { TransfersSection } from '../components/home/TransfersSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { DestinationGuideSection } from '../components/home/DestinationGuideSection';
import { InstagramGallery } from '../components/home/InstagramGallery';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage = () => {
  return (
    <>
      <SEOHead
        title="El Hana Group | Sharm El Sheikh Luxury Safaris & Tours"
        description="Book premium desert safaris, ATV quad bike adventures, dune buggy tours, Bedouin sunset experiences, luxury yacht cruises, snorkeling, and diving in Sharm El Sheikh with El Hana Group."
      />

      {/* ONE Stacking Deck Container for All Home Sections */}
      <main className="relative isolate">
        {/* PANEL 0: Hero Section (Sticks at top, flat top) */}
        <StackSection index={0} id="hero" bg="bg-slate-900">
          <HeroSection />
        </StackSection>

        {/* PANELS 1..5: Curated Featured Trips (Each trip is its own sticky panel) */}
        <TripStack startIndex={1} />

        {/* PANEL 6: Why Choose Us (4 Feature Cards) */}
        <StackSection index={6} id="why-us" bg="bg-white">
          <WhyChooseUs />
        </StackSection>

        {/* PANEL 7: Tour Destinations & Categories */}
        <StackSection index={7} id="services" bg="bg-white">
          <ServicesListSection />
        </StackSection>

        {/* PANEL 8: Desert Safaris & Buggy Adventure Showcase */}
        <StackSection index={8} id="desert-safari" bg="bg-[#FFFDF7]">
          <DesertAdventuresSection />
        </StackSection>

        {/* PANEL 9: Red Sea Yacht & Diving Showcase */}
        <StackSection index={9} id="sea-adventures" bg="bg-[#F0FDF4]">
          <SeaAdventuresSection />
        </StackSection>

        {/* PANEL 10: VIP Airport & Hotel Transfers */}
        <StackSection index={10} id="transfers" bg="bg-white">
          <TransfersSection />
        </StackSection>

        {/* PANEL 11: 3-Step Booking Journey */}
        <StackSection index={11} id="how-it-works" bg="bg-slate-50">
          <HowItWorks />
        </StackSection>

        {/* PANEL 12: Verified Guest Reviews & Testimonials */}
        <StackSection index={12} id="reviews" bg="bg-white">
          <ReviewsSection />
        </StackSection>

        {/* PANEL 13: South Sinai & Sharm Travel Guides */}
        <StackSection index={13} id="guides" bg="bg-slate-50">
          <DestinationGuideSection />
        </StackSection>

        {/* PANEL 14: Real Moments Instagram Gallery */}
        <StackSection index={14} id="gallery" bg="bg-white">
          <InstagramGallery />
        </StackSection>

        {/* PANEL 15: Luxury Final CTA (Last panel in deck before footer) */}
        <StackSection index={15} id="cta" bg="bg-slate-950">
          <FinalCTA />
        </StackSection>
      </main>
    </>
  );
};

export default HomePage;
