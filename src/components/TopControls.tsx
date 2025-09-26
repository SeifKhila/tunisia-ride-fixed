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
    <div className="fixed top-20 left-4 z-40 flex flex-col gap-3">
      {/* Language Selector */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
        <div className="flex items-center gap-1 mb-2">
          <Languages className="text-white" size={16} />
          <span className="text-white text-xs font-medium">Language</span>
        </div>
        <div className="flex flex-col gap-1">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage(lang.code)}
              className={`text-xs font-medium transition-all duration-300 h-8 ${
                language === lang.code 
                  ? 'bg-tunisia-coral text-white shadow-glow' 
                  : 'text-white hover:bg-white/20'
              } ${lang.code === 'ar' ? 'font-arabic' : ''}`}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Currency Selector */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20">
        <div className="flex items-center gap-1 mb-2">
          <DollarSign className="text-white" size={16} />
          <span className="text-white text-xs font-medium">Currency</span>
        </div>
        <div className="flex flex-col gap-1">
          {currencies.map((curr) => (
            <Button
              key={curr.code}
              variant={currency === curr.code ? "default" : "ghost"}
              size="sm"
              onClick={() => setCurrency(curr.code)}
              className={`text-xs font-medium transition-all duration-300 h-8 ${
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
      </div>
    </div>
  );
};

export default TopControls;