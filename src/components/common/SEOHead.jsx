import React, { useEffect } from 'react';

const DEFAULT_ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "El Hana Group Sharm El Sheikh",
  "alternateName": "مجموعة الهنا للسياحة والسفاري والرحلات البحرية بشرم الشيخ وجنوب سيناء",
  "description": "المشغل الرائد لرحلات السفاري الصحراوية بالبيتش باجي والكار باجي والعشاء البدوي، ورحلات اليخوت الفاخرة لرأس محمد والجزيرة البيضاء وتيران، والغوص والسنوركلينج، وجولات دهب وسانت كاترين، وتوصيل مطار شرم الشيخ.",
  "url": typeof window !== 'undefined' ? window.location.origin : 'https://elhanagroup.com',
  "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://elhanagroup.com/logo.png',
  "image": typeof window !== 'undefined' ? `${window.location.origin}/images/real/atv-quad.jpg` : 'https://elhanagroup.com/images/real/atv-quad.jpg',
  "telephone": "+20110077330",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+20110077330",
      "contactType": "customer service",
      "areaServed": ["EG", "SA", "AE", "KW", "RU", "IT", "DE", "GB"],
      "availableLanguage": ["Arabic", "English", "Russian", "Italian", "German"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+201044790588",
      "contactType": "WhatsApp Booking & Inquiries",
      "areaServed": "World",
      "availableLanguage": ["Arabic", "English", "Russian"]
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "USD, EUR, EGP, GBP, SAR",
  "paymentAccepted": "Cash, Credit Card, Visa, Mastercard",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "منطقة السفاري (Safari Area)",
    "addressLocality": "شرم الشيخ (Sharm El Sheikh)",
    "addressRegion": "جنوب سيناء (South Sinai)",
    "postalCode": "46619",
    "addressCountry": "EG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.9158,
    "longitude": 34.3299
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "23:30"
    }
  ],
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Sharm El Sheikh" },
    { "@type": "AdministrativeArea", "name": "South Sinai" },
    { "@type": "AdministrativeArea", "name": "Dahab" },
    { "@type": "AdministrativeArea", "name": "Saint Catherine" },
    { "@type": "AdministrativeArea", "name": "Nuweiba" },
    { "@type": "AdministrativeArea", "name": "Taba" }
  ],
  "sameAs": [
    "https://web.facebook.com/profile.php?id=61583787661164",
    "https://www.instagram.com/el_hana_group/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1280",
    "bestRating": "5",
    "worstRating": "1"
  }
};

const DEFAULT_KEYWORDS = "رحلات شرم الشيخ, رحلات سفاري شرم الشيخ, بيتش باجي شرم الشيخ, كواد بايك, كار باجي, عشاء بدوي شرم الشيخ, رحلات بحرية شرم الشيخ, يخت رأس محمد, الجزيرة البيضاء شرم الشيخ, سنوركلينج شرم الشيخ, غوص شرم الشيخ, بانانا بوت, باراشوت شرم الشيخ, رحلات دهب, بلو هول دهب, جبل موسى سانت كاترين, وادي الوشواشي نويبع, خليج فيورد طابا, تاكسي مطار شرم الشيخ, اسعار رحلات شرم الشيخ 2026, مجموعة الهنا شرم الشيخ, Sharm El Sheikh tours, Sharm desert safari, ATV quad biking Sharm, Ras Mohammed yacht cruise, White Island Sharm, Dahab Blue Hole tour, Mount Sinai sunrise, Sharm airport transfers";

export const SEOHead = ({ title, description, keywords, canonicalUrl, structuredData, ogImage }) => {
  useEffect(() => {
    try {
      const activeTitle = title && typeof title === 'string'
        ? (title.includes('El Hana Group') || title.includes('مجموعة الهنا') ? title : `${title} | مجموعة الهنا للرحلات والسفاري بشرم الشيخ`)
        : "مجموعة الهنا للسياحة والسفاري بشرم الشيخ | رحلات بحرية وسفاري جنوب سيناء";
      
      document.title = activeTitle;

      const activeDesc = description || "احجز أفضل رحلات شرم الشيخ وجنوب سيناء مع مجموعة الهنا: سفاري البيتش باجي والكار باجي، العشاء البدوي، رحلات اليخوت VIP لرأس محمد والجزيرة البيضاء، الغوص والسنوركلينج، رحلات دهب وسانت كاترين بأفضل الأسعار وبدون مقدم.";
      
      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', activeDesc);

      // Meta Keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords || DEFAULT_KEYWORDS);

      // Canonical URL
      const activeUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://elhanagroup.com');
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', activeUrl);

      // Open Graph Tags
      const setMetaProperty = (prop, content) => {
        let tag = document.querySelector(`meta[property="${prop}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', prop);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      setMetaProperty('og:title', activeTitle);
      setMetaProperty('og:description', activeDesc);
      setMetaProperty('og:url', activeUrl);
      setMetaProperty('og:site_name', 'مجموعة الهنا للسياحة والسفاري بشرم الشيخ | El Hana Group');
      setMetaProperty('og:type', 'website');
      setMetaProperty('og:image', ogImage || (typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://elhanagroup.com/logo.png'));

      // Twitter Cards
      const setMetaName = (name, content) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      };

      setMetaName('twitter:card', 'summary_large_image');
      setMetaName('twitter:title', activeTitle);
      setMetaName('twitter:description', activeDesc);
      setMetaName('twitter:image', ogImage || (typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : 'https://elhanagroup.com/logo.png'));

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
  }, [title, description, keywords, canonicalUrl, structuredData, ogImage]);

  return null;
};

export default SEOHead;
