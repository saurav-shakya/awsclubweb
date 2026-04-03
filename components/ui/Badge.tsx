import React from 'react';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'online' | 'offline' | 'workshop';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-gray-700 text-gray-200',
    online: 'bg-blue-900 text-blue-200',
    offline: 'bg-green-900 text-green-200',
    workshop: 'bg-aws-orange text-aws-navy',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}>
      {text}
    </span>
  );
};
