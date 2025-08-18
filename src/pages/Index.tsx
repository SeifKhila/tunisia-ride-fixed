import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, MapPin, Shield, Clock, Users, Star, Phone, CreditCard, Sun, Palmtree, Waves } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";
import FAQ from "@/components/FAQ";
import ExchangeRate from "@/components/ExchangeRate";
import heroImage from "@/assets/tunisia-real-beach1.jpg";
import coastalImage from "@/assets/tunisia-real-coastal.jpg";
import sunImage from "@/assets/tunisia-real-beach2.jpg";

const Index = () => {
  const generateWhatsAppLink = (phoneNumber: string, message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    return "mailto:khilas592@gmail.com,bolbebakhila@gmail.com?subject=Transfer%20Quote&body=Hello%20Affordable%20Taxi!%0A%0AI%E2%80%99d%20like%20to%20book:%0AFROM:%20{Airport}%0ATO:%20{Destination%20Area}%0ADate:%20{DD/MM/YYYY}%0ATime:%20{HH:MM}%0APassengers:%20{#}%0ALuggage:%20{#}%0AChild%20seats:%20{Yes/No}%0AName:%20{Name}%0A%0APlease%20confirm%20price%20and%20availability.";
  };

  const tourMessage = "Hello Affordable Taxi! I'm interested in tours across Tunisia. Dates: {...}, People: {...}, Interests: {...}. Please send me information and pricing.";

  return (
    <div className="min-h-screen bg-gradient-sand">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-float" 
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-tunisia-blue/50 via-transparent to-tunisia-turquoise/30 z-10"></div>
        
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
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-tunisia-gold to-white bg-clip-text text-transparent drop-shadow-2xl">
              Affordable Taxi Tunisia
            </h1>
            <div className="text-2xl md:text-3xl font-semibold mb-4 text-tunisia-gold drop-shadow-lg">
              Fixed-Price Airport Transfers
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed bg-black/20 backdrop-blur-sm rounded-2xl p-6">
            🌅 Transparent prices • 🏖️ Reliable drivers • 📱 WhatsApp us for instant quote
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-bold px-10 py-4 text-lg shadow-glow transform hover:scale-105 transition-all duration-300">
              <a
                href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi! I'd like to get a quote for airport transfer.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle size={28} />
                WhatsApp Tunisia
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/15 border-2 border-white text-white hover:bg-white hover:text-tunisia-blue font-bold px-10 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <a
                href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi! I'd like to get a quote for airport transfer.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle size={28} />
                WhatsApp UK
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue font-bold px-10 py-4 text-lg shadow-tunisia transform hover:scale-105 transition-all duration-300">
              <a href={generateEmailLink()} className="flex items-center gap-3">
                <Mail size={28} />
                Email Quote
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <PriceCalculator />

      {/* Exchange Rate Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              💱 Currency Exchange
            </h2>
            <p className="text-lg text-muted-foreground">
              Convert TND prices to your currency
            </p>
          </div>
          <ExchangeRate />
        </div>
      </section>

      {/* How Booking Works */}
      <section id="booking-process" className="py-20 bg-gradient-ocean relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center" 
          style={{ backgroundImage: `url(${coastalImage})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">How Booking Works</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">Simple, fast, and reliable booking process in paradise</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <Card className="text-center shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-gradient-sunset rounded-full flex items-center justify-center mb-6 shadow-glow animate-float">
                  <MessageCircle className="text-white" size={40} />
                </div>
                <CardTitle className="text-2xl text-tunisia-blue">1. Choose & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  🏖️ Choose your route and click WhatsApp or Email to send us your booking request with all details.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-tunisia-turquoise rounded-full flex items-center justify-center mb-6 shadow-glow animate-float" style={{ animationDelay: '1s' }}>
                  <Shield className="text-white" size={40} />
                </div>
                <CardTitle className="text-2xl text-tunisia-blue">2. We Confirm</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  ✨ We confirm availability and send you driver details, car information, and payment instructions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-tunisia-coral rounded-full flex items-center justify-center mb-6 shadow-glow animate-float" style={{ animationDelay: '2s' }}>
                  <CreditCard className="text-white" size={40} />
                </div>
                <CardTitle className="text-2xl text-tunisia-blue">3. Pay & Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  🌊 Pay 30% deposit via Revolut or PayPal. Pay balance to driver on pickup. Free cancellation up to 48 hours.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: `url(${sunImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-sunset opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">🌅 Tours Across Tunisia</h2>
            <p className="text-xl text-white/95 max-w-4xl mx-auto leading-relaxed bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              🏛️ Explore the beauty of Tunisia with our private tour services. From ancient ruins to stunning coastlines, 
              golden beaches to desert dunes - we'll create the perfect itinerary for your adventure in paradise.
            </p>
          </div>
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild size="lg" className="bg-white hover:bg-white/90 text-tunisia-coral font-bold px-10 py-4 text-lg shadow-glow transform hover:scale-105 transition-all duration-300">
                <a
                  href={generateWhatsAppLink("21628602147", tourMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Palmtree size={28} />
                  WhatsApp Tours (TN)
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-tunisia-coral font-bold px-10 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <a
                  href={generateWhatsAppLink("447956643662", tourMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Sun size={28} />
                  WhatsApp Tours (UK)
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue font-bold px-10 py-4 text-lg shadow-tunisia transform hover:scale-105 transition-all duration-300">
                <a 
                  href="mailto:khilas592@gmail.com,bolbebakhila@gmail.com?subject=Tour%20Enquiry&body=Hello%20Affordable%20Taxi!%0A%0AI'm%20interested%20in%20tours%20across%20Tunisia.%0ADates:%20{...}%0APeople:%20{...}%0AInterests:%20{...}%0A%0APlease%20send%20me%20information%20and%20pricing."
                  className="flex items-center gap-3"
                >
                  <Mail size={28} />
                  Email Tours
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" className="py-20 bg-gradient-sand relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center" 
          style={{ backgroundImage: `url(${coastalImage})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-tunisia-blue drop-shadow-sm">🌟 Why Choose Affordable Taxi</h2>
            <p className="text-xl text-tunisia-blue/80 max-w-2xl mx-auto">Your trusted partner for magical Tunisia travels</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-sunset rounded-xl flex items-center justify-center shadow-glow animate-float">
                    <Star className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">🎯 Fixed Transparent Prices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  💰 No hidden fees, no surprises. Our fixed prices include taxes and tolls - just pure transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-tunisia-turquoise rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '0.5s' }}>
                    <Users className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">🚗 Vetted Drivers & Clean Cars</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  ✨ Professional, experienced drivers with well-maintained, comfortable vehicles for your journey.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-tunisia-coral rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '1s' }}>
                    <MessageCircle className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">📱 Instant WhatsApp Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  ⚡ Quick responses and real-time communication for all your travel needs - we're always here.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-tunisia-gold rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '1.5s' }}>
                    <Shield className="text-tunisia-blue" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">👶 Child Seats on Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  👨‍👩‍👧‍👦 Family-friendly service with child seats available upon request for safe travels.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '2s' }}>
                    <Clock className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">✈️ Flight Monitoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  🛬 We track your flight and adjust for delays. Personal meet-and-greet service included.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-glow bg-gradient-card border-0 transform hover:scale-105 transition-all duration-300 hover:shadow-glow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-tunisia-palm rounded-xl flex items-center justify-center shadow-glow animate-float" style={{ animationDelay: '2.5s' }}>
                    <MapPin className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-xl text-tunisia-blue">🗺️ All Tunisia Destinations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed text-tunisia-blue/70">
                  🏖️ Service to any location in Tunisia. If it's not listed, just ask us - we go everywhere!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact & Footer */}
      <footer className="bg-gradient-hero text-white py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-tunisia-gold">🌊 Affordable Taxi Tunisia</h3>
              <p className="opacity-90 mb-6 text-lg leading-relaxed">
                Fixed prices, reliable drivers, and instant WhatsApp support for all your magical Tunisia travel adventures.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-tunisia-gold">📞 Contact Tunisia</h4>
              <div className="space-y-4">
                <a 
                  href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi!")}
                  className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 hover:text-tunisia-gold transform hover:translate-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} />
                  +216 28602147
                </a>
                <a 
                  href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi!")}
                  className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 hover:text-tunisia-gold transform hover:translate-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  WhatsApp (TN)
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-tunisia-gold">🇬🇧 Contact UK</h4>
              <div className="space-y-4">
                <a 
                  href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi!")}
                  className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 hover:text-tunisia-gold transform hover:translate-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={20} />
                  +44 7956 643662
                </a>
                <a 
                  href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi!")}
                  className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 hover:text-tunisia-gold transform hover:translate-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  WhatsApp (UK)
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-tunisia-gold">💳 Email & Payment</h4>
              <div className="space-y-4">
                <a 
                  href="mailto:khilas592@gmail.com,bolbebakhila@gmail.com"
                  className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-all duration-300 hover:text-tunisia-gold transform hover:translate-x-2"
                >
                  <Mail size={20} />
                  Email Us
                </a>
                <div className="flex items-center gap-3 opacity-90">
                  <CreditCard size={20} />
                  Revolut, PayPal
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-12 text-center">
            <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-2xl font-semibold mb-4 text-tunisia-gold">💰 Payment Information</p>
              <p className="opacity-90 text-lg">
                Pay 30% deposit via Revolut or PayPal after confirmation. Balance to driver on pickup.
              </p>
            </div>
            
            <div className="space-y-3 text-lg opacity-85 leading-relaxed">
              <p>🏖️ Affordable Taxi is a Tunisia-wide airport transfer and tours service.</p>
              <p>🌅 Fixed prices, friendly drivers, and instant WhatsApp support.</p>
              <p>🗺️ If your destination isn't listed, message us your pickup & drop-off, dates and times—we'll send you the best price.</p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="opacity-75 text-lg">
                ✨ Prices include taxes and tolls. Night/holiday surcharges not applied to listed fixed prices.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <div className="flex gap-3">
          <Button asChild size="lg" className="flex-1 bg-tunisia-coral hover:bg-tunisia-coral/90 shadow-glow font-bold transform hover:scale-105 transition-all duration-300">
            <a
              href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi! I need a transfer quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle size={24} />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="flex-1 bg-tunisia-gold hover:bg-tunisia-gold/90 text-tunisia-blue shadow-glow font-bold transform hover:scale-105 transition-all duration-300">
            <a href={generateEmailLink()} className="flex items-center justify-center gap-2">
              <Mail size={24} />
              Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
