import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import DriverForm from "@/components/DriverForm";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import InteractiveCurrencyConverter from "@/components/InteractiveCurrencyConverter";
import FAQ from "@/components/FAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Mail, MessageCircle, MapPin, Users, Shield, Clock } from "lucide-react";
import tunisiaHero from "@/assets/tunisia-hero-new.jpg";

const Index = () => {
  const { t, language } = useLanguage();

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/447956643662?text=${encodedMessage}`;
  };

  const generateEmailLink = (subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:khilas592@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const topRoutes = [
    { from: 'Enfidha', to: 'Hammamet', price: '160 TND', route: 'Enfidha → Hammamet' },
    { from: 'Tunis', to: 'Hammamet', price: '180 TND', route: 'Tunis → Hammamet' },
    { from: 'Monastir', to: 'Sousse', price: '80 TND', route: 'Monastir → Sousse' },
    { from: 'Djerba', to: 'Midoun', price: '100 TND', route: 'Djerba → Midoun' }
  ];

  const excursions = [
    { name: 'Hammamet → Sidi Bou Said', duration: 'half-day', price: '200 TND' },
    { name: 'Hammamet/Yasmine → Tunis Carthage + Medina', duration: 'full-day', price: '220 TND' },
    { name: 'Yasmine Hammamet → El Jem Amphitheatre', duration: 'full-day', price: '500 TND' },
    { name: 'Sousse → Kairouan Historical Tour', duration: '', price: '350 TND' },
    { name: 'Monastir → Sousse + Monastir City Tour', duration: '', price: '140 TND' },
    { name: 'El Jem → City & Amphitheatre Tour', duration: 'half-day', price: '100 TND' }
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-arabic' : ''} ${language === 'ar' ? 'dir-rtl' : 'dir-ltr'}`}>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-tunisia-coral text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-tunisia-coral"
      >
        Skip to main content
      </a>
      
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: `url(${tunisiaHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="banner"
        aria-label="Hero section with booking information"
      >
        {/* Gradient Overlay - Tunisia's teal/blue coastal colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-tunisia-blue/70 via-tunisia-turquoise/60 to-tunisia-coral/50" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-tunisia-gold/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-tunisia-coral/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-tunisia-sand/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" id="main-content">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-fade-in">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* Primary CTA Buttons */}
          <div className={`flex flex-col md:flex-row gap-6 mb-8 justify-center items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <Button 
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              variant="cta"
              className="min-w-[200px] min-h-[56px] text-lg"
              aria-label="Get the best quote for your transfer"
            >
              {t('hero.get_quote')}
            </Button>
            
            <Button 
              onClick={() => document.getElementById('driver')?.scrollIntoView({ behavior: 'smooth' })}
              variant="alt"
              className="min-w-[200px] min-h-[56px] text-lg"
              aria-label="Apply to become a driver"
            >
              {t('hero.become_driver')}
            </Button>
          </div>
          
          {/* Secondary Buttons */}
          <div className={`flex flex-col md:flex-row gap-4 mb-12 justify-center items-center ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <Button 
              onClick={() => window.open(generateWhatsAppLink('Hi I want to book a Tunisia airport transfer from [Airport] to [Destination] on [Date] for [Passengers]'))}
              variant="cta"
              className="min-w-[180px] min-h-[48px] bg-white/10 backdrop-blur-sm border-white/20"
              aria-label="Book via WhatsApp"
            >
              <MessageCircle className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t('hero.book_whatsapp')}
            </Button>
            
            <Button 
              onClick={() => window.open(generateEmailLink('Tunisia Airport Transfer Booking', 'Hello, I\'d like to book a transfer from [Airport] to [Destination] on [Date] for [Passengers].'))}
              variant="cta"
              className="min-w-[180px] min-h-[48px] bg-white/10 backdrop-blur-sm border-white/20"
              aria-label="Book via Email"
            >
              <Mail className={`${language === 'ar' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t('hero.book_email')}
            </Button>
          </div>
          
          {/* Trust Badges */}
          <p className="text-lg text-white/90 mb-8">{t('hero.trust_badges')}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        {/* Booking Section */}
        <section className="space-y-8">
          <BookingForm />
        </section>

        {/* How It Works Section */}
        <section className="text-center space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('how_it_works.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step1')}
                </h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step2')}
                </h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-xl font-semibold text-tunisia-blue mb-2">
                  {t('how_it_works.step3')}
                </h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Price Guarantee Section */}
        <section className="text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('guarantee.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('guarantee.content')}
            </p>
          </div>
        </section>

        {/* Top Routes Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              Top Routes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRoutes.map((route, index) => (
              <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-tunisia-coral" />
                    <span className="font-semibold">{route.route}</span>
                  </div>
                  <div className="text-2xl font-bold text-tunisia-blue mb-3">{route.price}</div>
                  <p className="text-sm text-muted-foreground mb-3">{t('routes.guarantee')}</p>
                  <Button
                    onClick={() => window.open(generateWhatsAppLink(`Hi, I want to book ${route.route} transfer`))}
                    variant="cta"
                    className="w-full min-h-[48px]"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('why_choose.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.ontime')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.vetted')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.family')}</h3>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 text-tunisia-coral mx-auto mb-4" />
                <h3 className="font-semibold text-tunisia-blue mb-2">{t('why_choose.support')}</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Special Requests & Excursions Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('excursions.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
              {t('excursions.subtitle')}
            </p>
            <Button
              onClick={() => window.open('https://wa.me/447956643662?text=Hi%20I%20want%20to%20plan%20a%20tour%20in%20Tunisia')}
              variant="cta"
              className="min-h-[48px] mb-12"
            >
              {t('excursions.plan_button')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {excursions.map((excursion, index) => (
              <Card key={index} className="border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-tunisia-blue mb-2">{excursion.name}</h3>
                  {excursion.duration && (
                    <p className="text-sm text-muted-foreground mb-2">({excursion.duration})</p>
                  )}
                  <div className="text-xl font-bold text-tunisia-coral mb-3">{excursion.price}</div>
                  <p className="text-xs text-muted-foreground mb-4">{t('excursions.custom_note')}</p>
                  <Button
                    onClick={() => window.open(generateWhatsAppLink(`Hi, I want to book ${excursion.name} excursion`))}
                    variant="cta"
                    className="w-full min-h-[42px]"
                  >
                    Book Tour
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Happy Customers Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tunisia-blue mb-4">
              {t('testimonials.title')}
            </h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${language === 'ar' ? 'md:grid-flow-col-reverse' : ''}`}>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👤</div>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-muted-foreground italic">{t('testimonials.1')}</p>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👤</div>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-muted-foreground italic">{t('testimonials.2')}</p>
              </CardContent>
            </Card>
            <Card className="text-center border-tunisia-blue/20 hover:shadow-tunisia transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👤</div>
                <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
                <p className="text-muted-foreground italic">{t('testimonials.3')}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Live Currency Exchange */}
        <section className="space-y-8">
          <InteractiveCurrencyConverter />
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <FAQ />
        </section>

        {/* Driver Recruitment CTA */}
        <section className="text-center space-y-8">
          <Card className="bg-gradient-hero text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('driver_recruitment.title')}
              </h2>
              <Button
                onClick={() => document.getElementById('driver')?.scrollIntoView({ behavior: 'smooth' })}
                variant="cta"
                className="bg-white/10 backdrop-blur-sm border-white/20 min-h-[48px]"
              >
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Driver Section */}
        <section className="space-y-8">
          <DriverForm />
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <footer className={`bg-tunisia-blue text-white py-8 ${language === 'ar' ? 'font-arabic' : ''}`}>
        <div className="container mx-auto px-4">
          <div className={`text-center ${language === 'ar' ? 'text-right' : ''}`}>
            {/* Contact UK */}
            <div className="space-y-4 mb-6">
              <div className={`flex items-center justify-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Phone className="h-5 w-5 text-tunisia-coral" />
                <a 
                  href="tel:+447956643662"
                  className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded text-lg"
                  aria-label="Call UK office"
                >
                  +44 7956 643 662
                </a>
              </div>
              <div className={`flex items-center justify-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <MessageCircle className="h-5 w-5 text-tunisia-coral" />
                <a 
                  href="https://wa.me/447956643662?text=Hi%20I%20want%20to%20book%20a%20Tunisia%20airport%20transfer"
                  className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded"
                  aria-label="Contact via WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
              <div className={`flex items-center justify-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-5 w-5 text-tunisia-coral" />
                <a 
                  href="mailto:info@get-tunisia-transfer.com"
                  className="hover:text-tunisia-gold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tunisia-gold rounded"
                  aria-label="Send email"
                >
                  info@get-tunisia-transfer.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-tunisia-sand/20 mt-6 pt-6 text-center">
            <p className="text-tunisia-sand/60 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
      
      {/* Sticky Quick Contact Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={() => window.open('https://wa.me/447956643662')}
          variant="cta"
          className="rounded-full p-4 shadow-glow animate-pulse"
          aria-label="Quick WhatsApp contact"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Quick Contact</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;