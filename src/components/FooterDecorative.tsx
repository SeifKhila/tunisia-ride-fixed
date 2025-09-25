import React from 'react';

const FooterDecorative = () => {
  return (
    <div className="relative">
      {/* Decorative Wave */}
      <div className="h-16 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C300,100 600,20 900,60 C1000,80 1100,40 1200,60 L1200,120 L0,120 Z"
            className="fill-tunisia-blue/20"
          />
          <path
            d="M0,80 C300,20 600,100 900,40 C1000,60 1100,20 1200,40 L1200,120 L0,120 Z"
            className="fill-tunisia-coral/20"
          />
        </svg>
      </div>
    </div>
  );
};

export default FooterDecorative;