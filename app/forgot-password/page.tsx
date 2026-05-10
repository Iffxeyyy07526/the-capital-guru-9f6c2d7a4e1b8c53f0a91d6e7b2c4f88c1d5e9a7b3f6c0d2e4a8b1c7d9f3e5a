'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import * as motion from 'motion/react-client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { Logo } from '@/components/logo';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsSuccess(true);
        toast.success('Password reset link sent to your email');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center relative overflow-hidden bg-brand-dark px-4">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto"
      >
        <div className="flex justify-center mb-8">
          <Logo variant="monogram" size="lg" />
        </div>

        <div className="bg-brand-black/80 backdrop-blur-xl border border-brand-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">Reset Password</h1>
            <p className="text-white/50 font-light text-sm">Enter your email and we&apos;ll send you a link to reset your password.</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/30" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-light"
                    placeholder="investor@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs pl-1">{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-brand-black font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex justify-center items-center gap-3 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  {isLoading ? 'Processing...' : 'Send Reset Link'}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/20">
                <Mail className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-white font-medium mb-2">Check Your Inbox</h3>
              <p className="text-white/50 text-sm mb-8">We&apos;ve sent a password reset link to your email address.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-gold-400 text-sm hover:text-gold-300 font-medium"
              >
                Didn&apos;t get the email? Try again
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
             <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
