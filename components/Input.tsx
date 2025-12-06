import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subLabel?: string;
  isPercentage?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  subLabel, 
  value, 
  onChange, 
  isPercentage = false, 
  className,
  ...props 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100 last:border-0 group hover:bg-slate-50 transition-colors px-2 rounded-md">
      <div className="mb-2 sm:mb-0">
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        {subLabel && (
          <span className="text-xs text-slate-400 font-normal">{subLabel}</span>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          step={isPercentage ? "0.001" : "1"}
          className={`
            w-32 text-right font-semibold text-slate-800 rounded-md border-slate-300 shadow-sm
            bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 p-2 text-sm border
            ${className}
          `}
          value={value}
          onChange={onChange}
          {...props}
        />
        {isPercentage && (
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none text-slate-400 text-xs">
                {/* Optional % indicator if we wanted one inside, but separate is cleaner for raw value edits */}
            </div>
        )}
      </div>
    </div>
  );
};