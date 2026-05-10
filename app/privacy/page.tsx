import { Shield, Lock, Eye, FileText, Globe, User } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Shield className="w-5 h-5 text-gold-500" />,
      title: "1. Information We Collect",
      content: (
        <>
          <p>To provide our services efficiently, we may collect the following personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Information:</strong> Name, Email Address, Mobile Number, WhatsApp Number, Telegram ID.</li>
            <li><strong>Financial Information:</strong> Payment details such as UTR numbers and transaction histories for verification.</li>
            <li><strong>Usage Data:</strong> Information on how you interact with our Website, dashboards, and services.</li>
            <li><strong>Device Data:</strong> IP address, browser type, device information, and operating systems.</li>
          </ul>
        </>
      )
    },
    {
      icon: <Lock className="w-5 h-5 text-gold-500" />,
      title: "2. How We Use Your Data",
      content: (
        <>
          <p>Your data is strictly utilized for the following core purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Provisioning:</strong> Setting up and managing your subscriptions and dashboard access.</li>
            <li><strong>Service Delivery:</strong> Granting access to our Telegram channels, and forwarding relevant educational market updates.</li>
            <li><strong>Billing & Verification:</strong> Validating your UTR payments and maintaining accurate billing records.</li>
            <li><strong>Communication:</strong> Transmitting necessary updates, promotional materials, and policy changes.</li>
            <li><strong>Security:</strong> Detecting and mitigating potential fraudulent activities or unauthorized sharing of access.</li>
          </ul>
        </>
      )
    },
    {
      icon: <Eye className="w-5 h-5 text-gold-500" />,
      title: "3. Data Protection and Security",
      content: "We implement industry-standard encryption protocols and advanced security mechanisms to protect your data. Your personal identifiers and transaction data reside securely on high-tier encrypted database structures. However, no data transmission across the internet can be fully guaranteed, and you share information at your own risk."
    },
    {
      icon: <Globe className="w-5 h-5 text-gold-500" />,
      title: "4. Third-Party Disclosures",
      content: "We do not sell, rent, or trade your personally identifiable information. We may share information with trusted third-party service providers (such as payment gateways or email service providers) purely to facilitate our business operations, provided they agree to maintain standard confidentiality."
    },
    {
      icon: <FileText className="w-5 h-5 text-gold-500" />,
      title: "5. Cookies and Tracking",
      content: "The Capital Guru may use cookies and similar tracking technologies to enhance user experience, track user patterns, and maintain active sessions across the dashboard."
    }
  ];

  return (
    <div className="py-24 bg-brand-dark min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-600/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">Privacy Policy</h1>
          <p className="text-white/40 mb-12 font-light">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                {section.icon}
                <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
              </div>
              <div className="text-white/60 font-light leading-relaxed prose prose-invert max-w-none">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-16 mt-16 border-t border-white/5 text-sm text-white/30"
        >
          For further privacy-related inquiries, please contact us at <span className="text-gold-500 font-medium">mahir@thecapitalguru.net</span>.
        </motion.div>
      </div>
    </div>
  );
}
