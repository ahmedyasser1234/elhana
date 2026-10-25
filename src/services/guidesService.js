// Tour Guides & Private Guide Reviews Service (Client-Side, No Backend Required)

const GUIDES_STORAGE_KEY = 'elhana_tour_guides';
const GUIDE_REVIEWS_STORAGE_KEY = 'elhana_guide_reviews';

const DEFAULT_GUIDES = [
  {
    id: 'guide-1',
    name: 'كابتن محمود السيناوي',
    nameEn: 'Capt. Mahmoud El-Sinawi',
    specialty: 'سفاري الصحراء، البيتش باجي، والعشاء البدوي',
    specialtyEn: 'Desert Safari, ATV Quads & Bedouin BBQ',
    languages: ['العربية', 'English', 'Italiano'],
    phone: '+201100777330',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    badge: 'مرشد خبير - 8 سنوات خبرة',
    active: true
  },
  {
    id: 'guide-2',
    name: 'كابتن يوسف البحري',
    nameEn: 'Capt. Youssef El-Bahri',
    specialty: 'رحلات اليخوت VIP، السنوركلينج، وغوص رأس محمد',
    specialtyEn: 'VIP Yacht Cruises, Snorkeling & Diving',
    languages: ['العربية', 'English', 'Русский'],
    phone: '+201100777330',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    badge: 'غواص ومرشد بحري معتمد PADI',
    active: true
  },
  {
    id: 'guide-3',
    name: 'أستاذ إبراهيم ناصر',
    nameEn: 'Ibrahim Nasser',
    specialty: 'رحلات دهب، سانت كاترين، صعود جبل موسى، وطابا',
    specialtyEn: 'Dahab, St. Catherine, Mount Sinai & Taba',
    languages: ['العربية', 'English', 'Deutsch', 'Français'],
    phone: '+201100777330',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    badge: 'مرشد سياحي مرخص وتاريخي',
    active: true
  }
];

export const getGuides = () => {
  try {
    const stored = localStorage.getItem(GUIDES_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(DEFAULT_GUIDES));
      return DEFAULT_GUIDES;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to load guides:', err);
    return DEFAULT_GUIDES;
  }
};

export const getGuideById = (id) => {
  const guides = getGuides();
  return guides.find(g => g.id === id) || null;
};

export const saveGuide = (guideData) => {
  const guides = getGuides();
  let updatedGuides;
  if (guideData.id) {
    updatedGuides = guides.map(g => (g.id === guideData.id ? { ...g, ...guideData } : g));
  } else {
    const newGuide = {
      ...guideData,
      id: `guide-${Date.now()}`,
      active: true,
      badge: guideData.badge || 'مرشد معتمد'
    };
    updatedGuides = [newGuide, ...guides];
  }
  localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updatedGuides));
  window.dispatchEvent(new CustomEvent('elhana_guides_updated'));
  return updatedGuides;
};

export const deleteGuide = (id) => {
  const guides = getGuides();
  const updatedGuides = guides.filter(g => g.id !== id);
  localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(updatedGuides));
  window.dispatchEvent(new CustomEvent('elhana_guides_updated'));
  return updatedGuides;
};

// Guide Reviews (Secret / Admin Only)
export const getGuideReviews = (guideId = null) => {
  try {
    const stored = localStorage.getItem(GUIDE_REVIEWS_STORAGE_KEY);
    const reviews = stored ? JSON.parse(stored) : [];
    if (guideId) {
      return reviews.filter(r => r.guideId === guideId);
    }
    return reviews;
  } catch (err) {
    console.error('Failed to load guide reviews:', err);
    return [];
  }
};

export const submitGuideReview = (reviewData) => {
  try {
    const existingReviews = getGuideReviews();
    const newReview = {
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...reviewData
    };
    const updated = [newReview, ...existingReviews];
    localStorage.setItem(GUIDE_REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('elhana_guide_reviews_updated'));
    return newReview;
  } catch (err) {
    console.error('Failed to save guide review:', err);
    return null;
  }
};

export const getGuideStats = (guideId) => {
  const reviews = getGuideReviews(guideId);
  if (!reviews || reviews.length === 0) {
    return { count: 0, average: 5.0, punctuality: 5.0, knowledge: 5.0, hospitality: 5.0, safety: 5.0 };
  }
  const sumRating = reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0);
  const sumPunctuality = reviews.reduce((acc, r) => acc + Number(r.punctuality || 5), 0);
  const sumKnowledge = reviews.reduce((acc, r) => acc + Number(r.knowledge || 5), 0);
  const sumHospitality = reviews.reduce((acc, r) => acc + Number(r.hospitality || 5), 0);
  const sumSafety = reviews.reduce((acc, r) => acc + Number(r.safety || 5), 0);

  return {
    count: reviews.length,
    average: (sumRating / reviews.length).toFixed(1),
    punctuality: (sumPunctuality / reviews.length).toFixed(1),
    knowledge: (sumKnowledge / reviews.length).toFixed(1),
    hospitality: (sumHospitality / reviews.length).toFixed(1),
    safety: (sumSafety / reviews.length).toFixed(1)
  };
};

export const deleteGuideReview = (reviewId) => {
  try {
    const reviews = getGuideReviews();
    const updated = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem(GUIDE_REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('elhana_guide_reviews_updated'));
    return updated;
  } catch (err) {
    console.error('Failed to delete guide review:', err);
    return [];
  }
};
