import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getBaseEmailTemplate, EDUCATIONAL_EMAILS, SALES_EMAILS } from '@/lib/email-templates';

// NOTE: Add RESEND_API_KEY to your .env file
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Example logic to select specific email type
    // This is a placeholder for actual db logic
    const currentWeek = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
    const template = EDUCATIONAL_EMAILS[currentWeek % EDUCATIONAL_EMAILS.length];
    
    // Logic to select "Registered but not purchased" users from Supabase would go here
    // const { data: users } = await supabase.from('users').select('*').eq('status', 'registered_unpaid');
    
    /* 
    for (const user of users) {
      await resend.emails.send({
        from: 'mahir@thecapitalguru.net',
        to: user.email,
        subject: template.subject,
        html: getBaseEmailTemplate(template.body, user.name)
      });
    }
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Weekly email sequence triggered with branded templates',
      emailType: template.subject
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
