'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import * as motion from 'motion/react-client';
import { toast } from 'sonner';
import { Logo } from '@/components/logo';

import { createClient } from '@/lib/supabase/client';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      const user = authData.user;
      if (user && !user.email_confirmed_at) {
        await supabase.auth.signOut();
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
        toast.error('Please verify your email before logging in.');
        return;
      }

      toast.success('Successfully logged in');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center relative overflow-hidden bg-brand-dark">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold-600/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Logo variant="monogram" size="lg" />
            </Link>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
            <p className="text-white/50 font-light">Enter your credentials to access the portal.</p>
          </div>

          <div className="bg-brand-black/80 backdrop-blur-xl border border-brand-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
            
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
                    className={`w-full bg-white/[0.03] border rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 input-glow-focus transition-all font-light ${errors.email ? 'border-red-400/50 animate-shake' : 'border-white/10'}`}
                    placeholder="investor@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs pl-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Password</label>
                  <Link href="/forgot-password" className="text-[11px] text-gold-400 hover:text-gold-300 transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/30" />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    className={`w-full bg-white/[0.03] border rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/20 input-glow-focus transition-all font-light ${errors.password ? 'border-red-400/50 animate-shake' : 'border-white/10'}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-400 text-xs pl-1">{errors.password.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-brand-black font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex justify-center items-center gap-3 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
              <p className="text-sm text-white/50 font-light flex items-center gap-1.5 justify-center mb-4">
                <ShieldCheck className="w-4 h-4 text-gold-500/70" /> Enterprise Grade Encryption
              </p>
              <p className="text-sm text-white/40 mb-2">By continuing, you agree to our <Link href="/terms" className="text-white/70 hover:text-white">Terms of Service</Link> and <Link href="/privacy" className="text-white/70 hover:text-white">Privacy Policy</Link>.</p>
            </div>
          </div>

          <p className="text-center mt-8 text-white/50 font-light">
            Don&apos;t have an account? <Link href="/register" className="text-gold-400 hover:text-gold-300 font-medium ml-1">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
