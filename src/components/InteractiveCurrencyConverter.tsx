import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

// Exchange rates (bidirectional)
const EXCHANGE_RATES = {
  TND: { GBP: 0.25, EUR: 0.30, USD: 0.32 },
  GBP: { TND: 4.0, EUR: 1.20, USD: 1.28 },
  EUR: { TND: 3.33, GBP: 0.83, USD: 1.07 },
  USD: { TND: 3.13, GBP: 0.78, EUR: 0.93 }
};

const CURRENCIES = ['TND', 'GBP', 'EUR', 'USD'];

export default function InteractiveCurrencyConverter() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('TND');

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'TND') {
      return `${amount.toFixed(2)} TND`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const convertCurrency = (fromCurrency: string, toCurrency: string, amount: number) => {
    if (fromCurrency === toCurrency) return amount;
    const rate = EXCHANGE_RATES[fromCurrency as keyof typeof EXCHANGE_RATES]?.[toCurrency as keyof typeof EXCHANGE_RATES['TND']];
    return rate ? amount * rate : 0;
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

              <p className="text-xs text-muted-foreground text-center mt-4">
                Exchange rates are approximate and updated monthly
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}