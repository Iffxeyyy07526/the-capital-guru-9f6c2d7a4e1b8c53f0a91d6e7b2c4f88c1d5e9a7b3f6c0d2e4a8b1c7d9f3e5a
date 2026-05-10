import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | The Capital Guru",
  description: "Meet the systematic trading team behind India's most precise F&O signal service. Learn our methodology and edge.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
