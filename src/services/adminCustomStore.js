// Client-side Custom Store for Prices and Photos (No Backend Required)

const CUSTOM_PRICES_KEY = 'elhana_custom_prices';
const CUSTOM_IMAGES_KEY = 'elhana_custom_images';

export const getCustomPrices = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRICES_KEY) || '{}');
  } catch (err) {
    console.error('Failed to read custom prices:', err);
    return {};
  }
};

export const saveCustomPrice = (slugOrId, price) => {
  try {
    const prices = getCustomPrices();
    prices[slugOrId] = Number(price);
    localStorage.setItem(CUSTOM_PRICES_KEY, JSON.stringify(prices));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'price', slugOrId, price } }));
    return true;
  } catch (err) {
    console.error('Failed to save custom price:', err);
    return false;
  }
};

export const resetCustomPrices = () => {
  try {
    localStorage.removeItem(CUSTOM_PRICES_KEY);
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'price_reset' } }));
    return true;
  } catch (err) {
    console.error('Failed to reset custom prices:', err);
    return false;
  }
};

export const getCustomImages = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_IMAGES_KEY) || '{}');
  } catch (err) {
    console.error('Failed to read custom images:', err);
    return {};
  }
};

export const saveCustomImage = (slugOrId, imageUrl, index = 0) => {
  try {
    const imagesMap = getCustomImages();
    if (!imagesMap[slugOrId]) {
      imagesMap[slugOrId] = [];
    }
    imagesMap[slugOrId][index] = imageUrl;
    localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(imagesMap));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'image', slugOrId, imageUrl, index } }));
    return true;
  } catch (err) {
    console.error('Failed to save custom image:', err);
    return false;
  }
};

export const resetCustomImages = () => {
  try {
    localStorage.removeItem(CUSTOM_IMAGES_KEY);
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'image_reset' } }));
    return true;
  } catch (err) {
    console.error('Failed to reset custom images:', err);
    return false;
  }
};
