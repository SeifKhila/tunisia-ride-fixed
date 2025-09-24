import React from 'react';
import { MessageCircle, Mail, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className={`bg-tunisia-blue text-white py-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${language === 'ar' ? 'text-right' : ''}`}>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-tunisia-gold mb-4">Contact Info</h3>
            <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <MessageCircle className="h-5 w-5 text-tunisia-coral" />
              <div>
                <p className="font-medium">WhatsApp</p>
                <a 
                  href="tel:+447956643662"
                  className="text-tunisia-gold hover:text-white transition-colors"
                >
                  +44 7956 643 662
                </a>
              </div>
            </div>
            
            <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Mail className="h-5 w-5 text-tunisia-coral" />
              <div>
                <p className="font-medium">Email</p>
                <div className="space-y-1">
                  <a 
                    href="mailto:info@get-tunisia-transfer.com"
                    className="text-tunisia-gold hover:text-white transition-colors block"
                  >
                    info@get-tunisia-transfer.com
                  </a>
                  <a 
                    href="mailto:khilas592@gmail.com"
                    className="text-tunisia-gold hover:text-white transition-colors block"
                  >
                    khilas592@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-tunisia-gold mb-4">Follow Us</h3>
            <div className="space-y-3">
              <a 
                href="https://instagram.com/gettunisiatransfer"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-tunisia-gold hover:text-white transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <Instagram className="h-5 w-5" />
                <span>@gettunisiatransfer</span>
              </a>
              
              <a 
                href="https://tiktok.com/@gettunisiatransfer"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 text-tunisia-gold hover:text-white transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <div className="h-5 w-5 text-center font-bold">T</div>
                <span>@gettunisiatransfer</span>
              </a>
              
              <a 
                href="#"
                className={`flex items-center gap-3 text-tunisia-gold hover:text-white transition-colors ${language === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <div className="h-5 w-5 text-center font-bold">f</div>
                <span>Get Tunisia Transfer</span>
              </a>
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-tunisia-gold mb-4">Our Service</h3>
            <p className="text-white/90 leading-relaxed">
              Professional airport transfer services across Tunisia. Fixed prices, reliable drivers, 24/7 support.
            </p>
            <p className="text-sm text-white/70">
              All prices include taxes and tolls. No hidden fees.
            </p>
          </div>
        </div>

        {/* Privacy Notice & Copyright */}
        <div className="border-t border-tunisia-turquoise/30 mt-8 pt-6 text-center space-y-4">
          <p className="text-sm text-white/80">
            {t('privacy.note')}
          </p>
          <p className="text-sm text-white/60">
            © 2024 Get Tunisia Transfer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;