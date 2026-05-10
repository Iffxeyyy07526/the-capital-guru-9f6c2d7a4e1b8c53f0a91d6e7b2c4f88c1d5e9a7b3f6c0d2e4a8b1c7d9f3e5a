'use client';

import * as motion from 'motion/react-client';

const NOTIFICATIONS = [
  "Rahul S. just joined the Platinum Channel",
  "Priya M. renewed her Elite membership",
  "Aditya K. secured a +170 pts gain on BANKNIFTY",
  "New institutional trade alert posted in NIFTY",
  "Vikram M. reached 15% monthly ROI milestone",
  "5 spots remaining for the bi-annual discount",
  "Sameer K. just joined from Mumbai",
  "Deepak R. verified 3 successful target hits",
];

export function ActivityTicker() {
  return (
    <div className="w-full bg-brand-black/40 border-y border-white/5 py-3 relative overflow-hidden backdrop-blur-sm">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-brand-black to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-brand-black to-transparent z-10" />
      
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-12 items-center"
        >
          {[...NOTIFICATIONS, ...NOTIFICATIONS].map((note, i) => (
            <div key={i} className="flex items-center gap-3 text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">
              <span className="w-1 h-1 rounded-full bg-gold-500" />
              {note}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
