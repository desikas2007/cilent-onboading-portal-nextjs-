'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { clientDetailSchema } from '@/lib/validations';

type ClientDetailFormData = z.infer<typeof clientDetailSchema>;

const assessmentYears = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022'];

export default function ClientDetailPage() {
  const router = useRouter();
  const { formData, updateSection, setCurrentStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ClientDetailFormData>({
    resolver: zodResolver(clientDetailSchema),
    defaultValues: formData.clientDetail as any,
  });

  const assessmentYear = watch('assessmentYear');

  const onSubmit = (data: ClientDetailFormData) => {
    updateSection('clientDetail', data);
    setCurrentStep(2);
    router.push('/onboarding/upload-forms');
  };

  const handleNext = () => {
    handleSubmit(onSubmit)();
  };

  const handleSave = () => {
    handleSubmit((data) => {
      updateSection('clientDetail', data);
      alert('Client details saved successfully!');
    })();
  };

  // Calculate financial year
  const getFinancialYear = (ay: string) => {
    if (!ay) return '';
    const startYear = parseInt(ay.split('-')[0]) - 1;
    const endYear = parseInt(ay.split('-')[0]);
    return `April ${startYear} - March ${endYear}`;
  };

  return (
    <div>
      <SectionHeader
        title="Client Details"
        description="Please provide the basic identity and tax assessment period details for the client."
      />

      <Card>
        <CardHeader>
          <CardTitle>Primary Identification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* PAN Number */}
            <Input
              label="PAN Number"
              required
              placeholder="ABCDE1234F"
              hint="Permanent Account Number - 10 alphanumeric characters"
              error={errors.panNumber?.message}
              {...register('panNumber')}
            />

            {/* Date of Birth */}
            <Input
              label="Date of Birth"
              type="date"
              required
              error={errors.dateOfBirth?.message}
              {...register('dateOfBirth')}
            />

            {/* Proprietary Concern Name */}
            <Input
              label="Proprietary Concern Name"
              required
              placeholder="e.g., Global Trading Solutions"
              hint="Leave blank if the client is an individual without a trade name"
              error={errors.proprietaryConcernName?.message}
              {...register('proprietaryConcernName')}
            />

            {/* Client Name */}
            <Input
              label="Client Name (As per PAN Card)"
              placeholder="Full name as printed on PAN"
              error={errors.clientName?.message}
              {...register('clientName')}
            />

            {/* Assessment Year */}
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">
                Assessment Year <span className="text-red-500">*</span>
              </label>
              <select
                {...register('assessmentYear')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.assessmentYear ? 'border-red-500' : 'border-slate-200'
                }`}
              >
                <option value="">Select Assessment Year</option>
                {assessmentYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.assessmentYear && (
                <p className="text-xs text-red-500 mt-1">{errors.assessmentYear.message}</p>
              )}
            </div>

            {/* Financial Year (auto-calculated, disabled) */}
            <Input
              label="Financial Year"
              disabled
              value={getFinancialYear(assessmentYear)}
            />

            {/* Navigation Buttons */}
            <NavigationButtons
              canGoBack={true}
              onBack={() => router.push('/dashboard')}
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
