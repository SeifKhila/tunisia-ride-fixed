import React from 'react';
import { Button } from "@/components/ui/button";
import { Languages, DollarSign } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const TopControls = () => {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency } = useCurrency();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'AR', flag: '🇹🇳' }
  ];

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'EUR', label: 'EUR', symbol: '€' },
    { code: 'GBP', label: 'GBP', symbol: '£' },
    { code: 'TND', label: 'TND', symbol: 'د.ت' }
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="bg-white/10 backdrop-blur-md rounded-md px-2 py-1 border border-white/20">
        <div className="flex items-center gap-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage(lang.code)}
              className={`text-xs font-medium transition-all duration-300 h-7 px-2 ${
                language === lang.code 
                  ? 'bg-tunisia-coral text-white shadow-glow' 
                  : 'text-white hover:bg-white/20'
              } ${lang.code === 'ar' ? 'font-arabic' : ''}`}
            >
              <span className="text-xs">{lang.flag}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Currency Selector */}
      <div className="bg-white/10 backdrop-blur-md rounded-md px-2 py-1 border border-white/20">
        <div className="flex items-center gap-1">
          {currencies.map((curr) => (
            <Button
              key={curr.code}
              variant={currency === curr.code ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrency(curr.code)}
              className={`text-xs font-medium transition-all duration-300 h-7 px-2 ${
                currency === curr.code 
                  ? 'bg-tunisia-coral text-white shadow-glow' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <span className="text-xs">{curr.symbol}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopControls;