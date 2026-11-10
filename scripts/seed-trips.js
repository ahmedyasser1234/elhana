/**
 * Database Seed Script for El Hana Group (www.elahanasafari.com)
 * Imports hardcoded trips from src/data/experiences.js into Supabase Postgres.
 * 
 * Usage:
 *   node scripts/seed-trips.js
 * (Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from process.env or .env)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple .env parser so user doesn't need dotenv
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ Missing Supabase credentials!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file or environment.');
  console.error('\nExample:');
  console.error('  SUPABASE_URL=https://your-project.supabase.co');
  console.error('  SUPABASE_SERVICE_ROLE_KEY=ey...\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Connecting to Supabase at: ${supabaseUrl}...`);

  // Dynamically import experiences
  const expModule = await import('../src/data/experiences.js');
  const experiences = expModule.EXPERIENCES || [];
  const getLocalized = expModule.getLocalizedExperience;

  console.log(`Found ${experiences.length} trips in src/data/experiences.js to seed.`);

  const tripsToInsert = experiences.map(exp => {
    const arData = getLocalized ? getLocalized(exp, 'ar') : null;
    return {
      id: exp.id,
      slug: exp.slug,
      title: exp.title,
      title_ar: arData?.title || exp.title,
      category: exp.category,
      category_label: exp.categoryLabel || exp.category,
      short_description: exp.shortDescription,
      description: exp.description,
      images: exp.images || [],
      duration: exp.duration,
      location: exp.location,
      pickup_available: exp.pickupAvailable !== false,
      pickup_time: exp.availableTimes?.[0] || '08:00 AM (Hotel Pickup)',
      cancellation_policy: 'Free cancellation up to 24 hours before pickup.',
      rating: exp.rating || 4.9,
      reviews_count: exp.reviewsCount || 100,
      starting_price: exp.startingPrice || 25,
      currency: exp.currency || 'USD',
      is_featured: Boolean(exp.isFeatured),
      is_popular: Boolean(exp.isPopular),
      suitable_for: exp.suitableFor || [],
      available_times: exp.availableTimes || [],
      highlights: exp.highlights || [],
      included: exp.included || [],
      excluded: exp.excluded || [],
      translations: {
        ar: arData ? {
          title: arData.title,
          shortDescription: arData.shortDescription,
          highlights: arData.highlights,
          included: arData.included,
          excluded: arData.excluded
        } : null
      },
      updated_at: new Date().toISOString()
    };
  });

  // Upsert into trips table
  const { data, error } = await supabase
    .from('trips')
    .upsert(tripsToInsert, { onConflict: 'slug' });

  if (error) {
    console.error('❌ Error inserting trips into Supabase:', error);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${tripsToInsert.length} trips into Supabase!`);
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
