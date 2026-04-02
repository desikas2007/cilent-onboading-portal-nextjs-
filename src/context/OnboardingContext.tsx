'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OnboardingFormData } from '@/types';

interface OnboardingContextType {
  formData: OnboardingFormData;
  updateSection: (section: keyof OnboardingFormData, data: any) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  clearFormData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialFormData: OnboardingFormData = {
  clientDetail: {},
  uploadedDocuments: {},
  tdsSummary: {},
  bankDetails: {},
  businessExpenses: {},
  loanDetails: {},
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  // Load from session storage on mount
  useEffect(() => {
    const savedFormData = sessionStorage.getItem('onboardingFormData');
    const savedStep = sessionStorage.getItem('onboardingStep');

    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  // Save to session storage whenever form data changes
  useEffect(() => {
    sessionStorage.setItem('onboardingFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem('onboardingStep', String(currentStep));
  }, [currentStep]);

  const updateSection = (section: keyof OnboardingFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const clearFormData = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    sessionStorage.removeItem('onboardingFormData');
    sessionStorage.removeItem('onboardingStep');
  };

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateSection,
        currentStep,
        setCurrentStep,
        clearFormData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
