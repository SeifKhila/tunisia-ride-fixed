import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'EUR', label: 'EUR', symbol: '€' },
    { code: 'GBP', label: 'GBP', symbol: '£' },
    { code: 'TND', label: 'TND', symbol: 'د.ت' }
  ];

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
      <DollarSign className="text-white" size={20} />
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
  );
};

export default CurrencySelector;