import Achievments from "@/components/Home/Achievments";
import CoverageSection from "@/components/Home/CoverageSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import HighlightsSection from "@/components/Home/HighlightsSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularServices from "@/components/Home/PopularServices";
import DownloadApps from "@/components/Home/DownloadApps";
import Testimonials from "@/components/Home/Testimonials/page";
import NewsletterCTA from "@/components/Home/newsletter";
import BlogHome from "@/components/Home/blogHome";


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