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
          iconBg: 'bg-blue-50 text-[#003893] border-blue-100 group-hover:bg-[#003893] group-hover:text-white',
          dotBg: 'bg-[#003893]',
          accentHover: 'hover:border-blue-300 hover:shadow-blue-950/5',
        };
      case 'inProgress':
        return {
          iconBg: 'bg-amber-50 text-amber-700 border-amber-100 group-hover:bg-amber-500 group-hover:text-white',
          dotBg: 'bg-amber-500',
          accentHover: 'hover:border-amber-300 hover:shadow-amber-950/5',
        };
      case 'resolved':
        return {
          iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
          dotBg: 'bg-emerald-600',
          accentHover: 'hover:border-emerald-300 hover:shadow-emerald-950/5',
        };
      case 'surface':
      default:
        return {
          iconBg: 'bg-red-50 text-[#dc2626] border-red-100 group-hover:bg-[#dc2626] group-hover:text-white',
          dotBg: 'bg-[#dc2626]',
          accentHover: 'hover:border-red-300 hover:shadow-red-950/5',
        };
    }
  };

  const style = getStyles();

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-200/90 ${style.accentHover} p-5 rounded-2xl shadow-xs flex flex-col justify-between h-34 hover:-translate-y-1 transition-all duration-200 cursor-pointer group select-none relative overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${style.dotBg}`}></span>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 transition-colors">
            {title}
          </p>
        </div>
        {subText && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {subText}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between pt-2">
        <p className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 tabular-nums">
          {count}
        </p>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-2xs ${style.iconBg}`}>
          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
};
