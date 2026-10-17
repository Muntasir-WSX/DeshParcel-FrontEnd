"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight, ShieldCheck, Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CorporateLogisticsPage() {
  return (
    <div className="w-full bg-[#070b19] text-white pt-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-[#070b19]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225484/corporateLogistic_b6k7rn.jpg"
            alt="Corporate Logistics Service"
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
              <Building2 className="h-4 w-4 text-red-700" />
              B2B Enterprise Solutions
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Tailored <span className="text-red-700">Corporate Logistics</span> & Supply Chain
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              Empower your enterprise with dedicated business-to-business supply chain management, bulk cargo distribution, and secure document logistics.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
          >
            <Link href="/ContactUs">
              <Button 
                size="lg" 
                className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-700 hover:bg-red-700 text-white flex items-center justify-center gap-2 w-full"
              >
                Partner With Us
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
            Enterprise Grade Reliability
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
            Why Scale With <span className="text-red-700">Our B2B Network?</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-300">
            Engineered to support large-scale business operations with absolute precision and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Dedicated Account Manager</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Get personalized supervision and priority operational support tailored specifically for your corporate account.
            </p>
          </div>

          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Bulk Cargo Management</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Seamless handling of high-volume product distributions, warehouse restocks, and multi-hub transfers.
            </p>
          </div>

          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-700/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-700/10 text-red-700 flex items-center justify-center font-bold border border-red-700/20">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Scheduled Distribution</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automated pickup schedules and periodic dispatch workflows designed to match your corporate cycle.
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
              Corporate Logistics Services
            </h3>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              We help retail brands, corporate offices, and manufacturing units optimize their supply chain logistics efficiently.
            </p>

            <ul className="space-y-3">
              {[
                "Custom corporate billing and invoicing terms",
                "Advanced inventory storage and fulfillment services",
                "Priority B2B parcel routing and security",
                "Regular performance analytics and reporting dashboards",
                "Specialized handling for fragile or high-value inventory"
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
              Contract & Pricing Overview
            </h4>
            <div className="space-y-4 text-xs text-gray-300">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Contract Type:</span>
                <span className="font-bold text-white">Custom SLA Agreements</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Billing Cycle:</span>
                <span className="font-bold text-white">Monthly / Bi-weekly</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span>Discount Tiers:</span>
                <span className="font-bold text-red-700">Available for High Volume</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Dedicated Support:</span>
                <span className="font-bold text-emerald-400">24/7 Priority Channel</span>
              </div>
            </div>

            <Link href="/ContactUs" className="block pt-2">
              <Button className="w-full py-3 rounded-xl bg-red-700 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Request Corporate Proposal
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}