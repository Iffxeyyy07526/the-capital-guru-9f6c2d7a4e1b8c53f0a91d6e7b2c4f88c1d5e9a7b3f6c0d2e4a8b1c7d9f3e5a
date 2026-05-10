import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import * as motion from 'motion/react-client';

const tiers = [
  {
    name: 'Pro Monthly',
    id: 'monthly',
    price: '₹2,499',
    description: 'Perfect for getting started and testing the waters with premium signals.',
    features: [
      '2-3 High Probability Trades Daily',
      'NSE/BSE Futures & Options',
      'Real-time Telegram Alerts',
      'Pre-market Analysis',
      'Risk Management Targets',
    ],
    mostPopular: false,
  },
  {
    name: 'Elite Bi-Annual',
    id: 'six-monthly',
    price: '₹11,999',
    description: 'Our most popular plan. Commit to growth with a substantial discount.',
    features: [
      'Everything in Pro Monthly',
      'Direct Support via Telegram',
      'Weekly Market Wrap-ups',
      'Save ₹2,995 vs Monthly',
      'Priority Trade Execution',
    ],
    mostPopular: true,
  },
  {
    name: 'Mastery Annual',
    id: 'yearly',
    price: '₹19,999',
    description: 'For serious traders committed to long-term compounding and success.',
    features: [
      'Everything in Elite',
      '1-on-1 Strategy Session',
      'Exclusive Learning Resources',
      'Save ₹9,989 vs Monthly',
      'VIP Telegram Channel Access',
    ],
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-gold-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">Invest In Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Edge</span></h1>
            <p className="text-lg text-white/50 font-light leading-relaxed">
              Choose the commitment level that matches your trading goals. 
              All plans provide access to the same institutional-grade signals.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex flex-col p-8 sm:p-10 rounded-3xl border backdrop-blur-sm transition-all duration-300 ${
                tier.mostPopular 
                  ? 'border-gold-500 bg-gradient-to-b from-gold-500/20 to-brand-black shadow-[0_0_60px_rgba(212,175,55,0.2)] lg:-translate-y-4 shimmer-bg' 
                  : 'border-white/10 bg-brand-black hover:bg-brand-gray hover:border-white/20'
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-1 text-[10px] font-bold tracking-widest text-brand-black uppercase shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">{tier.name}</h3>
                <p className="text-sm text-white/50 mb-8 min-h-[40px] font-light">{tier.description}</p>
                <div className="flex items-baseline text-5xl font-display font-bold tracking-tight text-white">
                  {tier.price}
                  <span className="text-lg text-white/40 font-sans font-normal ml-2">
                    /{tier.id === 'monthly' ? 'mo' : tier.id === 'six-monthly' ? '6mo' : 'yr'}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              <ul className="mb-10 flex-1 space-y-5">
                {tier.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start">
                    <Check className="h-5 w-5 text-gold-400 shrink-0 mr-4" />
                    <span className="text-sm text-white/80 font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/payment/${tier.id}`}
                className={`mt-auto w-full h-14 inline-flex items-center justify-center rounded-sm px-8 text-sm font-bold transition-all duration-300 group overflow-hidden relative ${
                  tier.mostPopular
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-brand-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {tier.mostPopular && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
                <span className="relative">Select {tier.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center max-w-2xl mx-auto border border-white/5 rounded-2xl p-8 bg-brand-gray/30 backdrop-blur-md"
        >
          <ShieldCheck className="h-8 w-8 text-gold-500 mx-auto mb-4" />
          <h4 className="font-semibold text-white mb-2 tracking-wide">100% Manual Verification</h4>
          <p className="text-sm text-white/50 font-light">
            To ensure the highest quality community and prevent fraud, all payments are processed safely via UPI and verified manually by our team before access is granted.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
