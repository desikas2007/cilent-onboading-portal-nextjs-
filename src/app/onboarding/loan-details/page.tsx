'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { loanSchema } from '@/lib/validations';

type LoanData = {
  loanType: string;
  category: string;
  providerName: string;
  loanStartMonth: string;
  principalAmount: number;
  monthlyEMI: number;
  rateOfInterest: number;
  tenureYears: number;
};

interface LoanFormData {
  hasLoans: boolean;
  loans: LoanData[];
}

const loanProviders = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'SBI', 'PNB'];
const loanTypes = ['Home Loan', 'Personal Loan', 'Car Loan', 'Jewel Loan', 'Business Loan'];

export default function LoanDetailsPage() {
  const router = useRouter();
  const { formData, updateSection, setCurrentStep } = useOnboarding();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanFormData>({
    defaultValues: {
      hasLoans: formData.loanDetails?.hasLoans || false,
      loans: formData.loanDetails?.loans || [],
    },
  });

  const hasLoans = watch('hasLoans');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'loans',
  });

  const onSubmit = (data: LoanFormData) => {
    updateSection('loanDetails', data);
    setCurrentStep(8);
    router.push('/onboarding/loan-summary');
  };

  const handleNext = () => {
    handleSubmit(onSubmit)();
  };

  const handleSave = () => {
    handleSubmit((data: LoanFormData) => {
      updateSection('loanDetails', data);
      alert('Loan details saved successfully!');
    })();
  };

  return (
    <div>
      <SectionHeader
        title="Loan Details"
        description="Please provide details of any active loans or credit facilities currently held by the client. This information is critical for accurate debt-to-income ratio calculations."
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Radio Toggle */}
            <div className="flex gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register('hasLoans', { setValueAs: (v) => v === 'yes' })}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">Yes, the client has existing loans</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register('hasLoans', { setValueAs: (v) => v === 'no' })}
                  className="w-4 h-4"
                />
                <span className="text-slate-700">No, the client has no loans</span>
              </label>
            </div>

            {/* Loan Cards */}
            {hasLoans && (
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <Card key={field.id} className="border-indigo-200 bg-indigo-50">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Loan {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 block mb-1">
                            Type Of Loan <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register(`loans.${index}.loanType`)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select Loan Type</option>
                            {loanTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Input
                          label="Category"
                          placeholder="e.g., Secured"
                          {...register(`loans.${index}.category`)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">
                          Provider Name <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register(`loans.${index}.providerName`)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Bank</option>
                          {loanProviders.map((provider) => (
                            <option key={provider} value={provider}>
                              {provider}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Input
                        label="Principal Amount"
                        type="number"
                        prefix="₹"
                        {...register(`loans.${index}.principalAmount`, { valueAsNumber: true })}
                      />

                      <Input
                        label="Loan Start Month"
                        type="month"
                        {...register(`loans.${index}.loanStartMonth`)}
                      />

                      <Input
                        label="Monthly EMI"
                        type="number"
                        prefix="₹"
                        {...register(`loans.${index}.monthlyEMI`, { valueAsNumber: true })}
                      />

                      <Input
                        label="Rate of Interest (%)"
                        type="number"
                        step="0.1"
                        {...register(`loans.${index}.rateOfInterest`, { valueAsNumber: true })}
                      />

                      <Input
                        label="Loan Tenure (Years)"
                        type="number"
                        {...register(`loans.${index}.tenureYears`, { valueAsNumber: true })}
                      />
                    </CardContent>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    append({
                      loanType: '',
                      category: '',
                      providerName: '',
                      principalAmount: 0,
                      loanStartMonth: '',
                      monthlyEMI: 0,
                      rateOfInterest: 0,
                      tenureYears: 0,
                    })
                  }
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Loan
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            <NavigationButtons
              onBack={() => router.back()}
              onSave={handleSave}
              onNext={handleNext}
              backText="Back"
              nextText="Next"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
