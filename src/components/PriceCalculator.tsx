import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail, ArrowLeftRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceData {
  [airport: string]: {
    [destination: string]: number;
  };
}

// Bidirectional pricing - same price both ways
const priceData: PriceData = {
  "TUN": {
    "Hammamet": 130,
    "Yasmine Hammamet": 140,
    "Sousse": 160,
    "Monastir": 180,
    "Mahdia": 200,
  },
  "NBE": {
    "Hammamet": 120,
    "Yasmine Hammamet": 110,
    "Sousse": 130,
    "Monastir": 150,
    "Mahdia": 180,
  },
  "MIR": {
    "Sousse": 70,
    "Hammamet": 170,
    "Yasmine Hammamet": 150, // Updated price from 180 to 150
    "Mahdia": 90,
  },
  // Reverse routes (destination to airport) - same prices
  "Hammamet": {
    "TUN": 130,
    "NBE": 120,
    "MIR": 170,
  },
  "Yasmine Hammamet": {
    "TUN": 140,
    "NBE": 110,
    "MIR": 150, // Updated price from 180 to 150
  },
  "Sousse": {
    "TUN": 160,
    "NBE": 130,
    "MIR": 70,
  },
  "Monastir": {
    "TUN": 180,
    "NBE": 150,
  },
  "Mahdia": {
    "TUN": 200,
    "NBE": 180,
    "MIR": 90,
  },
};

const airports = [
  { code: "TUN", name: "Tunis-Carthage Airport" },
  { code: "NBE", name: "Enfidha Airport" },
  { code: "MIR", name: "Monastir Airport" },
];

const destinations = [
  "Hammamet",
  "Yasmine Hammamet", 
  "Sousse",
  "Monastir",
  "Mahdia",
];

// All locations (airports + destinations) for bidirectional selection
const allLocations = [
  ...airports.map(a => ({ code: a.code, name: a.name, type: 'airport' as const })),
  ...destinations.map(d => ({ code: d, name: d, type: 'destination' as const }))
];

export default function PriceCalculator() {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [isReturn, setIsReturn] = useState<boolean>(false);
  
  const selectedPrice = fromLocation && toLocation ? priceData[fromLocation]?.[toLocation] : null;
  const returnPrice = selectedPrice ? Math.round(selectedPrice * 2 * 0.9) : null; // 10% discount on return

  const generateWhatsAppMessage = (phoneNumber: string) => {
    const fromLocationName = allLocations.find(l => l.code === fromLocation)?.name || "{Location}";
    const toLocationName = allLocations.find(l => l.code === toLocation)?.name || "{Location}";
    const tripType = isReturn ? "RETURN TRIP" : "ONE-WAY";
    const price = isReturn ? returnPrice : selectedPrice;
    
    const message = `Hello Affordable Taxi! I'd like to book a ${tripType}: FROM: ${fromLocationName} TO: ${toLocationName} – Price: ${price} TND – Date: {DD/MM/YYYY}, Time: {HH:MM}, Passengers: {#}, Luggage: {#}, Child seats: {Yes/No}. My name is {Name}. Please confirm availability.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    const subject = "Transfer Quote";
    const fromLocationName = allLocations.find(l => l.code === fromLocation)?.name || "{Location}";
    const toLocationName = allLocations.find(l => l.code === toLocation)?.name || "{Location}";
    const tripType = isReturn ? "RETURN TRIP" : "ONE-WAY";
    const price = isReturn ? returnPrice : selectedPrice;
    
    const body = `Hello Affordable Taxi!

I'd like to book a ${tripType}:
FROM: ${fromLocationName}
TO: ${toLocationName}
Price: ${price} TND
Date: {DD/MM/YYYY}
Time: {HH:MM}
Passengers: {#}
Luggage: {#}
Child seats: {Yes/No}
Name: {Name}

Please confirm availability.`;
    return `mailto:khilas592@gmail.com,bolbebakhila@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-sand relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-tunisia-blue drop-shadow-sm">{t('calc.title')}</h2>
          <p className="text-xl text-tunisia-blue/80 max-w-3xl mx-auto leading-relaxed">
            {t('calc.description')}
          </p>
        </div>

        {/* Promotional Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-hero text-white px-6 py-3 rounded-full text-lg font-semibold shadow-glow animate-pulse">
            <ArrowLeftRight size={20} />
            {t('calc.promo_banner')}
          </div>
        </div>

        <Card className="max-w-5xl mx-auto shadow-glow bg-gradient-card border-0 overflow-hidden">
          <CardHeader className="bg-gradient-sunset text-white text-center py-12">
            <CardTitle className="text-3xl mb-4">{t('calc.get_quote')}</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              {t('calc.quote_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="from-location" className="text-lg font-semibold text-tunisia-blue flex items-center gap-2">
                  {t('calc.from_location')}
                </label>
                <Select value={fromLocation} onValueChange={setFromLocation}>
                  <SelectTrigger id="from-location" className="h-14 text-lg border-2 border-tunisia-turquoise/20 focus:border-tunisia-turquoise">
                    <SelectValue placeholder={t('calc.select_from')} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {allLocations.map((location) => (
                      <SelectItem key={location.code} value={location.code} className="text-lg py-3">
                        {location.type === 'airport' ? '✈️' : '🌊'} {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="to-location" className="text-lg font-semibold text-tunisia-blue flex items-center gap-2">
                  {t('calc.to_location')}
                </label>
                <Select value={toLocation} onValueChange={setToLocation}>
                  <SelectTrigger id="to-location" className="h-14 text-lg border-2 border-tunisia-turquoise/20 focus:border-tunisia-turquoise">
                    <SelectValue placeholder={t('calc.select_to')} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {allLocations
                      .filter(location => location.code !== fromLocation) // Don't show same location
                      .map((location) => (
                      <SelectItem key={location.code} value={location.code} className="text-lg py-3">
                        {location.type === 'airport' ? '✈️' : '🌊'} {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Return Trip Toggle */}
            {selectedPrice && (
              <div className="flex items-center justify-center gap-4 bg-tunisia-turquoise/5 rounded-2xl p-6">
                <Button
                  variant={!isReturn ? "default" : "outline"}
                  onClick={() => setIsReturn(false)}
                  className="font-semibold"
                >
                  {t('calc.one_way')}
                </Button>
                <Button
                  variant={isReturn ? "default" : "outline"}
                  onClick={() => setIsReturn(true)}
                  className="font-semibold"
                >
                  {t('calc.return_trip')} <span className="ml-2 text-tunisia-gold">-10%</span>
                </Button>
              </div>
            )}

            {selectedPrice && (
              <Card className="bg-gradient-hero text-white shadow-glow border-0 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="mb-8">
                    <p className="text-xl opacity-90 mb-4">{isReturn ? t('calc.return_price') : t('calc.fixed_price')}</p>
                    {isReturn ? (
                      <div className="space-y-2">
                        <p className="text-5xl font-bold mb-2 text-tunisia-gold drop-shadow-lg">{returnPrice} TND</p>
                        <p className="text-lg opacity-80 line-through">{selectedPrice * 2} TND</p>
                        <p className="text-lg text-tunisia-gold font-semibold">{t('calc.save')} {selectedPrice * 2 - returnPrice!} TND!</p>
                      </div>
                    ) : (
                      <p className="text-7xl font-bold mb-4 text-tunisia-gold drop-shadow-lg">{selectedPrice} TND</p>
                    )}
                    <p className="text-lg opacity-80">{t('calc.per_car')}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold text-lg py-4 shadow-glow transform hover:scale-105 transition-all duration-300"
                    >
                      <a
                        href={generateWhatsAppMessage("21628602147")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <MessageCircle size={24} />
                        {t('calc.whatsapp_tn')}
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue font-bold text-lg py-4 shadow-glow transform hover:scale-105 transition-all duration-300"
                    >
                      <a
                        href={generateWhatsAppMessage("447956643662")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <MessageCircle size={24} />
                        {t('calc.whatsapp_uk')}
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-tunisia-blue font-bold text-lg py-4 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                    >
                      <a
                        href={generateEmailLink()}
                        className="flex items-center justify-center gap-3"
                      >
                        <Mail size={24} />
                        {t('calc.email_quote')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center text-lg text-tunisia-blue/70 space-y-2 bg-tunisia-turquoise/5 rounded-2xl p-6">
              <p>{t('calc.info1')}</p>
              <p>{t('calc.info2')}</p>
              <p>{t('calc.info3')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">{t('calc.all_prices')}</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {airports.map((airport) => (
              <Card key={airport.code} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-center text-lg">
                    {t('calc.from')} {airport.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(priceData[airport.code] || {}).map(([dest, price]) => (
                      <div key={dest} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                        <span className="font-medium">{dest}</span>
                        <span className="text-lg font-bold text-primary">{price} TND</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}