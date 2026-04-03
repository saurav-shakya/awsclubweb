import React from 'react';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'online' | 'offline' | 'workshop';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'glass-effect text-gray-300 border border-white/20',
    online: 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40',
    offline: 'bg-green-500/20 text-green-400 border border-green-500/40',
    workshop: 'bg-gradient-to-r from-aws-orange to-yellow-500 text-black border border-aws-orange shadow-lg shadow-aws-orange/30',
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider ${variantStyles[variant]} ${className}`}>
      <span className="mr-1.5 text-[8px]">▸</span>
      {text}
    </span>
  );
};
