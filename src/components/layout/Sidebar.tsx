'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const onboardingSteps = [
    { label: 'Client Detail', path: '/onboarding/client-detail', step: 1 },
    { label: 'Upload Forms', path: '/onboarding/upload-forms', step: 2 },
    { label: 'TDS Summary', path: '/onboarding/tds-summary', step: 3 },
    { label: 'Upload Bank Statement', path: '/onboarding/bank-details', step: 4 },
    { label: 'Business Expenses', path: '/onboarding/business-expenses', step: 5 },
    { label: 'Loan Details', path: '/onboarding/loan-details', step: 6 },
    { label: 'Amortisation', path: '/onboarding/loan-summary', step: 7 },
    { label: 'Submit Form', path: '/onboarding/submit', step: 8 },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-indigo-500 text-indigo-500" />
          <h1 className="text-lg font-bold">Client Onboarding Portal</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Dashboard Link */}
        <Link href="/dashboard">
          <div
            className={`px-4 py-3 rounded-lg mb-6 cursor-pointer transition-colors ${
              pathname === '/dashboard'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Dashboard
          </div>
        </Link>

        {/* Onboarding Section */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-slate-300 hover:text-white px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
          >
            <span>Client Onboarding</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          {isExpanded && (
            <div className="mt-2 space-y-1 pl-2">
              {onboardingSteps.map((step) => (
                <Link key={step.path} href={step.path}>
                  <div
                    className={`px-4 py-3 rounded-lg cursor-pointer transition-colors text-sm ${
                      pathname === step.path
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {step.label}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-slate-300 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};
