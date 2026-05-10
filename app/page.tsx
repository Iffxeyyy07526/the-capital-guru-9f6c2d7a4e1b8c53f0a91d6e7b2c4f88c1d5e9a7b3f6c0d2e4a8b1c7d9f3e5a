import Link from 'next/link';
import { Shield, ShieldCheck, TrendingUp, Zap, CheckCircle2, ArrowRight, TrendingDown, Target, Star, Quote } from 'lucide-react';
import * as motion from 'motion/react-client';
import { TelegramPhone } from '../components/telegram-phone';
import { Counter } from '@/components/counter';
import { Avatar } from '@/components/avatar';
import { ActivityTicker } from '@/components/activity-ticker';
import { LiveMemberCounter } from '@/components/live-member-counter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Capital Guru | #1 F&O Trading Signals India",
  description: "Decode market structure with institutional-grade Nifty & BankNifty signals. Join 4,800+ elite members getting 80%+ accuracy trades daily.",
};

// Mock signals for the recent dominance section
const RECENT_SIGNALS = [
  { pair: 'BANKNIFTY 48500 CE', type: 'Intraday Option', entry: '310', exit: '480', points: '+170', roi: '54%', action: 'BUY', status: 'All Targets Hit' },
  { pair: 'NIFTY 22400 PE', type: 'Hero Zero', entry: '45', exit: '135', points: '+90', roi: '200%', action: 'BUY', status: 'Triple Return' },
  { pair: 'FINNIFTY 21200 CE', type: 'Scalp', entry: '120', exit: '165', points: '+45', roi: '37%', action: 'BUY', status: 'Target 1 Hit' },
];

const TESTIMONIALS = [
  { name: 'Rahul S.', role: 'Full-time Trader', text: 'I recovered my entire capital lost in 2 years within the first 3 months with The Capital Guru. The risk management is ruthless and the targets are massive.', profit: '₹4.2L Profit this Quarter', img: 33 },
  { name: 'Vikram M.', role: 'IT Professional', text: 'Being busy with my 9-5, I needed precise entries. The pre-market analysis and clear SL/Target alerts directly on Telegram made options trading stress-free.', profit: 'Consistent 15% Monthly ROI', img: 64 },
  { name: 'Aditya K.', role: 'Prop Desk Manager', text: 'Even as an institutional trader, I use their setup to confirm my bias. Their accuracy on BankNifty expiry days is mathematically exceptional.', profit: 'High Volume Scalper', img: 91 },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 px-4 bg-mesh">
        {/* Deep background mesh/glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-carbon opacity-30" />
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold-600/10 rounded-full blur-[180px] opacity-70" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center rounded-sm border border-gold-500/30 bg-black/40 px-5 py-2 text-[10px] sm:text-xs font-bold text-gold-400 mb-10 backdrop-blur-md uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(212,175,55,0.05)]"
            >
              Institutional Grade Trading
            </motion.div>
            
            <motion.div 
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                } 
              }}
              className="mb-10"
            >
              <h1 className="font-sans text-5xl sm:text-7xl md:text-[9rem] md:leading-[0.9] font-black tracking-tighter text-white uppercase mb-2">
                The Edge For
              </h1>
              <span className="font-serif italic text-6xl sm:text-8xl md:text-[8rem] md:leading-[0.9] text-gold-gradient block ml-0 md:ml-2">
                The Top 1%
              </span>
            </motion.div>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="text-white/50 text-sm md:text-base mb-12 max-w-lg leading-relaxed font-light tracking-wide uppercase"
            >
              Providing the mathematically-superior advantage to a limited cohort of 4,800+ elite institutional-grade members since 2021.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Exchange Reach</span>
                <span className="text-white/80 text-xs font-medium">NSE • BSE • F&O</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-brand-border" />
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Performance Index</span>
                <span className="text-white/80 text-xs font-medium">80%+ Verified Alpha</span>
              </div>
              <div className="hidden md:block w-px h-8 bg-brand-border" />
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1">Execution Channel</span>
                <span className="text-white/80 text-xs font-medium">Real-Time Telegram</span>
              </div>
            </motion.div>
            
              <motion.div 
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 }
                }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 w-full sm:w-auto"
              >
                <Link
                  href="/pricing"
                  className="group w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 px-10 text-sm font-bold text-brand-black shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] transition-all overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center gap-2">
                    View Subscription Plans
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-sm border border-brand-border bg-brand-gray/50 backdrop-blur-md px-10 text-sm font-medium text-white hover:bg-brand-border transition-all"
                >
                  Discover Our Edge
                </Link>
              </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[700px] flex items-center justify-center"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-500/20 rounded-full blur-[100px] pointer-events-none" />
             <TelegramPhone />
          </motion.div>
        </div>
      </section>

      {/* Activity Ticker */}
      <ActivityTicker />

      {/* Stats/Ticker Strip */}
      <div className="w-full border-b border-brand-border bg-brand-gray/50 backdrop-blur-sm overflow-hidden py-8">
        <div className="container mx-auto max-w-7xl px-4 flex flex-wrap justify-center gap-10 md:gap-24">
          <div className="flex flex-col items-center">
            <Counter value={80} suffix="%+" className="text-2xl md:text-3xl font-display font-bold text-gold-400 drop-shadow-md" />
            <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">Avg Accuracy</span>
          </div>
          <div className="flex flex-col items-center">
            <Counter value={60} suffix="" prefix="40-" className="text-2xl md:text-3xl font-display font-bold text-gold-400 drop-shadow-md" />
            <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">Monthly Signals</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-display font-bold text-gold-400 drop-shadow-md">1:2</span>
            <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">Min Risk/Reward</span>
          </div>
          <div className="flex flex-col items-center">
            <LiveMemberCounter />
            <span className="text-xs uppercase tracking-widest text-white/40 mt-2 font-semibold">Active Elite Members</span>
          </div>
        </div>
      </div>

      {/* Recent Signals / Performance Section */}
      <section className="py-24 bg-brand-black relative border-b border-brand-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Recent Market <span className="text-gold-500">Dominance</span></h2>
             <p className="text-gray-400 font-light text-lg">We let our results do the talking. Here are verified recent setups captured by our elite members.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {RECENT_SIGNALS.map((signal, i) => {
              if (!signal) return null;
              return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-brand-gray/40 border border-brand-border rounded-3xl p-6 hover:border-gold-500/30 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-trade-green/5 rounded-full blur-2xl group-hover:bg-trade-green/10 transition-colors" />
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-brand-black border border-brand-border px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-3 inline-block">
                      {signal.type}
                    </span>
                    <h3 className="font-bold text-xl text-white">{signal.pair}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${signal.action === 'BUY' ? 'bg-trade-green/10 text-trade-green' : 'bg-trade-red/10 text-trade-red'}`}>
                    {signal.action === 'BUY' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 bg-brand-black/50 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="block text-xs text-white/40 mb-1 uppercase tracking-wider font-semibold">Entry Level</span>
                    <span className="font-mono text-lg text-white">₹{signal.entry}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-white/40 mb-1 uppercase tracking-wider font-semibold">Exit Level</span>
                    <span className="font-mono text-lg text-white">₹{signal.exit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-border pt-4">
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest mb-1 font-semibold">Profit</span>
                    <span className="text-xl font-bold text-trade-green">
                      {signal.points} Pts <span className="text-sm font-medium opacity-80">(<Counter value={parseInt(signal.roi)} suffix="%" />)</span>
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <Target className="w-4 h-4 text-gold-500 mb-1" />
                    <span className="text-[11px] font-bold text-gold-500 uppercase tracking-wider pulse-green">{signal.status}</span>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 md:py-32 bg-brand-dark relative border-b border-brand-border">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight">Systematic. Ruthless. <span className="text-white/40">Profitable.</span></h2>
            <p className="text-lg text-white/50 font-light">We don&apos;t just provide signals; we provide a systematic infrastructure for extracting consistent alpha from the markets.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <TrendingUp className="h-6 w-6 text-gold-400" />,
                title: 'High-Probability Setups',
                description: 'Our proprietary algorithms and expert analysts filter the noise to deliver only the most lucrative F&O opportunities. No overtrading.'
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-gold-400" />,
                title: 'Strict Risk Management',
                description: 'Every signal comes with predefined stop-loss and multiple target levels. Capital preservation is our highest institutional priority.'
              },
              {
                icon: <Zap className="h-6 w-6 text-gold-400" />,
                title: 'Real-Time Delivery',
                description: 'Instant execution alerts sent directly to your Telegram. Millisecond precision so you never miss a critical market move again.'
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="group relative p-8 md:p-10 rounded-[2rem] border border-brand-border bg-brand-black hover:border-gold-500/40 hover:bg-brand-gray/80 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-brand-border flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 group-hover:bg-gold-500/10 group-hover:border-gold-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-white">{feature.title}</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-brand-black relative">
         <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">What The <span className="text-gold-500">1%</span> Say</h2>
              <p className="text-gray-400 font-light text-lg">Elite traders who have scaled their portfolios using our precise execution models.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((col, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-brand-gray/30 border border-brand-border p-8 rounded-[2rem] relative hover:border-gold-500/20 transition-all group"
                >
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-white/[0.03] group-hover:text-gold-500/10 transition-colors" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-gold-500 text-gold-500" />)}
                  </div>
                  <p className="text-white/80 font-light leading-relaxed mb-8 relative z-10 text-lg">&quot;{col.text}&quot;</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar name={col.name} />
                    <div>
                      <h4 className="font-bold text-white text-sm">{col.name}</h4>
                      <p className="text-xs text-white/40">{col.role}</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-brand-border">
                    <span className="inline-block bg-trade-green/10 text-trade-green text-xs font-bold px-3 py-1.5 rounded-full">
                      {col.profit}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-brand-dark border-t border-brand-border">
        <div className="absolute inset-0 bg-gold-600/5 mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/1000/1000')] opacity-5 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">Stop Gambling. <br/> <span className="text-gold-500">Start Trading.</span></h2>
            <p className="text-xl text-white/50 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Join elite traders who rely on our systematic approach to navigate the highly volatile Indian options market with precision.
            </p>
            <Link
              href="/pricing"
              className="inline-flex h-16 items-center justify-center rounded-sm bg-gradient-to-r from-gold-400 to-gold-600 px-12 text-black font-bold text-lg shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300"
            >
              Secure Your Access Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
