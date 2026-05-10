import { Target, Zap, ShieldAlert, Award } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function AboutPage() {
  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-brand-gray/30 to-transparent pointer-events-none" />
      <div className="absolute -left-[500px] top-[20%] w-[1000px] h-[1000px] bg-gold-500/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-4 block">The Capital Guru</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Our Edge Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Your Edge</span></h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-brand-black/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
            We are a collective of seasoned market veterans and quantitative analysts dedicated to providing retail traders with institutional-grade edge in the highly competitive Indian derivatives market.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-brand-gray/30 border border-white/5 p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors">
            <Target className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3 font-display">Quality Over Quantity</h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              We do not overtrade. We wait patiently for high-probability setups, striking only when the market aligns with our strict algorithmic and price action models.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-brand-gray/30 border border-white/5 p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors">
            <ShieldAlert className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3 font-display">Capital Preservation First</h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              The first rule of trading is survival. Every single setup comes with precise invalidation levels and strict stop losses. We prioritize protecting your portfolio.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-brand-gray/30 border border-white/5 p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors">
            <Zap className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3 font-display">Complete Transparency</h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              No vague &quot;buy around here&quot; calls. All trades are binary and clearly defined with exact Entry points, Stop Loss, and multiple staged Targets.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-brand-gray/30 border border-white/5 p-8 rounded-3xl group hover:bg-white/[0.02] transition-colors">
            <Award className="w-10 h-10 text-gold-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3 font-display">Relentless Execution</h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              Trading F&O requires split-second decision making. Our private Telegram infrastructure ensures you receive signals instantly without latency.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
