import React from 'react';

interface ResultRowProps {
  label: string;
  value: string | number;
  isTotal?: boolean;
  highlight?: boolean;
  subValue?: string;
}

export const ResultRow: React.FC<ResultRowProps> = ({ 
  label, 
  value, 
  isTotal = false, 
  highlight = false,
  subValue
}) => {
  return (
    <div className={`
      flex justify-between items-center py-2 px-3 rounded-md
      ${isTotal ? 'bg-slate-800 text-white mt-3 shadow-md' : 'border-b border-slate-100 last:border-0'}
      ${highlight && !isTotal ? 'bg-green-50 text-green-800 font-medium' : ''}
    `}>
      <div className="flex flex-col">
        <span className={`text-sm ${isTotal ? 'font-bold' : 'font-medium'}`}>
          {label}
        </span>
        {subValue && (
           <span className={`text-xs ${isTotal ? 'text-slate-300' : 'text-slate-500'}`}>
             {subValue}
           </span>
        )}
      </div>
      <span className={`text-base ${isTotal ? 'font-bold' : 'font-semibold'}`}>
        {value}
      </span>
    </div>
  );
};