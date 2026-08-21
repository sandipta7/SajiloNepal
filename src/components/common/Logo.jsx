import React from 'react';

export const LogoIcon = ({ className = 'w-8 h-8', ...props }) => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Green mountain fill area on the right */}
    <path
      d="M102 74L130 42L162 82C154 94 135 106 102 102L102 74Z"
      fill="#10B981"
    />
    <path
      d="M116 80L148 103C125 116 95 112 70 96L92 78L102 90L116 80Z"
      fill="#059669"
      opacity="0.9"
    />
    
    {/* Dark Navy Blue Mountain Contour Silhouette */}
    <path
      d="M52 82L80 50L102 72L122 46L148 80C140 86 128 92 104 90C78 88 64 96 52 106"
      stroke="#162744"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 82L68 64L80 50"
      stroke="#162744"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Green Checkmark Symbol */}
    <path
      d="M91 66L104 82L134 42"
      stroke="#10B981"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Navy Blue Flowing Base Curve */}
    <path
      d="M48 84C55 76 65 85 75 92C95 106 125 114 154 98"
      stroke="#162744"
      strokeWidth="14"
      strokeLinecap="round"
    />
  </svg>
);

export const Logo = ({
  showText = true,
  size = 'md',
  textColor = 'text-slate-900',
  subtextColor = 'text-slate-500',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-shrink-0 flex items-center justify-center">
        <LogoIcon className={iconSizes[size] || iconSizes.md} />
      </div>
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={`font-black tracking-tight uppercase ${
              size === 'sm'
                ? 'text-xs'
                : size === 'lg'
                ? 'text-lg'
                : size === 'xl'
                ? 'text-2xl'
                : 'text-sm'
            } ${textColor}`}
            style={{ letterSpacing: '-0.02em', color: '#162744' }}
          >
            Sajilo Nepal
          </span>
          <span
            className={`font-bold tracking-widest uppercase ${
              size === 'sm'
                ? 'text-[8px]'
                : size === 'lg'
                ? 'text-[11px]'
                : size === 'xl'
                ? 'text-xs'
                : 'text-[9px]'
            } ${subtextColor}`}
            style={{ letterSpacing: '0.12em', color: '#1e293b' }}
          >
            Civic Tech
          </span>
        </div>
      )}
    </div>
  );
};
