import { BLOG_POSTS } from '../../data/blogs';

export const blogApi = {
  // GET /api/blog
  getAll: async () => {
    return Promise.resolve({ success: true, data: BLOG_POSTS, count: BLOG_POSTS.length });
  },

  // GET /api/blog/:slug
  getBySlug: async (slug) => {
    const post = BLOG_POSTS.find(p => p.slug === slug || p.id === slug) || BLOG_POSTS[0];
    return Promise.resolve({ success: true, data: post });
  }
};
