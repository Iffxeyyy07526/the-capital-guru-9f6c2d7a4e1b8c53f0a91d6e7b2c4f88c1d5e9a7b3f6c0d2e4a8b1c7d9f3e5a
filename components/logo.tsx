'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'wordmark' | 'monogram';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LOGO_URL = 'https://i.ibb.co/Y7wKvYJ5/122151.png';

export function Logo({ className = '', variant = 'wordmark', size = 'md' }: LogoProps) {
  const monogramSizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 100,
  };

  if (variant === 'monogram') {
    const s = monogramSizeMap[size];
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image 
          src={LOGO_URL} 
          alt="The Capital Guru" 
          width={s}
          height={s}
          className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] saturate-[1.1]"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative overflow-hidden group">
        <Image 
          src={LOGO_URL} 
          alt="The Capital Guru" 
          width={size === 'sm' ? 36 : size === 'md' ? 48 : 64}
          height={size === 'sm' ? 36 : size === 'md' ? 48 : 64}
          className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-black tracking-tighter text-white uppercase text-[1.1rem] sm:text-[1.25rem] lg:text-[1.5rem] xl:text-[1.75rem]">
          THE CAPITAL <span className="text-gold-gradient drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">GURU</span>
        </span>
        <span className="text-[9px] tracking-[0.3em] text-white/50 font-bold uppercase mt-1.5 flex items-center gap-2">
          <span className="w-1 h-px bg-gold-600/50" />
          Institutional Grade Edge
        </span>
      </div>
    </div>
  );
}
