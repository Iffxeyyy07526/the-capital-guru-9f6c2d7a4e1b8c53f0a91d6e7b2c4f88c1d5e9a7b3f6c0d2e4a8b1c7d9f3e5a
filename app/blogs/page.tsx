import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'motion/react-client';

const BLOG_POSTS = [
// ... existing BLOG_POSTS (I will keep them but use multi_edit or just replace the component part)
  { title: "Understanding the Mechanics of Nifty Weekly Expiries", category: "Options", date: "May 10, 2026", excerpt: "Weekly expiries have fundamentally changed the liquidity landscape of the Nifty 50. Discover how to navigate gamma spikes." },
  { title: "Price Action vs Indicators: Finding Your Edge", category: "Technical", date: "May 09, 2026", excerpt: "Why pure price action often beats lagging indicators in high-frequency volatile markets." },
  { title: "The Psychology of Handling Consecutive Stop Losses", category: "Psychology", date: "May 08, 2026", excerpt: "Losing streaks are inevitable. How institutional traders maintain composure and protect their capital." },
  { title: "Decoding BankNifty Volatility Index (VIX)", category: "Options", date: "May 07, 2026", excerpt: "How to interpret the Indian VIX to adjust your position sizing effectively." },
  { title: "Iron Condors in a Sideways Market", category: "Strategies", date: "May 06, 2026", excerpt: "A deep dive into constructing Delta-neutral strategies when indices refuse to trend." },
  { title: "The Importance of Pre-Market Analysis", category: "Preparation", date: "May 05, 2026", excerpt: "How to read global cues and SGX Nifty to form a robust thesis before the 9:15 AM bell." },
  { title: "Why Retail Traders Fail at Options Buying", category: "Analysis", date: "May 04, 2026", excerpt: "Exploring Theta decay and the fundamental mathematical disadvantage of buying OTM options." },
  { title: "Risk Management: The 1% Rule", category: "Risk", date: "May 03, 2026", excerpt: "Why risking more than 1% of your account per trade is a mathematical suicide mission." },
  { title: "Identifying Institutional Support and Resistance", category: "Technical", date: "May 02, 2026", excerpt: "How to spot smart money footprints using volume profiles and order block theory." },
  { title: "Mastering the Breakout Trade", category: "Strategies", date: "May 01, 2026", excerpt: "Differentiating between genuine technical breakouts and liquidity grabs (fakeouts)." },
  { title: "The Role of Global Markets on Indian Indices", category: "Macro", date: "Apr 30, 2026", excerpt: "How US inflation data and Fed rate hikes impact Nifty and BankNifty." },
  { title: "Options Selling: Collecting Premium Like a Casino", category: "Strategies", date: "Apr 29, 2026", excerpt: "Understanding the high win-rate, undefined risk world of shorting options." },
  { title: "How to Keep a Professional Trading Journal", category: "Preparation", date: "Apr 28, 2026", excerpt: "Tracking emotions, mistakes, and metrics to continuously refine your edge." },
  { title: "Using Fibonacci Retracements Effectively", category: "Technical", date: "Apr 27, 2026", excerpt: "The golden ratio in financial markets: Myths, realities, and practical applications." },
  { title: "Understanding Option Greeks: Delta, Gamma, Theta, Vega", category: "Options", date: "Apr 26, 2026", excerpt: "The four fundamental variables that determine the pricing of every options contract." },
  { title: "Sector Rotation: Finding the Next Mover", category: "Analysis", date: "Apr 25, 2026", excerpt: "How money flows between IT, Banking, Auto, and Pharma sectors during market cycles." },
  { title: "The Deadly Sin of Revenge Trading", category: "Psychology", date: "Apr 24, 2026", excerpt: "How the desire to 'win back' losses destroys more accounts than poor strategy." },
  { title: "Algorithmic Trading: The Future of Retail?", category: "Tech", date: "Apr 23, 2026", excerpt: "Demystifying algos and how retail traders can leverage basic automation." },
  { title: "Trading the First 15 Minutes: Opening Range Breakout", category: "Strategies", date: "Apr 22, 2026", excerpt: "The high-risk, high-reward environment of the morning AM session." },
  { title: "Understanding the Put-Call Ratio (PCR)", category: "Options", date: "Apr 21, 2026", excerpt: "Using the PCR as a contrarian indicator to spot market tops and bottoms." },
  { title: "Handling Gap-Ups and Gap-Downs", category: "Strategies", date: "Apr 20, 2026", excerpt: "Do gaps always fill? How to structure a trade when the market opens with a massive gap." },
  { title: "The Myth of the Holy Grail Indicator", category: "Psychology", date: "Apr 19, 2026", excerpt: "Why constantly switching trading systems guarantees long-term failure." },
  { title: "Building a Watchlist Like a Pro", category: "Preparation", date: "Apr 18, 2026", excerpt: "Filtering out the noise and selecting the top 5 relative strength stocks to trade." },
  { title: "What is Open Interest (OI) Analysis?", category: "Options", date: "Apr 17, 2026", excerpt: "Tracking where the big option writers are defending their strikes." },
  { title: "The Impact of Corporate Earnings on Price Action", category: "Fundamental", date: "Apr 16, 2026", excerpt: "Trading the volatility crush around quarterly result announcements." },
  { title: "Understanding Margin Requirements in F&O", category: "Account", date: "Apr 15, 2026", excerpt: "How SEBI's margin rules dictate your position sizing and leverage." },
  { title: "Scaling Up: Moving from 1 Lot to 10 Lots", category: "Psychology", date: "Apr 14, 2026", excerpt: "Overcoming the mental block of handling larger position sizes." },
  { title: "The Truth About Trading Gurus", category: "Industry", date: "Apr 13, 2026", excerpt: "How to differentiate between genuine educators and marketers selling dreams." },
  { title: "Trading the End of Day (EOD) Spike", category: "Strategies", date: "Apr 12, 2026", excerpt: "Capitalizing on the 2:30 PM to 3:30 PM institutional rebalancing." },
  { title: "Why Routine is Your Ultimate Edge", category: "Preparation", date: "Apr 11, 2026", excerpt: "How establishing strict daily habits builds the discipline required for profitable trading." }
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-[10%] w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-gold-500 uppercase tracking-widest text-xs font-bold mb-4 block">Market Insights</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The 1% Knowledge Hub</h1>
          <p className="text-white/60 font-light text-lg">
            Master the intricacies of price action, risk management, and trading psychology with our deep-dive articles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="bg-brand-black/50 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-gold-500/20 transition-all group flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-white/40 flex items-center gap-1.5 font-light">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-gold-400 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-sm text-white/50 font-light leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-medium text-white/70 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold-500/70" />
                  5 min read
                </span>
                
                <button className="text-gold-400 hover:text-gold-300 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
