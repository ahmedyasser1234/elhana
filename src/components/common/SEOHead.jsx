import React, { useEffect } from 'react';

const DEFAULT_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "El Hana Group Sharm El Sheikh",
  "alternateName": "Ù…Ø¬Ù…ÙˆØ¹Ø© Ø§Ù„Ù‡Ù†Ø§ Ù„Ù„Ø³ÙŠØ§Ø­Ø© ÙˆØ§Ù„Ø³ÙØ§Ø±ÙŠ",
  "description": "Leading operator for desert quad safaris, Bedouin dinners, VIP Red Sea yacht cruises, scuba diving, and private hotel transfers in Sharm El Sheikh.",
  "url": typeof window !== 'undefined' ? window.location.origin : 'https://elhanagroup.com',
  "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://elhanagroup.com/logo.png',
  "image": typeof window !== 'undefined' ? `${window.location.origin}/images/real/atv-quad.jpg` : '',
  "telephone": "+201100777330",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Naama Bay Main St",
    "addressLocality": "Sharm El Sheikh",
    "addressRegion": "South Sinai",
    "postalCode": "46619",
    "addressCountry": "EG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.9158,
    "longitude": 34.3299
  },
  "sameAs": [
    "https://facebook.com",
    "https://instagram.com"
  ]
};

export const SEOHead = ({ title, description, canonicalUrl, structuredData }) => {
  useEffect(() => {
    try {
      if (title && typeof title === 'string') {
        document.title = title.includes('El Hana Group') ? title : `${title} | El Hana Group Sharm El Sheikh`;
      }

      if (description && typeof description === 'string') {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);
      }

      const activeUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
      if (activeUrl) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', activeUrl);
      }

      // JSON-LD Structured Data Schema Insertion
      const scriptId = 'json-ld-structured-data';
      let scriptTag = document.getElementById(scriptId);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      const dataToEmbed = structuredData || DEFAULT_ORGANIZATION_SCHEMA;
      scriptTag.textContent = typeof dataToEmbed === 'string' ? dataToEmbed : JSON.stringify(dataToEmbed);

    } catch (e) {
      console.warn("SEOHead update error:", e);
    }
  }, [title, description, canonicalUrl, structuredData]);

  return null;
};

export default SEOHead;



