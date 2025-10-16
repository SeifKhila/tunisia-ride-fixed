import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { validateBookingMessage } from "@/lib/validation";

interface ContactButtonsProps {
  // Component is now booking-only
}

const ContactButtons: React.FC<ContactButtonsProps> = () => {
  const { t, language } = useLanguage();

  const getValidatedMessage = () => {
    const message = `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:`;
    
    // Validate and sanitize the message
    const validation = validateBookingMessage(message);
    if (!validation.isValid) {
      console.error('Invalid contact message:', validation.error);
      return 'Hi Get Tunisia Transfer - I would like to book a transfer. Please contact me.';
    }
    
    return message;
  };

  const emailData = {
    subject: "New Booking Enquiry – Get Tunisia Transfer",
    body: `Hello, I'd like to book a transfer.

Name:
Pickup:
Drop-off:
Date/Time:
Pax/Bags:
Flight No:
Notes:`
  };

  const title = t('booking.title') || 'Book Your Transfer';
  const description = 'Get an instant quote and book your transfer directly via WhatsApp or email.';

  return (
    <Card className={`w-full max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id="booking">
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* WhatsApp Button (Primary) */}
        <a 
          href={`https://wa.me/21628602147?text=${encodeURIComponent(getValidatedMessage())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button 
            className="w-full min-h-[60px] bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg flex items-center justify-center gap-3"
            aria-label="Contact via WhatsApp for booking"
          >
            <MessageCircle className="h-6 w-6" />
            💬 WhatsApp us
          </Button>
        </a>

        {/* Email Button (Secondary) */}
        <a
          href={`mailto:khilas592@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`}
          className="block w-full"
        >
          <Button 
            variant="outline"
            className="w-full min-h-[56px] font-semibold text-lg flex items-center justify-center gap-3 border-2"
            aria-label="Contact via email for booking"
          >
            <Mail className="h-5 w-5" />
            📧 Email us
          </Button>
        </a>

        {/* Privacy Note */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          By contacting us you consent to us replying via WhatsApp or email.
        </p>
      </CardContent>
    </Card>
  );
};

export default ContactButtons;