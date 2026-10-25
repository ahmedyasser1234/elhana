import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext(null);

// Indicative display rates only. Final booking totals are in USD and calculated by the server.
// USD/EGP: 52.39 | EUR/EGP: 58.60 | GBP/EGP: 69.15
const RATES = {
  USD: { rate: 1,      symbol: '$',  name: 'USD', nameAr: 'Ø¯ÙˆÙ„Ø§Ø± Ø£Ù…Ø±ÙŠÙƒÙŠ',   code: 'USD' },
  EUR: { rate: 0.893,  symbol: 'â‚¬',  name: 'EUR', nameAr: 'ÙŠÙˆØ±Ùˆ Ø£ÙˆØ±ÙˆØ¨ÙŠ',    code: 'EUR' },
  GBP: { rate: 0.757,  symbol: 'Â£',  name: 'GBP', nameAr: 'Ø¬Ù†ÙŠÙ‡ Ø¥Ø³ØªØ±Ù„ÙŠÙ†ÙŠ', code: 'GBP' },
  EGP: { rate: 52.39,  symbol: 'Ø¬.Ù…',name: 'EGP', nameAr: 'Ø¬Ù†ÙŠÙ‡ Ù…ØµØ±ÙŠ',     code: 'EGP' },
  RUB: { rate: 92,     symbol: 'â‚½',  name: 'RUB', nameAr: 'Ø±ÙˆØ¨Ù„ Ø±ÙˆØ³ÙŠ',      code: 'RUB' }
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
      usd: { amount: Math.round(priceInUSD), formatted: `$${Math.round(priceInUSD)}`, code: 'USD', nameAr: 'Ø¯ÙˆÙ„Ø§Ø±' },
      eur: { amount: Math.round(priceInUSD * RATES.EUR.rate), formatted: `â‚¬${Math.round(priceInUSD * RATES.EUR.rate)}`, code: 'EUR', nameAr: 'ÙŠÙˆØ±Ùˆ' },
      gbp: { amount: Math.round(priceInUSD * RATES.GBP.rate), formatted: `Â£${Math.round(priceInUSD * RATES.GBP.rate)}`, code: 'GBP', nameAr: 'Ø¥Ø³ØªØ±Ù„ÙŠÙ†ÙŠ' },
      egp: { amount: Math.round(priceInUSD * RATES.EGP.rate), formatted: `${Math.round(priceInUSD * RATES.EGP.rate)} Ø¬.Ù…`, code: 'EGP', nameAr: 'Ø¬Ù†ÙŠÙ‡ Ù…ØµØ±ÙŠ' }
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
    usd: { amount: priceInUSD, formatted: `$${priceInUSD}`, code: 'USD', nameAr: 'Ø¯ÙˆÙ„Ø§Ø±' },
    eur: { amount: Math.round(priceInUSD * 0.893), formatted: `â‚¬${Math.round(priceInUSD * 0.893)}`, code: 'EUR', nameAr: 'ÙŠÙˆØ±Ùˆ' },
    gbp: { amount: Math.round(priceInUSD * 0.757), formatted: `Â£${Math.round(priceInUSD * 0.757)}`, code: 'GBP', nameAr: 'Ø¥Ø³ØªØ±Ù„ÙŠÙ†ÙŠ' },
    egp: { amount: Math.round(priceInUSD * 52.39), formatted: `${Math.round(priceInUSD * 52.39)} Ø¬.Ù…`, code: 'EGP', nameAr: 'Ø¬Ù†ÙŠÙ‡ Ù…ØµØ±ÙŠ' }
  })
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  return context || defaultContextValue;
};

