import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactButtonsProps {
  type: 'booking' | 'driver';
}

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

const ContactButtons: React.FC<ContactButtonsProps> = ({ type }) => {
  const { t, language } = useLanguage();

  const whatsappMessages = {
    booking: `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:`,
    driver: `Hi Get Tunisia Transfer 👋
I'd like to apply as a driver:
• Name:
• City/Zone(s):
• Vehicle type:
• Years experience:
• Languages:
• WhatsApp number:
• Docs ready (ID/License): Yes/No`
  };

  const emailData = {
    booking: {
      subject: "New Booking Enquiry – Get Tunisia Transfer",
      body: `Hello, I'd like to book a transfer.

Name:
Pickup:
Drop-off:
Date/Time:
Pax/Bags:
Flight No:
Notes:`
    },
    driver: {
      subject: "Driver Application – Get Tunisia Transfer",
      body: `Hello, I'd like to apply as a driver.

Name:
City/Zone(s):
Vehicle:
Years experience:
Languages:
WhatsApp:

Other details:`
    }
  };

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/447956643662?text=${encodedMessage}`;
  };

  const generateEmailLink = (subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:khilas592@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleWhatsAppClick = () => {
    const link = generateWhatsAppLink(whatsappMessages[type]);
    // Create a temporary link element to handle the navigation properly
    const tempLink = document.createElement('a');
    tempLink.href = link;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener noreferrer';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    trackClick(`WhatsApp ${type === 'booking' ? 'Book' : 'Driver'}`);
  };

  const handleEmailClick = () => {
    trackClick('Email');
    const data = emailData[type];
    const link = generateEmailLink(data.subject, data.body);
    window.open(link, '_blank');
  };

  const titles = {
    booking: t('booking.title') || 'Book Your Transfer',
    driver: t('driver.title') || 'Join Our Driver Network'
  };

  const descriptions = {
    booking: 'Get an instant quote and book your transfer directly via WhatsApp or email.',
    driver: 'Apply to become a professional driver with Get Tunisia Transfer.'
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id={type}>
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{titles[type]}</CardTitle>
        <CardDescription>{descriptions[type]}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* WhatsApp Button (Primary) */}
        <a 
          href={generateWhatsAppLink(whatsappMessages[type])}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button 
            className="w-full min-h-[60px] bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-lg flex items-center justify-center gap-3"
            aria-label={`Contact via WhatsApp for ${type}`}
          >
            <MessageCircle className="h-6 w-6" />
            💬 WhatsApp us
          </Button>
        </a>

        {/* Email Button (Secondary) */}
        <Button 
          onClick={handleEmailClick}
          variant="outline"
          className="w-full min-h-[56px] font-semibold text-lg flex items-center justify-center gap-3 border-2"
          aria-label={`Contact via email for ${type}`}
        >
          <Mail className="h-5 w-5" />
          📧 Email us
        </Button>

        {/* Privacy Note */}
        <p className="text-sm text-muted-foreground text-center mt-4">
          By contacting us you consent to us replying via WhatsApp or email.
        </p>
      </CardContent>
    </Card>
  );
};

export default ContactButtons;