import React from 'react';
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingWhatsApp = () => {
  const message = `Hi Get Tunisia Transfer 👋
I'd like to book a transfer:
• Name:
• Pickup:
• Drop-off:
• Date/Time:
• Pax/Bags:
• Flight No:
• Notes:`;

  return (
    <a 
      href={`https://wa.me/21628602147?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
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