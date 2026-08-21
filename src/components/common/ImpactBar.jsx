import React from 'react';

export const ImpactBar = ({ score, showLabel = true }) => {
  const getColor = () => {
    if (score >= 80) return 'bg-[#dc2626]';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className={`h-full ${getColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-bold text-slate-800 tabular-nums">
          {score}/100
        </span>
      )}
    </div>
  );
};
