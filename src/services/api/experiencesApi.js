import apiClient from './client';
import { EXPERIENCES, CATEGORIES } from '../../data/experiences';

export const experiencesApi = {
  // GET /api/experiences
  getAll: async (filters = {}) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          let list = [...EXPERIENCES];
          if (filters.category && filters.category !== 'all') {
            if (filters.category === 'safari') {
              list = list.filter(item => ['safari', 'atv', 'buggy', 'bedouin', 'camel', 'horse'].includes(item.category));
            } else if (filters.category === 'sea') {
              list = list.filter(item => ['sea', 'yacht', 'snorkeling', 'diving', 'parasailing', 'banana'].includes(item.category));
            } else {
              list = list.filter(item => item.category === filters.category || (item.categoryLabel && item.categoryLabel.toLowerCase().includes(filters.category.toLowerCase())));
            }
          }

          if (filters.search && filters.search.trim() !== '') {
            const rawQuery = filters.search.toLowerCase().trim();
            const terms = rawQuery.split(/\s+/).filter(Boolean);

            list = list.filter(item => {
              const corpus = [
                item.title || '',
                item.shortDescription || '',
                item.description || '',
                item.location || '',
                item.category || '',
                item.categoryLabel || '',
                ...(item.highlights || []),
                ...(item.included || []),
                ...(item.suitableFor || [])
              ].join(' ').toLowerCase();

              // Direct match
              if (corpus.includes(rawQuery)) return true;

              // Check individual terms with Arabic/English synonyms
              return terms.some(term => {
                if (['naama', 'bay', 'نعمة', 'نعمه', 'خليج'].includes(term)) {
                  return corpus.includes('naama') || corpus.includes('bay') || corpus.includes('نعمة') || corpus.includes('نعمه') || corpus.includes('خليج');
                }
                if (['dahab', 'دهب'].includes(term)) {
                  return corpus.includes('dahab') || corpus.includes('دهب');
                }
                if (['sharm', 'شرم'].includes(term)) {
                  return corpus.includes('sharm') || corpus.includes('شرم');
                }
                return corpus.includes(term);
              });
            });
          }

          if (filters.maxPrice && Number(filters.maxPrice) < 120) {
            list = list.filter(item => item.startingPrice <= Number(filters.maxPrice));
          }
          if (filters.sortBy === 'price-low') {
            list.sort((a, b) => a.startingPrice - b.startingPrice);
          } else if (filters.sortBy === 'price-high') {
            list.sort((a, b) => b.startingPrice - a.startingPrice);
          } else if (filters.sortBy === 'rating') {
            list.sort((a, b) => b.rating - a.rating);
          }
          resolve({ success: true, data: list, count: list.length });
        }, 200);
      });
    } catch (error) {
      return { success: false, data: EXPERIENCES, error: error.message };
    }
  },

  // GET /api/experiences/:slug
  getBySlug: async (slug) => {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const found = EXPERIENCES.find(e => e.slug === slug || e.id === slug);
          if (found) {
            resolve({ success: true, data: found });
          } else {
            resolve({ success: false, message: 'Experience not found', data: EXPERIENCES[0] });
          }
        }, 150);
      });
    } catch (error) {
      return { success: false, data: EXPERIENCES[0] };
    }
  },

  // GET /api/categories
  getCategories: async () => {
    return new Promise((resolve) => {
      resolve({ success: true, data: CATEGORIES });
    });
  }
};
