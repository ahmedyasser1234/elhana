import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext(null);

// Indicative display rates only. Final booking totals are in USD.
// USD/EGP: 52.39 | EUR/EGP: 58.60 | GBP/EGP: 69.15
const RATES = {
  USD: { rate: 1,      symbol: '$',  name: 'USD', nameAr: 'دولار أمريكي',   code: 'USD' },
  EUR: { rate: 0.893,  symbol: '€',  name: 'EUR', nameAr: 'يورو أوروبي',    code: 'EUR' },
  GBP: { rate: 0.757,  symbol: '£',  name: 'GBP', nameAr: 'جنيه إسترليني', code: 'GBP' },
  EGP: { rate: 52.39,  symbol: 'ج.م',name: 'EGP', nameAr: 'جنيه مصري',     code: 'EGP' },
  RUB: { rate: 92,     symbol: '₽',  name: 'RUB', nameAr: 'روبل روسي',      code: 'RUB' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  const formatPrice = (priceInUSD) => {
    const current = RATES[currency] || RATES.USD;
    const converted = Math.round(priceInUSD * (current.rate || 1));
    
    if (currency === 'USD' || currency === 'EUR' || currency === 'GBP') {
      return `${current.symbol}${converted}`;
    }
    return `${converted} ${current.symbol}`;
  };

  const convertPrice = (priceInUSD, targetCurrency = 'USD') => {
    const current = RATES[targetCurrency] || RATES.USD;
    return Math.round(priceInUSD * (current.rate || 1));
  };

  const getMultiCurrencyPrices = (priceInUSD) => {
    return {
      usd: { amount: Math.round(priceInUSD), formatted: `$${Math.round(priceInUSD)}`, code: 'USD', nameAr: 'دولار' },
      eur: { amount: Math.round(priceInUSD * RATES.EUR.rate), formatted: `€${Math.round(priceInUSD * RATES.EUR.rate)}`, code: 'EUR', nameAr: 'يورو' },
      gbp: { amount: Math.round(priceInUSD * RATES.GBP.rate), formatted: `£${Math.round(priceInUSD * RATES.GBP.rate)}`, code: 'GBP', nameAr: 'إسترليني' },
      egp: { amount: Math.round(priceInUSD * RATES.EGP.rate), formatted: `${Math.round(priceInUSD * RATES.EGP.rate)} ج.م`, code: 'EGP', nameAr: 'جنيه مصري' }
    };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates: RATES, formatPrice, convertPrice, getMultiCurrencyPrices }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const defaultContextValue = {
  currency: 'USD',
  setCurrency: () => {},
  rates: RATES,
  formatPrice: (priceInUSD) => `$${priceInUSD}`,
  convertPrice: (priceInUSD) => priceInUSD,
  getMultiCurrencyPrices: (priceInUSD) => ({
    usd: { amount: priceInUSD, formatted: `$${priceInUSD}`, code: 'USD', nameAr: 'دولار' },
    eur: { amount: Math.round(priceInUSD * 0.893), formatted: `€${Math.round(priceInUSD * 0.893)}`, code: 'EUR', nameAr: 'يورو' },
    gbp: { amount: Math.round(priceInUSD * 0.757), formatted: `£${Math.round(priceInUSD * 0.757)}`, code: 'GBP', nameAr: 'إسترليني' },
    egp: { amount: Math.round(priceInUSD * 52.39), formatted: `${Math.round(priceInUSD * 52.39)} ج.م`, code: 'EGP', nameAr: 'جنيه مصري' }
  })
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  return context || defaultContextValue;
};
