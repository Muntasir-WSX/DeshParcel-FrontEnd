"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PackageCheck, ArrowRight, ShieldCheck, Zap, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpressDeliveryPage() {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white pt-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-slate-900 dark:text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-slate-50 dark:bg-[#070b19]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225445/expressDelivery_txtr8g.jpg"
            alt="Express Delivery Service"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 dark:from-[#070b19]/95 dark:via-[#070b19]/85 dark:to-[#070b19]/70 backdrop-blur-[1px]" />
        </div>

        {/* Decorative Glow Effects */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-4"
          >
            <div className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-slate-200 dark:border-white/20 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm backdrop-blur-md">
              <Zap className="h-4 w-4 text-red-700" />
              Priority Express Shipping
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
              Lightning Fast <span className="text-red-700">Express Delivery</span> Solutions
            </h1>

            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              When time is critical, our express delivery service ensures your priority parcels and urgent documents are rushed directly to their destination with top priority.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
          >
            <Link href="/create-parcel">
              <Button 
                size="lg" 
                className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 w-full"
              >
                Send Express Parcel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. Key Features / Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 my-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-red-700 block">
            Maximum Speed & Security
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
            Why Choose <span className="text-red-700">Express?</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300">
            Engineered for urgent shipments where every single hour counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">24-Hour Delivery</h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Guaranteed next-day delivery across major metropolitan cities and hubs in Bangladesh.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Priority Handling</h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Express packages skip regular queues and receive dedicated top-tier security monitoring.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">Live GPS Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Monitor your express shipment in real-time with direct live rider location updates.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Detailed Information & Checklist Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-white dark:bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Express Service Highlights
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              Tailored specifically for corporate papers, high-value gadgets, and urgent customer orders.
            </p>

            <ul className="space-y-3">
              {[
                "Immediate express pickup within 60 minutes",
                "Dedicated rapid-response delivery riders",
                "100% money-back transit time guarantee",
                "Instant delivery confirmation notification via SMS",
                "Secure tamper-proof packaging options"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-slate-700 dark:text-gray-200 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-red-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-[#070b19] border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-6 relative z-10">
            <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3">
              Express Pricing & Specs
            </h4>
            <div className="space-y-4 text-xs text-slate-600 dark:text-gray-300">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Base Weight (Up to 1 KG):</span>
                <span className="font-bold text-slate-900 dark:text-white">৳150 - ৳220</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Extra Weight Charge (Per KG):</span>
                <span className="font-bold text-slate-900 dark:text-white">৳35</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Delivery SLA:</span>
                <span className="font-bold text-red-700">Within 24 Hours</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Weight Limit:</span>
                <span className="font-bold text-slate-900 dark:text-white">10 KG Max</span>
              </div>
            </div>

            <Link href="/create-parcel" className="block pt-2">
              <Button className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Book Express Delivery Now
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}