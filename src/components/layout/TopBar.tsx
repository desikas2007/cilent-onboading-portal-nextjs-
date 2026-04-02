'use client';

import React from 'react';
import { Menu, Settings, Star } from 'lucide-react';

interface TopBarProps {
  title?: string;
  onMenuClick?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ title = 'Client Onboarding Portal', onMenuClick }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 fill-indigo-500 text-indigo-500" />
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Settings className="w-6 h-6 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
