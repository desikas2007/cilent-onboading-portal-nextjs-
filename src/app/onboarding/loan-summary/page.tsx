'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { mockLoans, mockLoanAmortization } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function LoanSummaryPage() {
  const router = useRouter();
  const { setCurrentStep } = useOnboarding();

  const handleNext = () => {
    setCurrentStep(8);
    router.push('/onboarding/submit');
  };

  const handleSave = () => {
    alert('Loan summary saved successfully!');
  };

  const totalLoans = mockLoans.reduce((sum, loan) => sum + loan.principalAmount, 0);

  return (
    <div>
      <SectionHeader
        title="Loan Summary For AY (2024-25) FY (Apr 2023 – Mar 2024)"
        description=""
      />

      {/* Loan Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {mockLoans.map((loan, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 font-medium">{loan.loanType}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">
                {formatCurrency(loan.principalAmount)}
              </p>
              <p className="text-xs text-slate-500 mt-2">Outstanding: {formatCurrency(loan.outstandingBalance)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Loans Card */}
      <Card className="mb-6 bg-indigo-50 border-indigo-200">
        <CardContent className="pt-6">
          <p className="text-sm text-slate-600 font-medium">Total Loans</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{formatCurrency(totalLoans)}</p>
        </CardContent>
      </Card>

      {/* Amortization Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Month-wise Amortisation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Month</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Period</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">EMI (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Principal Paid (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Interest Paid (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Closing Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockLoanAmortization.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-900 font-medium">{row.month}</td>
                    <td className="px-4 py-3 text-slate-600">{row.period}</td>
                    <td className="px-4 py-3 text-slate-600">₹{row.emi.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{row.principalPaid.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{row.interestPaid.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{row.closingBalance.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-slate-500 mt-4 italic">
            * All calculations are estimates. Actual figures depend on the lender's method of calculation.
          </p>
        </CardContent>
      </Card>

      <NavigationButtons
        onBack={() => router.back()}
        onSave={handleSave}
        onNext={handleNext}
        canGoBack={true}
        canGoNext={true}
        backText="Back"
        nextText="Next"
      />
    </div>
  );
}
