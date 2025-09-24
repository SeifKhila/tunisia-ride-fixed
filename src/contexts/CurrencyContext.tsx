import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'EUR' | 'GBP' | 'TND';

interface ExchangeRateData {
  rates: Record<string, number>;
  fetchedAt: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (eurAmount: number, targetCurrency?: Currency) => string;
  convertFromEUR: (eurAmount: number, targetCurrency: Currency) => number;
  ratesLastUpdated: string | null;
  isUsingFallbackRates: boolean;
}

// Manual fallback rates (editable)
const manualRates = {
  GBP: 0.85,
  TND: 3.40
};

const currencySymbols: Record<Currency, string> = {
  EUR: '€',
  GBP: '£',
  TND: 'د.ت'
};

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
    TND: manualRates.TND
  });
  
  const [ratesLastUpdated, setRatesLastUpdated] = useState<string | null>(null);
  const [isUsingFallbackRates, setIsUsingFallbackRates] = useState(true);

  // Fetch live exchange rates
  const fetchExchangeRates = async () => {
    try {
      console.log('Fetching live exchange rates...');
      const response = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=GBP,TND');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.rates) {
        const rateData: ExchangeRateData = {
          rates: data.rates,
          fetchedAt: new Date().toISOString()
        };
        
        // Cache in localStorage
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
      setExchangeRates({ GBP: manualRates.GBP, TND: manualRates.TND });
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
          const twentyFourHours = 24 * 60 * 60 * 1000;
          
          if (cacheAge < twentyFourHours) {
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
    if (targetCurrency === 'EUR') return Math.round(eurAmount);
    
    const rate = exchangeRates[targetCurrency];
    if (!rate || isNaN(rate)) {
      console.warn(`No rate available for ${targetCurrency}, showing EUR value`);
      return Math.round(eurAmount);
    }
    
    return Math.round(eurAmount * rate);
  };

  const formatPrice = (eurAmount: number, targetCurrency?: Currency): string => {
    const curr = targetCurrency || currency;
    const convertedAmount = convertFromEUR(eurAmount, curr);
    const symbol = currencySymbols[curr];
    
    // Handle NaN or negative values
    if (isNaN(convertedAmount) || convertedAmount < 0) {
      return `€${Math.round(eurAmount)}`;
    }
    
    if (curr === 'TND') {
      return `${symbol} ${convertedAmount}`;
    }
    return `${symbol}${convertedAmount}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice, 
      convertFromEUR,
      ratesLastUpdated,
      isUsingFallbackRates
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};