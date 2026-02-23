import { DemoCalendarProvider } from "@/app/context/landing/DemoCalendarContext";
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";

export default function Home() {
    return (
        <DemoCalendarProvider>
            <div className="relative bg-white">
                <SaysoNavbar />
                <HeroWithVideo />
                <PainPointPanel />
                <TransformationSection />
                <ThreeStepsSection />
                <Footer />
            </div>
        </DemoCalendarProvider>
    );
}
