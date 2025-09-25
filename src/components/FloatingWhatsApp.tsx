import React from 'react';
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  // Simple click tracking
  const trackClick = () => {
    try {
      const counts = JSON.parse(localStorage.getItem('contactClicks') || '{}');
      counts['FloatingWhatsApp'] = (counts['FloatingWhatsApp'] || 0) + 1;
      localStorage.setItem('contactClicks', JSON.stringify(counts));
    } catch (e) {
      console.log('Click tracking failed:', e);
    }
  };

  // Create message with booking reference
  const today = new Date();
  const date = today.getFullYear().toString() + 
              (today.getMonth() + 1).toString().padStart(2, '0') + 
              today.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 99) + 1;
  const bookingRef = `GT-${date}-${random.toString().padStart(2, '0')}`;
  
  const message = `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:
Booking Ref: ${bookingRef}`;

  return (
    <a 
      href={`https://wa.me/447956643662?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 z-50 md:hidden"
      onClick={trackClick}
    >
      <Button
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
        aria-label="Quick WhatsApp contact"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
};

export default FloatingWhatsApp;