import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err.message);
  }
}

export function isDbConnected() {
  return Boolean(supabase);
}

/**
 * Fetch all trips with optional category / search filtering
 */
export async function fetchTrips(filters = {}) {
  if (supabase) {
    try {
      let query = supabase.from('trips').select('*').order('starting_price', { ascending: true });
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map(normalizeTripFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetch error, falling back to local trips:', err.message);
    }
  }

  // Graceful fallback to local seed data
  const { EXPERIENCES } = await import('../src/data/experiences.js');
  let list = [...EXPERIENCES];
  if (filters.category && filters.category !== 'all') {
    list = list.filter(t => t.category === filters.category);
  }
  return list;
}

/**
 * Fetch a single trip by slug
 */
export async function fetchTripBySlug(slug) {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();
      if (!error && data) {
        return normalizeTripFromDb(data);
      }
    } catch (err) {
      console.warn('Supabase single fetch error:', err.message);
    }
  }

  // Fallback
  const { EXPERIENCES } = await import('../src/data/experiences.js');
  return EXPERIENCES.find(e => e.slug === slug || e.id === slug) || null;
}

/**
 * Update trip in database (authenticated admin only)
 */
export async function updateTripInDb(slugOrId, updates) {
  if (!supabase) {
    throw new Error('Database not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  const dbPayload = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  // Convert startingPrice camelCase to starting_price snake_case if provided
  if (updates.startingPrice !== undefined) dbPayload.starting_price = Number(updates.startingPrice);
  if (updates.pickupTime !== undefined) dbPayload.pickup_time = updates.pickupTime;
  if (updates.cancellationPolicy !== undefined) dbPayload.cancellation_policy = updates.cancellationPolicy;

  const { data, error } = await supabase
    .from('trips')
    .update(dbPayload)
    .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
    .select()
    .single();

  if (error) throw error;
  return normalizeTripFromDb(data);
}

/**
 * Upload an image buffer to Supabase Storage bucket 'trip-images'
 */
export async function uploadImageToStorage(fileName, fileBuffer, contentType = 'image/jpeg') {
  if (!supabase) {
    throw new Error('Object storage not configured. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  const cleanName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const bucketName = 'trip-images';

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(cleanName, fileBuffer, {
      contentType,
      upsert: true
    });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(cleanName);

  return urlData?.publicUrl;
}

function normalizeTripFromDb(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleAr: row.title_ar,
    category: row.category,
    categoryLabel: row.category_label,
    shortDescription: row.short_description,
    description: row.description,
    images: Array.isArray(row.images) ? row.images : [],
    duration: row.duration,
    location: row.location,
    pickupAvailable: row.pickup_available,
    pickupTime: row.pickup_time,
    cancellationPolicy: row.cancellation_policy,
    rating: Number(row.rating) || 4.9,
    reviewsCount: Number(row.reviews_count) || 100,
    startingPrice: Number(row.starting_price) || 25,
    currency: row.currency || 'USD',
    isFeatured: Boolean(row.is_featured),
    isPopular: Boolean(row.is_popular),
    suitableFor: Array.isArray(row.suitable_for) ? row.suitable_for : [],
    availableTimes: Array.isArray(row.available_times) ? row.available_times : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    included: Array.isArray(row.included) ? row.included : [],
    excluded: Array.isArray(row.excluded) ? row.excluded : [],
    translations: row.translations || {}
  };
}
