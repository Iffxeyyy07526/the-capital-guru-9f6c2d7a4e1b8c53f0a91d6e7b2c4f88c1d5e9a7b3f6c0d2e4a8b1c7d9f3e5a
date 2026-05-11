'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, CheckCircle2, Clock, Send, FileText, ArrowRight, Loader2, LogOut, Ban } from 'lucide-react';
import { motion } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function SkeletonDashboard() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-4">
          <div className="h-10 w-64 bg-white/5 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-48 bg-white/5 rounded-lg skeleton-shimmer" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-32 bg-white/5 rounded-full skeleton-shimmer" />
          <div className="h-12 w-24 bg-white/5 rounded-full skeleton-shimmer" />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        <div className="md:col-span-2 space-y-8">
          <div className="h-64 bg-white/5 rounded-3xl skeleton-shimmer" />
          <div className="h-80 bg-white/5 rounded-3xl skeleton-shimmer" />
        </div>
        <div className="space-y-8">
          <div className="h-56 bg-white/5 rounded-3xl skeleton-shimmer" />
          <div className="h-72 bg-white/5 rounded-3xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [latestPayment, setLatestPayment] = useState<any>(null);

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // Fetch latest payment request
      const { data: paymentData } = await supabase
        .from('payment_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (paymentData && paymentData.length > 0) {
        setLatestPayment(paymentData[0]);
      }

      // Simulate a bit of loading for UX if it's too fast
      setTimeout(() => setLoading(false), 800);
    }

    loadDashboardData();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  const status = latestPayment?.status || 'none'; // 'pending' | 'approved' | 'rejected' | 'none'
  const planName = latestPayment?.plan_id === 'monthly' ? 'Pro Monthly' : latestPayment?.plan_id === 'six-monthly' ? 'Elite Bi-Annual' : latestPayment?.plan_id === 'yearly' ? 'Mastery Annual' : 'No Active Plan';

  const calculateExpiry = (createdAt: string, planId: string) => {
    const date = new Date(createdAt);
    if (planId === 'monthly') date.setMonth(date.getMonth() + 1);
    else if (planId === 'six-monthly') date.setMonth(date.getMonth() + 6);
    else if (planId === 'yearly') date.setFullYear(date.getFullYear() + 1);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
             <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em]">Institutional Terminal v4.2</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white mb-2 uppercase">
            Terminal <span className="text-gold-gradient">Control</span>
          </h1>
          <p className="text-white/40 font-light tracking-wide text-sm uppercase">Welcome back, {profile?.full_name?.split(' ')[0] || 'Trader'}. Portfolios secured.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-gold-500/10 px-6 py-3.5 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold border-r border-white/10 pr-4">Identity</span>
            {status === 'pending' && (
              <span className="inline-flex items-center gap-2 text-gold-500 text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5" /> Verifying
              </span>
            )}
            {status === 'approved' && (
              <span className="inline-flex items-center gap-2 text-green-500 text-xs font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Member
              </span>
            )}
            {status === 'rejected' && (
              <span className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                <Ban className="w-3.5 h-3.5" /> Access Denied
              </span>
            )}
            {status === 'none' && (
              <span className="inline-flex items-center gap-2 text-white/20 text-xs font-bold uppercase tracking-widest">
                Unregistered
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center justify-center p-3.5 rounded-sm border border-white/5 bg-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
            title="Secure Logout"
          >
            <LogOut className="w-5 h-5 text-white/50 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {status === 'pending' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold-500/[0.03] border border-gold-500/20 rounded-sm p-8 mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gold-500" />
          <div className="bg-gold-500/10 p-4 rounded-sm border border-gold-500/20">
            <Clock className="w-6 h-6 text-gold-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gold-500 uppercase tracking-widest mb-2">Protocol: Payment Validation</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
              Our automated ledger system is currently validating transaction ID <span className="text-gold-400 font-mono font-bold tracking-tighter px-1.5 py-0.5 bg-gold-500/10 rounded-sm">{latestPayment?.utr_number}</span>. 
              Terminal features will unlock immediately upon verification.
            </p>
          </div>
        </motion.div>
      )}

      {status === 'rejected' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/[0.03] border border-red-500/20 rounded-sm p-8 mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-[2px] h-full bg-red-500" />
          <div className="bg-red-500/10 p-4 rounded-sm border border-red-500/20">
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">Protocol: Access Terminated</h3>
            <p className="text-white/60 text-sm font-light leading-relaxed mb-4">
              {latestPayment?.rejection_reason || 'UTR verification failed. Protocol mismatch detected.'}
            </p>
            <button 
              onClick={() => router.push('/pricing')}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors py-2 px-4 border border-white/10 rounded-sm hover:bg-white/5"
            >
              Re-initialize Auth <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        
        {/* Main Content - Signals & Links */}
        <div className="md:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm p-10 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            
            <div className="flex items-center gap-4 mb-8">
               <div className={`p-4 rounded-sm border ${status === 'approved' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/10'}`}>
                 <Send className={`w-8 h-8 ${status === 'approved' ? 'text-blue-400' : 'text-white/20'}`} />
               </div>
               <div>
                  <h2 className="text-2xl font-black font-sans uppercase tracking-tighter text-white">Platinum Matrix</h2>
                  <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em]">Hedge-Fund Execution Channel</span>
               </div>
            </div>

            <p className="text-sm font-light text-white/40 mb-10 max-w-lg leading-relaxed tracking-wide">
              Actionable institutional intelligence and high-probability F&O signals are transmitted in real-time via encrypted protocols.
            </p>

            <a 
              href={status === 'approved' ? 'https://t.me/thecapitalgurusupport' : '#'}
              className={`inline-flex items-center justify-center gap-4 px-10 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 w-full md:w-auto relative group overflow-hidden ${
                status === 'approved' 
                  ? 'bg-gold-500 text-black shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] hover:-translate-y-1' 
                  : 'bg-white/[0.03] text-white/20 border border-white/5 cursor-not-allowed'
              }`}
            >
              {status === 'approved' && (
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              )}
              <span className="relative z-10">Access Terminal Channel</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </a>

            {status !== 'approved' && (
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Matrix link encrypted. Awaiting active subscription.</p>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/20 backdrop-blur-md border border-white/5 rounded-sm p-10"
          >
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-tighter mb-1">Intelligence Feed</h2>
                  <div className="h-px w-12 bg-gold-500" />
               </div>
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-sm border border-white/5">02 Modules Active</span>
            </div>
            
            <div className="grid gap-4">
              {[
                { title: 'NIFTY Pre-Market Bias: Institutional Long', time: '08:45 AM', type: 'Intelligence', color: 'text-gold-400' },
                { title: 'BANKNIFTY 45000 CE | Target Met (+142%)', time: 'Yesterday', type: 'Result', color: 'text-green-500' },
              ].map((update, i) => (
                <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-sm bg-white/[0.01] border border-white/5 hover:bg-white/[0.04] hover:border-gold-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-8 rounded-full ${update.color} opacity-40`} />
                    <div>
                      <span className={`text-[9px] font-black tracking-[0.2em] uppercase mb-1 block ${update.color}`}>{update.type}</span>
                      <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{update.title}</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-4 sm:mt-0">{update.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar - Educational & Profile */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm p-10 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full blur-3xl" />
            <h2 className="text-sm font-black tracking-[0.3em] uppercase mb-10 text-gold-500 flex items-center gap-3">
              <FileText className="w-3.5 h-3.5" />
              Archives
            </h2>
            <ul className="space-y-2">
              {[
                'Institutional Bias Mapping',
                'The VIX Volatility Matrix',
                'Advanced Delta Hedging'
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="py-4 text-xs font-medium text-white/40 hover:text-gold-400 flex items-center justify-between group transition-all duration-300 border-b border-white/5 last:border-0 hover:pl-2">
                    <span>{item}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-black/60 backdrop-blur-xl border border-gold-500/10 rounded-sm p-10 shadow-2xl border-l-[3px] border-l-gold-500"
          >
            <h2 className="text-[10px] font-black tracking-[0.35em] uppercase mb-10 text-white/30">Node Configuration</h2>
            <div className="space-y-8">
              <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-[2px] before:h-8 before:bg-white/10">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2 font-black">Identity Hash</span>
                <span className="text-xs font-mono font-medium text-white/80 truncate block">{user?.email}</span>
              </div>
              
              <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-[2px] before:h-8 before:bg-white/10">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2 font-black">Security Level</span>
                <span className="text-[10px] font-black text-gold-400 tracking-widest uppercase">{planName}</span>
              </div>
              
              <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-[2px] before:h-8 before:bg-white/10">
                <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-2 font-black">Authorization Closes</span>
                <span className="text-xs font-mono font-medium text-white/80">
                  {status === 'approved' ? calculateExpiry(latestPayment.created_at, latestPayment.plan_id) : 'NONE'}
                </span>
              </div>
            </div>

            <div className="mt-12 p-4 bg-gold-500/5 rounded-sm border border-gold-500/10">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-1 rounded-full bg-gold-500" />
                  <span className="text-[9px] font-black text-gold-500 tracking-widest uppercase">Encryption Status</span>
               </div>
               <p className="text-[9px] text-white/30 font-medium leading-relaxed tracking-wider uppercase">End-to-End P2P Signal Tunneling Enabled.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="py-20 md:py-32 relative overflow-hidden min-h-screen bg-mesh">
      {/* Background elements */}
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold-500/5 mix-blend-screen rounded-full blur-[200px] opacity-70" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <Suspense fallback={<SkeletonDashboard />}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  );
}
