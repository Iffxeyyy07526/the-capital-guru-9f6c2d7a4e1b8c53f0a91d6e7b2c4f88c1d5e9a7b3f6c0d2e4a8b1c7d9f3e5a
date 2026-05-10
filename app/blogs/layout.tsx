import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Market Analysis Blogs | The Capital Guru",
  description: "Deep market insights, BankNifty analysis, Nifty setups, and F&O strategies from India's top derivatives traders.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
