import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

// Exchange rates (TND to other currencies) - These should be updated regularly
const EXCHANGE_RATES = {
  GBP: 0.25,
  EUR: 0.30,
  USD: 0.32
};

const ExchangeRate = () => {
  const { t } = useLanguage();
  const [tndAmount, setTndAmount] = useState(100);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-card border-tunisia-sand/20 shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-primary flex items-center justify-center gap-2">
          <span>💱</span>
          {t('exchange.title')}
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          {t('exchange.description')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="tnd-input" className="text-sm font-medium">
            {t('exchange.amount')} (TND)
          </Label>
          <Input
            id="tnd-input"
            type="number"
            value={tndAmount}
            onChange={(e) => setTndAmount(parseFloat(e.target.value) || 0)}
            className="text-lg font-semibold"
            min="0"
            step="10"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(EXCHANGE_RATES).map(([currency, rate]) => (
            <div 
              key={currency} 
              className="text-center p-3 rounded-lg bg-background/50 border border-border/50"
            >
              <Badge variant="secondary" className="mb-2 text-xs">
                {currency}
              </Badge>
              <div className="text-lg font-bold text-primary">
                {formatCurrency(tndAmount * rate, currency)}
              </div>
              <div className="text-xs text-muted-foreground">
                1 TND = {formatCurrency(rate, currency)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            {t('exchange.rate_info')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeRate;