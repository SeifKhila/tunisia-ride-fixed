import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import BookingBreakdownModal from "@/components/BookingBreakdownModal";

const PricingTable = () => {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [selectedRoute, setSelectedRoute] = useState<{from: string; to: string; basePriceEUR: number} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // All base prices are in EUR
  const routes = [
    { from: 'Enfidha', to: 'Hammamet', basePriceEUR: 35 },
    { from: 'Enfidha', to: 'Sousse', basePriceEUR: 40 },
    { from: 'Tunis', to: 'Hammamet', basePriceEUR: 45 }
  ];

  const handleBookNow = (route: {from: string; to: string; basePriceEUR: number}) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
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
        {routes.map((route, index) => (
          <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-tunisia-coral" />
                <span className="font-semibold">{route.from} ⇄ {route.to}</span>
              </div>
              <div className="text-3xl font-bold text-tunisia-blue mb-4">
                {formatPrice(route.basePriceEUR)}
              </div>
              <Button
                onClick={() => handleBookNow(route)}
                variant="default"
                className="w-full min-h-[48px] bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Vehicle Information */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground bg-tunisia-blue/5 border border-tunisia-blue/20 rounded-lg p-3 max-w-md mx-auto">
          💼 Prices are for a 4-seater car and can carry up to 4 medium cases.
        </p>
      </div>

      {/* Booking Breakdown Modal */}
      {selectedRoute && (
        <BookingBreakdownModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          route={selectedRoute}
        />
      )}
    </section>
  );
};

export default PricingTable;