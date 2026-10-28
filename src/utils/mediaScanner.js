/**
 * mediaScanner.js
 * ================================================================
 * HOW IT WORKS — كيف يعمل النظام تلقائياً:
 *
 * 1. عند كل تشغيل للسيرفر أو بناء المشروع، يقوم vite.config.js
 *    بمسح مجلدات الصور وتوليد ملف: public/media-manifest.json
 *
 * 2. هذا الملف يحتوي على قائمة كل الصور والفيديوهات.
 *
 * 3. يقوم useMediaManifest() بجلب هذا الـ manifest وتحويله
 *    لبيانات منظمة تُستخدم في الموقع.
 *
 * النتيجة: أضف أي صورة/فيديو في المجلد الصحيح → تظهر تلقائياً
 * بمجرد إعادة تشغيل `npm run dev` أو `npm run build`
 *
 * ─── هيكل المجلدات ────────────────────────────────────────────
 * public/images/safari/
 *   atv/
 *     single/         ← بيتش باجي سنجل
 *       sunrise/      ← شروق 04:30
 *       morning/      ← صباح 09:00
 *       sunset/       ← غروب 04:00  ⭐
 *       dinner/       ← عشاء 06:30
 *     double/         ← بيتش باجي دبل
 *       sunrise/ morning/ sunset/ dinner/
 *   buggy/
 *     2seater/        ← كار باجي 2 مقعد
 *     4seater/        ← كار باجي 4 مقاعد
 *     polaris1000/    ← بولاريس 1000 تيربو
 *   camel/            ← ركوب الجمال
 *   horse/            ← ركوب الخيل
 *   bedouin/          ← العشاء البدوي
 *     standard/       ← عشاء كلاسيك
 *     vip/            ← عشاء VIP
 * public/images/sea/  ← رحلات بحرية
 * ================================================================
 */

import { useState, useEffect } from 'react';

// ── Time slot keyword detector ─────────────────────────────────
const SLOT_PATTERNS = [
  { id: 'sunrise', keywords: ['/sunrise/', 'sunrise_', '_sunrise', '/fajr/', 'fajr', 'شروق'] },
  { id: 'morning', keywords: ['/morning/', 'morning_', '_morning', '/9am/', '9am', '09am', 'صباح'] },
  { id: 'sunset',  keywords: ['/sunset/',  'sunset_',  '_sunset',  '/maghrib/', 'maghrib', 'غروب'] },
  { id: 'dinner',  keywords: ['/dinner/',  'dinner_',  '_dinner',  '/night/',   'night', 'عشاء', 'ليل'] },
];

function detectSlot(urlLower) {
  for (const slot of SLOT_PATTERNS) {
    if (slot.keywords.some(k => urlLower.includes(k))) return slot.id;
  }
  return null; // null means "all slots"
}

// ── Category + SubCategory extractor ──────────────────────────
function parseMeta(urlLower) {
  let category = 'other';
  let subCategory = 'all';

  if      (urlLower.includes('/safari/atv/single'))       { category = 'atv';    subCategory = 'single'; }
  else if (urlLower.includes('/safari/atv/double'))       { category = 'atv';    subCategory = 'double'; }
  else if (urlLower.includes('/safari/atv'))              { category = 'atv'; }
  else if (urlLower.includes('/safari/buggy/2seater'))    { category = 'buggy';  subCategory = '2seater'; }
  else if (urlLower.includes('/safari/buggy/4seater'))    { category = 'buggy';  subCategory = '4seater'; }
  else if (urlLower.includes('/safari/buggy/polaris'))    { category = 'buggy';  subCategory = 'polaris1000'; }
  else if (urlLower.includes('/safari/buggy'))            { category = 'buggy'; }
  else if (urlLower.includes('/safari/camel'))            { category = 'camel'; }
  else if (urlLower.includes('/safari/horse'))            { category = 'horse'; }
  else if (urlLower.includes('/safari/bedouin/vip'))      { category = 'bedouin'; subCategory = 'vip'; }
  else if (urlLower.includes('/safari/bedouin/standard')) { category = 'bedouin'; subCategory = 'standard'; }
  else if (urlLower.includes('/safari/bedouin'))          { category = 'bedouin'; }
  else if (urlLower.includes('/images/sea'))              { category = 'sea'; }
  else if (urlLower.includes('/excursions/dahab') || urlLower.includes('/dahab'))         { category = 'dahab'; }
  else if (urlLower.includes('/excursions/taba') || urlLower.includes('/taba'))           { category = 'taba'; }
  else if (urlLower.includes('/excursions/nuweiba') || urlLower.includes('/nuweiba'))     { category = 'nuweiba'; }
  else if (urlLower.includes('/excursions/catherine') || urlLower.includes('/catherine')) { category = 'catherine'; }

  return { category, subCategory };
}

// ── Title helpers ──────────────────────────────────────────────
function arabicTitle(cat, sub) {
  if (cat === 'atv'    && sub === 'single')      return 'بيتش باجي سنجل';
  if (cat === 'atv'    && sub === 'double')      return 'بيتش باجي دبل';
  if (cat === 'atv')                             return 'بيتش باجي';
  if (cat === 'buggy'  && sub === '2seater')     return 'كار باجي ثنائي';
  if (cat === 'buggy'  && sub === '4seater')     return 'كار باجي عائلي';
  if (cat === 'buggy'  && sub === 'polaris1000') return 'بولاريس 1000 تيربو';
  if (cat === 'buggy')                           return 'كار باجي';
  if (cat === 'camel')                           return 'ركوب الجمال';
  if (cat === 'horse')                           return 'ركوب الخيل';
  if (cat === 'bedouin'&& sub === 'vip')         return 'عشاء بدوي VIP';
  if (cat === 'bedouin')                         return 'العشاء البدوي';
  if (cat === 'sea')                             return 'رحلات بحرية';
  if (cat === 'dahab')                           return 'رحلة دهب والبلو هول';
  if (cat === 'taba')                            return 'رحلة طابا وخليج فيورد';
  if (cat === 'nuweiba')                         return 'رحلة نويبع ووادي الوشواشي';
  if (cat === 'catherine')                       return 'رحلة سانت كاترين وجبل موسى';
  return 'صورة من جولاتنا';
}
function englishTitle(cat, sub) {
  if (cat === 'atv'    && sub === 'single')      return 'Single ATV Quad';
  if (cat === 'atv'    && sub === 'double')      return 'Double ATV Quad';
  if (cat === 'atv')                             return 'ATV Quad';
  if (cat === 'buggy'  && sub === '2seater')     return '2-Seater Buggy';
  if (cat === 'buggy'  && sub === '4seater')     return '4-Seater Buggy';
  if (cat === 'buggy'  && sub === 'polaris1000') return 'Polaris RZR 1000';
  if (cat === 'buggy')                           return 'Car Buggy';
  if (cat === 'camel')                           return 'Camel Riding';
  if (cat === 'horse')                           return 'Horse Riding';
  if (cat === 'bedouin'&& sub === 'vip')         return 'VIP Bedouin Dinner';
  if (cat === 'bedouin')                         return 'Bedouin Dinner';
  if (cat === 'sea')                             return 'Sea Trips';
  if (cat === 'dahab')                           return 'Dahab & Blue Hole Trip';
  if (cat === 'taba')                            return 'Taba & Fjord Bay Trip';
  if (cat === 'nuweiba')                         return 'Nuweiba & Wishwashi Canyon';
  if (cat === 'catherine')                       return 'Mount Sinai & St. Catherine';
  return 'Tour Photo';
}

// ── Transform raw manifest item → structured media object ─────
function transformItem(item, index) {
  const urlLower = item.url.toLowerCase();
  const { category, subCategory } = parseMeta(urlLower);
  const slotId = detectSlot(urlLower);
  const timeSlots = slotId ? [slotId] : ['sunrise', 'morning', 'sunset', 'dinner'];

  return {
    id: `${item.type}_${index}`,
    type: item.type,          // 'image' | 'video'
    url: item.url,
    category,
    subCategory,
    timeSlots,
    fileName: item.name,
    title: {
      ar: arabicTitle(category, subCategory),
      en: englishTitle(category, subCategory),
    },
  };
}

// ── Global cache (loaded once per session) ────────────────────
let _cache = null;
let _promise = null;

async function loadManifest() {
  if (_cache) return _cache;
  if (_promise) return _promise;

  _promise = fetch('/media-manifest.json?v=' + Date.now())
    .then(r => {
      if (!r.ok) throw new Error('media-manifest.json not found');
      return r.json();
    })
    .then(data => {
      const items = (data.items || []).map(transformItem);
      _cache = {
        images: items.filter(i => i.type === 'image'),
        videos: items.filter(i => i.type === 'video'),
      };
      return _cache;
    })
    .catch(err => {
      console.warn('[mediaScanner] Could not load media-manifest.json:', err.message);
      _cache = { images: [], videos: [] };
      return _cache;
    });

  return _promise;
}

// ── React hook ────────────────────────────────────────────────
/**
 * useMediaManifest()
 * Returns { images, videos, loading }
 * Loads once and caches globally.
 */
export function useMediaManifest() {
  const [state, setState] = useState(() => _cache ? { ..._cache, loading: false } : { images: [], videos: [], loading: true });

  useEffect(() => {
    if (!_cache) {
      loadManifest().then(data => setState({ ...data, loading: false }));
    }
  }, []);

  return state;
}

// ── Synchronous getters (work after manifest is loaded) ───────
// These are used by components that render AFTER the manifest loads.

export function getDefaultManifestImages(category, subCategory = 'all', timeSlot = null) {
  if (!_cache) return [];
  let pool = _cache.images.filter(img => img.category === category);
  if (pool.length === 0) return [];
  if (subCategory && subCategory !== 'all') {
    const sub = pool.filter(img => img.subCategory === subCategory);
    if (sub.length > 0) pool = sub;
  }
  if (timeSlot && timeSlot !== 'all') {
    const slotted = pool.filter(img => img.timeSlots && img.timeSlots.includes(timeSlot));
    if (slotted.length > 0) pool = slotted;
  }
  return pool.map(img => img.url);
}

export function getFolderImages(category, subCategory = 'all', timeSlot = null) {
  // Check localStorage for custom gallery overrides first
  try {
    const rawGalleries = localStorage.getItem('elhana_custom_galleries');
    if (rawGalleries) {
      const parsed = JSON.parse(rawGalleries);
      const slotKey = `${category}_${subCategory}_${timeSlot || 'all'}`;
      if (parsed[slotKey] && Array.isArray(parsed[slotKey])) {
        return parsed[slotKey];
      }
      const allKey = `${category}_${subCategory}_all`;
      if (!timeSlot && parsed[allKey] && Array.isArray(parsed[allKey])) {
        return parsed[allKey];
      }
    }
  } catch {}

  return getDefaultManifestImages(category, subCategory, timeSlot);
}

export function getMediaForCategory(category, subCategory = 'all', timeSlot = null) {
  const src = _cache || { images: [], videos: [] };

  // Check localStorage for custom gallery overrides
  let customImgs = null;
  try {
    const rawGalleries = localStorage.getItem('elhana_custom_galleries');
    if (rawGalleries) {
      const parsed = JSON.parse(rawGalleries);
      const slotKey = `${category}_${subCategory}_${timeSlot || 'all'}`;
      if (parsed[slotKey] && Array.isArray(parsed[slotKey])) {
        customImgs = parsed[slotKey];
      }
    }
  } catch {}

  let images = customImgs !== null ? customImgs.map(url => ({
    url,
    type: 'image',
    category,
    subCategory,
    timeSlots: [timeSlot || 'sunset'],
    title: { ar: arabicTitle(category, subCategory), en: englishTitle(category, subCategory) }
  })) : src.images.filter(img => img.category === category);

  let videos = src.videos.filter(v => v.category === category);
  if (videos.length === 0) {
    videos = src.videos; // global fallback
  }

  if (customImgs === null) {
    // SubCategory filter
    if (subCategory && subCategory !== 'all') {
      const si = images.filter(img => img.subCategory === subCategory);
      if (si.length > 0) images = si;
      const sv = videos.filter(v => v.subCategory === subCategory);
      if (sv.length > 0) videos = sv;
    }

    // Time slot filter
    if (timeSlot) {
      const ti = images.filter(img => img.timeSlots.includes(timeSlot));
      if (ti.length > 0) images = ti;
      const tv = videos.filter(v => v.timeSlots.includes(timeSlot));
      if (tv.length > 0) videos = tv;
    }
  }

  return { images, videos, all: [...videos, ...images] };
}

// ── Pre-load manifest as early as possible ────────────────────
loadManifest();
