import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pricing Plans | The Capital Guru",
  description: "Choose your edge. Monthly, bi-annual, and annual plans starting ₹2,499/mo. Institutional-grade NSE/BSE F&O signals delivered on Telegram.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
