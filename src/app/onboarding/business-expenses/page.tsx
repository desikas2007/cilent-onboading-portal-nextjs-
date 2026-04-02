'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/onboarding/SectionHeader';
import { NavigationButtons } from '@/components/onboarding/NavigationButtons';
import { useOnboarding } from '@/hooks/useOnboarding';
import { businessExpensesSchema } from '@/lib/validations';

type BusinessExpensesFormData = {
  rentAndRates: number;
  salariesAndWages: number;
  electricityAndWater: number;
  additionalExpenses?: { label: string; amount: number }[];
};

export default function BusinessExpensesPage() {
  const router = useRouter();
  const { formData, updateSection, setCurrentStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BusinessExpensesFormData>({
    resolver: zodResolver(businessExpensesSchema) as any,
    defaultValues: {
      rentAndRates: formData.businessExpenses?.rentAndRates || 0,
      salariesAndWages: formData.businessExpenses?.salariesAndWages || 0,
      electricityAndWater: formData.businessExpenses?.electricityAndWater || 0,
      additionalExpenses: formData.businessExpenses?.additionalExpenses || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'additionalExpenses',
  });

  const onSubmit = (data: BusinessExpensesFormData) => {
    updateSection('businessExpenses', data);
    setCurrentStep(6);
    router.push('/onboarding/loan-details');
  };

  const handleNext = () => {
    handleSubmit(onSubmit as any)();
  };

  const handleSave = () => {
    handleSubmit((data: BusinessExpensesFormData) => {
      updateSection('businessExpenses', data);
      alert('Business expenses saved successfully!');
    })();
  };

  return (
    <div>
      <SectionHeader
        title="Business Expense Details"
        description="Please provide accurate details of business expenditures for the current assessment year."
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            {/* Standard Expenses */}
            <div className="space-y-4">
              <Input
                label="Rent and Rates (Annual)"
                type="number"
                prefix="₹"
                {...register('rentAndRates', { valueAsNumber: true })}
                error={errors.rentAndRates?.message}
              />

              <Input
                label="Salaries and Wages"
                type="number"
                prefix="₹"
                {...register('salariesAndWages', { valueAsNumber: true })}
                error={errors.salariesAndWages?.message}
              />

              <Input
                label="Electricity & Water Charges"
                type="number"
                prefix="₹"
                {...register('electricityAndWater', { valueAsNumber: true })}
                error={errors.electricityAndWater?.message}
              />
            </div>

            {/* Additional Expenses */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Additional Expenses</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-3">
                  <Input
                    placeholder="Expense label"
                    {...register(`additionalExpenses.${index}.label`)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    prefix="₹"
                    {...register(`additionalExpenses.${index}.amount`, { valueAsNumber: true })}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="secondary"
                onClick={() => append({ label: '', amount: 0 })}
                className="gap-2 mt-4"
              >
                <Plus className="w-4 h-4" />
                Add More Expenses
              </Button>
            </div>

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
