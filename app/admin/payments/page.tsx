'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Check, X, ExternalLink, Clock, User, Hash, IndianRupee, Loader2, Search, Filter } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { approvePaymentRequest, rejectPaymentRequest } from '@/app/actions/admin';
import { toast } from 'sonner';
import * as motion from 'motion/react-client';

export default function AdminPaymentsPage() {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('payment_requests')
      .select('*, profiles(full_name, email)')
      .order('created_at', { ascending: false });
    
    if (filterStatus !== 'all') {
      query = query.eq('status', filterStatus);
    }

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to fetch requests');
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  }, [supabase, filterStatus]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (id: string) => {
    if (!confirm('Are you sure you want to approve this payment?')) return;
    
    setProcessingId(id);
    try {
      await approvePaymentRequest(id);
      toast.success('Payment approved successfully');
      fetchRequests();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const feedback = prompt('Enter rejection reason (optional):');
    if (feedback === null) return;
    
    setProcessingId(id);
    try {
      await rejectPaymentRequest(id, feedback);
      toast.success('Payment rejected');
      fetchRequests();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredRequests = requests.filter(req => 
    req.utr_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Payment Verification</h1>
            <p className="text-white/40 font-light">Audit and activate institutional member subscriptions.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text"
                placeholder="Search UTR, Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500/50 w-full sm:w-64"
              />
            </div>
            <div className="flex gap-1 bg-white/5 p-1 rounded-sm border border-white/10">
              {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filterStatus === status 
                      ? 'bg-gold-500 text-black' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-sm">
            <p className="text-white/20 uppercase tracking-[0.2em] text-xs font-bold">No payment requests found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-black/80 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden group hover:border-gold-500/20 transition-all shadow-2xl"
              >
                <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                  {/* Left: Info */}
                  <div className="flex-1 grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                          <User className="w-5 h-5 text-gold-500" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{req.profiles?.full_name}</p>
                          <p className="text-white/40 text-xs">{req.profiles?.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 pt-4">
                        <div>
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Plan</p>
                          <p className="text-sm font-bold text-gold-400 capitalize">{req.plan_id}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Amount</p>
                          <p className="text-sm font-bold text-white">₹{req.amount}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Date</p>
                          <p className="text-sm font-light text-white/60">{new Date(req.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 flex items-center gap-2">
                          <Hash className="w-3 h-3" /> UTR Transaction Number
                        </p>
                        <p className="text-lg font-mono font-bold text-white tracking-widest bg-white/5 px-4 py-2 border border-white/10 rounded-sm inline-block">
                          {req.utr_number}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> Status
                        </p>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          req.status === 'pending' ? 'bg-gold-500/10 text-gold-500 border-gold-500/20' :
                          req.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Screenshot */}
                  <div className="w-full lg:w-48 aspect-[3/4] relative rounded-sm overflow-hidden border border-white/10 group-hover:border-gold-500/30 transition-all cursor-pointer" 
                    onClick={() => window.open(req.screenshot_url, '_blank')}
                  >
                    <Image 
                      src={req.screenshot_url} 
                      alt="Payment Receipt" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Right: Actions */}
                  {req.status === 'pending' && (
                    <div className="flex lg:flex-col gap-3 justify-center">
                      <button 
                        onClick={() => handleApprove(req.id)}
                        disabled={!!processingId}
                        className="h-12 px-6 rounded-sm bg-green-600 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-green-500 transition-colors disabled:opacity-50"
                      >
                        {processingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(req.id)}
                        disabled={!!processingId}
                        className="h-12 px-6 rounded-sm bg-white/5 border border-white/10 text-red-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/20 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
