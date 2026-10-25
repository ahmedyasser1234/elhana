import { EXPERIENCES } from '../src/data/experiences.js';

const EXTRA_PRICES = { photoVideoPackage: 28, bedouinScarf: 4, desertGoggles: 6, privateSafari: 15, camelRide30min: 10, horseRide1hr: 15, telescopeStargazing: 5 };

export function calculateBookingPrice(data) {
  const adults = Number(data.adults);
  const children = Number(data.children ?? 0);
  if (!Number.isInteger(adults) || adults < 1 || adults > 50 || !Number.isInteger(children) || children < 0 || children > 50) throw new Error('Traveler counts are invalid');
  if (data.itemType === 'transfer') {
    const vehicles = { 'veh-sedan': 20, 'veh-van': 35, 'veh-vip': 65 };
    const base = vehicles[data.vehicleId];
    if (!base || !Array.isArray(data.routeNames) || data.routeNames.length !== 2) throw new Error('Transfer details are invalid');
    const isDahab = data.routeNames.some(name => String(name).toLowerCase().includes('dahab'));
    const airportToNabq = String(data.routeNames[0]).includes('Airport') && String(data.routeNames[1]).includes('Nabq');
    return Math.round(base * (isDahab ? 2.8 : airportToNabq ? 1.2 : 1));
  }
  if (data.itemType !== 'experience') throw new Error('Booking type is invalid');
  const experience = EXPERIENCES.find(item => item.slug === data.experienceSlug);
  if (!experience) throw new Error('Experience is invalid');
  const option = { ...data, ...(data.options || {}) };
  const standaloneDinner = experience.slug === 'authentic-bedouin-experience-dinner';
  const keys = ['singleQuads', 'doubleQuads', 'buggy2Seater', 'buggy4Seater'];
  const vehicles = Object.fromEntries(keys.map(key => [key, Number(option[key] || 0)]));
  if (Object.values(vehicles).some(count => !Number.isInteger(count) || count < 0 || count > 20)) throw new Error('Vehicle counts are invalid');
  const hasVehicles = Object.values(vehicles).some(Boolean);
  let vehicleTotal = 0;
  let extras = 0;
  if (!standaloneDinner && option.bedouinPartyOption !== 'dinner_only') {
    vehicleTotal = hasVehicles
      ? vehicles.singleQuads * 15 + vehicles.doubleQuads * 20 + vehicles.buggy2Seater * 28 + vehicles.buggy4Seater * 32
      : adults * Number(experience.startingPrice || 15) + children * Number(experience.startingPrice || 15) * 0.6;
  }
  for (const [key, price] of Object.entries(EXTRA_PRICES)) if (option[key]) extras += price;`r`n  if (option.privateTransfer) extras += adults + children > 6 ? 34 : 22;
  const dinner = option.bedouinPartyOption;
  const sub = option.bedouinPartySubOption || 'dinner_standard';
  if (standaloneDinner || dinner === 'dinner_only') {
    const rates = { dinner_vip_stargazing: [35, 20], dinner_vip: [30, 18], dinner_stargazing: [25, 15], dinner_standard: [20, 12] };
    const [adultRate, childRate] = rates[sub] || rates.dinner_standard;
    extras += adults * adultRate + children * childRate;
  } else if (dinner === 'vip_dinner') extras += adults * 18 + children * 10;
  else if (dinner === 'standard_dinner' || dinner === 'with_safari') extras += adults * 10 + children * 5;
  return Math.round(vehicleTotal + extras);
}

