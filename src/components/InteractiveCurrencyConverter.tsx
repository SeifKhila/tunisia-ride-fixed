import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertTriangle } from "lucide-react";

interface ExchangeRates {
  [key: string]: number;
}

interface CachedRates {
  rates: ExchangeRates;
  fetchedAt: string;
  baseCurrency: string;
}

const CURRENCIES = ['TND', 'GBP', 'EUR', 'USD'];

// Fallback rates in case API fails
const FALLBACK_RATES = {
  TND: { GBP: 0.25, EUR: 0.30, USD: 0.32 },
  GBP: { TND: 4.0, EUR: 1.20, USD: 1.28 },
  EUR: { TND: 3.33, GBP: 0.83, USD: 1.07 },
  USD: { TND: 3.13, GBP: 0.78, EUR: 0.93 }
};

export default function InteractiveCurrencyConverter() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('TND');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchExchangeRates = async (baseCurrency: string): Promise<CachedRates | null> => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.rates) {
        throw new Error('Invalid response format');
      }
      
      return {
        rates: data.rates,
        fetchedAt: new Date().toISOString(),
        baseCurrency: baseCurrency
      };
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      return null;
    }
  };

  const getCachedRates = (baseCurrency: string): CachedRates | null => {
    try {
      const cached = localStorage.getItem(`exchange_rates_${baseCurrency}`);
      if (!cached) return null;
      
      const cachedData: CachedRates = JSON.parse(cached);
      const fetchedAt = new Date(cachedData.fetchedAt);
      const now = new Date();
      const hoursDiff = (now.getTime() - fetchedAt.getTime()) / (1000 * 60 * 60);
      
      // Use cached data if less than 24 hours old
      if (hoursDiff < 24) {
        return cachedData;
      }
      
      return null;
    } catch (error) {
      console.error('Error reading cached rates:', error);
      return null;
    }
  };

  const setCachedRates = (data: CachedRates) => {
    try {
      localStorage.setItem(`exchange_rates_${data.baseCurrency}`, JSON.stringify(data));
    } catch (error) {
      console.error('Error caching rates:', error);
    }
  };

  const loadExchangeRates = async (baseCurrency: string) => {
    setLoading(true);
    
    // Try to get cached rates first
    const cachedRates = getCachedRates(baseCurrency);
    
    if (cachedRates) {
      setRates(cachedRates.rates);
      setLastUpdated(new Date(cachedRates.fetchedAt));
      setIsUsingFallback(false);
      setLoading(false);
      return;
    }
    
    // Fetch fresh rates
    const freshRates = await fetchExchangeRates(baseCurrency);
    
    if (freshRates) {
      setRates(freshRates.rates);
      setLastUpdated(new Date(freshRates.fetchedAt));
      setIsUsingFallback(false);
      setCachedRates(freshRates);
    } else {
      // Use fallback rates
      const fallbackForBase = FALLBACK_RATES[baseCurrency as keyof typeof FALLBACK_RATES] || {};
      setRates(fallbackForBase);
      setLastUpdated(new Date());
      setIsUsingFallback(true);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadExchangeRates(fromCurrency);
  }, [fromCurrency]);

  const formatCurrency = (amount: number, currency: string) => {
    switch (currency) {
      case 'TND':
        return `${amount.toFixed(2)} د.ت`;
      case 'GBP':
        return `£${amount.toFixed(2)}`;
      case 'EUR':
        return `€${amount.toFixed(2)}`;
      case 'USD':
        return `$${amount.toFixed(2)}`;
      default:
        return `${amount.toFixed(2)} ${currency}`;
    }
  };

  const convertCurrency = (fromCurrency: string, toCurrency: string, amount: number) => {
    if (fromCurrency === toCurrency) return amount;
    
    const rate = rates[toCurrency];
    return rate ? amount * rate : 0;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const otherCurrencies = CURRENCIES.filter(curr => curr !== fromCurrency);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Convert TND ↔ GBP/EUR/USD</h2>
          <p className="text-xl text-muted-foreground">
            Live currency converter for your transfer budget
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-card">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue">
                Currency Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="text-lg font-medium"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="from-currency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tunisia-blue mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Loading exchange rates...</p>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-border">
                  <h4 className="font-medium text-sm text-muted-foreground">Converted amounts:</h4>
                  {otherCurrencies.map((currency) => (
                    <div key={currency} className="flex justify-between items-center p-3 bg-gradient-sand rounded-lg">
                      <span className="font-medium text-tunisia-blue">{currency}:</span>
                      <span className="text-lg font-bold text-tunisia-coral">
                        {formatCurrency(convertCurrency(fromCurrency, currency, amount), currency)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Exchange Rate Timestamp */}
              <div className="text-center">
                {lastUpdated && (
                  <p className="text-xs text-muted-foreground">
                    Exchange rates updated: {formatTimestamp(lastUpdated)}
                    {isUsingFallback && (
                      <span className="inline-flex items-center gap-1 ml-2 text-amber-600">
                        <AlertTriangle className="h-3 w-3" />
                        (fallback rates)
                      </span>
                    )}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}