'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function approvePaymentRequest(requestId: string) {
  const supabase = createAdminClient();

  // 1. Get the payment request
  const { data: request, error: fetchError } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('id', requestId)
    .single();

  if (fetchError || !request) {
    throw new Error('Payment request not found');
  }

  // 2. Update request status
  const { error: updateError } = await supabase
    .from('payment_requests')
    .update({ status: 'approved' })
    .eq('id', requestId);

  if (updateError) {
    throw new Error('Failed to update payment request');
  }

  // 3. Create/Update subscription
  const startDate = new Date();
  const endDate = new Date();
  
  // Logic for duration based on plan
  if (request.plan_id === 'monthly' || request.plan_id === 'basic' || request.plan_id === 'pro') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (request.plan_id === 'six-monthly') {
    endDate.setMonth(endDate.getMonth() + 6);
  } else if (request.plan_id === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const { error: subError } = await supabase
    .from('subscriptions')
    .insert({
      user_id: request.user_id,
      plan_id: request.plan_id,
      payment_request_id: request.id,
      status: 'active',
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });

  if (subError) {
    console.error('Subscription error:', subError);
    // Note: In production you might want to rollback the payment status but for manual we can fix later
  }

  // 4. Send notification
  await supabase.from('notifications').insert({
    user_id: request.user_id,
    title: 'Payment Approved',
    message: `Your payment for the ${request.plan_id} plan has been verified. Welcome to the terminal!`,
    type: 'success'
  });

  revalidatePath('/dashboard');
  revalidatePath('/admin/payments');
  
  return { success: true };
}

export async function rejectPaymentRequest(requestId: string, feedback: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('payment_requests')
    .update({ 
      status: 'rejected',
      admin_feedback: feedback 
    })
    .eq('id', requestId);

  if (error) {
    throw new Error('Failed to reject payment request');
  }

  revalidatePath('/dashboard');
  revalidatePath('/admin/payments');

  return { success: true };
}
