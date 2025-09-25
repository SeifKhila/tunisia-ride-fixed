import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, MapPin, Calculator, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PaymentDeposit from "@/components/PaymentDeposit";
import { toast } from "sonner";

interface Location {
  id: string;
  name: string;
  type: 'airport' | 'city';
}

interface RoutePrice {
  from: string;
  to: string;
  price: number;
}

const locations: Location[] = [
  { id: 'monastir-airport', name: 'Monastir Airport', type: 'airport' },
  { id: 'enfidha-airport', name: 'Enfidha Airport', type: 'airport' },
  { id: 'tunis-airport', name: 'Tunis-Carthage Airport', type: 'airport' },
  { id: 'sousse', name: 'Sousse', type: 'city' },
  { id: 'hammamet', name: 'Hammamet', type: 'city' },
  { id: 'yasmine-hammamet', name: 'Yasmine Hammamet', type: 'city' },
  { id: 'mahdia', name: 'Mahdia', type: 'city' },
  { id: 'monastir', name: 'Monastir', type: 'city' },
];

const routePrices: RoutePrice[] = [
  // From Monastir Airport
  { from: 'monastir-airport', to: 'sousse', price: 70 },
  { from: 'monastir-airport', to: 'hammamet', price: 170 },
  { from: 'monastir-airport', to: 'yasmine-hammamet', price: 150 },
  { from: 'monastir-airport', to: 'mahdia', price: 90 },
  { from: 'monastir-airport', to: 'monastir', price: 25 },
  
  // From Enfidha Airport
  { from: 'enfidha-airport', to: 'hammamet', price: 120 },
  { from: 'enfidha-airport', to: 'yasmine-hammamet', price: 110 },
  { from: 'enfidha-airport', to: 'sousse', price: 120 },
  { from: 'enfidha-airport', to: 'monastir', price: 150 },
  { from: 'enfidha-airport', to: 'mahdia', price: 180 },
  
  // From Tunis Airport
  { from: 'tunis-airport', to: 'hammamet', price: 130 },
  { from: 'tunis-airport', to: 'yasmine-hammamet', price: 140 },
  { from: 'tunis-airport', to: 'sousse', price: 140 },
  { from: 'tunis-airport', to: 'monastir', price: 180 },
  { from: 'tunis-airport', to: 'mahdia', price: 200 },
  
  // Reverse routes (same prices)
  { from: 'sousse', to: 'monastir-airport', price: 70 },
  { from: 'hammamet', to: 'monastir-airport', price: 170 },
  { from: 'yasmine-hammamet', to: 'monastir-airport', price: 150 },
  { from: 'mahdia', to: 'monastir-airport', price: 90 },
  { from: 'monastir', to: 'monastir-airport', price: 25 },
  
  { from: 'hammamet', to: 'enfidha-airport', price: 120 },
  { from: 'yasmine-hammamet', to: 'enfidha-airport', price: 110 },
  { from: 'sousse', to: 'enfidha-airport', price: 120 },
  { from: 'monastir', to: 'enfidha-airport', price: 150 },
  { from: 'mahdia', to: 'enfidha-airport', price: 180 },
  
  { from: 'hammamet', to: 'tunis-airport', price: 130 },
  { from: 'yasmine-hammamet', to: 'tunis-airport', price: 140 },
  { from: 'sousse', to: 'tunis-airport', price: 140 },
  { from: 'monastir', to: 'tunis-airport', price: 180 },
  { from: 'mahdia', to: 'tunis-airport', price: 200 },
];

export default function BookingCalculator() {
  const { t } = useLanguage();
  const [pickup, setPickup] = useState<string>('');
  const [dropoff, setDropoff] = useState<string>('');
  const [customDestination, setCustomDestination] = useState<string>('');
  const [isReturn, setIsReturn] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [selectedTripType, setSelectedTripType] = useState<'oneway' | 'return'>('oneway');

  const getPrice = (from: string, to: string): number => {
    const route = routePrices.find(r => r.from === from && r.to === to);
    return route ? route.price : 0;
  };

  const calculatePrice = () => {
    if (!pickup || !dropoff) return { oneWay: 0, return: 0, savings: 0 };
    
    const oneWayPrice = getPrice(pickup, dropoff);
    const returnPrice = oneWayPrice * 2;
    const discountedReturn = returnPrice * 0.9; // 10% discount
    const savings = returnPrice - discountedReturn;
    
    return {
      oneWay: oneWayPrice,
      return: discountedReturn,
      savings: savings
    };
  };

  const handleBooking = (tripType: 'oneway' | 'return') => {
    setSelectedTripType(tripType);
    setShowContactOptions(true);
  };

  const generateBookingMessage = (tripType: 'oneway' | 'return') => {
    const pickupLoc = locations.find(l => l.id === pickup);
    const dropoffLoc = locations.find(l => l.id === dropoff);
    const fromName = pickupLoc?.name || pickup;
    const toName = dropoff === 'custom' ? customDestination : (dropoffLoc?.name || dropoff);
    const currentPricing = calculatePrice();
    const price = tripType === 'oneway' ? currentPricing.oneWay : Math.round(currentPricing.return);
    const discount = tripType === 'return' ? ' (10% discount applied)' : '';
    
    if (dropoff === 'custom') {
      return `Hi! I want to book a ${tripType === 'oneway' ? 'one-way' : 'return'} transfer from ${fromName} to ${toName}. Please provide a quote.`;
    }
    
    return `Hi! I want to book a ${tripType === 'oneway' ? 'one-way' : 'return'} transfer from ${fromName} to ${toName}. Price: ${price} TND${discount}. Please confirm availability.`;
  };

  const generateEmailLink = (tripType: 'oneway' | 'return') => {
    const subject = encodeURIComponent(`Tunisia Transfer Booking - ${tripType === 'oneway' ? 'One Way' : 'Return'}`);
    const body = encodeURIComponent(generateBookingMessage(tripType));
    return `mailto:info@get-tunisia-transfer.com?subject=${subject}&body=${body}`;
  };

  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  const handleCalculate = () => {
    if (pickup && (dropoff && dropoff !== 'custom' || dropoff === 'custom' && customDestination)) {
      setShowResult(true);
    }
  };

  const pricing = calculatePrice();
  const pickupLocation = locations.find(l => l.id === pickup);
  const dropoffLocation = locations.find(l => l.id === dropoff);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Book Your Transfer</h2>
          <p className="text-muted-foreground text-lg">Calculate prices and book your private transfer</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border border-tunisia-gold/20 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-center text-tunisia-blue flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                Transfer Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Selectors */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-tunisia-coral" />
                    Pick-up Location
                  </label>
                  <Select value={pickup} onValueChange={setPickup}>
                    <SelectTrigger className="border-tunisia-gold/20 focus:ring-2 focus:ring-tunisia-blue/50 min-h-[48px]" aria-label="Select pickup location">
                      <SelectValue placeholder="Select pick-up location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-tunisia-gold/20 shadow-lg z-50">
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id} className="hover:bg-tunisia-blue/10 focus:bg-tunisia-blue/10">
                          <span className="flex items-center gap-2">
                            {location.type === 'airport' ? '✈️' : '🏨'} {location.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSwapLocations}
                    className="text-tunisia-blue hover:text-tunisia-coral"
                    disabled={!pickup || !dropoff}
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-tunisia-blue" />
                    Drop-off Location
                  </label>
                  <Select value={dropoff} onValueChange={setDropoff}>
                    <SelectTrigger className="border-tunisia-gold/20 focus:ring-2 focus:ring-tunisia-blue/50 min-h-[48px]" aria-label="Select drop-off location">
                      <SelectValue placeholder="Select drop-off location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-tunisia-gold/20 shadow-lg z-50">
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id} className="hover:bg-tunisia-blue/10 focus:bg-tunisia-blue/10">
                          <span className="flex items-center gap-2">
                            {location.type === 'airport' ? '✈️' : '🏨'} {location.name}
                          </span>
                        </SelectItem>
                      ))}
                      <SelectItem value="custom" className="hover:bg-tunisia-blue/10 focus:bg-tunisia-blue/10">
                        <span className="flex items-center gap-2">
                          🏨 Custom Destination
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>

                {/* Custom Destination Input */}
                {dropoff === 'custom' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-tunisia-coral" />
                      Specify Your Destination
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Hotel Name, Specific Address in Hammamet/Sousse..."
                      value={customDestination}
                      onChange={(e) => setCustomDestination(e.target.value)}
                      className="border-tunisia-gold/20 focus:ring-2 focus:ring-tunisia-blue/50 min-h-[48px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      For custom destinations, we'll provide a quote via WhatsApp
                    </p>
                  </div>
                )}

              {/* Calculate Button */}
              <Button 
                onClick={handleCalculate}
                disabled={!pickup || (!dropoff || (dropoff === 'custom' && !customDestination))}
                className="w-full bg-tunisia-blue hover:bg-tunisia-blue/90 text-white focus:outline-none focus:ring-4 focus:ring-tunisia-blue/50 focus:ring-offset-2 min-h-[48px]"
                aria-label="Calculate transfer price between selected locations"
              >
                {dropoff === 'custom' ? 'Get Custom Quote' : 'Calculate Price'}
              </Button>

              {/* Results */}
              {showResult && (dropoff === 'custom' || pricing.oneWay > 0) && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-tunisia-gold/20">
                  {dropoff === 'custom' ? (
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground mb-2">Custom Quote Request</h3>
                      <p className="text-sm text-muted-foreground">
                        {pickupLocation?.name} → {customDestination}
                      </p>
                      <p className="text-tunisia-blue font-medium mt-2">
                        We'll provide a custom quote via WhatsApp
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center">
                        <h3 className="font-semibold text-foreground mb-2">Transfer Pricing</h3>
                        <p className="text-sm text-muted-foreground">
                          {pickupLocation?.name} → {dropoffLocation?.name}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-background/50 rounded border">
                          <span className="text-foreground">One Way</span>
                          <span className="font-bold text-tunisia-blue text-lg">{pricing.oneWay} TND</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-background/50 rounded border border-tunisia-gold/30">
                          <div className="flex items-center gap-2">
                            <span className="text-foreground">Return Trip</span>
                            <Badge variant="secondary" className="bg-tunisia-coral/20 text-tunisia-coral text-xs">
                              10% OFF
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-tunisia-blue text-lg">{Math.round(pricing.return)} TND</div>
                            <div className="text-xs text-muted-foreground line-through">
                              {pricing.oneWay * 2} TND
                            </div>
                          </div>
                        </div>

                        <div className="text-center p-2 bg-tunisia-gold/10 rounded border border-tunisia-gold/30">
                          <p className="text-sm text-tunisia-coral font-medium">
                            💰 Save {Math.round(pricing.savings)} TND with return booking!
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Payment Deposit Section */}
                  <div className="mt-6">
                    <PaymentDeposit 
                      totalFareEUR={dropoff === 'custom' ? 50 : pricing.oneWay}
                      onPaymentInitiated={(method, amount, currency) => {
                        toast.success(`Payment initiated via ${method} for ${amount} ${currency}`);
                      }}
                    />
                  </div>

                  {/* Contact Options Modal */}
                  {showContactOptions && (
                    <div className="space-y-4 p-4 bg-white/95 rounded-lg border border-tunisia-blue/20 shadow-lg">
                      <h4 className="font-semibold text-tunisia-blue text-center">Choose Contact Method</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        {selectedTripType === 'oneway' ? 'One-Way' : 'Return'} Transfer: {pickupLocation?.name} → {dropoffLocation?.name}
                      </p>
                      <p className="text-center font-bold text-tunisia-blue">
                        Price: {selectedTripType === 'oneway' ? pricing.oneWay : Math.round(pricing.return)} TND
                        {selectedTripType === 'return' && <span className="text-tunisia-coral text-sm"> (10% OFF)</span>}
                      </p>
                      
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            window.location.href = `https://wa.me/21628602147?text=${encodeURIComponent(generateBookingMessage(selectedTripType))}`;
                            setShowContactOptions(false);
                          }}
                          className="bg-tunisia-coral hover:bg-tunisia-coral/90 text-white"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp Tunisia (+216 28 602 147)
                        </Button>
                        
                        <Button
                          onClick={() => {
                            window.location.href = `https://wa.me/447956643662?text=${encodeURIComponent(generateBookingMessage(selectedTripType))}`;
                            setShowContactOptions(false);
                          }}
                          variant="outline"
                          className="border-tunisia-coral text-tunisia-coral hover:bg-tunisia-coral/10"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp UK (+44 7956 643662)
                        </Button>
                        
                        <Button
                          onClick={() => {
                            window.open(generateEmailLink(selectedTripType), '_blank');
                            setShowContactOptions(false);
                          }}
                          variant="outline"
                          className="border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue/10"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Email Quote
                        </Button>
                        
                        <Button
                          onClick={() => setShowContactOptions(false)}
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-2">
                    <Button 
                      onClick={() => handleBooking('oneway')}
                      className="flex-1 bg-tunisia-coral hover:bg-tunisia-coral/90 text-white focus:outline-none focus:ring-4 focus:ring-tunisia-coral/50 focus:ring-offset-2 min-h-[48px]"
                      aria-label="Book one way transfer - Choose contact method"
                    >
                      Book One Way Transfer
                    </Button>
                    <Button 
                      onClick={() => handleBooking('return')}
                      className="flex-1 bg-tunisia-gold hover:bg-tunisia-gold/90 text-white focus:outline-none focus:ring-4 focus:ring-tunisia-gold/50 focus:ring-offset-2 min-h-[48px]"
                      aria-label="Book return transfer with 10% discount - Choose contact method"
                    >
                      Book Return Transfer (Save 10%)
                    </Button>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="space-y-2 text-center text-sm text-muted-foreground">
                <p>• Prices are per car (up to 4 passengers)</p>
                <p>• For vans/minibuses, contact us on WhatsApp</p>
                <p>• Free waiting time: 60 minutes at airports</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}