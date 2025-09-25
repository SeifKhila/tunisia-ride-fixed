import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import sarahImage from "@/assets/testimonial-sarah-uk.jpg";
import johnImage from "@/assets/testimonial-john-canada.jpg";
import fatmaImage from "@/assets/testimonial-fatma-france.jpg";
import ahmedImage from "@/assets/testimonial-ahmed-tunisia.jpg";

const TestimonialSection = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: "Sarah L.",
      location: "UK",
      photo: sarahImage,
      review: t('testimonials.1'),
      rating: 5,
      fallback: "SL"
    },
    {
      name: "John D.",
      location: "Canada", 
      photo: johnImage,
      review: t('testimonials.2'),
      rating: 5,
      fallback: "JD"
    },
    {
      name: "Fatma B.",
      location: "France",
      photo: fatmaImage,
      review: t('testimonials.3'),
      rating: 5,
      fallback: "FB"
    },
    {
      name: "أحمد",
      location: "تونس",
      photo: ahmedImage,
      review: t('testimonials.4'),
      rating: 5,
      fallback: "أح"
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-tunisia-blue to-tunisia-orange bg-clip-text text-transparent mb-4">
          {t('testimonials.title')}
        </h2>
        {language === 'ar' && (
          <h3 className="text-2xl md:text-3xl font-bold text-tunisia-blue mb-4 font-arabic">
            ماذا يقول عملاؤنا
          </h3>
        )}
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={testimonial.photo} alt={`${testimonial.name} profile`} />
                  <AvatarFallback className="bg-tunisia-blue text-white">
                    {testimonial.fallback}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-yellow-400 text-lg mb-3">
                {"⭐".repeat(testimonial.rating)}
              </div>
              <p className={`text-muted-foreground italic mb-4 leading-relaxed ${
                testimonial.name === 'أحمد' ? 'font-arabic text-right' : ''
              }`}>
                {testimonial.review}
              </p>
              <div className={`font-semibold text-tunisia-blue ${
                testimonial.name === 'أحمد' ? 'font-arabic text-right' : ''
              }`}>
                {testimonial.name}
              </div>
              <div className={`text-sm text-muted-foreground ${
                testimonial.name === 'أحمد' ? 'font-arabic text-right' : ''
              }`}>
                {testimonial.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;