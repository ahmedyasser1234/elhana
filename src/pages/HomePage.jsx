import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ServicesListSection } from '../components/home/ServicesListSection';
import { FeaturedExperiences } from '../components/home/FeaturedExperiences';
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
    <div>
      <SEOHead
        title="El Hana Group | Sharm El Sheikh Luxury Safaris & Tours"
        description="Book premium desert safaris, ATV quad bike adventures, dune buggy tours, Bedouin sunset experiences, luxury yacht cruises, snorkeling, and diving in Sharm El Sheikh with El Hana Group."
      />
      <HeroSection />
      <WhyChooseUs />
      <ServicesListSection />
      <FeaturedExperiences />
      <DesertAdventuresSection />
      <SeaAdventuresSection />
      <TransfersSection />
      <HowItWorks />
      <ReviewsSection />
      <DestinationGuideSection />
      <InstagramGallery />
      <FinalCTA />
    </div>
  );
};

export default HomePage;
