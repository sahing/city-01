import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const IntercityWheelsLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Sizing variants
  const height = size === 'sm' ? 32 : size === 'lg' ? 56 : 42;

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Precision Metallic Gold & Warm Bronze Silhouette Icon */}
      <svg
        height={height}
        viewBox="0 0 240 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto drop-shadow-[0_2px_10px_rgba(217,119,6,0.25)]"
      >
        <defs>
          {/* Metallic Lustrous Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="55%" stopColor="#D97706" />
            <stop offset="80%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Roof & Highlight Glow */}
          <linearGradient id="roofGlow" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Deep Bronze Accent */}
          <linearGradient id="bronzeDark" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Aerodynamic Sleek Roof Arc & Windshield Cockpit */}
        <path
          d="M 52 35 C 72 23, 98 13, 142 13 C 168 13, 192 18, 222 34 C 208 30, 185 24, 150 24 C 112 24, 84 29, 52 35 Z"
          fill="url(#roofGlow)"
        />

        {/* Sculpted Fastback Roof Line & Rear Quarter Glass */}
        <path
          d="M 64 33 C 78 22, 102 16, 134 16 C 146 16, 158 18, 172 22 C 158 24, 136 26, 118 31 C 94 36, 76 35, 64 33 Z"
          fill="#FFFBEB"
          opacity="0.75"
        />

        {/* Dynamic Sweeping Body Aerofoil (Upper Contour) */}
        <path
          d="M 12 43 C 28 35, 52 31, 80 34 C 112 37, 136 41, 168 41 C 196 41, 218 38, 238 52 C 220 45, 198 44, 172 44 C 138 44, 114 40, 84 37 C 54 34, 32 38, 12 43 Z"
          fill="url(#goldGradient)"
        />

        {/* Mid-Body Muscular Wave Contour */}
        <path
          d="M 22 47 C 42 41, 68 40, 94 44 C 124 48, 148 48, 178 47 C 160 52, 132 53, 106 50 C 76 47, 52 46, 22 47 Z"
          fill="url(#bronzeDark)"
        />

        {/* Aggressive Front Splitter, Wheel Arch, and Rear Spoiler Contour */}
        <path
          d="M 8 46 C 18 43, 26 48, 32 55 C 26 54, 20 53, 14 51 Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M 32 55 C 38 46, 52 45, 66 49 C 84 54, 110 56, 136 55 C 104 58, 74 57, 52 53 C 44 51, 38 52, 32 55 Z"
          fill="url(#goldGradient)"
        />

        {/* Front Wheel Arch & Hood Nose Dip */}
        <path
          d="M 174 48 C 186 46, 198 48, 208 55 C 214 49, 224 48, 236 52 C 226 53, 218 57, 212 63 C 206 56, 194 52, 182 52 Z"
          fill="url(#goldGradient)"
        />
      </svg>

      {/* Brand Typography (Styled exact to the uploaded mark) */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-wider font-extrabold text-[#D97706] font-['Plus_Jakarta_Sans',sans-serif]">
          <span
            className={`font-black tracking-[0.14em] uppercase bg-gradient-to-r from-[#FFFBEB] via-[#F59E0B] to-[#D97706] bg-clip-text text-transparent ${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'
            }`}
          >
            INTERCITY WHEELS
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-bold tracking-[0.24em] uppercase text-[#D97706]/90 ${
              size === 'sm' ? 'text-[8px]' : 'text-[9.5px]'
            }`}
          >
            CONNECTING CITIES, ANYTIME
          </span>
        )}
      </div>
    </div>
  );
};

export const IntercityWheelsIconOnly: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-2xl bg-gradient-to-br from-[#1C160C] via-[#0F0D0A] to-[#000000] border border-[#F59E0B]/30 flex items-center justify-center p-1.5 shadow-[0_2px_12px_rgba(217,119,6,0.2)] ${className}`}
    >
      <svg viewBox="0 0 240 76" fill="none" className="w-full h-auto">
        <path
          d="M 52 35 C 72 23, 98 13, 142 13 C 168 13, 192 18, 222 34 C 208 30, 185 24, 150 24 C 112 24, 84 29, 52 35 Z"
          fill="#FEF3C7"
        />
        <path
          d="M 12 43 C 28 35, 52 31, 80 34 C 112 37, 136 41, 168 41 C 196 41, 218 38, 238 52 C 220 45, 198 44, 172 44 C 138 44, 114 40, 84 37 C 54 34, 32 38, 12 43 Z"
          fill="#F59E0B"
        />
        <path
          d="M 32 55 C 38 46, 52 45, 66 49 C 84 54, 110 56, 136 55 C 104 58, 74 57, 52 53 C 44 51, 38 52, 32 55 Z"
          fill="#D97706"
        />
      </svg>
    </div>
  );
};
