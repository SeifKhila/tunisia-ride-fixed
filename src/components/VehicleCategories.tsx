import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, Users, Luggage, Star, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";

const categories = [
  {
    name: "Standard",
    icon: Car,
    passengers: "1-3",
    luggage: "2-3",
    priceFrom: 35,
    features: ["Comfortable sedan", "Air conditioning", "Professional driver", "Fixed price"]
  }
];

export default function VehicleCategories() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
            Vehicle Categories
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            Choose the perfect vehicle for your transfer needs
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-sm"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-tunisia-blue to-tunisia-coral rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-tunisia-blue">{category.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    From <span className="text-2xl font-bold text-tunisia-coral">{formatPrice(category.priceFrom)}</span>
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-4 mb-6">
                    <Badge variant="outline" className="border-tunisia-blue/30">
                      <Users className="h-4 w-4 mr-1" />
                      {category.passengers}
                    </Badge>
                    <Badge variant="outline" className="border-tunisia-blue/30">
                      <Luggage className="h-4 w-4 mr-1" />
                      {category.luggage}
                    </Badge>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-tunisia-coral mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={`https://wa.me/21628602147?text=${encodeURIComponent(`🚗 VEHICLE BOOKING\n\nCategory: ${category.name}\nPrice from: ${formatPrice(category.priceFrom)}\nCapacity: ${category.passengers} passengers\nLuggage: ${category.luggage} bags\n\n📋 Please provide:\n• Pickup location\n• Destination\n• Date & time\n• Number of passengers\n• Special requests`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-tunisia-blue hover:bg-tunisia-blue/90">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Book This Vehicle
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
