import Link from 'next/link';
import { Mail, Send, Instagram, Phone } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black relative overflow-hidden">
      {/* Background glow top right */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="md:col-span-2">
            <Link href="/" className="mb-6 block group">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-white/50 max-w-md mb-8 font-light leading-relaxed">
              Premium trading signals for the Indian market. Precision entries, expertly managed risk, and consistent growth for the serious trader.
            </p>
            <div className="flex flex-col gap-4 text-sm text-white/60">
              <a href="mailto:mahir@thecapitalguru.net" className="flex items-center gap-3 hover:text-gold-400 transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                mahir@thecapitalguru.net
              </a>
              <a href="https://t.me/TheCapitalGuruSupport" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-400 transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                  <Send className="h-4 w-4 ml-[-2px]" />
                </span>
                @TheCapitalGuruSupport
              </a>
              <a href="https://wa.me/919106713107" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-400 transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </span>
                +91 9106713107
              </a>
              <a href="https://www.instagram.com/thecapitalguruglobal/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold-400 transition-colors group">
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                  <Instagram className="h-4 w-4" />
                </span>
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6 font-display tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-4 text-sm font-light text-white/50">
              <li><Link href="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link href="/pricing" className="hover:text-gold-400 transition-colors">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-gold-400 transition-colors">Client Portal</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link href="/blogs" className="hover:text-gold-400 transition-colors">Market Blogs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6 font-display tracking-wide uppercase text-sm">Legal & Compliance</h3>
            <ul className="space-y-4 text-sm font-light text-white/50">
              <li><Link href="/terms" className="hover:text-gold-400 transition-colors">User Agreement</Link></li>
              <li><Link href="/sebi" className="hover:text-gold-400 transition-colors flex items-center gap-2">SEBI Guidelines <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 block shrink-0"></span></Link></li>
              <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-gold-400 transition-colors">Financial Disclaimer</Link></li>
              <li><Link href="/nda" className="hover:text-gold-400 transition-colors">NDA</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-light text-white/30 gap-6">
          <p className="tracking-wide">© {new Date().getFullYear()} The Capital Guru. Dominating the Markets.</p>
          <p className="max-w-xl text-center md:text-right leading-relaxed border border-white/5 bg-white/[0.02] p-3 rounded text-[10px] uppercase tracking-wider">
            Disclaimer: Trading in financial markets involves high risk and may not be suitable for all investors. 
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}
