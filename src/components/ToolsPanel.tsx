import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Languages, AlertTriangle } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { useIsMobile } from "@/hooks/use-mobile";

const ToolsPanel = () => {
  const { language, setLanguage } = useLanguage();
  const { currency, setCurrency, ratesLastUpdated, isUsingFallbackRates } = useCurrency();
  const isMobile = useIsMobile();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' }
  ];

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
    <Card className="mb-8 bg-gradient-card backdrop-blur-md border border-white/20 shadow-card">
      <CardContent className="p-6">
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {/* Language Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Languages className="text-tunisia-blue" size={20} />
              <h3 className="font-semibold text-tunisia-blue">🌍 Language</h3>
            </div>
            <div className={`flex ${isMobile ? 'gap-2 overflow-x-auto pb-2' : 'flex-col gap-2'}`}>
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant="ghost"
                  onClick={() => setLanguage(lang.code)}
                  aria-pressed={language === lang.code}
                  className={`${isMobile ? 'min-w-fit px-4' : 'w-full justify-start'} h-12 text-sm font-medium transition-all duration-300 rounded-xl focus-visible:ring-2 focus-visible:ring-tunisia-blue focus-visible:ring-offset-2 ${
                    language === lang.code 
                      ? 'bg-gradient-to-r from-tunisia-coral to-tunisia-blue text-white shadow-lg hover:opacity-90' 
                      : 'text-tunisia-blue bg-white/95 border-2 border-tunisia-blue shadow-md hover:shadow-lg hover:bg-tunisia-blue hover:text-white hover:border-tunisia-blue'
                  } ${lang.code === 'ar' ? 'font-arabic' : ''}`}
                >
                  <span className="mr-2 text-base">{lang.flag}</span>
                  {lang.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Currency Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="text-tunisia-blue" size={20} />
              <h3 className="font-semibold text-tunisia-blue">💱 Currency</h3>
            </div>
            <div className={`flex ${isMobile ? 'gap-2 overflow-x-auto pb-2' : 'flex-col gap-2'}`}>
              {currencies.map((curr) => (
                <Button
                  key={curr.code}
                  variant="ghost"
                  onClick={() => setCurrency(curr.code)}
                  aria-pressed={currency === curr.code}
                  className={`${isMobile ? 'min-w-fit px-4' : 'w-full justify-start'} h-12 text-sm font-medium transition-all duration-300 rounded-xl focus-visible:ring-2 focus-visible:ring-tunisia-blue focus-visible:ring-offset-2 ${
                    currency === curr.code 
                      ? 'bg-gradient-to-r from-tunisia-coral to-tunisia-blue text-white shadow-lg hover:opacity-90' 
                      : 'text-tunisia-blue bg-white/95 border-2 border-tunisia-blue shadow-md hover:shadow-lg hover:bg-tunisia-blue hover:text-white hover:border-tunisia-blue'
                  }`}
                >
                  <span className="mr-2 text-base">{curr.symbol}</span>
                  {curr.label}
                </Button>
              ))}
            </div>
            
            {/* Rates Updated Info */}
            {ratesLastUpdated && (
              <div className="flex items-center gap-1 text-xs text-tunisia-blue/70 pt-2 border-t border-tunisia-blue/10">
                {isUsingFallbackRates && (
                  <AlertTriangle className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                )}
                <span className="leading-tight">
                  Updated: {formatTimestamp(ratesLastUpdated)}
                  {isUsingFallbackRates ? ' (fallback)' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsPanel;