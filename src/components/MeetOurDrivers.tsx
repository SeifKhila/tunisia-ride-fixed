import { Card, CardContent } from "@/components/ui/card";
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
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold text-tunisia-blue mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
            Meet Our Drivers
          </h2>
          <p className={`text-lg text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            Our dedicated drivers will do their best to make sure your ride is safe, comfortable, and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {drivers.map((driver) => (
            <Card 
              key={driver.name} 
              className="overflow-hidden border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 hover:scale-105 bg-white/95 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={driver.image}
                    alt={`${driver.name} - Professional Tunisia Transfer Driver`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center bg-gradient-to-r from-tunisia-blue to-tunisia-coral">
                  <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                  <p className="text-sm text-white/90">Professional Driver</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
