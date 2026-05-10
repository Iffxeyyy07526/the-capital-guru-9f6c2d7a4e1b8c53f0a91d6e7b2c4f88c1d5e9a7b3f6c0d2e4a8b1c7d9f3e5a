'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isLoaded = localStorage.getItem('cg_loaded');
    
    if (!isLoaded) {
      setTimeout(() => setIsVisible(true), 0);
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('cg_loaded', 'true');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808]"
        >
          {/* 0.3-0.8s: Monogram Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="relative w-32 h-32"
          >
            <Image 
              src="/logo.png" 
              alt="The Capital Guru" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>

          {/* 0.8-1.1s: Gold Horizontal Line (center outward) */}
          <div className="relative h-[1px] w-60 my-10 flex justify-center items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 0.3, 
                delay: 0.8,
                ease: "easeInOut"
              }}
              className="h-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
            />
          </div>

          {/* 1.1-1.4s: Text Animation */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.3, 
              delay: 1.1,
              ease: "easeOut"
            }}
            className="text-center"
          >
            <h1 className="font-display font-black text-white tracking-[0.4em] text-sm uppercase">
              THE CAPITAL <span className="text-gold-400">GURU</span>
            </h1>
            <p className="text-[8px] text-white/30 tracking-[0.8em] font-medium mt-2 uppercase">
              Institutional Grade Edge
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
