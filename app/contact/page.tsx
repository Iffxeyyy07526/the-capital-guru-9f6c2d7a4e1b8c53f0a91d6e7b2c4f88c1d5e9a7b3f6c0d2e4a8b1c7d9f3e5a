'use client';

import { useState } from 'react';
import { Mail, Phone, Send, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import * as motion from 'motion/react-client';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success('Message sent successfully!');
      reset();
    } catch (err: any) {
      toast.error(err.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 md:py-32 relative overflow-hidden bg-brand-dark min-h-screen">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
          >
            Connect With the <span className="text-gold-500">Guru</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg font-light max-w-2xl mx-auto"
          >
            Have questions about our institutional signals or membership? Reach out to our 24/7 dedicated support desk.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            {[
              { icon: <Mail className="w-6 h-6 text-gold-500" />, title: 'Email Support', detail: 'mahir@thecapitalguru.net', sub: '2-4 Hour Response Time' },
              { icon: <Send className="w-6 h-6 text-gold-500" />, title: 'Telegram Helpdesk', detail: '@TheCapitalGuruSupport', sub: 'Instant Response' },
              { icon: <Phone className="w-6 h-6 text-gold-500" />, title: 'Direct WhatsApp', detail: '+91 9106713107', sub: 'Priority Member Line' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-black/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl group hover:border-gold-500/20 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center border border-gold-500/20 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-white mb-1">{item.detail}</p>
                    <p className="text-xs text-gold-500/60 font-medium">{item.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-black/80 backdrop-blur-3xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
              
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-white mb-4">Transmission Successful</h2>
                  <p className="text-white/50 mb-8">Your message has been logged in our secure archives. Our specialists will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-8 py-3 rounded-xl bg-gold-500 text-black font-bold hover:bg-gold-400 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Full Name</label>
                      <input 
                        {...register('name')}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] pl-1 uppercase font-bold tracking-wider">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Email Address</label>
                      <input 
                        {...register('email')}
                        placeholder="you@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] pl-1 uppercase font-bold tracking-wider">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Subject</label>
                    <input 
                      {...register('subject')}
                      placeholder="e.g., Question about Pro Plan membership"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-all font-light"
                    />
                    {errors.subject && <p className="text-red-500 text-[10px] pl-1 uppercase font-bold tracking-wider">{errors.subject.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Message Detail</label>
                    <textarea 
                      {...register('message')}
                      rows={5}
                      placeholder="How can we assist your trading journey?"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-500/50 transition-all font-light resize-none"
                    />
                    {errors.message && <p className="text-red-500 text-[10px] pl-1 uppercase font-bold tracking-wider">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-black font-bold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Transmit Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
