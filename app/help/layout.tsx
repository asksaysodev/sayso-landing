import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#F4F4F5]">
      <SaysoNavbar />
      <main className="pt-6">{children}</main>
      <Footer />
    </div>
  );
}
