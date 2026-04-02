'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ProgressStep } from '@/components/ui/ProgressStep';

export default function SubmitOnboardingPage() {
  const router = useRouter();
  const { clearFormData, formData } = useOnboarding();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check which steps are actually completed
  const getStepStatus = (stepNum: number) => {
    if (stepNum === 1) return formData.clientDetail?.panNumber ? 'complete' : 'pending';
    
    // Check if uploadedDocuments is an array
    const uploadedCount = Array.isArray(formData.uploadedDocuments) ? formData.uploadedDocuments.length : 0;
    if (stepNum === 2) return uploadedCount > 0 ? 'complete' : 'pending';
    if (stepNum === 3) return uploadedCount >= 3 ? 'complete' : 'pending';
    
    if (stepNum === 4) return formData.bankDetails?.accounts?.length > 0 ? 'complete' : 'pending';
    if (stepNum === 5) return formData.businessExpenses?.rentAndRates !== undefined ? 'complete' : 'pending';
    if (stepNum === 6) return formData.loanDetails?.loans?.length > 0 ? 'complete' : 'pending';
    if (stepNum === 7) return formData.loanDetails?.loans?.length > 0 ? 'complete' : 'pending';
    return 'pending';
  };

  const steps = [
    {
      step: 1,
      label: 'Client Details',
      description: 'Basic details and pre-entry info verified',
      status: getStepStatus(1),
    },
    {
      step: 2,
      label: 'Form Uploads',
      description: '26AS, TIS, and documents extracted',
      status: getStepStatus(2),
    },
    {
      step: 3,
      label: 'TDS Summary',
      description: 'Comprehensive tax summary generated',
      status: getStepStatus(3),
    },
    {
      step: 4,
      label: 'Bank Details',
      description: 'Bank account statements processing complete',
      status: getStepStatus(4),
    },
    {
      step: 5,
      label: 'Business Expenses',
      description: 'Costs and expense categories captured',
      status: getStepStatus(5),
    },
    {
      step: 6,
      label: 'Loan Details',
      description: 'Outstanding balances for active loans captured',
      status: getStepStatus(6),
    },
    {
      step: 7,
      label: 'Loan Summary',
      description: 'Amortisation schedule retrieved',
      status: getStepStatus(7),
    },
  ] as const;

  const handleSubmit = async () => {
    // Check if all steps are complete
    const allComplete = steps.every(s => s.status === 'complete');
    if (!allComplete) {
      alert('Please complete all steps before submitting.');
      return;
    }
    setIsSubmitted(true);

    // Simulate submission
    setTimeout(() => {
      // Clear form data
      clearFormData();

      // Show success toast (in a real app)
      alert('Onboarding form submitted successfully!');

      // Navigate back to dashboard
      router.push('/dashboard');
    }, 1500);
  };

  const handleSave = () => {
    alert('Submission checklist saved successfully!');
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Successful!</h2>
          <p className="text-slate-600">Your onboarding form has been submitted to the audit team.</p>
          <Button onClick={() => router.push('/dashboard')} className="mt-6">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Submit Onboarding Form"
        description="Please review the completion status of all sections below. Once confirmed, your application will be forwarded to the audit team for final processing."
      />

      {/* Checklist */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {steps.map((item) => (
              <div
                key={item.step}
                className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                  item.status === 'complete'
                    ? 'bg-green-50 hover:bg-green-100'
                    : 'bg-amber-50 hover:bg-amber-100'
                }`}
              >
                {item.status === 'complete' ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    STEP {item.step}: {item.label}
                  </p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'complete'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.status === 'complete' ? 'Complete' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="bg-indigo-50 border-indigo-200 mb-6">
        <CardContent className="pt-6">
          <p className="text-sm text-slate-600 mb-4">
            All sections have been completed. Click below to submit your onboarding form for final processing.
          </p>
          <Button onClick={handleSubmit} className="w-full h-12 text-lg">
            Submit Onboarding Form
          </Button>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center gap-4 pt-6 border-t border-slate-200">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button variant="secondary" onClick={handleSave}>
          Save
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-slate-500">
        <p>By submitting, you confirm that all information provided is accurate and complete.</p>
      </div>
    </div>
  );
}
