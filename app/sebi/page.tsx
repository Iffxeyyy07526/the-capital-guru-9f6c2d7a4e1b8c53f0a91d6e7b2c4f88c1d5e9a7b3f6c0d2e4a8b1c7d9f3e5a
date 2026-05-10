import { ShieldAlert, Info, Scale, AlertTriangle, FileCheck } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function SebiGuidelinesPage() {
  const sections = [
    {
      icon: <Scale className="w-5 h-5 text-gold-500" />,
      title: "Registration Status & Intent",
      content: (
        <>
          <p>The Capital Guru serves as an educational research initiative. The information hosted here, including charts, technical structures, analytical breakdowns, and our Telegram updates, is designed strictly for educational and self-learning purposes.</p>
          <p className="font-bold text-gold-400 border border-gold-500/20 bg-gold-500/5 p-4 rounded-xl mt-4">
            We are NOT a SEBI Registered Investment Advisor (RIA) or Research Analyst. Until officially certified by SEBI, no content should be considered specific financial advice.
          </p>
        </>
      )
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-gold-500" />,
      title: "Derivative Trading Risks",
      content: "Trading in the Indian Futures and Options (F&O) market involves a high degree of leverage. Leverage can act against you as well as for you, and the risk of complete capital destruction exists. It is possible to lose more than your initial margin in certain volatile scenarios."
    },
    {
      icon: <FileCheck className="w-5 h-5 text-gold-500" />,
      title: "Independent Decision Making",
      content: "By accessing our dashboard or viewing our strategies, you acknowledge that you have read and understood this SEBI-mandated risk disclosure. Any financial commitments made in the indices or equity markets are your responsibility alone. Always consult a registered financial planner before exposing your portfolio to derivative risks."
    }
  ];

  return (
    <div className="py-24 bg-brand-dark min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">SEBI Disclosure</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-white/90 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <div>
              <h2 className="text-xl font-bold text-red-400 tracking-tight leading-none mb-1">Mandatory Risk Disclosure</h2>
              <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">SEBI CIRCULAR SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/71</p>
            </div>
          </div>
          
          <ul className="space-y-4 font-medium text-white/80">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              9 out of 10 individual traders in equity Futures and Options Segment, incur net losses.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              On an average, loss makers register net trading loss close to ₹ 50,000.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              Over and above the net trading losses incurred, loss makers expend an additional 28% of net trading losses as transaction costs.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              Those making net trading profits, incur between 15% to 50% of such profits as transaction cost.
            </li>
          </ul>
        </motion.div>
        
        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                {section.icon}
                <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
              </div>
              <div className="text-white/60 font-light leading-relaxed prose prose-invert max-w-none">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
