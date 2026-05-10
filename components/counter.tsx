'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

export function Counter({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className = ''
}: { 
  value: number, 
  duration?: number, 
  prefix?: string, 
  suffix?: string,
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}
