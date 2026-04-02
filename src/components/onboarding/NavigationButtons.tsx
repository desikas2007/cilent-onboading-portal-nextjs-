'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onSave?: () => void;
  onNext?: () => void;
  backText?: string;
  nextText?: string;
  canGoNext?: boolean;
  canGoBack?: boolean;
  isLoading?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onSave,
  onNext,
  backText = 'Back',
  nextText = 'Next',
  canGoNext = true,
  canGoBack = true,
  isLoading = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 mt-8 pt-6 border-t border-slate-200">
      {canGoBack && (
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          {backText}
        </Button>
      )}

      <div className="flex gap-4">
        {onSave && (
          <Button variant="secondary" onClick={onSave} isLoading={isLoading}>
            Save
          </Button>
        )}

        {canGoNext && onNext && (
          <Button onClick={onNext} disabled={!canGoNext} isLoading={isLoading}>
            {nextText}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};
