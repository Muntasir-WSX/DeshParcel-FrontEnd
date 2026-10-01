"use client";

import Link from "next/link";
import { Box, Briefcase, Zap, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Box, title: "Standard Parcel", desc: "Cost-effective door-to-door delivery for personal goods.", price: "From ৳60" },
  { icon: Zap, title: "Express Urgent", desc: "Priority delivery within 4-6 hours for emergency items.", price: "From ৳120" },
  { icon: Briefcase, title: "Corporate", desc: "Customized bulk shipping and supply chain solutions.", price: "Custom" },
  { icon: Globe, title: "Cross-Border", desc: "Seamless international courier with customs clearance.", price: "From ৳500" },
];

export default function PopularServices() {
  return (
    <section className="relative py-12 md:py-16 w-full max-w-[96%] md:max-w-7xl mx-auto rounded-3xl overflow-hidden my-12 bg-[oklch(0.18_0.04_255)] text-white px-6 md:px-12 shadow-xl border border-white/10">
      
      {/* Subtle Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[oklch(0.577_0.245_27.325)]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.577_0.245_27.325)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)]">
                Our Offerings
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Popular Delivery Services
            </h2>
          </div>
          
          <p className="text-sm text-gray-300 max-w-md md:text-right">
            Tailored logistics solutions designed to match your personal and business demands efficiently.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-card text-card-foreground rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-md hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden border border-border/60 hover:border-[oklch(0.577_0.245_27.325)]/40"
              >
                {/* Red Top Border Accent on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[oklch(0.577_0.245_27.325)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div>
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.577_0.245_27.325)]/10 flex items-center justify-center mb-4 text-[oklch(0.577_0.245_27.325)] group-hover:scale-110 group-hover:bg-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground font-heading leading-tight">{srv.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-6 leading-relaxed">{srv.desc}</p>
                </div>
                
                <div className="pt-4 border-t border-border/60 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Starting at</span>
                    <span className="font-extrabold text-sm text-[oklch(0.577_0.245_27.325)]">{srv.price}</span>
                  </div>
                  <Link href="/services" className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center group-hover:bg-[oklch(0.577_0.245_27.325)] transition-colors duration-300">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}