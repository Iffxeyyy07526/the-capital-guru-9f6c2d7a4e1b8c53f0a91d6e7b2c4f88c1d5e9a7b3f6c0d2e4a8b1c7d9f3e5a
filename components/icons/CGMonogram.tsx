import React, { useId } from 'react';

export function CGMonogram({ className = "", size = 48 }: { className?: string, size?: number }) {
  const gold = "#c9a84c";
  const maskId = useId();
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Unique Woven Interlock Mask */}
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="white" />
          <circle cx="50" cy="22.3" r="8" fill="black" />
        </mask>
      </defs>

      {/* Hexagon Container */}
      <path 
        d="M50 7.8L89 28.9V71.1L50 92.2L11 71.1V28.9L50 7.8Z" 
        stroke={gold} 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />
      
      {/* 
        LETTER C (Drawn first)
        Centered at 46,50 | Radius 28 | Opens Right (3 o'clock)
      */}
      <path 
        d="M65.8 69.8 A 28 28 0 1 1 65.8 30.2" 
        stroke={gold} 
        strokeWidth="10" 
        strokeLinecap="butt" 
      />
      
      {/* 
        LETTER G (Drawn second with woven mask)
        Centered at 54,50 | Radius 28 | Opens Left (9 o'clock)
      */}
      <g mask={`url(#${maskId})`}>
        <path 
          d="M34.2 30.2 A 28 28 0 1 1 34.2 69.8" 
          stroke={gold} 
          strokeWidth="10" 
          strokeLinecap="butt"
        />
        {/* G Crossbar: Horizontal rectangle extending rightward from opening midpoint */}
        <path 
          d="M26 50 H40" 
          stroke={gold} 
          strokeWidth="10" 
          strokeLinecap="butt"
        />
      </g>
    </svg>
  );
}

