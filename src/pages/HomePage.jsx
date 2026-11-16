import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
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

      {/* Main Clean Flow - Each section has generous breathing room and displays in full */}
      <main className="relative bg-white overflow-x-clip">
        {/* 1. HERO SECTION: Authentic Desert Safari & Search Widget */}
        <section id="hero" className="relative z-20">
          <HeroSection />
        </section>

        {/* 2. SIGNATURE ADVENTURES: Redesigned Showcase matching Brand Identity & WhyChooseUs */}
        <section id="featured-trips" className="relative z-10 py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-100/80 via-white to-slate-50/60">
          <TripStack />
        </section>

        {/* 3. WHY CHOOSE US: 4 Luxury Service Pillars */}
        <section id="why-us" className="relative z-10">
          <WhyChooseUs />
        </section>

        {/* 4. ALL SERVICES & DESTINATIONS */}
        <section id="services" className="relative z-10">
          <ServicesListSection />
        </section>

        {/* 5. DESERT SAFARIS & DUNE BUGGY SHOWCASE */}
        <section id="desert-safari" className="relative z-10">
          <DesertAdventuresSection />
        </section>

        {/* 6. RED SEA YACHTS & CORAL REEF DIVING */}
        <section id="sea-adventures" className="relative z-10">
          <SeaAdventuresSection />
        </section>

        {/* 7. VIP AIRPORT & HOTEL TRANSFERS 24/7 */}
        <section id="transfers" className="relative z-10">
          <TransfersSection />
        </section>

        {/* 8. 3-STEP EASY BOOKING JOURNEY */}
        <section id="how-it-works" className="relative z-10">
          <HowItWorks />
        </section>

        {/* 9. VERIFIED GUEST REVIEWS */}
        <section id="reviews" className="relative z-10">
          <ReviewsSection />
        </section>

        {/* 10. SOUTH SINAI & SHARM TRAVEL GUIDES */}
        <section id="guides" className="relative z-10">
          <DestinationGuideSection />
        </section>

        {/* 11. REAL MOMENTS INSTAGRAM GALLERY */}
        <section id="gallery" className="relative z-10">
          <InstagramGallery />
        </section>

        {/* 12. LUXURY FINAL CTA */}
        <section id="cta" className="relative z-10">
          <FinalCTA />
        </section>
      </main>
    </>
  );
};

export default HomePage;
