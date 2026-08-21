import React from 'react';

export const SeverityBadge = ({ severity, className = '' }) => {
  const getStyle = () => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-[#dc2626]',
          text: 'text-white',
          border: 'border-[#dc2626]',
          label: 'CRITICAL',
        };
      case 'high':
        return {
          bg: 'bg-red-50',
          text: 'text-[#dc2626]',
          border: 'border-red-200',
          label: 'HIGH',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          label: 'MEDIUM',
        };
      case 'low':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          border: 'border-green-200',
          label: 'LOW',
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-700',
          border: 'border-slate-200',
          label: 'INFO',
        };
    }
  };

  const style = getStyle();

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${style.bg} ${style.text} ${style.border} ${className}`}
    >
      {style.label}
    </span>
  );
};
