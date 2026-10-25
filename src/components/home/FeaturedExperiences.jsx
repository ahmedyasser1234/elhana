import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EXPERIENCES } from '../../data/experiences';
import { SectionTitle } from '../common/SectionTitle';
import { ExperienceCard } from '../experiences/ExperienceCard';
import { Button } from '../common/Button';

export const FeaturedExperiences = () => {
  const { t } = useTranslation();
  const [filterTab, setFilterTab] = useState('all');

  let list = EXPERIENCES;
  if (filterTab === 'safari') {
    list = EXPERIENCES.filter(e => ['atv', 'buggy', 'bedouin', 'camel', 'horse', 'safari'].includes(e.category));
  } else if (filterTab === 'sea') {
    list = EXPERIENCES.filter(e => ['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea'].includes(e.category));
  }

  const tabs = [
    { id: 'all', label: t('experiences.tabAll') },
    { id: 'safari', label: t('experiences.tabSafari') },
    { id: 'sea', label: t('experiences.tabSea') }
  ];

  return (
    <section className="bg-gradient-to-br from-sky-50 via-white to-orange-50/60 border-b border-sky-100/70 relative overflow-hidden">
      
      {/* Alternating Glow: Sky Blue Top-Left, Orange Bottom-Right */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/12 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionTitle
            badge={t('experiences.featuredBadge')}
            title={t('experiences.featuredTitle')}
            subtitle={t('experiences.featuredSubtitle')}
            center={false}
          />

          {/* Interactive Sliding Pill Tabs */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-sky-100 self-start md:self-auto shrink-0 shadow-sm relative">
            {tabs.map((tab) => {
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#0284C7] rounded-xl z-[-1] shadow-md shadow-[#0284C7]/20"
                    />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {list.slice(0, 6).map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <div className="text-center pt-6">
          <Link to="/experiences">
            <Button variant="primary" size="lg">
              {t('experiences.exploreAll')}
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedExperiences;
