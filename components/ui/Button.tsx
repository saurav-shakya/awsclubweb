'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, className = '', ...props }, ref) => {
    const baseStyles = 'font-bold rounded-xl transition-all duration-300 focus:outline-none relative overflow-hidden group font-mono tracking-wide uppercase';

    const variantStyles = {
      primary: 'bg-gradient-to-r from-aws-orange to-yellow-500 text-black hover:from-yellow-500 hover:to-aws-orange shadow-lg hover:shadow-aws-orange/50 neon-border',
      secondary: 'glass-effect text-white hover:bg-white/10 border border-white/20',
      outline: 'border-2 border-aws-orange text-aws-orange hover:bg-aws-orange/10 hover:shadow-lg hover:shadow-aws-orange/30',
    };

    const sizeStyles = {
      sm: 'px-5 py-2.5 text-xs',
      md: 'px-8 py-3.5 text-sm',
      lg: 'px-10 py-4 text-base',
    };

    const combinedClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    const ButtonContent = () => (
      <>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        )}
        <span className="relative z-10">{props.children}</span>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={`inline-flex items-center justify-center ${combinedClass}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonContent />
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClass} {...props}>
        <ButtonContent />
      </button>
    );
  }
);

Button.displayName = 'Button';
