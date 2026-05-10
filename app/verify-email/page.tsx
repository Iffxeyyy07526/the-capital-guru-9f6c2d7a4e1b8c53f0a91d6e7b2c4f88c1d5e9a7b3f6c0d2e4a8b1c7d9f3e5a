'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, ArrowLeft, RefreshCcw } from 'lucide-react';
import * as motion from 'motion/react-client';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { Logo } from '@/components/logo';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleResend = async () => {
    if (!email) {
      toast.error('No email address found');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Verification email resent successfully');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center items-center relative overflow-hidden bg-brand-dark px-4">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="flex justify-center mb-8">
          <Logo variant="monogram" size="lg" />
        </div>

        <div className="bg-brand-black/80 backdrop-blur-xl border border-brand-border rounded-[2rem] p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
          
          <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <Mail className="w-10 h-10 text-gold-500" />
          </div>

          <h1 className="font-display text-3xl font-bold text-white mb-4">Check Your Email</h1>
          <p className="text-white/60 font-light mb-8 leading-relaxed">
            We&apos;ve sent a verification link to <span className="text-white font-medium">{email}</span>. Please click the link to activate your account and start trading.
          </p>

          <button
            onClick={handleResend}
            disabled={isLoading}
            className="w-full h-14 rounded-xl bg-white/[0.03] border border-white/10 text-white font-medium hover:bg-white/[0.06] transition-all flex justify-center items-center gap-3 disabled:opacity-50 mb-6"
          >
            <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Resending...' : 'Resend Verification Email'}
          </button>

          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center text-white/20 uppercase text-[10px] tracking-widest">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
