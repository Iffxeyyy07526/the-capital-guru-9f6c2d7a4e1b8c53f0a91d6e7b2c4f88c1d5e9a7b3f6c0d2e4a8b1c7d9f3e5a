import { AlertTriangle, ShieldCheck, Scale, MousePointer2 } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function DisclaimerPage() {
  const sections = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-500" />,
      title: "1. Purely Educational",
      content: "The materials, signals, and trade setups provided by The Capital Guru are exclusively for educational and observational purposes. Nothing provided herein should be construed as investment or financial advice."
    },
    {
      icon: <Scale className="w-5 h-5 text-gold-500" />,
      title: "2. Liability Waiver",
      content: "We are not registered financial advisors with SEBI. The founders and affiliates of The Capital Guru explicitly disclaim any liability or loss incurred as a consequence of the use of our contents."
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-gold-500" />,
      title: "3. Hypothetical Performance",
      content: "Any past or hypothetical performance showcased is not indicative of future results. F&O trading is extremely volatile and past success does not guarantee future gains."
    },
    {
      icon: <MousePointer2 className="w-5 h-5 text-gold-500" />,
      title: "4. User Responsibility",
      content: "You make your own trading decisions. Under no circumstances should any analysis be taken as a direct signal to buy or sell securities without your own independent verification and risk assessment."
    }
  ];

  return (
    <div className="py-24 bg-brand-dark min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Financial Disclaimer</h1>
          <p className="text-white/40 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (SectionComponent(section, i)))}
        </div>
      </div>
    </div>
  );
}

function SectionComponent(section: any, i: number) {
  return (
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
  );
}
