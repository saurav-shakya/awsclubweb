import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, className = '', ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
      primary: 'bg-aws-orange text-aws-navy hover:bg-yellow-500 focus:ring-aws-orange',
      secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
      outline: 'border-2 border-aws-orange text-aws-orange hover:bg-aws-orange hover:text-aws-navy focus:ring-aws-orange',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const combinedClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <a href={href} className={`inline-block ${combinedClass}`} target="_blank" rel="noopener noreferrer">
          {props.children}
        </a>
      );
    }

    return (
      <button ref={ref} className={combinedClass} {...props}>
        {props.children}
      </button>
    );
  }
);

Button.displayName = 'Button';
