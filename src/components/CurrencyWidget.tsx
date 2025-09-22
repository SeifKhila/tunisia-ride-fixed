import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const CurrencyWidget = () => {
  const { t, language } = useLanguage();
  const [rates, setRates] = useState({
    TND_GBP: 0.25,
    TND_EUR: 0.30,
    TND_USD: 0.32
  });

  useEffect(() => {
    // Mock live rates - in real app would fetch from API
    const mockRates = {
      TND_GBP: 0.25 + (Math.random() - 0.5) * 0.02,
      TND_EUR: 0.30 + (Math.random() - 0.5) * 0.02,
      TND_USD: 0.32 + (Math.random() - 0.5) * 0.02
    };
    setRates(mockRates);
  }, []);

  return (
    <Card className={`w-full ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
      <CardHeader>
        <CardTitle className="text-tunisia-blue flex items-center gap-2">
          💱 Live Currency Exchange
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-sand rounded-lg">
            <div className="text-2xl font-bold text-tunisia-blue">
              {rates.TND_GBP.toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">TND → GBP</div>
          </div>
          <div className="text-center p-4 bg-gradient-sand rounded-lg">
            <div className="text-2xl font-bold text-tunisia-blue">
              {rates.TND_EUR.toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">TND → EUR</div>
          </div>
          <div className="text-center p-4 bg-gradient-sand rounded-lg">
            <div className="text-2xl font-bold text-tunisia-blue">
              {rates.TND_USD.toFixed(3)}
            </div>
            <div className="text-sm text-muted-foreground">TND → USD</div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Exchange rates are approximate and may vary
        </p>
      </CardContent>
    </Card>
  );
};

export default CurrencyWidget;