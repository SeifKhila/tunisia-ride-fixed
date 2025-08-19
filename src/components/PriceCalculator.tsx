import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PriceData {
  [airport: string]: {
    [destination: string]: number;
  };
}

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
    "Yasmine Hammamet": 180,
    "Mahdia": 90,
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

export default function PriceCalculator() {
  const { t } = useLanguage();
  const [fromAirport, setFromAirport] = useState<string>("");
  const [toDestination, setToDestination] = useState<string>("");
  
  const selectedPrice = fromAirport && toDestination ? priceData[fromAirport]?.[toDestination] : null;

  const generateWhatsAppMessage = (phoneNumber: string) => {
    const message = `Hello Affordable Taxi! I'd like to book: FROM: ${fromAirport ? airports.find(a => a.code === fromAirport)?.name : "{Airport}"} TO: ${toDestination || "{Destination}"} – Date: {DD/MM/YYYY}, Time: {HH:MM}, Passengers: {#}, Luggage: {#}, Child seats: {Yes/No}. My name is {Name}. Please confirm price and availability.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    const subject = "Transfer Quote";
    const body = `Hello Affordable Taxi!

I'd like to book:
FROM: ${fromAirport ? airports.find(a => a.code === fromAirport)?.name : "{Airport}"}
TO: ${toDestination || "{Destination Area}"}
Date: {DD/MM/YYYY}
Time: {HH:MM}
Passengers: {#}
Luggage: {#}
Child seats: {Yes/No}
Name: {Name}

Please confirm price and availability.`;
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
                <label htmlFor="from-airport" className="text-lg font-semibold text-tunisia-blue flex items-center gap-2">
                  {t('calc.from_airport')}
                </label>
                <Select value={fromAirport} onValueChange={setFromAirport}>
                  <SelectTrigger id="from-airport" className="h-14 text-lg border-2 border-tunisia-turquoise/20 focus:border-tunisia-turquoise">
                    <SelectValue placeholder={t('calc.select_departure')} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code} className="text-lg py-3">
                        {airport.name} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="to-destination" className="text-lg font-semibold text-tunisia-blue flex items-center gap-2">
                  {t('calc.to_destination')}
                </label>
                <Select value={toDestination} onValueChange={setToDestination}>
                  <SelectTrigger id="to-destination" className="h-14 text-lg border-2 border-tunisia-turquoise/20 focus:border-tunisia-turquoise">
                    <SelectValue placeholder={t('calc.select_destination')} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination} className="text-lg py-3">
                        🌊 {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPrice && (
              <Card className="bg-gradient-hero text-white shadow-glow border-0 transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-10 text-center">
                  <div className="mb-8">
                    <p className="text-xl opacity-90 mb-4">{t('calc.fixed_price')}</p>
                    <p className="text-7xl font-bold mb-4 text-tunisia-gold drop-shadow-lg">{selectedPrice} TND</p>
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