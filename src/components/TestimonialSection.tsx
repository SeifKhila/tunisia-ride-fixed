import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialSection = () => {
  const { t, language } = useLanguage();

  const testimonials = [
    {
      name: "Sarah M.",
      location: "UK",
      photo: "👩",
      review: t('testimonials.1'),
      rating: 5
    },
    {
      name: "John D.",
      location: "Canada", 
      photo: "👨",
      review: t('testimonials.2'),
      rating: 5
    },
    {
      name: "Lisa K.",
      location: "Germany",
      photo: "👩",
      review: t('testimonials.3'),
      rating: 5
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
          {t('testimonials.title')}
        </h2>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-6xl mb-4">{testimonial.photo}</div>
              <div className="text-yellow-400 text-lg mb-3">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="text-muted-foreground italic mb-4 leading-relaxed">
                {testimonial.review}
              </p>
              <div className="font-semibold text-tunisia-blue">
                {testimonial.name}
              </div>
              <div className="text-sm text-muted-foreground">
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