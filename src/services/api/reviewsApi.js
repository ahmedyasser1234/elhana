import { REVIEWS } from '../../data/reviews';

export const reviewsApi = {
  // GET /api/reviews
  getAll: async () => {
    return Promise.resolve({ success: true, data: REVIEWS, count: REVIEWS.length });
  }
};
