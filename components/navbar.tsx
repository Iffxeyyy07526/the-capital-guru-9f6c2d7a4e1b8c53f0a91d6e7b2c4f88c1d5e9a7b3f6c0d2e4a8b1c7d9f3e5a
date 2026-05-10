'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Logo } from './logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Blogs', href: '/blogs' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? 'py-4 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_50px_rgba(0,0,0,0.5)]' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="group relative z-[60] flex items-center gap-3">
            <Logo size={isScrolled ? 'sm' : 'md'} />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-full px-8 py-2.5 gap-10 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group/nav ${
                    isActive ? 'text-gold-400' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.name}
                  <div className={`absolute -bottom-1 left-0 h-[1px] bg-gold-500/50 transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'}`} />
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center gap-6 relative z-[60]">
            <Link 
              href="/login" 
              className="hidden sm:block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all hover:tracking-[0.3em]"
            >
              Portal Login
            </Link>
            
            <Link 
              href="/register" 
              className="hidden sm:inline-flex h-11 items-center justify-center rounded-sm bg-gold-gradient px-8 text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-500"
            >
              Get Access
            </Link>
            
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-[1.5px] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <div className={`w-6 h-[1.5px] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-50'}`} />
              <div className={`w-6 h-[1.5px] bg-white transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[55] bg-black pointer-events-auto lg:hidden"
      >
        <div className="absolute inset-0 bg-carbon opacity-20" />
        <div className="absolute top-0 right-0 w-full h-full bg-mesh opacity-30" />
        
        <div className="relative h-full flex flex-col justify-center px-10 gap-12">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={false}
                  animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-4xl font-black uppercase tracking-tighter transition-all ${
                      isActive ? 'text-gold-gradient pl-4 border-l-2 border-gold-500' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          
          <motion.div 
            initial={false}
            animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col gap-4 border-t border-white/10 pt-10"
          >
            <Link 
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)} 
              className="h-14 w-full inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 font-black uppercase tracking-[0.3em] text-[11px] text-white hover:bg-white/10"
            >
              Account Login
            </Link>
            <Link 
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)} 
              className="h-14 w-full inline-flex items-center justify-center rounded-sm bg-gold-gradient font-black uppercase tracking-[0.3em] text-[11px] text-black shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
            >
              Start Trading Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
