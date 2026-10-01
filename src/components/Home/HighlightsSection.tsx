import { Truck, Clock, ShieldAlert, Headphones } from "lucide-react";

const highlights = [
  { icon: Truck, title: "Same-Day Delivery", desc: "Urgent deliveries within the city in under 6 hours." },
  { icon: Clock, title: "Next-Day Nationwide", desc: "Reliable delivery across all districts by the next day." },
  { icon: ShieldAlert, title: "Safe & Secure Handling", desc: "Full insurance coverage and careful item management." },
  { icon: Headphones, title: "24/7 Dedicated Support", desc: "Always available customer support for any shipping queries." },
];

export default function HighlightsSection() {
  return (
    <section className="py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-3 font-heading">Why Choose DeshParcel?</h2>
        <p className="text-muted-foreground text-sm md:text-base">We ensure your packages reach their destination safely and on time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 text-[oklch(0.577_0.245_27.325)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-colors">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}