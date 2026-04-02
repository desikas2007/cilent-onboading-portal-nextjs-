'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

interface StatsCardProps {
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, trend = 'neutral' }) => {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-slate-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
        {trend !== 'neutral' && (
          <p
            className={`text-xs font-medium mt-2 ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {trend === 'up' ? '+5' : '-2'}%
          </p>
        )}
      </CardContent>
    </Card>
  );
};
