import Achievments from "@/components/Home/Achievments";
import CoverageSection from "@/components/Home/CoverageSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import HighlightsSection from "@/components/Home/HighlightsSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularServices from "@/components/Home/PopularServices";
import Testimonilas from "@/components/Home/Testimonilas/Testimonilas";
import DownloadApps from "@/components/Home/DownloadApps";


export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      <HeroSection />
      <HighlightsSection />
      <PopularServices />
      <Testimonilas />
      <HowItWorks />
      <CoverageSection />
      <Achievments></Achievments>
      <Faq></Faq>
      <DownloadApps></DownloadApps>
    </div>
  );
}