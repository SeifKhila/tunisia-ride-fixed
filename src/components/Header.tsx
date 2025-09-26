import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import TopControls from "./TopControls";

const Header = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 bg-gradient-to-r from-tunisia-blue to-tunisia-coral backdrop-blur-md border-b border-tunisia-blue/20 shadow-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="font-bold text-xl text-white">
            {t('nav.logo')}
          </div>

          {/* Navigation and Controls */}
          <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <nav className={`hidden md:flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('booking')}
                className="text-white hover:bg-white/20"
              >
                {t('nav.book_now')}
              </Button>
            </nav>
            <TopControls />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;