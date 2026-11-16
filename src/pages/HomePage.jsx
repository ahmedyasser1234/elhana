import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import StackSection from '../components/StackSection';
import { HeroSection } from '../components/home/HeroSection';
import TripStack from '../components/TripStack';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { DesertAdventuresSection } from '../components/home/DesertAdventuresSection';
import { SeaAdventuresSection } from '../components/home/SeaAdventuresSection';
import { TransfersSection } from '../components/home/TransfersSection';
import { CompletePackagesSection } from '../components/home/CompletePackagesSection';
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
        canonicalUrl="https://www.elahanasafari.com/"
      />

      {/* ONE Stacking Deck Container for All Home Sections (الحركة والتصكيك المتراكب الأصلي) */}
      <main className="relative isolate">
        {/* PANEL 0: Hero Section (Sticks at top, flat top) */}
        <StackSection index={0} id="hero" bg="bg-slate-900">
          <HeroSection />
        </StackSection>

        {/* PANELS 1..21: ALL Curated Tours & Experiences (Each trip is its own sticky stacking panel) */}
        <TripStack startIndex={1} />

        {/* PANEL 22: Why Choose Us (4 Luxury Feature Cards) */}
        <StackSection index={22} id="why-us" bg="bg-white">
          <WhyChooseUs />
        </StackSection>

        {/* PANEL 23: Desert Safaris & Buggy Adventure Showcase */}
        <StackSection index={23} id="desert-safari" bg="bg-[#FFFDF7]">
          <DesertAdventuresSection />
        </StackSection>

        {/* PANEL 24: Red Sea Yacht & Marine Offers */}
        <StackSection index={24} id="sea-adventures" bg="bg-[#F0FDF4]">
          <SeaAdventuresSection />
        </StackSection>

        {/* PANEL 25: South Sinai & Sharm Private Transfers 24/7 */}
        <StackSection index={25} id="transfers" bg="bg-white">
          <TransfersSection />
        </StackSection>

        {/* PANEL 26: Complete Packages & Combo Offers (رحلات كاملة عرض في السعر) */}
        <StackSection index={26} id="complete-packages" bg="bg-[#FFFDF7]">
          <CompletePackagesSection />
        </StackSection>

        {/* PANEL 27: 3-Step Booking Journey */}
        <StackSection index={27} id="how-it-works" bg="bg-slate-50">
          <HowItWorks />
        </StackSection>

        {/* PANEL 28: Verified Guest Reviews */}
        <StackSection index={28} id="reviews" bg="bg-white">
          <ReviewsSection />
        </StackSection>

        {/* PANEL 29: South Sinai & Sharm Travel Guides */}
        <StackSection index={29} id="guides" bg="bg-slate-50">
          <DestinationGuideSection />
        </StackSection>

        {/* PANEL 30: Real Moments Instagram Gallery */}
        <StackSection index={30} id="gallery" bg="bg-white">
          <InstagramGallery />
        </StackSection>

        {/* PANEL 31: Luxury Final CTA (Last panel in deck before footer) */}
        <StackSection index={31} id="cta" bg="bg-slate-950">
          <FinalCTA />
        </StackSection>
      </main>
    </>
  );
};

export default HomePage;
