"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const highlights = [
  { 
    id: 1,
    title: "Same-Day Delivery", 
    desc: "Urgent deliveries within the city in under 6 hours. Perfect for time-sensitive documents, medical supplies, and perishable goods.",
    bullets: ["Automated Dispatching", "Real-Time Rider Tracking", "Priority Handling"],
    link: "/services/same-day"
  },
  { 
    id: 2,
    title: "Next-Day Nationwide", 
    desc: "Reliable and secure delivery across all 64 districts by the next business day. Built for e-commerce and corporate bulk shipments.",
    bullets: ["Inter-district line haul", "Secure Warehousing", "SMS & Web Tracking"],
    link: "/services/nationwide"
  },
  { 
    id: 3,
    title: "Safe & Secure Handling", 
    desc: "We ensure full insurance coverage and careful item management. Your fragile and high-value items are safe with our trained professionals.",
    bullets: ["Tamper-proof Packaging", "Value Insurance up to ৳50k", "CCTV Monitored Hubs"],
    link: "/services/secure-handling"
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
  // By default, the first item is open
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-32 w-full max-w-7xl mx-auto px-5 md:px-12">
      
      <div className="text-center md:text-left mb-12 md:mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.577_0.245_27.325)] mb-2 block">Why Choose Us</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading text-foreground">
          Premium Logistics <br className="hidden md:block" /> Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Large Rounded Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl group"
        >
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/a5c3c668a455ec9036065379018c6514_bvc4hu.jpg"
            alt="DeshParcel Logistics Operations"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Subtle gradient to make the image look premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.05_255)]/40 to-transparent mix-blend-multiply" />
        </motion.div>

        {/* Right Side: Accordion Features */}
        <div className="flex flex-col justify-center">
          {highlights.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="border-b border-border last:border-0">
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                >
                  <h3 className={`text-xl md:text-2xl font-bold font-heading transition-colors duration-300 ${isOpen ? "text-[oklch(0.577_0.245_27.325)]" : "text-foreground group-hover:text-[oklch(0.577_0.245_27.325)]/80"}`}>
                    {item.title}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {isOpen ? (
                      <Minus className="h-6 w-6 text-[oklch(0.577_0.245_27.325)]" />
                    ) : (
                      <Plus className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </button>

                {/* Accordion Content with Framer Motion AnimatePresence */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-4 md:pr-12">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
                          {item.desc}
                        </p>
                        
                        {/* Bullet Points */}
                        <ul className="space-y-2.5 mb-6">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-[oklch(0.22_0.05_255)]" />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* View Details Link/Button */}
                        <Link href={item.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider group">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[oklch(0.577_0.245_27.325)] text-white group-hover:bg-[oklch(0.22_0.05_255)] transition-colors">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                          <span className="text-[oklch(0.577_0.245_27.325)] group-hover:text-[oklch(0.22_0.05_255)] transition-colors">
                            View Details
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}