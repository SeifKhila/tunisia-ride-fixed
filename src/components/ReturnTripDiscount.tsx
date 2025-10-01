import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ReturnTripDiscount() {
  const { language } = useLanguage();

  return (
    <section className="relative py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-tunisia-coral/30 bg-gradient-to-r from-tunisia-coral/10 to-tunisia-blue/10 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <Badge className="mb-4 bg-tunisia-coral text-white">
                  <Percent className="h-4 w-4 mr-1" />
                  Special Offer
                </Badge>
                <h3 className={`text-3xl md:text-4xl font-bold text-tunisia-blue mb-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  Book Return Trip & Save 10%
                </h3>
                <p className={`text-lg text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  Planning to return? Book both ways now and get an automatic 10% discount on your total fare!
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-tunisia-blue to-tunisia-coral flex items-center justify-center">
                  <ArrowLeftRight className="h-12 w-12 text-white" />
                </div>
                <Button 
                  size="lg" 
                  className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Return Trip Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
