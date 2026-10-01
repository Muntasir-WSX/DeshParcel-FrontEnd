import { Box, Briefcase, Zap, Globe } from "lucide-react";

const services = [
  { icon: Box, title: "Standard Parcel Delivery", desc: "Cost-effective door-to-door delivery for e-commerce & personal goods.", price: "From ৳60" },
  { icon: Zap, title: "Express Urgent Delivery", desc: "Priority delivery within 4-6 hours for emergency documents & items.", price: "From ৳120" },
  { icon: Briefcase, title: "Corporate Logistics", desc: "Customized bulk shipping and supply chain solutions for enterprises.", price: "Custom" },
  { icon: Globe, title: "Cross-Border Shipping", desc: "Seamless international courier services with customs clearance.", price: "From ৳500" },
];

export default function PopularServices() {
  return (
    <section className="py-16 bg-muted/30 rounded-3xl px-6 md:px-12 my-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.577_0.245_27.325)] mb-2 block">Our Offerings</span>
          <h2 className="text-3xl font-bold tracking-tight font-heading">Popular Delivery Services</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mt-2 md:mt-0">Tailored logistics solutions designed to match your personal and business demands efficiently.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div key={idx} className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[oklch(0.577_0.245_27.325)]/50 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{srv.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{srv.desc}</p>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-muted-foreground">Starting at</span>
                <span className="font-bold text-base text-[oklch(0.577_0.245_27.325)]">{srv.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}