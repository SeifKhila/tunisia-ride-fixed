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

  const handleClick = () => {
    trackClick();
    const message = `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:`;
    
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const link = isMobile 
      ? `https://wa.me/447956643662?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=447956643662&text=${encodedMessage}`;
    
    window.open(link, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce md:hidden"
      aria-label="Quick WhatsApp contact"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default FloatingWhatsApp;