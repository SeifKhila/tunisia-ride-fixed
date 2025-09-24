import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle } from "lucide-react";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency, ratesLastUpdated, isUsingFallbackRates } = useCurrency();

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'EUR', label: 'EUR', symbol: '€' },
    { code: 'GBP', label: 'GBP', symbol: '£' },
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
    <div className="fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="text-white" size={18} />
        {currencies.map((curr) => (
          <Button
            key={curr.code}
            variant={currency === curr.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrency(curr.code)}
            className={`text-sm font-medium transition-all duration-300 ${
              currency === curr.code 
                ? 'bg-tunisia-coral text-white shadow-glow' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            <span className="mr-1">{curr.symbol}</span>
            {curr.label}
          </Button>
        ))}
      </div>
      
      {ratesLastUpdated && (
        <div className="flex items-center gap-1 text-xs text-white/70">
          {isUsingFallbackRates && (
            <AlertTriangle className="h-3 w-3 text-yellow-400" />
          )}
          <span>
            Rates updated: {formatTimestamp(ratesLastUpdated)}
            {isUsingFallbackRates ? ' (using fallback rates)' : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;