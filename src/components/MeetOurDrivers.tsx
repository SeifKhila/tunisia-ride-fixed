import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import driverSeif from "@/assets/driver-seif.jpg";
import driverBoulbaba from "@/assets/driver-boulbaba.jpg";
import driverAymen from "@/assets/driver-aymen.jpg";
import driverHamza from "@/assets/driver-hamza.jpg";

const drivers = [
  { name: "Seif", image: driverSeif },
  { name: "Boulbaba", image: driverBoulbaba },
  { name: "Aymen", image: driverAymen },
  { name: "Hamza", image: driverHamza }
];

export default function MeetOurDrivers() {
  const { language } = useLanguage();

  return (
    <section className="relative py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold text-tunisia-blue mb-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
            Meet Our Drivers
          </h2>
          <p className={`text-sm md:text-base text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            Our dedicated drivers will do their best to make sure your ride is safe, comfortable, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {drivers.map((driver) => (
            <Card 
              key={driver.name} 
              className="overflow-hidden border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={driver.image}
                    alt={`${driver.name} - Professional Tunisia Transfer Driver`}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-2 md:p-3 bg-gradient-to-r from-tunisia-blue to-tunisia-coral">
                  <div className="text-center mb-2">
                    <h3 className="text-sm md:text-base font-bold text-white">{driver.name}</h3>
                    <p className="text-xs text-white/90">Professional Driver</p>
                  </div>
                  <a 
                    href={`https://wa.me/21628602147?text=${encodeURIComponent(`👨‍✈️ DRIVER REQUEST\n\nPreferred Driver: ${driver.name}\n\n📋 Please provide:\n• Pickup location\n• Destination\n• Date & time\n• Number of passengers`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-white text-tunisia-blue hover:bg-white/90 text-xs md:text-sm py-1 md:py-2 h-auto">
                      <MessageCircle className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                      Request {driver.name}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
