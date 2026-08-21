import React from 'react';

export const StatCard = ({
  id,
  title,
  count,
  icon: Icon,
  variant = 'surface',
  onClick,
  subText,
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'pending':
        return {
          bg: 'bg-white',
          textColor: 'text-slate-900',
          iconColor: 'text-blue-500',
          titleColor: 'text-slate-500',
          border: 'border-slate-200 hover:border-slate-300',
          accent: 'border-l-4 border-l-blue-500',
        };
      case 'inProgress':
        return {
          bg: 'bg-white',
          textColor: 'text-slate-900',
          iconColor: 'text-amber-500',
          titleColor: 'text-slate-500',
          border: 'border-slate-200 hover:border-slate-300',
          accent: 'border-l-4 border-l-amber-500',
        };
      case 'resolved':
        return {
          bg: 'bg-white',
          textColor: 'text-slate-900',
          iconColor: 'text-green-600',
          titleColor: 'text-slate-500',
          border: 'border-slate-200 hover:border-slate-300',
          accent: 'border-l-4 border-l-green-600',
        };
      case 'surface':
      default:
        return {
          bg: 'bg-white',
          textColor: 'text-slate-900',
          iconColor: 'text-[#dc2626]',
          titleColor: 'text-slate-500',
          border: 'border-slate-200 hover:border-slate-300',
          accent: 'border-l-4 border-l-[#dc2626]',
        };
    }
  };

  const style = getStyles();

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${style.bg} ${style.border} ${style.accent} border p-5 rounded-xl shadow-xs flex flex-col justify-between h-32 hover:-translate-y-0.5 transition-all cursor-pointer group select-none`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${style.titleColor}`}>
          {title}
        </p>
        {subText && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
            {subText}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between">
        <p className={`text-3xl md:text-4xl font-bold tracking-tight ${style.textColor}`}>
          {count}
        </p>
        <Icon className={`w-7 h-7 ${style.iconColor} group-hover:scale-105 transition-transform`} />
      </div>
    </div>
  );
};
