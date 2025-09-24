import React from 'react';
import { Instagram, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className={`bg-tunisia-blue text-white py-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Connect with Us Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-tunisia-gold mb-6">Connect with Us</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/gettunisiatransfer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@gettunisiatransfer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on TikTok"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-5 w-5 text-center font-bold text-teal-400">T</div>
              <span>TikTok</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/14N6VDgPBgp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877F2] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-5 w-5 text-center font-bold">f</div>
              <span>Facebook</span>
            </a>

            {/* Email */}
            <a
              href="mailto:khilas592@gmail.com"
              aria-label="Send us an email"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-700 text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+447956643662"
              aria-label="Call us"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              <span>Call</span>
            </a>
          </div>
        </div>

        {/* Secure Payments Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-tunisia-gold mb-6">Secure Payments</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {/* PayPal */}
            <a
              href="https://www.paypal.me/seifkhila1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pay securely with PayPal"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00457C] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-5 w-5 text-center font-bold">P</div>
              <span>PayPal</span>
            </a>

            {/* Revolut */}
            <a
              href="https://revolut.me/seifededju"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pay securely with Revolut"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-5 w-5 text-center font-bold">R</div>
              <span>Revolut</span>
            </a>
          </div>
        </div>

        {/* Service Info */}
        <div className="text-center mb-8">
          <p className="text-white/90 leading-relaxed mb-2">
            Professional airport transfer services across Tunisia. Fixed prices, reliable drivers, 24/7 support.
          </p>
          <p className="text-sm text-white/70">
            All prices include taxes and tolls. No hidden fees.
          </p>
        </div>

        {/* Privacy Notice & Copyright */}
        <div className="border-t border-tunisia-turquoise/30 pt-6 text-center space-y-4">
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