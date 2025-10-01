import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'EUR' | 'GBP' | 'TND' | 'USD';

interface ExchangeRateData {
  rates: Record<string, number>;
  fetchedAt: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (eurAmount: number, targetCurrency?: Currency) => string;
  convertFromEUR: (eurAmount: number, targetCurrency: Currency) => number;
  calculateDeposit: (totalEurAmount: number, targetCurrency?: Currency) => { deposit: number; balance: number; total: number };
  ratesLastUpdated: string | null;
  isUsingFallbackRates: boolean;
  flatEurUplift: number;
}

// Manual fallback rates (editable)
const manualRates = {
  GBP: 0.85,
  TND: 3.40,
  USD: 1.10
};

const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  TND: 'د.ت',
  USD: '$'
};

// Flat EUR uplift added to all ride prices
const FLAT_EUR_UPLIFT = 5.00;

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    // Get saved currency from localStorage or default to EUR
    const saved = localStorage.getItem('selectedCurrency');
    return (saved as Currency) || 'EUR';
  });
  
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    GBP: manualRates.GBP,
    TND: manualRates.TND,
    USD: manualRates.USD
  });
  
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string | null>(null);
  const [isUsingFallbackRates, setIsUsingFallbackRates] = useState(true);

  // Fetch live exchange rates
  const fetchExchangeRates = async () => {
    try {
      console.log('Fetching live exchange rates...');
      const response = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=GBP,TND,USD');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.rates) {
        const rateData: ExchangeRateData = {
          rates: data.rates,
          fetchedAt: new Date().toISOString()
        };
        
        // Cache in localStorage (6 hour cache)
        localStorage.setItem('exchangeRateData', JSON.stringify(rateData));
        
        setExchangeRates(data.rates);
        setRatesLastUpdated(rateData.fetchedAt);
        setIsUsingFallbackRates(false);
        
        console.log('Exchange rates updated:', data.rates, 'at', rateData.fetchedAt);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates, using fallback:', error);
      setExchangeRates({ GBP: manualRates.GBP, TND: manualRates.TND, USD: manualRates.USD });
      setIsUsingFallbackRates(true);
      setRatesLastUpdated(new Date().toISOString());
    }
  };

  // Load cached rates or fetch new ones
  useEffect(() => {
    const loadRates = () => {
      try {
        const cached = localStorage.getItem('exchangeRateData');
        if (cached) {
          const rateData: ExchangeRateData = JSON.parse(cached);
          const cacheAge = Date.now() - new Date(rateData.fetchedAt).getTime();
          const sixHours = 6 * 60 * 60 * 1000; // 6-hour cache as per requirements
          
          if (cacheAge < sixHours) {
            // Use cached rates
            setExchangeRates(rateData.rates);
            setRatesLastUpdated(rateData.fetchedAt);
            setIsUsingFallbackRates(false);
            console.log('Using cached exchange rates from', rateData.fetchedAt);
            return;
          }
        }
      } catch (error) {
        console.error('Error loading cached rates:', error);
      }
      
      // Fetch new rates
      fetchExchangeRates();
    };

    loadRates();
  }, []);

  // Save currency selection to localStorage
  useEffect(() => {
    localStorage.setItem('selectedCurrency', currency);
  }, [currency]);

  const convertFromEUR = (eurAmount: number, targetCurrency: Currency): number => {
    // Add flat €5 uplift to base EUR amount
    const eurWithUplift = eurAmount + FLAT_EUR_UPLIFT;
    
    if (targetCurrency === 'EUR') {
      return Number(eurWithUplift.toFixed(2)); // 2 decimal places for EUR
    }
    
    const rate = exchangeRates[targetCurrency];
    if (!rate || isNaN(rate)) {
      console.warn(`No rate available for ${targetCurrency}, showing EUR value`);
      return Number(eurWithUplift.toFixed(2));
    }
    
    const converted = eurWithUplift * rate;
    
    // Apply rounding rules per currency
    if (targetCurrency === 'TND') {
      return Math.round(converted); // Round to nearest 1 TND
    }
    
    // GBP, USD: 2 decimal places
    return Number(converted.toFixed(2));
  };

  const formatPrice = (eurAmount: number, targetCurrency?: Currency): string => {
    const curr = targetCurrency || currency;
    const convertedAmount = convertFromEUR(eurAmount, curr);
    const symbol = currencySymbols[curr];
    
    // Handle NaN or negative values
    if (isNaN(convertedAmount) || convertedAmount < 0) {
      const withUplift = eurAmount + FLAT_EUR_UPLIFT;
      return `€${withUplift.toFixed(2)}`;
    }
    
    // TND format (no decimals)
    if (curr === 'TND') {
      return `${symbol} ${convertedAmount}`;
    }
    
    // EUR, GBP, USD (2 decimals)
    return `${symbol}${convertedAmount.toFixed(2)}`;
  };

  const calculateDeposit = (totalEurAmount: number, targetCurrency?: Currency) => {
    const curr = targetCurrency || currency;
    const total = convertFromEUR(totalEurAmount, curr);
    const deposit = Number((total * 0.25).toFixed(curr === 'TND' ? 0 : 2)); // 25% deposit
    const balance = Number((total - deposit).toFixed(curr === 'TND' ? 0 : 2));
    
    return { deposit, balance, total };
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice, 
      convertFromEUR,
      calculateDeposit,
      ratesLastUpdated,
      isUsingFallbackRates,
      flatEurUplift: FLAT_EUR_UPLIFT
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};