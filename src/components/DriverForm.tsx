import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Copy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const DriverForm = () => {
  const { t, language } = useLanguage();
  const [bookingReference, setBookingReference] = useState("");

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
    toast.success("Application reference copied to clipboard!");
  };

  const getDriverMessage = () => {
    switch(language) {
      case 'fr':
        return `Bonjour Get Tunisia Transfer 👋
Je souhaite postuler comme conducteur :
• Nom
• Ville/Zone(s)
• Type de véhicule
• Années d'expérience
• Langues parlées
• Numéro WhatsApp
• Documents prêts (ID/Permis): Oui/Non
Application Ref: ${bookingReference}`;
      case 'ar':
        return `مرحباً Get Tunisia Transfer 👋
أود التقدم كسائق:
• الاسم
• المدينة/المنطقة
• نوع السيارة
• سنوات الخبرة
• اللغات
• رقم واتساب
• الوثائق جاهزة (هوية/رخصة): نعم/لا
Application Ref: ${bookingReference}`;
      default:
        return `Hi Get Tunisia Transfer 👋
I'd like to apply as a driver:
• Name
• City/Zone(s)
• Vehicle type
• Years experience
• Languages
• WhatsApp number
• Docs ready (ID/License): Yes/No
Application Ref: ${bookingReference}`;
    }
  };

  const handleWhatsAppClick = () => {
    trackClick('WhatsApp Driver');
    const message = getDriverMessage();
    
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const link = isMobile 
      ? `https://wa.me/447956643662?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=447956643662&text=${encodedMessage}`;
    
    window.open(link, '_blank');
  };

  const handleEmailClick = () => {
    trackClick('Email Driver');
    const subject = "Driver Application – Get Tunisia Transfer";
    const body = getDriverMessage();
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const link = `mailto:khilas592@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    window.open(link, '_self');
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic text-right' : ''}`} id="driver">
      <CardHeader>
        <CardTitle className="text-2xl text-tunisia-blue">{t('driver_recruitment.headline')}</CardTitle>
        <CardDescription>{t('driver_recruitment.subline')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Application Reference Display */}
        <div className="p-4 bg-tunisia-blue/5 rounded-lg border border-tunisia-blue/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-tunisia-blue">Your Application Reference:</span>
            <Button
              onClick={copyReference}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="Copy application reference"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="font-mono text-lg font-bold text-tunisia-blue">{bookingReference}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Copy this reference for your application
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={handleWhatsAppClick}
            className="w-full min-h-[56px] bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg"
          >
            <MessageCircle className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
            Apply via WhatsApp (Primary)
          </Button>
          
          <Button
            onClick={handleEmailClick}
            variant="outline"
            className="w-full min-h-[56px] text-lg border-tunisia-blue text-tunisia-blue hover:bg-tunisia-blue hover:text-white"
          >
            <Mail className={`${language === 'ar' ? 'ml-3' : 'mr-3'} h-6 w-6`} />
            Apply via Email (Secondary)
          </Button>
        </div>

          {/* Privacy Notice */}
          <div className="text-xs text-muted-foreground text-center p-3 bg-muted/50 rounded">
            {t('privacy.note')}
          </div>
      </CardContent>
    </Card>
  );
};

export default DriverForm;