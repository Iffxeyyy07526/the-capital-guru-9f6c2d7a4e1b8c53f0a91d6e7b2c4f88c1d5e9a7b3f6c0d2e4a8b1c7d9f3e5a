'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'wordmark' | 'monogram';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', variant = 'wordmark', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
    xl: 'h-16',
  };

  const monogramSizeMap = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 80,
  };

  if (variant === 'monogram') {
    const s = monogramSizeMap[size];
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image 
          src="/logo.png" 
          alt="The Capital Guru" 
          width={s}
          height={s}
          className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        />
      </div>
    );
  }

  const wordmarkSizes = {
    sm: { width: 120, height: 27 },
    md: { width: 180, height: 40 },
    lg: { width: 240, height: 54 },
    xl: { width: 320, height: 72 },
  };

  const { width, height } = wordmarkSizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative overflow-hidden">
        <Image 
          src="/logo.png" 
          alt="The Capital Guru" 
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 64}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-black tracking-tighter text-white uppercase" style={{ fontSize: size === 'xl' ? '1.5rem' : size === 'lg' ? '1.25rem' : '1.1rem' }}>
          THE CAPITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">GURU</span>
        </span>
        <span className="text-[8px] tracking-[0.25em] text-white/40 font-bold uppercase mt-1">Institutional Grade Edge</span>
      </div>
    </div>
  );
}
