'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props: any, ref: any) => {
    const { className = '', children, ...rest } = props;
    return (
      <div
        ref={ref}
        className={`bg-white rounded-lg border border-slate-200 shadow-sm p-6 ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props: any, ref: any) => {
    const { className = '', children, ...rest } = props;
    return (
      <div ref={ref} className={`mb-4 pb-4 border-b border-slate-200 ${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: any;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props: any, ref: any) => {
    const { className = '', children, ...rest } = props;
    return (
      <h3 ref={ref} className={`text-lg font-semibold text-slate-900 ${className}`} {...rest}>
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: any;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  (props: any, ref: any) => {
    const { className = '', children, ...rest } = props;
    return (
      <p ref={ref} className={`text-sm text-slate-600 ${className}`} {...rest}>
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (props: any, ref: any) => {
    const { className = '', children, ...rest } = props;
    return (
      <div ref={ref} className={`${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';
