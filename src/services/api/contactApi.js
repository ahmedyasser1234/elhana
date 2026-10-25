export const contactApi = {
  // POST /api/contact
  sendMessage: async (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Thank you! Your message has been received. Our team will contact you shortly on WhatsApp or Email.'
        });
      }, 400);
    });
  },

  // POST /api/newsletter
  subscribeNewsletter: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Successfully subscribed to Sharm adventure offers!'
        });
      }, 300);
    });
  }
};
