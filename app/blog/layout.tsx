import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main className="pt-6">{children}</main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
