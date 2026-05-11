import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PaymentFormClient from './PaymentFormClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment | The Capital Guru',
  description: 'Complete your subscription to access institutional signals.',
};

export default async function PaymentPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=/payment/${planId}`);
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch existing payment requests
  const { data: requests } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('user_id', user.id)
    .eq('plan_id', planId)
    .order('created_at', { ascending: false })
    .limit(1);

  const existingRequest = requests?.[0] || null;

  return (
    <div className="bg-brand-dark min-h-screen">
      <PaymentFormClient 
        user={user} 
        planId={planId} 
        initialProfile={profile} 
        existingRequest={existingRequest}
      />
    </div>
  );
}
