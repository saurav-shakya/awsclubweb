'use client';

import React, { useState } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'glass' | 'neon';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    default: 'glass-card',
    glass: 'glass-effect',
    neon: 'neon-border glass-card',
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-500 relative group ${variantStyles[variant]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,153,0,0.1), rgba(0,217,255,0.1))',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-2xl" />

      {header && (
        <div className="px-8 py-6 border-b border-white/10 relative z-10">
          {header}
        </div>
      )}

      <div className="px-8 py-6 relative z-10">
        {children}
      </div>

      {footer && (
        <div className="px-8 py-6 border-t border-white/10 bg-black/20 relative z-10">
          {footer}
        </div>
      )}
    </div>
  );
};
