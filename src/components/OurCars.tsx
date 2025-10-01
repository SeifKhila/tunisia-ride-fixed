import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import carSuvBlack from "@/assets/car-suv-black.jpg";
import carSuvBlue from "@/assets/car-suv-blue.jpg";
import carMinivanWhite from "@/assets/car-minivan-white.jpg";

const cars = [
  {
    type: "Premium SUV",
    capacity: "1-5 passengers",
    image: carSuvBlack,
    description: "Modern SUV with luxury features"
  },
  {
    type: "Luxury SUV",
    capacity: "1-5 passengers",
    image: carSuvBlue,
    description: "Premium SUV with extra luggage space"
  },
  {
    type: "Family Minivan",
    capacity: "4-7 passengers",
    image: carMinivanWhite,
    description: "Spacious van for families and groups"
  },
  {
    type: "Standard Sedan",
    capacity: "1-3 passengers",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
    description: "Comfortable sedan for small groups"
  }
];

export default function OurCars() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="relative py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
              Some of Our Cars
            </h2>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
              Modern, clean, and comfortable vehicles for your transfer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="overflow-hidden border-tunisia-blue/20 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div 
                    className="relative aspect-video cursor-pointer"
                    onClick={() => openLightbox(cars[currentIndex].image)}
                  >
                    <img
                      src={cars[currentIndex].image}
                      alt={cars[currentIndex].type}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{cars[currentIndex].type}</h3>
                            <p className="text-sm opacity-90">{cars[currentIndex].description}</p>
                          </div>
                          <Badge className="bg-tunisia-coral text-white border-none">
                            <Users className="h-4 w-4 mr-1" />
                            {cars[currentIndex].capacity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-tunisia-blue/20"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6 text-tunisia-blue" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-tunisia-blue/20"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6 text-tunisia-blue" />
              </Button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {cars.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-tunisia-coral w-8"
                      : "bg-tunisia-blue/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0">
          <img
            src={lightboxImage}
            alt="Car detail"
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
