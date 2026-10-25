import { SHARM_LOCATIONS, VEHICLE_TYPES, TRANSFER_SERVICES } from '../../data/transfers';

export const transfersApi = {
  // GET /api/transfers/locations
  getLocations: async () => {
    return Promise.resolve({ success: true, data: SHARM_LOCATIONS });
  },

  // GET /api/transfers/vehicles
  getVehicles: async () => {
    return Promise.resolve({ success: true, data: VEHICLE_TYPES });
  },

  // GET /api/transfers/services
  getServices: async () => {
    return Promise.resolve({ success: true, data: TRANSFER_SERVICES });
  },

  // POST /api/transfers/calculate
  calculatePrice: async ({ pickupId, dropoffId, vehicleId, passengers = 1 }) => {
    const vehicle = VEHICLE_TYPES.find(v => v.id === vehicleId) || VEHICLE_TYPES[0];
    let distanceFactor = 1.0;
    if (pickupId.includes('Dahab') || dropoffId.includes('Dahab')) {
      distanceFactor = 2.8;
    }
    const totalPrice = Math.round(vehicle.basePrice * distanceFactor);
    return Promise.resolve({
      success: true,
      data: {
        totalPrice,
        currency: 'USD',
        vehicle: vehicle.name,
        estimatedDuration: distanceFactor > 2 ? '1 hr 20 min' : '25-35 mins'
      }
    });
  }
};
