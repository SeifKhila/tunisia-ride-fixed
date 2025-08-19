import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, Shield, Clock, Users, Star, CheckCircle, MapPin, Car, Plane, CreditCard, Sun, Palmtree, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import PriceCalculator from "@/components/PriceCalculator";
import ExchangeRate from "@/components/ExchangeRate";
import FAQ from "@/components/FAQ";
import heroImage from "@/assets/tunisia-hero.jpg";

export default function Index() {
  const { t, language } = useLanguage();

  // Helper functions for contact links
  const generateWhatsAppLink = (phoneNumber: string, message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    const subject = encodeURIComponent(t('hero.emailSubject'));
    const body = encodeURIComponent(t('hero.emailBody'));
    return `mailto:bolbebakhila@gmail.com,khilas@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <LanguageSelector />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-tunisia-blue/80 via-tunisia-blue/60 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-tunisia-gold/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-tunisia-coral/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-tunisia-gold/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-40 w-24 h-24 bg-tunisia-coral/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-tunisia-gold animate-shimmer">
          <Sun size={40} />
        </div>
        <div className="absolute top-32 right-20 text-tunisia-coral animate-wave">
          <Palmtree size={35} />
        </div>
        <div className="absolute bottom-40 left-16 text-tunisia-turquoise animate-float">
          <Waves size={30} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.title')}
            </h1>
            <h2 className={`text-2xl md:text-3xl mb-8 text-tunisia-gold font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.subtitle')}
            </h2>
            <p className={`text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => window.open(generateWhatsAppLink('21628602147', t('hero.whatsappMessage')), '_blank')}
              size="lg"
              className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('hero.whatsappTunisia')}
            </Button>
            
            <Button
              onClick={() => window.open(generateWhatsAppLink('447956643662', t('hero.whatsappMessage')), '_blank')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-blue backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('hero.whatsappUK')}
            </Button>
            
            <Button
              onClick={() => window.open(generateEmailLink(), '_blank')}
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-tunisia-blue backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <Mail className="mr-2 h-5 w-5" />
              {t('hero.emailQuote')}
            </Button>

            <Button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Car className="mr-2 h-5 w-5" />
              {t('hero.calculatePrice')}
            </Button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap justify-center gap-6 text-white/80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.licensed')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.available24_7')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-tunisia-gold" />
              <span>{t('hero.englishSpeaking')}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <PriceCalculator />

      {/* Exchange Rate */}
      <ExchangeRate />

      {/* Booking Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{t('bookingProcess.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('bookingProcess.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-tunisia-blue">{t('bookingProcess.step1Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{t('bookingProcess.step1Description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-gold rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-tunisia-blue" />
                </div>
                <CardTitle className="text-tunisia-blue">{t('bookingProcess.step2Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{t('bookingProcess.step2Description')}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card/50 backdrop-blur-sm border-2 border-tunisia-gold/20 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-blue rounded-full flex items-center justify-center mb-4">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-tunisia-blue">{t('bookingProcess.step3Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{t('bookingProcess.step3Description')}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{t('tours.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('tours.description')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border-2 border-tunisia-gold/20 shadow-elegant">
              <MapPin className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-tunisia-blue">{t('tours.customTitle')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('tours.customDescription')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open(generateWhatsAppLink('21628602147', t('tours.whatsappMessage')), '_blank')}
                  className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('tours.whatsappTours')}
                </Button>
                
                <Button
                  onClick={() => window.open(generateEmailLink(), '_blank')}
                  variant="outline"
                  className="border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t('tours.emailTours')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{t('whyChooseUs.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('whyChooseUs.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-tunisia-blue">{t('whyChooseUs.reliability')}</h3>
              <p className="text-muted-foreground">{t('whyChooseUs.reliabilityDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-tunisia-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-tunisia-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-tunisia-blue">{t('whyChooseUs.experience')}</h3>
              <p className="text-muted-foreground">{t('whyChooseUs.experienceDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-tunisia-blue rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-tunisia-blue">{t('whyChooseUs.multilingual')}</h3>
              <p className="text-muted-foreground">{t('whyChooseUs.multilingualDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-tunisia-coral rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-tunisia-blue">{t('whyChooseUs.availability')}</h3>
              <p className="text-muted-foreground">{t('whyChooseUs.availabilityDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Contact & Footer */}
      <footer className="py-16 bg-tunisia-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Tunisia Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.tunisiaContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+216 28 602 147</span>
                </div>
                <Button
                  onClick={() => window.open(generateWhatsAppLink('21628602147', t('footer.whatsappMessage')), '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Tunisia
                </Button>
              </div>
            </div>

            {/* UK Contact */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.ukContact')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+44 7956 643662</span>
                </div>
                <Button
                  onClick={() => window.open(generateWhatsAppLink('447956643662', t('footer.whatsappMessage')), '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp UK
                </Button>
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.email')}</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open('mailto:bolbebakhila@gmail.com', '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  bolbebakhila@gmail.com
                </Button>
                <Button
                  onClick={() => window.open('mailto:khilas@gmail.com', '_blank')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-tunisia-gold hover:bg-white/10 p-0 h-auto font-normal justify-start"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  khilas@gmail.com
                </Button>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-tunisia-gold">{t('footer.payment')}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Revolut</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>PayPal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{t('footer.cashPayment')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="text-center space-y-4">
              <p className="text-tunisia-gold font-medium">
                {t('footer.serviceDescription')}
              </p>
              <p className="text-white/80">
                {t('footer.pricingNote')}
              </p>
              <p className="text-sm text-white/60">
                © 2024 Tunisia Taxi & Tours. {t('footer.allRightsReserved')}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <Button
          onClick={() => window.open(generateWhatsAppLink('21628602147', t('hero.whatsappMessage')), '_blank')}
          className="w-full bg-tunisia-coral hover:bg-tunisia-coral/90 text-white shadow-lg"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {t('footer.quickContact')}
        </Button>
      </div>
    </div>
  );
}