import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const airports = [
  { code: 'NBE', name: 'Enfidha' },
  { code: 'TUN', name: 'Tunis' },
  { code: 'MIR', name: 'Monastir' },
  { code: 'DJE', name: 'Djerba' }
];

const destinations = [
  'Hammamet', 'Sousse', 'Tunis', 'Sfax', 'Monastir', 'Mahdia', 'Kairouan',
  'Tozeur', 'Gafsa', 'Gabes', 'Medenine', 'Tataouine', 'Bizerte', 'Nabeul', 'Other'
];

const vehicleTypes = ['Standard', 'Minivan', 'VIP'];
const bagTypes = ['Small', 'Medium', 'Large'];

const BookingForm = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromAirport: '',
    destination: '',
    customDestination: '',
    pickupDate: '',
    pickupTime: '',
    flightNumber: '',
    tripType: 'one-way',
    returnDate: '',
    passengers: '1',
    bags: 'Medium',
    childSeats: '0',
    vehicleType: 'Standard',
    notes: '',
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error("Please accept the cancellation policy");
      return;
    }
    
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setIsSubmitted(true);
    toast.success(t('booking.success').replace('{{ID}}', bookingId));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-tunisia-blue mb-4">Booking Submitted!</h3>
          <p className="text-muted-foreground">
            {t('booking.success').replace('{{ID}}', 'GT-' + Math.random().toString(36).substr(2, 9).toUpperCase())}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id="booking">
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{t('booking.title')}</CardTitle>
        <CardDescription>{t('booking.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('booking.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('booking.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('booking.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="min-h-[48px]"
            />
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('booking.from_airport')}</Label>
              <Select value={formData.fromAirport} onValueChange={(value) => handleInputChange('fromAirport', value)} required>
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem key={airport.code} value={airport.code}>
                      {airport.name} ({airport.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('booking.destination')}</Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)} required>
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.destination === 'Other' && (
            <div className="space-y-2">
              <Label htmlFor="customDestination">Custom Destination</Label>
              <Input
                id="customDestination"
                value={formData.customDestination}
                onChange={(e) => handleInputChange('customDestination', e.target.value)}
                placeholder="Enter your destination"
                required
                className="min-h-[48px]"
              />
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">Pickup Date</Label>
              <Input
                id="pickupDate"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupTime">Pickup Time</Label>
              <Input
                id="pickupTime"
                type="time"
                value={formData.pickupTime}
                onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flightNumber">{t('booking.flight_number')}</Label>
            <Input
              id="flightNumber"
              value={formData.flightNumber}
              onChange={(e) => handleInputChange('flightNumber', e.target.value)}
              placeholder="e.g. TU123"
              className="min-h-[48px]"
            />
          </div>

          {/* Trip Type */}
          <div className="space-y-3">
            <Label>Trip Type</Label>
            <RadioGroup 
              value={formData.tripType} 
              onValueChange={(value) => handleInputChange('tripType', value)}
              className={`flex gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way">{t('booking.one_way')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="return" id="return" />
                <Label htmlFor="return">{t('booking.return')}</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.tripType === 'return' && (
            <div className="space-y-2">
              <Label htmlFor="returnDate">Return Date</Label>
              <Input
                id="returnDate"
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                required
                className="min-h-[48px]"
              />
            </div>
          )}

          {/* Passengers & Luggage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t('booking.passengers')} (1-8)</Label>
              <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('booking.bags')}</Label>
              <Select value={formData.bags} onValueChange={(value) => handleInputChange('bags', value)}>
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bagTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t('booking.child_seats')} (0-3)</Label>
              <Select value={formData.childSeats} onValueChange={(value) => handleInputChange('childSeats', value)}>
                <SelectTrigger className="min-h-[48px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('booking.vehicle_type')}</Label>
            <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
              <SelectTrigger className="min-h-[48px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('booking.notes')}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any special requests or additional information..."
              className="min-h-[80px]"
            />
          </div>

          {/* Consent */}
          <div className={`flex items-start space-x-2 ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => handleInputChange('consent', !!checked)}
              className="mt-1"
            />
            <Label htmlFor="consent" className="text-sm leading-relaxed">
              {t('booking.consent')}
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full min-h-[48px] bg-tunisia-coral hover:bg-tunisia-coral/90 text-white font-semibold"
            disabled={!formData.consent}
          >
            {t('booking.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;