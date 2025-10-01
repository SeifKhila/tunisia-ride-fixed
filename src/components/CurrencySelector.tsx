import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle } from "lucide-react";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency, ratesLastUpdated, isUsingFallbackRates } = useCurrency();

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'EUR', label: 'EUR', symbol: '€' },
    { code: 'GBP', label: 'GBP', symbol: '£' },
    { code: 'USD', label: 'USD', symbol: '$' },
    { code: 'TND', label: 'TND', symbol: 'د.ت' }
  ];

  const formatTimestamp = (isoString: string | null) => {
    if (!isoString) return '';
    
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-gradient-card backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-card">
        <div className="flex items-center justify-center gap-2 mb-3">
          <DollarSign className="text-tunisia-blue" size={20} />
          <span className="font-medium text-tunisia-blue text-sm">Currency</span>
        </div>
        
        <div className="flex flex-col gap-2">
          {currencies.map((curr) => (
            <Button
              key={curr.code}
              variant={currency === curr.code ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrency(curr.code)}
              className={`w-full justify-start text-sm font-medium transition-all duration-300 rounded-xl ${
                currency === curr.code 
                  ? 'bg-tunisia-coral text-white shadow-glow hover:bg-tunisia-coral/90' 
                  : 'text-tunisia-blue hover:bg-tunisia-blue/10 border border-tunisia-blue/20'
              }`}
            >
              <span className="mr-2 text-base">{curr.symbol}</span>
              {curr.label}
            </Button>
          ))}
        </div>
        
        {ratesLastUpdated && (
          <div className="flex items-center gap-1 text-xs text-tunisia-blue/70 mt-3 pt-3 border-t border-tunisia-blue/10">
            {isUsingFallbackRates && (
              <AlertTriangle className="h-3 w-3 text-yellow-500" />
            )}
            <span className="text-center w-full leading-tight">
              Updated: {formatTimestamp(ratesLastUpdated)}
              {isUsingFallbackRates ? ' (fallback)' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencySelector;