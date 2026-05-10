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
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'border-white/10 bg-brand-black/90 backdrop-blur-xl py-0 shadow-2xl' : 'border-white/5 bg-brand-black/70 backdrop-blur-xl py-1'}`}>
      <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
        <Link href="/" className="group">
          <Logo size="md" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={`text-sm font-medium transition-colors relative ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-white/70 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/register" className="hidden sm:inline-flex h-10 items-center justify-center rounded bg-white px-6 text-sm font-bold text-black shadow-md hover:bg-gray-100 hover:scale-[1.02] transition-all">
            Get Access
          </Link>
          
          <button 
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border p-4 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-gold-500/10 text-gold-400' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4">
              <Link 
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="h-12 w-full inline-flex items-center justify-center rounded border border-white/10 bg-white/5 px-6 font-bold text-white hover:bg-white/10"
              >
                Login
              </Link>
              <Link 
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)} 
                className="h-12 w-full inline-flex items-center justify-center rounded bg-gradient-to-r from-gold-500 to-gold-600 px-6 font-bold text-black"
              >
                Get Access
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
