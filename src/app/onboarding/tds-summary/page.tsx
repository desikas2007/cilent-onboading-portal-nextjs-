'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { mockQuarterlyTDS, mockTDSRecords } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export default function TDSSummaryPage() {
  const router = useRouter();
  const { formData, setCurrentStep } = useOnboarding();

  // Check if forms are uploaded - formData.uploadedDocuments should be an array
  const uploadedDocs = Array.isArray(formData.uploadedDocuments) ? formData.uploadedDocuments : [];
  const formsUploaded = uploadedDocs.length >= 3;

  const handleNext = () => {
    setCurrentStep(4);
    router.push('/onboarding/bank-details');
  };

  // Generate dynamic TDS data based on uploaded forms
  // This simulates parsing the uploaded documents
  const totalTDSPanBase = formsUploaded ? 184950 + Math.floor(Math.random() * 10000) : 0;
  const totalTDSForm26AS = formsUploaded ? 185300 + Math.floor(Math.random() * 10000) : 0;
  const netVariance = formsUploaded ? totalTDSPanBase - totalTDSForm26AS : 0;

  if (!formsUploaded) {
    return (
      <div>
        <SectionHeader
          title="TDS Reconciliation Summary"
          description={`${uploadedDocs.length} of 3 forms uploaded. Please upload all 3 forms to generate TDS summary.`}
        />
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="text-sm font-medium text-slate-900">Form 26AS</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  uploadedDocs.some((d: any) => d.type === 'form26AS')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {uploadedDocs.some((d: any) => d.type === 'form26AS') ? '✓ Uploaded' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="text-sm font-medium text-slate-900">Form TIS</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  uploadedDocs.some((d: any) => d.type === 'formTIS')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {uploadedDocs.some((d: any) => d.type === 'formTIS') ? '✓ Uploaded' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="text-sm font-medium text-slate-900">Form AIS</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  uploadedDocs.some((d: any) => d.type === 'formAIS')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {uploadedDocs.some((d: any) => d.type === 'formAIS') ? '✓ Uploaded' : 'Pending'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <NavigationButtons onBack={() => router.push('/onboarding/upload-forms')} canGoNext={false} />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="TDS Reconciliation Summary"
        description="This data will be used to reconcile TDS with official submission records."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">TOTAL TDS (PAN BASE)</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(totalTDSPanBase)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">TOTAL TDS (FORM 26AS)</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">{formatCurrency(totalTDSForm26AS)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-slate-600 font-medium">NET VARIANCE</p>
            <p className={`text-2xl font-bold mt-2 ${netVariance < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(netVariance)}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge variant="warning">A-Go</Badge>
              <Badge variant="danger">B-Status Audit</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Breakdown Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detailed Quarterly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Financial Quarter</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Form 26AS (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">TDS Books (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">AIS Received (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Difference</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Reconciliation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockQuarterlyTDS.map((quarter, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-900 font-medium">{quarter.quarter}</td>
                    <td className="px-4 py-3 text-slate-600">₹{quarter.form26AS.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{quarter.tdsBooks.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{quarter.aisReceived.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{quarter.difference === 0 ? '0' : `+₹${quarter.difference.toLocaleString()}`}</td>
                    <td className="px-4 py-3">
                      <Badge variant={quarter.reconciliationStatus === 'Matched' ? 'success' : 'info'}>
                        {quarter.reconciliationStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* TDS Records Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Extracted TDS Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Deductor Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Section</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Amount Paid (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">TDS Amount (₹)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockTDSRecords.map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-slate-900 font-medium">{record.deductorName}</td>
                    <td className="px-4 py-3 text-slate-600">{record.section}</td>
                    <td className="px-4 py-3 text-slate-600">₹{record.amountPaid.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">₹{record.tdsAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={record.status === 'Matched' ? 'success' : 'warning'}>
                        {record.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <NavigationButtons
        onBack={() => router.back()}
        onNext={handleNext}
        canGoBack={true}
        canGoNext={true}
        backText="Back"
        nextText="Next"
      />
    </div>
  );
}
