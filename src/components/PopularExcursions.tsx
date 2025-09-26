import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PopularExcursions = () => {
  const { t, language } = useLanguage();

  const excursions = [
    "Carthage & Sidi Bou Said",
    "Tunis Medina", 
    "Hammamet & Yasmine",
    "Kairouan",
    "El Jem Amphitheatre",
    "Port El Kantaoui",
    "Sahara Day Experiences"
  ];

  const whatsappMessage = "Hi I'd like a quote for an excursion";

  return (
    <section className="py-12 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-tunisia-blue/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-tunisia-blue to-tunisia-coral bg-clip-text text-transparent">
              Popular Excursions
            </CardTitle>
            <p className="text-muted-foreground">
              Discover Tunisia's most amazing destinations with our expert guides
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Excursions List - Left Side */}
              <div className="space-y-3">
                {excursions.map((excursion, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-tunisia-blue/5 hover:bg-tunisia-blue/10 transition-colors">
                    <MapPin className="w-5 h-5 text-tunisia-coral flex-shrink-0" />
                    <span className="font-medium text-tunisia-blue">{excursion}</span>
                  </div>
                ))}
              </div>

              {/* CTA - Right Side */}
              <div className="flex flex-col items-center justify-center text-center space-y-4 p-6 bg-gradient-to-br from-tunisia-blue/10 to-tunisia-coral/10 rounded-lg">
                <h3 className="text-xl font-bold text-tunisia-blue">
                  Get the Best Quotes
                </h3>
                <p className="text-muted-foreground">
                  Contact us for personalized excursion packages and competitive pricing
                </p>
                <a 
                  href={`https://wa.me/447956643662?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg py-6">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Get Quote on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PopularExcursions;