"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const highlights = [
  { 
    id: 1,
    title: "Same-Day Delivery", 
    desc: "Urgent deliveries within the city in under 6 hours. Perfect for time-sensitive documents, medical supplies, and perishable goods.",
    bullets: ["Automated Dispatching", "Real-Time Rider Tracking", "Priority Handling"],
    link: "/services"
  },
  { 
    id: 2,
    title: "Next-Day Nationwide", 
    desc: "Reliable and secure delivery across all 64 districts by the next business day. Built for e-commerce and corporate bulk shipments.",
    bullets: ["Inter-district line haul", "Secure Warehousing", "SMS & Web Tracking"],
    link: "/services"
  },
  { 
    id: 3,
    title: "Safe & Secure Handling", 
    desc: "We ensure full insurance coverage and careful item management. Your fragile and high-value items are safe with our trained professionals.",
    bullets: ["Tamper-proof Packaging", "Value Insurance up to ৳50k", "CCTV Monitored Hubs"],
    link: "/services"
  },
  { 
    id: 4,
    title: "24/7 Dedicated Support", 
    desc: "Our customer success team is always available to resolve your shipping queries, manage returns, and provide instant updates.",
    bullets: ["Instant Live Chat", "Dedicated Account Manager", "Easy Return Policies"],
    link: "/contact"
  },
];

export default function HighlightsSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-32 w-full max-w-7xl mx-auto px-5 md:px-12 bg-[#070b19] text-white rounded-3xl my-16">
      
      {/* Section Header */}
      <div className="text-center md:text-left mb-12 md:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[11px] font-bold uppercase tracking-widest text-red-400 mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> Why Choose Us
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading text-white">
          Premium Logistics <br className="hidden md:block" /> Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Large Rounded Image with Glowing & Gradient Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
        >
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/a5c3c668a455ec9036065379018c6514_bvc4hu.jpg"
            alt="DeshParcel Logistics Operations"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 filter brightness-95"
          />
          {/* Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/30 to-transparent" />
          
          {/* Floating Badge on Image */}
          <div className="absolute bottom-8 left-8 right-8 z-10 p-6 rounded-2xl bg-[#0b132b]/80 backdrop-blur-md border border-white/10 space-y-1 shadow-lg">
            <h4 className="text-sm font-bold text-white">Nationwide Coverage</h4>
            <p className="text-xs text-gray-300">Empowering 35K+ merchants across all 64 districts with rapid door-to-door delivery.</p>
          </div>
        </motion.div>

        {/* Right Side: Accordion Features */}
        <div className="lg:col-span-6 flex flex-col justify-center bg-[#0b132b] border border-red-500/20 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Glowing background accents */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 divide-y divide-white/10">
            {highlights.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full py-2 flex justify-between items-center text-left focus:outline-none group cursor-pointer"
                  >
                    <h3 className={`text-lg md:text-xl font-bold font-heading transition-colors duration-300 ${isOpen ? "text-red-500" : "text-white group-hover:text-red-400"}`}>
                      {item.title}
                    </h3>
                    <div className="ml-4 flex-shrink-0 p-2 rounded-xl bg-[#050814] border border-white/10 group-hover:border-red-500/30 transition-all">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-red-500" />
                      ) : (
                        <Plus className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="py-4 pr-2 space-y-4">
                          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                            {item.desc}
                          </p>
                          
                          {/* Bullet Points */}
                          <ul className="space-y-2">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-center gap-2.5 text-xs font-medium text-gray-200">
                                <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>

                          {/* View Details Link */}
                          <div className="pt-2">
                            <Link href={item.link} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider group w-fit">
                              <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-red-600 text-white group-hover:bg-red-700 transition-colors shadow-md">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </span>
                              <span className="text-red-400 group-hover:text-red-300 transition-colors">
                                View Details
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}