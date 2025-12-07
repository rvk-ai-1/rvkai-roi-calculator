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
  // For percentages, convert decimal to display value (0.1 -> 10)
  const displayValue = isPercentage && typeof value === 'number'
    ? (value * 100).toFixed(2).replace(/\.?0+$/, '')
    : value;

  // Wrap onChange to convert percentage input back to decimal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPercentage && onChange) {
      const percentValue = parseFloat(e.target.value);
      const decimalValue = isNaN(percentValue) ? 0 : percentValue / 100;
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: decimalValue.toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else if (onChange) {
      onChange(e);
    }
  };

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
      <div className="flex items-center gap-1">
        <input
          type="number"
          step={isPercentage ? "0.1" : "1"}
          className={`
            w-28 text-right font-semibold text-slate-800 rounded-md border-slate-300 shadow-sm
            bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200 p-2 text-sm border
            ${className}
          `}
          value={displayValue}
          onChange={handleChange}
          {...props}
        />
        <span className={`w-4 text-sm font-medium ${isPercentage ? 'text-slate-500' : 'text-transparent'}`}>
          %
        </span>
      </div>
    </div>
  );
};