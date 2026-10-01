import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";

export default function CoverageSection() {
  return (
    <section className="py-16 mb-12 rounded-3xl bg-[oklch(0.18_0.04_255)] text-white p-8 md:p-12 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium uppercase mb-4">
            <MapPin className="h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)]" />
            Nationwide Network
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 font-heading">
            Delivering to All <span style={{ color: "oklch(0.577 0.245 27.325)" }}>64 Districts</span> Across Bangladesh
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            From metropolitan cities to remote upazilas, our extensive coverage ensures your parcel reaches its destination securely and on time.
          </p>
        </div>

        <div>
          <Link href="/coverage">
            <Button 
              size="lg" 
              className="rounded-2xl px-8 h-12 text-base font-semibold shadow-lg cursor-pointer"
              style={{ backgroundColor: "oklch(0.577_0.245_27.325)", color: "#fff" }}
            >
              Check Coverage Area
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}