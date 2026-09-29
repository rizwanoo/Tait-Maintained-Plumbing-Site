import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useConfig();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-fadeIn">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 text-white border border-amber-500/40 shadow-2xl backdrop-blur-md text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
