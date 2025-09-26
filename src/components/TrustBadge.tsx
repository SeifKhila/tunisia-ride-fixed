import React from 'react';
import { Star } from 'lucide-react';

const TrustBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-tunisia-blue/20">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400/50'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-tunisia-blue">
        4.5/5 based on 1,000+ customers
      </span>
    </div>
  );
};

export default TrustBadge;