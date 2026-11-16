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

        {/* PANEL 1: Why Choose Us (4 Luxury Feature Cards - تانى سكشن تحت الهيرو على طول) */}
        <StackSection index={1} id="why-us" bg="bg-white">
          <WhyChooseUs />
        </StackSection>

        {/* PANELS 2..23: ALL Curated Tours & Experiences (Ordered: Safari -> Sea -> Transfers -> Outside Sharm) */}
        <TripStack startIndex={2} />

        {/* PANEL 24: Desert Safaris & Buggy Adventure Showcase */}
        <StackSection index={24} id="desert-safari" bg="bg-[#FFFDF7]">
          <DesertAdventuresSection />
        </StackSection>

        {/* PANEL 25: Red Sea Yacht & Marine Offers */}
        <StackSection index={25} id="sea-adventures" bg="bg-[#F0FDF4]">
          <SeaAdventuresSection />
        </StackSection>

        {/* PANEL 26: South Sinai & Sharm Private Transfers 24/7 */}
        <StackSection index={26} id="transfers" bg="bg-white">
          <TransfersSection />
        </StackSection>

        {/* PANEL 27: Complete Packages & Combo Offers (رحلات كاملة عرض في السعر) */}
        <StackSection index={27} id="complete-packages" bg="bg-[#FFFDF7]">
          <CompletePackagesSection />
        </StackSection>

        {/* PANEL 28: South Sinai & Sharm Travel Guides (رحلات سيناء وخارج شرم) */}
        <StackSection index={28} id="guides" bg="bg-slate-50">
          <DestinationGuideSection />
        </StackSection>

        {/* PANEL 29: 3-Step Booking Journey */}
        <StackSection index={29} id="how-it-works" bg="bg-slate-50">
          <HowItWorks />
        </StackSection>

        {/* PANEL 30: Verified Guest Reviews */}
        <StackSection index={30} id="reviews" bg="bg-white">
          <ReviewsSection />
        </StackSection>

        {/* PANEL 31: Real Moments Instagram Gallery */}
        <StackSection index={31} id="gallery" bg="bg-white">
          <InstagramGallery />
        </StackSection>

        {/* PANEL 32: Luxury Final CTA (Last panel in deck before footer) */}
        <StackSection index={32} id="cta" bg="bg-slate-950">
          <FinalCTA />
        </StackSection>
      </main>
    </>
  );
};

export default HomePage;
