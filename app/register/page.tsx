'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import * as motion from 'motion/react-client';
import { toast } from 'sonner';
import { Logo } from '@/components/logo';

import { createClient } from '@/lib/supabase/client';

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid mobile number' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setIsSuccess(true);
      toast.success('Registration successful. Please check your email.');
    } catch (err: any) {
      toast.error('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center items-center relative overflow-hidden bg-brand-dark px-4">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-brand-black/80 backdrop-blur-xl border border-brand-border rounded-[2rem] p-10 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20">
            <Mail className="w-10 h-10 text-gold-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">Verify Your Email</h2>
          <p className="text-white/60 font-light mb-8 leading-relaxed">
            We&apos;ve sent a verification link to your email address. Please click the link to activate your account.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-gold-500 font-medium hover:text-gold-400 transition-colors">
            Back to Login <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center relative overflow-hidden bg-brand-dark">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block pr-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <Link href="/">
                <Logo variant="monogram" size="lg" />
              </Link>
            </div>
            
            <div className="inline-flex items-center rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-[10px] font-bold text-gold-400 mb-6 uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.05)]">
               Exclusive Access
            </div>
            
            <h1 className="font-display text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Join the Elite <br/>
              <span className="text-gold-400">1% Traders</span> Circle.
            </h1>
            
            <p className="text-white/60 font-light text-lg mb-12 leading-relaxed">
              Create your account to unlock institutional-grade signals, uncompromising risk management protocols, and unparalleled market precision.
            </p>

            <div className="space-y-6">
              {[
                'Instant Execution Alerts on Telegram',
                'Advanced Pre-Market Analysis',
                'Strict Risk/Reward Frameworks',
                '1-on-1 Guidance Availability'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-gold-500" />
                  </div>
                  <span className="text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="lg:hidden flex flex-col items-center mb-10">
               <div className="mb-8">
                 <Link href="/">
                   <Logo variant="monogram" size="lg" />
                 </Link>
               </div>
               <h1 className="font-display text-4xl font-bold text-white mb-2">Create Account</h1>
               <p className="text-white/50 text-sm">Join the top 1% standard of trading.</p>
            </div>

            <div className="bg-brand-black/80 backdrop-blur-xl border border-brand-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl pointer-events-none" />
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest pl-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-white/30" />
                    </div>
                    <input
                      {...register('fullName')}
                      type="text"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-light"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-xs pl-1">{errors.fullName.message}</p>}
                </div>

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

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest pl-1">Mobile Number (WhatsApp)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-white/30" />
                    </div>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-light"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs pl-1">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest pl-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/30" />
                    </div>
                    <input
                      {...register('password')}
                      type="password"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-light"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="text-red-400 text-xs pl-1">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest pl-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/30" />
                    </div>
                    <input
                      {...register('confirmPassword')}
                      type="password"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-light"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-400 text-xs pl-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-brand-black font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex justify-center items-center gap-3 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center gap-2">
                    {isLoading ? 'Creating Account...' : 'Continue'}
                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-white/40 flex items-center justify-center gap-1.5 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-500/70" /> Secured and Encrypted
                </p>
              </div>
            </div>

            <p className="text-center mt-6 text-white/50 font-light">
              Already have an account? <Link href="/login" className="text-gold-400 hover:text-gold-300 font-medium ml-1">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
