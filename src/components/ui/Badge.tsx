'use client';

import React from 'react';
import { OnboardingStatus } from '@/types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-slate-100 text-slate-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: OnboardingStatus;
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, className = '', ...props }, ref) => {
    const statusStyles: Record<OnboardingStatus, string> = {
      'Onboarding Completed': 'bg-slate-700 text-white',
      'Onboarding In Progress': 'bg-blue-100 text-blue-700',
      'Signed Copy Sent': 'bg-green-100 text-green-700',
      'Data Pending With Client': 'bg-yellow-100 text-yellow-700',
      'Draft Submitted': 'bg-purple-100 text-purple-700',
      'Draft Preparation (WIP)': 'bg-orange-100 text-orange-700',
      'Proceed to File': 'bg-indigo-100 text-indigo-700',
      'Filing In Progress': 'bg-cyan-100 text-cyan-700',
      'Filing Completed': 'bg-emerald-100 text-emerald-700',
      'Soft Copy Sent': 'bg-teal-100 text-teal-700',
      'Physical Copy Sent': 'bg-lime-100 text-lime-700',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]} ${className}`}
        {...props}
      >
        {status}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';
