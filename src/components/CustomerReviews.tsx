import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const reviews = [
  {
    name: "Sarah Johnson",
    country: "UK",
    rating: 5,
    text: "Excellent service! Driver was on time, car was spotless, and the journey was smooth. Highly recommend for airport transfers in Tunisia.",
    date: "March 2024"
  },
  {
    name: "John Smith",
    country: "Canada",
    rating: 5,
    text: "Professional and reliable. Booked for Enfidha to Hammamet transfer. Driver tracked our flight and was waiting when we arrived. Great experience!",
    date: "February 2024"
  },
  {
    name: "Fatma Benali",
    country: "France",
    rating: 5,
    text: "Service impeccable! Chauffeur ponctuel et très professionnel. Prix fixe comme promis. Je recommande vivement!",
    date: "January 2024"
  },
  {
    name: "Ahmed Hassan",
    country: "Tunisia",
    rating: 5,
    text: "خدمة ممتازة و سائق محترم. الأسعار ثابتة و السيارة نظيفة. أنصح بهم بشدة!",
    date: "December 2023"
  }
];

export default function CustomerReviews() {
  const { language } = useLanguage();

  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold text-tunisia-blue mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
            What Our Customers Say
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            Real reviews from happy customers
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-tunisia-coral text-tunisia-coral" />
            ))}
            <span className="ml-2 text-lg font-semibold">4.9 / 5.0</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <Card 
              key={index}
              className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 bg-white/95 backdrop-blur-sm"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-tunisia-coral text-tunisia-coral" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                  "{review.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-tunisia-blue">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.country} • {review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
