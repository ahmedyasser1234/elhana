// Analytics & Lead Conversion Event Tracker
// Supports Google Analytics 4 (gtag) & Meta Pixel (fbq) seamlessly

export const trackEvent = (eventName, params = {}) => {
  try {
    // 1. Google Analytics 4 (GA4)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
      console.log(`📊 [GA4 Event Tracked]: ${eventName}`, params);
    }

    // 2. Meta (Facebook) Pixel
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      const fbEventMap = {
        'view_item': 'ViewContent',
        'begin_checkout': 'InitiateCheckout',
        'generate_lead': 'Lead',
        'purchase_lead': 'Purchase'
      };
      const metaEvent = fbEventMap[eventName] || 'CustomEvent';
      window.fbq('track', metaEvent, params);
      console.log(`📱 [Meta Pixel Tracked]: ${metaEvent}`, params);
    }
  } catch (err) {
    console.warn('Analytics tracking warning:', err);
  }
};

export const trackLeadSubmission = (type, title, value = 0, currency = 'USD') => {
  trackEvent('generate_lead', {
    content_name: title,
    content_type: type,
    value: value,
    currency: currency
  });
};

export default { trackEvent, trackLeadSubmission };
