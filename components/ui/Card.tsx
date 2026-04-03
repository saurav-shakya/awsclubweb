import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', header, footer }) => {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
      {header && <div className="px-6 py-4 border-b border-gray-800">{header}</div>}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-gray-800 bg-gray-950">{footer}</div>}
    </div>
  );
};
