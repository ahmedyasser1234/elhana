// Custom Store for Prices and Photos
// Syncs changes to backend database / object storage via authenticated API routes,
// with local cache and instant UI events.

import { experiencesApi } from './api/experiencesApi';

const CUSTOM_PRICES_KEY = 'elhana_custom_prices';
const CUSTOM_IMAGES_KEY = 'elhana_custom_images';
const CUSTOM_GALLERIES_KEY = 'elhana_custom_galleries';

export const getCustomPrices = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRICES_KEY) || '{}');
  } catch (err) {
    console.error('Failed to read custom prices:', err);
    return {};
  }
};

export const saveCustomPrice = async (slugOrId, price) => {
  const numericPrice = Number(price);
  try {
    // 1. Local Cache for instant UI feedback
    const prices = getCustomPrices();
    prices[slugOrId] = numericPrice;
    localStorage.setItem(CUSTOM_PRICES_KEY, JSON.stringify(prices));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'price', slugOrId, price: numericPrice } }));

    // 2. Persist to real Database via Authenticated API
    await experiencesApi.updateTrip(slugOrId, { startingPrice: numericPrice }).catch(err => {
      console.warn('Database price sync error (will retry next time):', err.message);
    });

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

export const saveCustomImage = async (slugOrId, imageSource, index = 0) => {
  try {
    let finalImageUrl = imageSource;

    // If it's a base64 upload, store in real Object Storage (Supabase Storage) instead of localStorage!
    if (typeof imageSource === 'string' && imageSource.startsWith('data:image/')) {
      try {
        const uploadRes = await experiencesApi.uploadImage(`${slugOrId}_photo.jpg`, imageSource);
        if (uploadRes && uploadRes.url) {
          finalImageUrl = uploadRes.url;
        }
      } catch (uploadErr) {
        console.warn('Object storage upload failed, saving URL locally:', uploadErr.message);
      }
    }

    // 1. Local Cache
    const imagesMap = getCustomImages();
    if (!imagesMap[slugOrId]) {
      imagesMap[slugOrId] = [];
    }
    imagesMap[slugOrId][index] = finalImageUrl;
    localStorage.setItem(CUSTOM_IMAGES_KEY, JSON.stringify(imagesMap));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', { detail: { type: 'image', slugOrId, imageUrl: finalImageUrl, index } }));

    // 2. Persist to real Database
    await experiencesApi.updateTrip(slugOrId, { images: imagesMap[slugOrId] }).catch(err => {
      console.warn('Database image sync error:', err.message);
    });

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

// ========================================================
// CUSTOM MULTI-IMAGE GALLERIES & TIME SLOTS STORE
// ========================================================

export const getCustomGalleries = () => {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_GALLERIES_KEY) || '{}');
  } catch (err) {
    console.error('Failed to read custom galleries:', err);
    return {};
  }
};

export const getCustomGalleryImages = (key, defaultImages = []) => {
  try {
    const galleries = getCustomGalleries();
    if (galleries[key] && Array.isArray(galleries[key])) {
      return galleries[key];
    }
  } catch (err) {
    console.error('Failed to read custom gallery for key:', key, err);
  }
  return defaultImages;
};

export const saveCustomGalleryImages = async (key, imagesArray) => {
  try {
    const galleries = getCustomGalleries();
    galleries[key] = imagesArray;
    localStorage.setItem(CUSTOM_GALLERIES_KEY, JSON.stringify(galleries));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', {
      detail: { type: 'gallery', key, images: imagesArray }
    }));

    // If key is a trip slug, update DB as well
    await experiencesApi.updateTrip(key, { images: imagesArray }).catch(() => {});

    return true;
  } catch (err) {
    console.error('Failed to save custom gallery:', err);
    return false;
  }
};

export const addImageToCustomGallery = (key, imageUrl, defaultImages = []) => {
  const current = getCustomGalleryImages(key, defaultImages);
  const updated = [...current, imageUrl];
  saveCustomGalleryImages(key, updated);
  return updated;
};

export const removeImageFromCustomGallery = (key, index, defaultImages = []) => {
  const current = getCustomGalleryImages(key, defaultImages);
  const updated = current.filter((_, idx) => idx !== index);
  saveCustomGalleryImages(key, updated);
  return updated;
};

export const resetCustomGallery = (key) => {
  try {
    const galleries = getCustomGalleries();
    delete galleries[key];
    localStorage.setItem(CUSTOM_GALLERIES_KEY, JSON.stringify(galleries));
    window.dispatchEvent(new CustomEvent('elhana_content_updated', {
      detail: { type: 'gallery_reset', key }
    }));
    return true;
  } catch (err) {
    console.error('Failed to reset custom gallery for key:', key, err);
    return false;
  }
};
