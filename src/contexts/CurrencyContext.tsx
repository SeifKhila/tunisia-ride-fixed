import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'EUR' | 'GBP' | 'TND';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number, targetCurrency?: Currency) => string;
  convertPrice: (amount: number, fromCurrency: Currency, toCurrency: Currency) => number;
}

const exchangeRates: Record<Currency, Record<Currency, number>> = {
  EUR: { EUR: 1, GBP: 0.85, TND: 3.35 },
  GBP: { EUR: 1.18, GBP: 1, TND: 3.94 },
  TND: { EUR: 0.30, GBP: 0.25, TND: 1 }
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
  const [currency, setCurrency] = useState<Currency>('EUR');

  const convertPrice = (amount: number, fromCurrency: Currency, toCurrency: Currency): number => {
    if (fromCurrency === toCurrency) return amount;
    return Math.round(amount * exchangeRates[fromCurrency][toCurrency]);
  };

  const formatPrice = (amount: number, targetCurrency?: Currency): string => {
    const curr = targetCurrency || currency;
    const symbol = currencySymbols[curr];
    
    if (curr === 'TND') {
      return `${amount} ${symbol}`;
    }
    return `${symbol}${amount}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};