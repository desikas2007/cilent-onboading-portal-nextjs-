'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children?: any;
}

const getVariantClass = (variant: ButtonVariant = 'primary'): string => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return variants[variant];
};

const getSizeClass = (size: ButtonSize = 'md'): string => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return sizes[size];
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, ref: any) => {
    const { className = '', variant = 'primary', size = 'md', isLoading, disabled, children, ...rest } = props;
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClass(variant)} ${getSizeClass(size)} ${className}`}
        disabled={isLoading || disabled}
        {...rest}
      >
        {isLoading ? <span className="inline-block animate-spin mr-2">⟳</span> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.displayName = 'Button';
