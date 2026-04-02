'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { mockBankAccounts } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function BankDetailsPage() {
  const router = useRouter();
  const { updateSection, setCurrentStep } = useOnboarding();
  const [bankNarrative, setBankNarrative] = React.useState('');

  const handleFileSelect = (file: File) => {
    updateSection('bankDetails', {
      accounts: mockBankAccounts,
    });
  };

  const handleNext = () => {
    updateSection('bankDetails', {
      overallNarrative: bankNarrative || 'Bank statements processed successfully for 3 accounts.',
    });
    setCurrentStep(5);
    router.push('/onboarding/business-expenses');
  };

  const handleSave = () => {
    updateSection('bankDetails', {
      overallNarrative: bankNarrative || 'Bank statements processed successfully for 3 accounts.',
    });
    alert('Bank details saved successfully!');
  };

  return (
    <div>
      <SectionHeader
        title="Bank Details"
        description="Upload and process bank statements to generate a comprehensive financial summary. This data will be used to reconcile TDS and other financial records."
      />

      {/* Upload Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Source Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload
            title="Upload Bank Statements"
            description="Select bank statement file"
            onFileSelect={handleFileSelect}
          />

          {/* Sub-options */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['PDF Certified', 'QB Verified', 'SAP SAS Verified', 'SBI Got Verified'].map((option) => (
              <Button key={option} variant="secondary" size="sm">
                {option}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button>Extract</Button>
            <Button variant="secondary">Generate Summary</Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Accounts Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bank Accounts Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Bank Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Account No</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Total Credits</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Total Debits</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockBankAccounts.map((account, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-900 font-medium">{account.bankName}</td>
                    <td className="px-4 py-3 text-slate-600">{account.accountNo}</td>
                    <td className="px-4 py-3 text-slate-600">{formatCurrency(account.totalCredits)}</td>
                    <td className="px-4 py-3 text-slate-600">{formatCurrency(account.totalDebits)}</td>
                    <td className="px-4 py-3 text-slate-600">{formatCurrency(account.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Overall Narrative */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Narrative Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={bankNarrative}
            onChange={(e) => setBankNarrative(e.target.value)}
            placeholder="Enter financial narrative summary..."
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-24"
          />
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
