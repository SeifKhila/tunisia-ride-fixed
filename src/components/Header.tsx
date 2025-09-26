import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-tunisia-blue/20 shadow-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="font-bold text-xl text-tunisia-blue">
            {t('nav.logo')}
          </div>

          {/* Navigation */}
          <nav className={`hidden md:flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('booking')}
              className="text-tunisia-blue hover:bg-tunisia-blue/10"
            >
              {t('nav.book_now')}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;