import React from 'react';

interface SectionHeaderProps {
  title: string;
  agentName: string;
  avatarUrl: string;
  description?: string;
  colorClass: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  agentName, 
  avatarUrl, 
  description,
  colorClass
}) => {
  return (
    <div className="flex items-start space-x-3 mb-4 pb-3 border-b border-slate-200">
      <div className={`relative p-1 rounded-full ${colorClass} bg-opacity-10 shrink-0`}>
        <img
          src={avatarUrl}
          alt={agentName}
          className="w-16 h-16 rounded-full border-2 border-white shadow-sm object-cover bg-white"
        />
        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${colorClass}`}></div>
      </div>
      <div className="pt-1">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <p className="text-sm font-semibold text-blue-600 mb-1">{agentName}</p>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
};