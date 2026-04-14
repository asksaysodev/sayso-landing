import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-[#F4F4F5] min-h-screen">
      <SaysoNavbar />
      <main className="pt-6">{children}</main>
      <Footer />
    </div>
  );
}
