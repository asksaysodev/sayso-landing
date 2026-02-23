import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { CaseStudiesPage } from '@/components/landing/CaseStudiesPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

export default function CaseStudies() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <CaseStudiesPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
