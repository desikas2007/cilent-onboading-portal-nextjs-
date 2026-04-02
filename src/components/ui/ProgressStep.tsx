'use client';

import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface ProgressStepProps {
  step: number;
  label: string;
  status: 'complete' | 'pending' | 'warning';
  isActive?: boolean;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({
  step,
  label,
  status,
  isActive = false,
}) => {
  const statusConfig = {
    complete: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    pending: { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-50' },
    warning: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex gap-3 p-3 rounded-lg ${isActive ? config.bg : 'bg-white'}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.color}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">
          STEP {step}: {label}
        </p>
      </div>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${
          status === 'complete'
            ? 'bg-green-100 text-green-700'
            : status === 'warning'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-slate-100 text-slate-700'
        }`}
      >
        {status === 'complete' && 'Complete'}
        {status === 'pending' && 'Pending'}
        {status === 'warning' && 'Warning'}
      </span>
    </div>
  );
};

interface SectionChecklistProps {
  items: { step: number; label: string; status: 'complete' | 'pending' | 'warning' }[];
}

export const SectionChecklist: React.FC<SectionChecklistProps> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ProgressStep
          key={item.step}
          step={item.step}
          label={item.label}
          status={item.status}
        />
      ))}
    </div>
  );
};
