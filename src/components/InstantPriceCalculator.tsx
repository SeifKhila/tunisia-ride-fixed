import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const priceMatrix: { [key: string]: { [key: string]: number } } = {
  "Enfidha (NBE)": {
    "Hammamet": 35,
    "Sousse": 30,
    "Monastir": 20,
    "Tunis": 75,
    "Nabeul": 40
  },
  "Tunis Carthage (TUN)": {
    "Hammamet": 45,
    "Sousse": 90,
    "La Marsa": 15,
    "Tunis City": 10,
    "Sidi Bou Said": 12
  },
  "Monastir (MIR)": {
    "Sousse": 30,
    "Hammamet": 55,
    "Mahdia": 35,
    "Monastir City": 10
  },
  "Djerba (DJE)": {
    "Houmt Souk": 15,
    "Midoun": 20,
    "Aghir": 25,
    "Zarzis": 50
  }
};

export default function InstantPriceCalculator() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (from && to && priceMatrix[from] && priceMatrix[from][to]) {
      setPrice(priceMatrix[from][to]);
    } else {
      setPrice(null);
    }
  };

  const destinations = from ? Object.keys(priceMatrix[from] || {}) : [];

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-tunisia-blue/20 shadow-tunisia bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-tunisia-blue to-tunisia-coral text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calculator className="h-8 w-8" />
              <CardTitle className={`text-3xl ${language === 'ar' ? 'font-arabic' : ''}`}>
                Instant Price Calculator
              </CardTitle>
            </div>
            <p className="text-white/90">Get your transfer price instantly</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">From (Airport)</label>
                <Select value={from} onValueChange={(value) => { setFrom(value); setTo(""); setPrice(null); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select airport" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(priceMatrix).map((airport) => (
                      <SelectItem key={airport} value={airport}>{airport}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {from && (
                <div>
                  <label className="text-sm font-medium mb-2 block">To (Destination)</label>
                  <Select value={to} onValueChange={setTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Button 
              onClick={calculatePrice}
              disabled={!from || !to}
              className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold py-6"
            >
              Calculate Price
            </Button>

            {price !== null && (
              <div className="mt-6 p-6 bg-tunisia-blue/10 rounded-lg text-center border-2 border-tunisia-coral/30">
                <p className="text-sm text-muted-foreground mb-2">Estimated Price</p>
                <p className="text-4xl font-bold text-tunisia-blue mb-4">{formatPrice(price)}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Fixed price • No hidden fees • Includes all taxes
                </p>
                <a
                  href={`https://wa.me/447956643662?text=${encodeURIComponent(`I'd like to book a transfer from ${from} to ${to}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-tunisia-blue hover:bg-tunisia-blue/90 text-white">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Book This Transfer
                  </Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
