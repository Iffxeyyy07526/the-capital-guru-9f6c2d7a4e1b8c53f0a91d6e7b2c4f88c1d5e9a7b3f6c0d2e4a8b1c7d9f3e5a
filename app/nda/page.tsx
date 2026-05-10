import { Lock, FileWarning, ShieldX, BookKey } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function NDAPage() {
  const sections = [
    {
      icon: <BookKey className="w-5 h-5 text-gold-500" />,
      title: "1. Definition of Confidential Information",
      content: "\"Confidential Information\" refers to any proprietary system, algorithms, specific market setups, entry/exit calls, educational documents, and private Telegram channel contents shared under your subscription."
    },
    {
      icon: <FileWarning className="w-5 h-5 text-gold-500" />,
      title: "2. Strict Prohibition on Sharing",
      content: "The Receiving Party agrees not to reproduce, screenshot, screen-record, forward, publish, or redistribute any Confidential Information to public forums or other trading communities."
    },
    {
      icon: <ShieldX className="w-5 h-5 text-gold-500" />,
      title: "3. Consequences of Breach",
      content: "If our systems detect anomalous activity (e.g., scraping, public leaks), your access will be instantly and permanently revoked without a refund. We reserve the right to pursue civil damages for intellectual property theft."
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
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Non-Disclosure Agreement</h1>
          <p className="text-white/40 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-white/60 font-light leading-relaxed mb-12"
          >
            This Digital Non-Disclosure Agreement defines the confidential boundaries between <span className="text-white font-medium">The Capital Guru</span> and you, the user. By purchasing a subscription, you legally agree to these stipulations.
          </motion.div>

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
