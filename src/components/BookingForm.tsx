import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Copy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import PaymentDeposit from "@/components/PaymentDeposit";
import { validateBookingMessage, bookingReferenceSchema } from "@/lib/validation";

const BookingForm = () => {
  const { t, language } = useLanguage();
  const [bookingReference, setBookingReference] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  // Generate booking reference on component mount
  useEffect(() => {
    const today = new Date();
    const date = today.getFullYear().toString() + 
                (today.getMonth() + 1).toString().padStart(2, '0') + 
                today.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 99) + 1;
    const reference = `GT-${date}-${random.toString().padStart(2, '0')}`;
    setBookingReference(reference);
  }, []);

  // Simple click tracking
  const trackClick = (action: string) => {
    try {
      const counts = JSON.parse(localStorage.getItem('contactClicks') || '{}');
      counts[action] = (counts[action] || 0) + 1;
      localStorage.setItem('contactClicks', JSON.stringify(counts));
    } catch (e) {
      console.log('Click tracking failed:', e);
    }
  };

  const copyReference = () => {
    navigator.clipboard.writeText(bookingReference);
    toast.success("Booking reference copied to clipboard!");
  };

  const getBookingMessage = () => {
    // Validate booking reference first
    const referenceValidation = bookingReferenceSchema.safeParse(bookingReference);
    const safeReference = referenceValidation.success ? bookingReference : 'PENDING';
    
    let message: string;
    switch(language) {
      case 'fr':
        message = `Bonjour Get Tunisia Transfer 👋
Je souhaite réserver un transfert :
• Nom :
• Lieu de prise en charge :
• Destination :
• Date/Heure :
• Passagers/Bagages :
• Numéro de vol :
• Remarques :
Réf réservation : ${safeReference}`;
        break;
      case 'ar':
        message = `مرحباً Get Tunisia Transfer 👋
أرغب في حجز نقل:
• الاسم:
• موقع الانطلاق:
• الوجهة:
• التاريخ/الوقت:
• عدد الركاب/الأمتعة:
• رقم الرحلة:
• ملاحظات:
رقم الحجز: ${safeReference}`;
        break;
      default:
        message = `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:
Booking Ref: ${safeReference}`;
    }
    
    // Validate and sanitize the message
    const validation = validateBookingMessage(message);
    if (!validation.isValid) {
      console.error('Invalid booking message:', validation.error);
      return 'Hi Get Tunisia Transfer - I would like to book a transfer. Please contact me.';
    }
    
    return message;
  };

  const handleWhatsAppClick = () => {
    setShowPayment(true);
  };

  const handleEmailClick = () => {
    setShowPayment(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className={`${language === 'ar' ? 'font-arabic text-right' : ''}`} id="booking">
        <CardHeader>
          <CardTitle className="text-2xl text-tunisia-blue">{t('booking.title')}</CardTitle>
          <CardDescription>{t('booking.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Reference Display */}
          <div className="p-4 bg-tunisia-blue/5 rounded-lg border border-tunisia-blue/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-tunisia-blue">Your Booking Reference:</span>
              <Button
                onClick={copyReference}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Copy booking reference"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="font-mono text-lg font-bold text-tunisia-blue">{bookingReference}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Copy this reference for your payment
            </p>
          </div>

          {/* Deposit Information */}
          <div className="p-4 bg-gradient-to-r from-tunisia-turquoise/10 to-tunisia-coral/10 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2 text-center">
              To confirm your ride, please pay a 25% deposit online. Balance due to the driver at pickup.
            </p>
          </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <a 
            href={`https://wa.me/447956643662?text=${encodeURIComponent(getBookingMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            onClick={handleWhatsAppClick}
          >
            <Button
              className="w-full min-h-[56px] bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg"
            >
              <MessageCircle className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
              Book via WhatsApp
            </Button>
          </a>
          
          <a
            href={`mailto:khilas592@gmail.com?subject=${encodeURIComponent("New Booking Enquiry – Get Tunisia Transfer")}&body=${encodeURIComponent(getBookingMessage())}`}
            className="block w-full"
            onClick={handleEmailClick}
          >
            <Button
              variant="outline"
              className="w-full min-h-[56px] text-lg border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
            >
              <Mail className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
              Book via Email
            </Button>
          </a>
        </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded">
            {t('privacy.note')}
          </div>
        </CardContent>
      </Card>

      {/* Payment Deposit Section - Always visible */}
      <PaymentDeposit 
        totalFareEUR={35}
        onPaymentInitiated={(method, amount, currency) => {
          trackClick(`${method} Pay`);
          toast.success(`Payment initiated via ${method} for ${amount} ${currency}`);
        }}
      />
    </div>
  );
};

export default BookingForm;