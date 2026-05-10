import { Gavel, History, AlertCircle, Book, Layout, Ban } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function TermsPage() {
  const sections = [
    {
      icon: <Layout className="w-5 h-5 text-gold-500" />,
      title: "1. Subscription Characteristics",
      content: "Access to our exclusive Telegram signals and premium content is provided on a subscription basis. We reserve the absolute right to manually verify any payment via UTR number before granting access. Subscriptions are personal and cannot be transferred or shared."
    },
    {
      icon: <History className="w-5 h-5 text-gold-500" />,
      title: "2. Refunds and Cancellations",
      content: "Due to the digital and immediate nature of our intellectual property and real-time market signals, all payments are strictly final and non-refundable once a subscription is activated and access is granted. No prorated refunds will be issued for partial usage."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-gold-500" />,
      title: "3. Risk Warning & No Guarantee",
      content: (
        <>
          <p>The Capital Guru serves as an educational and informational platform. We are not a registered investment advisor. Financial market trading, particularly in derivatives (F&O), involves an exceptionally high degree of risk.</p>
          <p className="mt-2 font-bold text-white">We do not guarantee any specific returns, profits, or freedom from capital loss. You are solely responsible for executing any trades.</p>
        </>
      )
    },
    {
      icon: <Book className="w-5 h-5 text-gold-500" />,
      title: "4. Intellectual Property Rights (IPR)",
      content: (
        <>
          <p>All materials, inclusive of but not limited to trade signals, analytical reports, and charts, are our exclusive intellectual property.</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Reproduction or reselling of our signals is strictly prohibited.</li>
            <li>Violation will lead to instant termination and potential legal action.</li>
          </ul>
        </>
      )
    },
    {
      icon: <Ban className="w-5 h-5 text-gold-500" />,
      title: "5. Service Discontinuation",
      content: "We reserve the right to modify, suspend, or discontinue any aspect of our services at our sole discretion. In the event of a permanent shutdown initiated by us, ongoing subscriptions may be compensated at our sole discretion."
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
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">User Agreement</h1>
          <p className="text-white/40 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
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

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-16 mt-16 border-t border-white/5 text-sm text-white/30"
        >
          For further queries regarding our terms, please contact <span className="text-gold-500 font-medium">mahir@thecapitalguru.net</span>.
        </motion.div>
      </div>
    </div>
  );
}
