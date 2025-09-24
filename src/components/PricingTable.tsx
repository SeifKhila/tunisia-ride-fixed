import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const PricingTable = () => {
  const { t, language } = useLanguage();
  const { formatPrice, convertPrice } = useCurrency();

  const routes = [
    { from: 'Enfidha', to: 'Hammamet', basePrice: 35, baseCurrency: 'EUR' as const },
    { from: 'Enfidha', to: 'Sousse', basePrice: 40, baseCurrency: 'EUR' as const },
    { from: 'Tunis', to: 'Hammamet', basePrice: 45, baseCurrency: 'EUR' as const }
  ];

  const generateWhatsAppLink = (route: string) => {
    const message = encodeURIComponent(`Hi Get Tunisia Transfer 👋\nI'd like to book ${route} transfer`);
    return `https://wa.me/447956643662?text=${message}`;
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
          Sample Prices
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('pricing.contact_full_list')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {routes.map((route, index) => {
          const convertedPrice = convertPrice(route.basePrice, route.baseCurrency, 'EUR');
          return (
            <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-tunisia-coral" />
                  <span className="font-semibold">{route.from} ⇄ {route.to}</span>
                </div>
                <div className="text-3xl font-bold text-tunisia-blue mb-4">
                  {formatPrice(convertedPrice)}
                </div>
                <Button
                  onClick={() => window.open(generateWhatsAppLink(`${route.from} ⇄ ${route.to}`))}
                  variant="default"
                  className="w-full min-h-[48px] bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default PricingTable;