import CoverageSection from "@/components/Home/CoverageSection";
import HeroSection from "@/components/Home/HeroSection";
import HighlightsSection from "@/components/Home/HighlightsSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularServices from "@/components/Home/PopularServices";
import TrackingSection from "@/components/Home/TrackingSection";


export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      <HeroSection />
      <TrackingSection />
      <HighlightsSection />
      <PopularServices />
      <HowItWorks />
      <CoverageSection />
    </div>
  );
}