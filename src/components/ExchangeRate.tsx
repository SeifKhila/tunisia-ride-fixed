import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

// Fixed exchange rates (TND to other currencies)
const EXCHANGE_RATES = {
  GBP: 0.25,
  EUR: 0.30,
  USD: 0.32
};

export default function ExchangeRate() {
  const { t } = useLanguage();
  const [tndAmount, setTndAmount] = useState<number>(100);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('exchangeRate.title')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('exchangeRate.description')}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue">
                {t('exchangeRate.converter')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tnd-amount">{t('exchangeRate.tndAmount')}</Label>
                <Input
                  id="tnd-amount"
                  type="number"
                  value={tndAmount}
                  onChange={(e) => setTndAmount(Number(e.target.value) || 0)}
                  className="text-lg font-medium"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                {Object.entries(EXCHANGE_RATES).map(([currency, rate]) => (
                  <div key={currency} className="flex justify-between items-center">
                    <span className="font-medium text-muted-foreground">{currency}:</span>
                    <span className="text-lg font-bold text-tunisia-coral">
                      {formatCurrency(tndAmount * rate, currency)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {t('exchangeRate.note')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}