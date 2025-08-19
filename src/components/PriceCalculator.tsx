import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MessageCircle, Mail, MapPin, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Price data structure
interface PriceData {
  [key: string]: {
    [key: string]: number;
  };
}

// Price data for different routes
const priceData: PriceData = {
  "Tunis-Carthage Airport": {
    "Tunis City Center": 15,
    "La Marsa": 20,
    "Sidi Bou Said": 22,
    "Carthage": 18,
    "Hammamet": 65,
    "Sousse": 120,
    "Monastir": 140,
    "Mahdia": 160,
    "Kairouan": 110,
    "Djerba": 280,
    "Tozeur": 320,
    "Douz": 350,
    "Matmata": 250,
    "Sfax": 200
  },
  "Monastir Airport": {
    "Monastir City": 15,
    "Sousse": 25,
    "Hammamet": 80,
    "Tunis City Center": 140,
    "Mahdia": 35,
    "Kairouan": 60,
    "Sfax": 90,
    "Djerba": 200,
    "Tozeur": 280,
    "Douz": 310
  },
  "Sfax Airport": {
    "Sfax City": 15,
    "Sousse": 90,
    "Monastir": 90,
    "Mahdia": 70,
    "Kairouan": 80,
    "Tunis City Center": 200,
    "Djerba": 150,
    "Tozeur": 220,
    "Douz": 250
  },
  "Djerba Airport": {
    "Houmt Souk": 15,
    "Midoun": 20,
    "Sfax": 150,
    "Sousse": 200,
    "Monastir": 200,
    "Tunis City Center": 280,
    "Tozeur": 180,
    "Douz": 150,
    "Matmata": 120
  }
};

// Available locations
const airports = [
  "Tunis-Carthage Airport",
  "Monastir Airport", 
  "Sfax Airport",
  "Djerba Airport"
];

const destinations = [
  "Tunis City Center", "La Marsa", "Sidi Bou Said", "Carthage",
  "Hammamet", "Sousse", "Monastir City", "Monastir", "Mahdia", 
  "Kairouan", "Sfax City", "Sfax", "Djerba", "Houmt Souk", "Midoun",
  "Tozeur", "Douz", "Matmata"
];

const allLocations = [...airports, ...destinations];

export default function PriceCalculator() {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [isReturn, setIsReturn] = useState<boolean>(false);

  // Calculate price based on selections
  const selectedPrice = fromLocation && toLocation && priceData[fromLocation]?.[toLocation] 
    ? priceData[fromLocation][toLocation] 
    : 0;

  const returnPrice = toLocation && fromLocation && priceData[toLocation]?.[fromLocation]
    ? priceData[toLocation][fromLocation]
    : selectedPrice;

  const totalPrice = isReturn ? selectedPrice + returnPrice : selectedPrice;

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const tripType = isReturn ? t('priceCalculator.return') : t('priceCalculator.oneWay');
    const message = `${t('priceCalculator.whatsappMessage')} ${fromLocation} → ${toLocation} (${tripType}) - ${totalPrice} TND`;
    return encodeURIComponent(message);
  };

  // Generate email link
  const generateEmailLink = () => {
    const tripType = isReturn ? t('priceCalculator.return') : t('priceCalculator.oneWay');
    const subject = encodeURIComponent(`${t('priceCalculator.bookingRequest')} - ${fromLocation} → ${toLocation}`);
    const body = encodeURIComponent(
      `${t('priceCalculator.emailBody')}\n\n` +
      `${t('priceCalculator.from')}: ${fromLocation}\n` +
      `${t('priceCalculator.to')}: ${toLocation}\n` +
      `${t('priceCalculator.tripType')}: ${tripType}\n` +
      `${t('priceCalculator.totalPrice')}: ${totalPrice} TND`
    );
    return `mailto:bolbebakhila@gmail.com,khilas@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="calculator" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('priceCalculator.title')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('priceCalculator.description')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue flex items-center justify-center gap-2">
                <MapPin className="h-6 w-6" />
                {t('priceCalculator.calculator')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    {t('priceCalculator.from')}
                  </Label>
                  <Select value={fromLocation} onValueChange={setFromLocation}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={t('priceCalculator.selectDeparture')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {allLocations.map((location) => (
                        <SelectItem key={location} value={location} className="hover:bg-muted">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('priceCalculator.to')}
                  </Label>
                  <Select value={toLocation} onValueChange={setToLocation}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder={t('priceCalculator.selectDestination')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {allLocations.map((location) => (
                        <SelectItem key={location} value={location} className="hover:bg-muted">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2 justify-center">
                <Switch
                  id="return-trip"
                  checked={isReturn}
                  onCheckedChange={setIsReturn}
                />
                <Label htmlFor="return-trip">{t('priceCalculator.returnTrip')}</Label>
              </div>

              {selectedPrice > 0 && (
                <div className="text-center p-6 bg-tunisia-gold/10 rounded-lg border border-tunisia-gold/20">
                  <div className="text-3xl font-bold text-tunisia-coral mb-2">
                    {totalPrice} TND
                  </div>
                  <p className="text-muted-foreground">
                    {isReturn ? t('priceCalculator.returnPrice') : t('priceCalculator.oneWayPrice')}
                  </p>
                </div>
              )}

              {selectedPrice > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open(`https://wa.me/21628602147?text=${generateWhatsAppMessage()}`, '_blank')}
                    className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('priceCalculator.bookWhatsApp')}
                  </Button>
                  
                  <Button
                    onClick={() => window.open(generateEmailLink(), '_blank')}
                    variant="outline"
                    className="border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {t('priceCalculator.bookEmail')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Price Table */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            {t('priceCalculator.priceTable')}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {Object.entries(priceData).map(([airport, destinations]) => (
              <Card key={airport} className="bg-card/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-tunisia-blue flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    {airport}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(destinations).map(([destination, price]) => (
                      <div key={destination} className="flex justify-between items-center py-1 border-b border-border/50 last:border-b-0">
                        <span className="text-muted-foreground">{destination}</span>
                        <span className="font-bold text-tunisia-coral">{price} TND</span>
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