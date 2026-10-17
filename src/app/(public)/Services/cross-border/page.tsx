"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, ShieldCheck, Plane, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CrossBorderPage() {
  return (
    <div className="w-full bg-[#070b19] text-white pt-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-[#070b19]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225457/crossBorder_b3zgg8.jpg"
            alt="Cross-Border Shipping Service"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
        </div>

        {/* Decorative Glow Effects */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4 text-red-700" />
              Global & Regional Logistics
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Seamless <span className="text-red-700">Cross-Border Shipping</span> & Cargo
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              Expand your business beyond borders. We provide secure international freight forwarding, customs clearance assistance, and reliable cross-border delivery solutions.
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
                className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-700 hover:bg-red-700 text-white flex items-center justify-center gap-2 w-full"
              >
                Inquire Shipping
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
            Global Reach, Local Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
            Why Choose Our <span className="text-red-700">Cross-Border Service?</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-300">
            Simplifying international trade and cargo movement with full documentation support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <Plane className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Air & Land Freight</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Flexible multi-modal transportation options tailored for heavy cargo or fast-track document delivery.
            </p>
          </div>

          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Customs Clearance Support</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Expert handling of import/export documentation, duties compliance, and regulatory paperwork.
            </p>
          </div>

          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Global Tracking Network</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              End-to-end visibility from international hubs straight to final doorstep delivery.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Detailed Information & Checklist Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Cross-Border Capabilities
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Designed for global e-commerce brands, importers, exporters, and enterprises requiring robust international supply chains.
            </p>

            <ul className="space-y-3">
              {[
                "Comprehensive import and export advisory",
                "Secure international warehousing and sorting",
                "Cross-border Cash on Delivery (COD) solutions",
                "Full transit insurance coverage options",
                "Dedicated key account management for enterprise clients"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-gray-200 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-red-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#070b19] border border-white/10 rounded-2xl p-8 space-y-6 relative z-10">
            <h4 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-3">
              Shipping Guidelines & ETA
            </h4>
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Standard Transit Time:</span>
                <span className="font-bold text-white">3 - 7 Business Days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Documentation:</span>
                <span className="font-bold text-white">Commercial Invoice Required</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Freight Type:</span>
                <span className="font-bold text-red-500">Air & Land Freight</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Support:</span>
                <span className="font-bold text-emerald-400">24/7 International Desk</span>
              </div>
            </div>

            <Link href="/ContactUs" className="block pt-2">
              <Button className="w-full py-3 rounded-xl bg-red-700 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Contact Corporate Desk
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}