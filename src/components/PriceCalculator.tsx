import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Mail } from "lucide-react";

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
    <section id="calculator" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Fixed Price Calculator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your route and get an instant fixed price. No hidden fees, no surprises.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Your Quote</CardTitle>
            <CardDescription className="text-center">
              Select your pickup and destination to see the fixed price
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="from-airport" className="text-sm font-medium">
                  From Airport
                </label>
                <Select value={fromAirport} onValueChange={setFromAirport}>
                  <SelectTrigger id="from-airport">
                    <SelectValue placeholder="Select departure airport" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {airports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.name} ({airport.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="to-destination" className="text-sm font-medium">
                  To Destination
                </label>
                <Select value={toDestination} onValueChange={setToDestination}>
                  <SelectTrigger id="to-destination">
                    <SelectValue placeholder="Select destination area" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {destinations.map((destination) => (
                      <SelectItem key={destination} value={destination}>
                        {destination}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPrice && (
              <Card className="bg-primary text-primary-foreground shadow-tunisia">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <p className="text-lg opacity-90 mb-2">Fixed Price</p>
                    <p className="text-5xl font-bold">{selectedPrice} TND</p>
                    <p className="text-sm opacity-75 mt-2">Per car (up to 4 passengers)</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button 
                      asChild 
                      variant="secondary" 
                      size="lg" 
                      className="w-full bg-background text-foreground hover:bg-background/90"
                    >
                      <a
                        href={generateWhatsAppMessage("21628602147")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        WhatsApp (TN)
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="secondary" 
                      size="lg" 
                      className="w-full bg-background text-foreground hover:bg-background/90"
                    >
                      <a
                        href={generateWhatsAppMessage("447956643662")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={20} />
                        WhatsApp (UK)
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="secondary" 
                      size="lg" 
                      className="w-full bg-background text-foreground hover:bg-background/90"
                    >
                      <a
                        href={generateEmailLink()}
                        className="flex items-center justify-center gap-2"
                      >
                        <Mail size={20} />
                        Email Quote
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>• Prices are per car (up to 4 passengers)</p>
              <p>• For vans/minibuses, ask on WhatsApp</p>
              <p>• Any location within the destination area (hotels, rentals, beaches)</p>
            </div>
          </CardContent>
        </Card>

        {/* Price Table */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">All Fixed Prices</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {airports.map((airport) => (
              <Card key={airport.code} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-center text-lg">
                    From {airport.name}
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