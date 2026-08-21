import React from 'react';

export const LogoIcon = ({ className = 'w-8 h-8', ...props }) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Nepal Flag Double-Pennant Styled Geometric Crest */}
    <defs>
      <linearGradient id="nepalRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
      <linearGradient id="nepalBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#003893" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="nepalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>

    {/* Himalayan Peak 1 & Top Pennant */}
    <path
      d="M30 20L110 75L55 85L135 140L25 155L30 20Z"
      fill="url(#nepalRedGrad)"
      stroke="url(#nepalBlueGrad)"
      strokeWidth="10"
      strokeLinejoin="round"
    />

    {/* Sun / Moon Celestial Motif in White */}
    {/* Crescent Moon (Top Pennant) */}
    <path
      d="M58 48C63 56 72 58 78 54C74 62 62 64 54 58C50 54 52 48 58 48Z"
      fill="#ffffff"
    />
    <circle cx="63" cy="54" r="3.5" fill="#ffffff" />

    {/* Radiant Sun (Bottom Pennant) */}
    <circle cx="64" cy="118" r="9" fill="#ffffff" />
    <path
      d="M64 103L64 107M64 129L64 133M49 118L53 118M75 118L79 118M53 107L56 110M72 126L75 129M53 129L56 126M72 110L75 107"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Mountain Snow Peak Accent right */}
    <path
      d="M110 75L145 105L165 92L182 112L155 140L135 140L110 75Z"
      fill="url(#nepalBlueGrad)"
      opacity="0.95"
    />
    {/* White Snow Cap on Peak */}
    <path
      d="M165 92L173 102L165 106L158 101L165 92Z"
      fill="#ffffff"
    />

    {/* Modern Green Check of Resolution at Base */}
    <path
      d="M98 128L122 152L178 96"
      stroke="#10b981"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-shrink-0 flex items-center justify-center filter drop-shadow-xs">
        <LogoIcon className={iconSizes[size] || iconSizes.md} />
      </div>
      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${
                size === 'sm'
                  ? 'text-xs'
                  : size === 'lg'
                  ? 'text-lg'
                  : size === 'xl'
                  ? 'text-2xl'
                  : 'text-sm'
              } ${textColor}`}
              style={{ letterSpacing: '-0.03em' }}
            >
              <span className="text-[#003893]">Sajilo</span>{' '}
              <span className="text-[#dc2626]">Nepal</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
          </div>
          <span
            className={`font-bold tracking-widest uppercase mt-0.5 ${
              size === 'sm'
                ? 'text-[8px]'
                : size === 'lg'
                ? 'text-[11px]'
                : size === 'xl'
                ? 'text-xs'
                : 'text-[9px]'
            } text-slate-400`}
            style={{ letterSpacing: '0.14em' }}
          >
            नागरिक सेवा • Civic Tech
          </span>
        </div>
      )}
    </div>
  );
};
