import Achievments from "@/components/Home/Achievments";
import BlogHome from "@/components/Home/blogHome";
import CoverageSection from "@/components/Home/CoverageSection";
import DownloadApps from "@/components/Home/DownloadApps";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import HighlightsSection from "@/components/Home/HighlightsSection";
import HowItWorks from "@/components/Home/HowItWorks";
import NewsletterCTA from "@/components/Home/newsletter";
import PopularServices from "@/components/Home/PopularServices";
import Testimonials from "@/components/Home/Testimonials/page";

export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      <HeroSection />
      <HighlightsSection />
      <PopularServices />
      <Testimonials />
      <HowItWorks />
      <CoverageSection />
      <BlogHome></BlogHome>
      <Achievments></Achievments>
      <Faq></Faq>
      <DownloadApps></DownloadApps>
      <NewsletterCTA></NewsletterCTA>
    </div>
  );
}
