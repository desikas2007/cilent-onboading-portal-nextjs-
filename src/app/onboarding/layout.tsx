'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const router = useRouter();

  // Check auth
  React.useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 bg-slate-50 min-h-screen">
        <main className="max-w-6xl mx-auto p-6">{children}</main>
      </div>
    </div>
  );
}
