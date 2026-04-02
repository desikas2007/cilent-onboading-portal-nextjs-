'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-slate-50 min-h-screen">
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </div>
    </div>
  );
};
