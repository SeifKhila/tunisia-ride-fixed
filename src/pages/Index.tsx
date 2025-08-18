import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, MapPin, Shield, Clock, Users, Star, Phone, CreditCard } from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";
import FAQ from "@/components/FAQ";
import heroImage from "@/assets/tunisia-hero.jpg";

const Index = () => {
  const generateWhatsAppLink = (phoneNumber: string, message: string) => {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const generateEmailLink = () => {
    return "mailto:khilas592@gmail.com,bolbebakhila@gmail.com?subject=Transfer%20Quote&body=Hello%20Affordable%20Taxi!%0A%0AI%E2%80%99d%20like%20to%20book:%0AFROM:%20{Airport}%0ATO:%20{Destination%20Area}%0ADate:%20{DD/MM/YYYY}%0ATime:%20{HH:MM}%0APassengers:%20{#}%0ALuggage:%20{#}%0AChild%20seats:%20{Yes/No}%0AName:%20{Name}%0A%0APlease%20confirm%20price%20and%20availability.";
  };

  const tourMessage = "Hello Affordable Taxi! I'm interested in tours across Tunisia. Dates: {...}, People: {...}, Interests: {...}. Please send me information and pricing.";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Affordable Taxi – Fixed-Price Airport Transfers in Tunisia
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transparent prices. Reliable drivers. WhatsApp us for instant quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3">
              <a
                href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi! I'd like to get a quote for airport transfer.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle size={24} />
                WhatsApp Quote (TN)
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3">
              <a
                href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi! I'd like to get a quote for airport transfer.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle size={24} />
                WhatsApp Quote (UK)
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="font-semibold px-8 py-3">
              <a href={generateEmailLink()} className="flex items-center gap-2">
                <Mail size={24} />
                Email Quote
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <PriceCalculator />

      {/* How Booking Works */}
      <section id="booking-process" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">How Booking Works</h2>
            <p className="text-xl text-muted-foreground">Simple, fast, and reliable booking process</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="text-primary-foreground" size={32} />
                </div>
                <CardTitle className="text-xl">1. Choose & Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Choose your route and click WhatsApp or Email to send us your booking request with all details.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">2. We Confirm</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We confirm availability and send you driver details, car information, and payment instructions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-tunisia-sand rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="text-foreground" size={32} />
                </div>
                <CardTitle className="text-xl">3. Pay & Travel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Pay 30% deposit via Revolut or PayPal. Pay balance to driver on pickup. Free cancellation up to 48 hours.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section id="tours" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Tours Across Tunisia</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the beauty of Tunisia with our private tour services. From ancient ruins to stunning coastlines, 
              we'll create the perfect itinerary for your adventure.
            </p>
          </div>
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3">
                <a
                  href={generateWhatsAppLink("21628602147", tourMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={24} />
                  WhatsApp Tours (TN)
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3">
                <a
                  href={generateWhatsAppLink("447956643662", tourMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={24} />
                  WhatsApp Tours (UK)
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="px-8 py-3">
                <a 
                  href="mailto:khilas592@gmail.com,bolbebakhila@gmail.com?subject=Tour%20Enquiry&body=Hello%20Affordable%20Taxi!%0A%0AI'm%20interested%20in%20tours%20across%20Tunisia.%0ADates:%20{...}%0APeople:%20{...}%0AInterests:%20{...}%0A%0APlease%20send%20me%20information%20and%20pricing."
                  className="flex items-center gap-2"
                >
                  <Mail size={24} />
                  Email Tours
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Affordable Taxi</h2>
            <p className="text-xl text-muted-foreground">Your trusted partner for Tunisia travels</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Star className="text-primary-foreground" size={24} />
                  </div>
                  <CardTitle className="text-lg">Fixed Transparent Prices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  No hidden fees, no surprises. Our fixed prices include taxes and tolls.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Users className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-lg">Vetted Drivers & Clean Cars</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Professional, experienced drivers with well-maintained, comfortable vehicles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-tunisia-sand rounded-lg flex items-center justify-center">
                    <MessageCircle className="text-foreground" size={24} />
                  </div>
                  <CardTitle className="text-lg">Instant WhatsApp Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Quick responses and real-time communication for all your travel needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Shield className="text-primary-foreground" size={24} />
                  </div>
                  <CardTitle className="text-lg">Child Seats on Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Family-friendly service with child seats available upon request.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Clock className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-lg">Flight Monitoring & Meet-and-Greet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We track your flight and adjust for delays. Personal meet-and-greet service.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-tunisia-sand rounded-lg flex items-center justify-center">
                    <MapPin className="text-foreground" size={24} />
                  </div>
                  <CardTitle className="text-lg">All Tunisia Destinations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Service to any location in Tunisia. If it's not listed, just ask us!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Contact & Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Affordable Taxi Tunisia</h3>
              <p className="opacity-90 mb-4">
                Fixed prices, reliable drivers, and instant WhatsApp support for all your Tunisia travel needs.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Tunisia</h4>
              <div className="space-y-2">
                <a 
                  href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi!")}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={18} />
                  +216 28602147
                </a>
                <a 
                  href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi!")}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} />
                  WhatsApp (TN)
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact UK</h4>
              <div className="space-y-2">
                <a 
                  href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi!")}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone size={18} />
                  +44 7956 643662
                </a>
                <a 
                  href={generateWhatsAppLink("447956643662", "Hello Affordable Taxi!")}
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} />
                  WhatsApp (UK)
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Email & Payment</h4>
              <div className="space-y-2">
                <a 
                  href="mailto:khilas592@gmail.com,bolbebakhila@gmail.com"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Mail size={18} />
                  Email Us
                </a>
                <div className="flex items-center gap-2 opacity-90">
                  <CreditCard size={18} />
                  Revolut, PayPal
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Payment Information</p>
              <p className="opacity-90">
                Pay 30% deposit via Revolut or PayPal after confirmation. Balance to driver on pickup.
              </p>
            </div>
            
            <div className="space-y-2 text-sm opacity-75">
              <p>Affordable Taxi is a Tunisia-wide airport transfer and tours service.</p>
              <p>Fixed prices, friendly drivers, and instant WhatsApp support.</p>
              <p>If your destination isn't listed, message us your pickup & drop-off, dates and times—we'll send you the best price.</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-primary-foreground/20">
              <p className="text-sm opacity-75">
                Prices include taxes and tolls. Night/holiday surcharges not applied to listed fixed prices.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <div className="flex gap-2">
          <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90 shadow-tunisia">
            <a
              href={generateWhatsAppLink("21628602147", "Hello Affordable Taxi! I need a transfer quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="flex-1 shadow-tunisia">
            <a href={generateEmailLink()} className="flex items-center justify-center gap-2">
              <Mail size={20} />
              Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
