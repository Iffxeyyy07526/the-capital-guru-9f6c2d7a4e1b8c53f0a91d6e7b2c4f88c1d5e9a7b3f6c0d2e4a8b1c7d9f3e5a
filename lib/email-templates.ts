
export function getBaseEmailTemplate(content: string, name?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'https://thecapitalguru.net';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;900&display=swap');
          body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #000000; -webkit-font-smoothing: antialiased; }
          .container { max-width: 600px; margin: 0 auto; background-color: #0c0c0c; border: 1px solid #1a1a1a; }
          .header { padding: 0; text-align: center; border-bottom: 1px solid #1a1a1a; }
          .header img { display: block; width: 100%; height: auto; border: 0; }
          .content { padding: 40px 30px; color: #e5e5e5; line-height: 1.6; }
          .footer { padding: 30px 20px; text-align: center; color: #444444; font-size: 12px; border-top: 1px solid #1a1a1a; }
          .button { display: inline-block; padding: 14px 28px; background-color: #D4AF37; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header" style="background-color: #0c0c0c; padding: 40px 0;">
            <img src="https://i.ibb.co/Y7wKvYJ5/122151.png" width="80" height="80" alt="The Capital Guru" style="margin: 0 auto; display: block;" />
            <h1 style="color: #D4AF37; font-size: 20px; font-weight: 900; letter-spacing: 2px; margin-top: 15px; text-transform: uppercase;">The Capital Guru</h1>
          </div>
          <div class="content">
            ${name ? `<p style="font-size: 18px; color: #ffffff;">Hello ${name},</p>` : ''}
            ${content}
          </div>
          <div class="footer">
            &copy; 2026 THE CAPITAL GURU. All rights reserved.<br>
            Mahir@thecapitalguru.net | SEBI Applied
          </div>
        </div>
      </body>
    </html>
  `;
}

export const EDUCATIONAL_EMAILS = [
  { 
    subject: 'The 1% Rule: Why Most Traders Lose Everything', 
    body: `
      <p>Trading isn't about being right 100% of the time. It's about surviving long enough to hit your winners.</p>
      <p>Institutional traders never risk more than 1% of their capital on a single trade. This is the fundamental difference between gambling and professional trading.</p>
      <p>In this week's lesson, we explore the mathematics of ruin and how you can protect your account from the common retail traps.</p>
      <a href="https://thecapitalguru.net/blogs" class="button">Read Full Insight</a>
    ` 
  },
  { 
    subject: 'Decoding Options Greeks: Gamma & Theta', 
    body: `
      <p>If you're buying options without understanding Theta decay, you're fighting a losing battle against time.</p>
      <p>We break down how to identify high-Gamma environments where the reward-to-risk ratio is heavily in your favor.</p>
      <a href="https://thecapitalguru.net/dashboard" class="button">Access Training</a>
    ` 
  }
];

export const SALES_EMAILS = [
  { 
    subject: 'Unlock the Institutional Edge (50% Off Annual Plan)', 
    body: `
      <p>Stop guessing the markets. Join 500+ serious traders using our proprietary intraday structures to find high-probability setups in Nifty and BankNifty.</p>
      <p>For the next 48 hours, we're offering an exclusive 50% discount on our Mastery Annual plan.</p>
      <a href="https://thecapitalguru.net/pricing" class="button">Claim Your Discount</a>
    ` 
  }
];
