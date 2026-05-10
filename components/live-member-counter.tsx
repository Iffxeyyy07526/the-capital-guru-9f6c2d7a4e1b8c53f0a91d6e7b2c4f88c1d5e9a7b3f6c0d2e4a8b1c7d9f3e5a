'use client';

import { useState, useEffect } from 'react';
import { Counter } from './counter';

export function LiveMemberCounter() {
  const [count, setCount] = useState(4821);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, Math.random() * (90000 - 45000) + 45000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Counter 
      value={count} 
      suffix="+" 
      className="text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 drop-shadow-md" 
    />
  );
}
