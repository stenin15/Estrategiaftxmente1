import React from 'react';
import { TrendingUp } from 'lucide-react';

export const AnimatedLogo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Principal */}
      <div className="relative">
        {/* Sua Logo TFX */}
        <div className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center border-primary/50 shadow-[0_0_15px_rgba(0,188,212,0.3)]">
          <img 
            src="/src/assets/logo-tfx.webp" 
            alt="TFX Logo" 
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Texto da marca */}
      <div className="flex flex-col">
        <div className="text-2xl font-black text-primary">
          TFX METHOD
        </div>
        <div className="text-xs font-bold text-urgent">
          MÉTODO OFICIAL™
        </div>
      </div>

      {/* Selo de qualidade */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border-2 bg-primary/10 border-primary/30">
        <TrendingUp className="w-4 h-4 text-urgent" />
        <span className="text-xs font-bold text-urgent">MÉTODO COMPROVADO</span>
      </div>
    </div>
  );
};
