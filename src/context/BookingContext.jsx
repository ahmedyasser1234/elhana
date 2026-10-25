import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDraft, setBookingDraft] = useState({
    experience: null,
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Cairo' }).format(new Date()),
    timeSlot: '',
    adults: 2,
    children: 0,
    hotelName: '',
    roomNumber: '',
    pickupLocation: 'Naama Bay',
    specialRequests: '',
    privateTransfer: false,
    photoVideoPackage: false,
    bedouinScarf: false,
    desertGoggles: false,
    privateSafari: false,
    camelRide30min: false,
    horseRide1hr: false,
    telescopeStargazing: false,
    // Safari & Buggy Vehicle Breakdown
    singleQuads: 0,
    doubleQuads: 0,
    buggy2Seater: 0,
    buggy4Seater: 0,
    // Bedouin Party Option (none, standard_dinner, vip_dinner, dinner_only)
    bedouinPartyOption: 'none',
    // Standalone Bedouin Dinner Sub-option (dinner_standard, dinner_vip, dinner_stargazing, dinner_vip_stargazing)
    bedouinPartySubOption: 'dinner_standard',
    leadTraveler: {
      fullName: '',
      email: '',
      whatsapp: ''
    },
    paymentMethod: 'cash_arrival'
  });

  const updateBooking = (fields) => {
    setBookingDraft(prev => ({ ...prev, ...fields }));
  };

  const calculateTotal = (exp) => {
    if (!exp) return 0;

    const isBedouinStandaloneExp = (exp?.slug === 'authentic-bedouin-experience-dinner');

    let vehicleTotal = 0;
    if (!isBedouinStandaloneExp && bookingDraft.bedouinPartyOption !== 'dinner_only') {
      const hasCustomVehicles = (bookingDraft.singleQuads > 0 || bookingDraft.doubleQuads > 0 || bookingDraft.buggy2Seater > 0 || bookingDraft.buggy4Seater > 0);
      if (hasCustomVehicles) {
        vehicleTotal += (bookingDraft.singleQuads * 15);
        vehicleTotal += (bookingDraft.doubleQuads * 20);
        vehicleTotal += (bookingDraft.buggy2Seater * 28);
        vehicleTotal += (bookingDraft.buggy4Seater * 32);
      } else {
        const basePrice = exp.startingPrice || 15;
        vehicleTotal = (bookingDraft.adults * basePrice) + (bookingDraft.children * basePrice * 0.6);
      }
    }

    let extras = 0;
    const vehicleCapacity = (bookingDraft.singleQuads * 1) + (bookingDraft.doubleQuads * 2) + (bookingDraft.buggy2Seater * 2) + (bookingDraft.buggy4Seater * 4);
    const totalPeople = Math.max((bookingDraft.adults || 0) + (bookingDraft.children || 0), vehicleCapacity);
    if (bookingDraft.privateTransfer) {
      extras += totalPeople > 6 ? 34 : 22; // 30 EUR vs 20 EUR
    }
    if (bookingDraft.photoVideoPackage) extras += 28; // 25 EUR
    if (bookingDraft.bedouinScarf) extras += 4;
    if (bookingDraft.desertGoggles) extras += 6;
    if (bookingDraft.privateSafari) extras += 15;
    if (bookingDraft.camelRide30min) extras += 10;
    if (bookingDraft.horseRide1hr) extras += 15;
    if (bookingDraft.telescopeStargazing) extras += 5;

    // Bedouin Party Option Calculation
    if (isBedouinStandaloneExp || bookingDraft.bedouinPartyOption === 'dinner_only') {
      vehicleTotal = 0;
      const subOption = bookingDraft.bedouinPartySubOption || 'dinner_standard';
      if (subOption === 'dinner_vip_stargazing') {
        extras += (bookingDraft.adults * 35) + (bookingDraft.children * 20);
      } else if (subOption === 'dinner_vip') {
        extras += (bookingDraft.adults * 30) + (bookingDraft.children * 18);
      } else if (subOption === 'dinner_stargazing') {
        extras += (bookingDraft.adults * 25) + (bookingDraft.children * 15);
      } else { // dinner_standard
        extras += (bookingDraft.adults * 20) + (bookingDraft.children * 12);
      }
    } else {
      if (bookingDraft.bedouinPartyOption === 'vip_dinner') {
        extras += (bookingDraft.adults * 18) + (bookingDraft.children * 10);
      } else if (bookingDraft.bedouinPartyOption === 'standard_dinner' || bookingDraft.bedouinPartyOption === 'with_safari') {
        extras += (bookingDraft.adults * 10) + (bookingDraft.children * 5);
      }
    }

    return Math.round(vehicleTotal + extras);
  };

  return (
    <BookingContext.Provider value={{ bookingDraft, setBookingDraft, updateBooking, calculateTotal }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

