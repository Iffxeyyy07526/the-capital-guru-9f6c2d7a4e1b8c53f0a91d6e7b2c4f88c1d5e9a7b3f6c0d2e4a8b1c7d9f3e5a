'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCheck, TrendingUp, TrendingDown, Target, Zap, ShieldCheck } from 'lucide-react';

type Message = {
  id: number;
  type: 'system' | 'signal' | 'update' | 'result';
  text?: string;
  time: string;
  signalData?: {
    pair: string;
    action: 'BUY' | 'SELL';
    entry: string;
    sl: string;
    targets: string[];
  };
  resultData?: {
    pair: string;
    points: number;
    target: number;
  };
};

const MOCK_MESSAGES: Message[] = [
  { id: 1, type: 'system', text: 'Rahul joined via VIP invite link', time: '09:12 AM' },
  { id: 2, type: 'system', text: 'Priya joined via VIP invite link', time: '09:14 AM' },
  { 
    id: 3, 
    type: 'signal', 
    time: '09:20 AM',
    signalData: {
      pair: 'BANKNIFTY 47500 CE',
      action: 'BUY',
      entry: '320 - 330',
      sl: '280',
      targets: ['380', '450', '520']
    }
  },
  { id: 4, type: 'update', text: '⚡ BANKNIFTY moving fast. Entry triggered perfectly.', time: '09:22 AM' },
  { 
    id: 5, 
    type: 'result', 
    time: '09:28 AM',
    resultData: {
      pair: 'BANKNIFTY 47500 CE',
      target: 1,
      points: 60
    }
  },
  { id: 6, type: 'update', text: 'Trail SL to cost. Risk free trade now! 🛡️', time: '09:30 AM' },
  { 
    id: 7, 
    type: 'result', 
    time: '09:45 AM',
    resultData: {
      pair: 'BANKNIFTY 47500 CE',
      target: 2,
      points: 130
    }
  },
  { 
    id: 8, 
    type: 'signal', 
    time: '11:15 AM',
    signalData: {
      pair: 'NIFTY 22400 PE',
      action: 'BUY',
      entry: '115 - 120',
      sl: '90',
      targets: ['150', '180']
    }
  },
  { id: 9, type: 'system', text: 'Vikram joined via VIP invite link', time: '11:20 AM' },
];

export function TelegramPhone() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES.slice(0, 2));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 2;

    const interval = setInterval(() => {
      if (currentIndex < MOCK_MESSAGES.length) {
        setMessages(prev => [...prev, MOCK_MESSAGES[currentIndex]]);
        currentIndex++;
        
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 100);
      } else {
        currentIndex = 0;
        setMessages([]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      animate={{ 
        y: [0, -15, 0],
        rotate: [-2, -1, -2]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="relative mx-auto w-[320px] h-[650px] bg-[#0E1621] rounded-[3.5rem] border-[10px] border-[#1a1a1a] shadow-[0_0_60px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col font-sans z-20"
    >
      
      {/* Hardware Accents */}
      <div className="absolute top-0 inset-x-0 h-7 bg-[#1a1a1a] rounded-b-3xl w-[140px] mx-auto z-30 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
        <div className="w-12 h-1.5 rounded-full bg-[#0a0a0a]" />
      </div>

      <div className="absolute -left-[10px] top-[120px] w-1 h-[40px] bg-[#2a2a2a] rounded-r-md z-0" />
      <div className="absolute -left-[10px] top-[180px] w-1 h-[60px] bg-[#2a2a2a] rounded-r-md z-0" />
      <div className="absolute -right-[10px] top-[150px] w-1 h-[80px] bg-[#2a2a2a] rounded-l-md z-0" />

      {/* Screen Glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-40" />

      {/* Telegram Header */}
      <div className="bg-[#17212B] pt-12 pb-3 px-4 flex items-center gap-3 z-20 shadow-md">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg relative">
          <span className="font-bold text-[#0E1621] text-sm">CG</span>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#17212B]"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-[15px] leading-tight">THE CAPITAL GURU</h2>
          <p className="text-[#6C7883] text-xs">4,821 VIP Members</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scroll-smooth bg-[#0E1621] custom-scrollbar pb-20"
        style={{ backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.03) 0%, transparent 100%)' }}
      >
        <div className="text-center">
          <span className="bg-[#182533] text-[#6C7883] text-[11px] px-3 py-1 rounded-full font-medium">
            Today
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            if (!msg) return null;
            return (
            <motion.div
              key={`${msg.id}-${index}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {msg.type === 'system' && (
                <div className="text-center my-2">
                  <span className="bg-[#182533] text-[#6C7883] text-[11px] px-3 py-1 rounded-full font-medium inline-flex items-center gap-1.5">
                    <Zap className="w-3 h-3 fill-gold-500 text-gold-500" />
                    {msg.text}
                  </span>
                </div>
              )}

              {msg.type === 'update' && (
                <div className="flex justify-start mb-2">
                  <div className="bg-[#182533] text-[#f5f5f5] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] shadow-sm relative">
                    <p className="text-[14px] leading-snug">{msg.text}</p>
                    <div className="text-right mt-1">
                      <span className="text-[#6C7883] text-[10px]">{msg.time}</span>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'signal' && msg.signalData && (
                <div className="flex justify-start mb-2">
                  <div className="bg-[#182533] border border-gold-500/20 text-[#f5f5f5] rounded-2xl rounded-tl-sm p-3 max-w-[90%] shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center gap-2 mb-2 bg-[#0E1621] p-1.5 rounded-lg border border-white/5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${msg.signalData.action === 'BUY' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {msg.signalData.action === 'BUY' ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                      </div>
                      <span className="font-bold text-[14px]">{msg.signalData.pair}</span>
                    </div>
                    
                    <div className="space-y-1.5 pl-1">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/50">Action:</span>
                        <span className={`font-bold ${msg.signalData.action === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>{msg.signalData.action}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/50">Entry:</span>
                        <span className="font-semibold">{msg.signalData.entry}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/50">SL:</span>
                        <span className="font-semibold text-red-500">{msg.signalData.sl}</span>
                      </div>
                      <div className="w-full h-px bg-white/5 my-1" />
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/50">Targets:</span>
                        <span className="font-semibold text-gold-400">{msg.signalData.targets.join(' — ')}</span>
                      </div>
                    </div>
                    
                    <div className="text-right mt-2 flex justify-between items-center">
                       <span className="flex items-center gap-1 bg-gold-500/10 text-gold-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                         <ShieldCheck className="w-3 h-3" /> Verified
                       </span>
                      <span className="text-[#6C7883] text-[10px]">{msg.time}</span>
                    </div>
                  </div>
                </div>
              )}

              {msg.type === 'result' && msg.resultData && (
                <div className="flex justify-start mb-2">
                  <div className="bg-[#182533] border-l-4 border-green-500 text-[#f5f5f5] rounded-r-2xl border-y border-r border-[#2d3a4b] p-3 max-w-[85%] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center gap-2 mb-1 z-10 relative">
                      <Target className="w-4 h-4 text-green-500 fill-green-500/20" />
                      <span className="font-bold text-[14px]">TARGET {msg.resultData.target} HIT 🎯</span>
                    </div>
                    <p className="text-[13px] text-white/80 mb-1 z-10 relative">
                      {msg.resultData.pair} exploded!
                    </p>
                    <p className="text-[15px] font-bold text-green-500 z-10 relative">
                      +{msg.resultData.points} Points Locked 💰
                    </p>
                    <div className="text-right mt-1 z-10 relative">
                      <span className="text-[#6C7883] text-[10px]">{msg.time}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input UI */}
      <div className="absolute bottom-0 inset-x-0 bg-[#17212B] p-3 border-t border-[#2d3a4b] flex gap-2 items-center z-20">
        <div className="w-8 h-8 rounded-full bg-[#2B5278] flex items-center justify-center blur-[1px]"></div>
        <div className="flex-1 h-9 rounded-full bg-[#242F3D] border border-white/5 mx-1 opacity-50"></div>
        <div className="w-8 h-8 rounded-full bg-gold-600/50 flex items-center justify-center blur-[1px]"></div>
      </div>
      
    </motion.div>
  );
}
