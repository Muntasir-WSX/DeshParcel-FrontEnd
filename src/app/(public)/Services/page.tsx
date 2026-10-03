"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, PackageCheck, Building2, ShieldCheck, Clock, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <div className="w-full pb-20  text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
            alt="DeshParcel Services Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/90 to-[#070b19]/80 backdrop-blur-[3px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-red-600 shadow-sm"
          >
            <Truck className="h-4 w-4 text-red-700" />
            Reliable Logistics Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Our Professional <span className="text-red-700">Logistics Services</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From express parcel delivery to e-commerce fulfillment and corporate logistics, we ensure safe and timely delivery across all 64 districts.
          </motion.p>
        </div>
      </section>

      {/* 2. Section 1: Core Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-700 block">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-black ">
            Tailored Solutions for Your <span className="text-red-700">Business</span>
          </h2>
          <p className="text-sm text-gray-800">
            Choose from our specialized logistics services designed for speed, safety, and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Service Card 1 */}
          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-500/40 transition-all space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-700 flex items-center justify-center font-bold border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">Express Parcel Delivery</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Fast and secure door-to-door parcel delivery across cities and remote areas with real-time tracking updates.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-red-700 font-bold uppercase tracking-wider">
              <span>24–48 Hours Transit</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-500/40 transition-all space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-700 flex items-center justify-center font-bold border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-all">
                <PackageCheck className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">E-commerce Fulfillment</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Complete warehouse storage, inventory management, packaging, and Cash on Delivery (COD) handling for online merchants.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-red-700 font-bold uppercase tracking-wider">
              <span>Next-Day Payouts</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl hover:border-red-500/40 transition-all space-y-5 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-700 flex items-center justify-center font-bold border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">Corporate B2B Logistics</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Dedicated corporate supply chain solutions, bulk cargo transportation, and scheduled document distribution.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-red-700 font-bold uppercase tracking-wider">
              <span>Custom Contracts</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Section 2: Why Choose Our Services (Features) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="bg-gradient-to-r from-[#0b132b] to-[#070b19] border border-red-500/20 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-14 space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700  block">
              Excellence Guaranteed
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Why Businesses Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            <div className="text-center space-y-3 p-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/15 text-red-700 flex items-center justify-center border border-red-500/30">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-white">100% Secure Handling</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every package is handled with utmost care, ensuring zero damage and absolute safety from pickup to drop-off.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/15 text-red-700 flex items-center justify-center border border-red-500/30">
                <Clock className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-white">On-Time Delivery</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                We strictly adhere to delivery timelines so your customers and business associates never experience delays.
              </p>
            </div>

            <div className="text-center space-y-3 p-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-500/15 text-red-700 flex items-center justify-center border border-red-500/30">
                <Headphones className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold font-heading text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our support team is always active to resolve queries, track shipments, and assist you around the clock.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Section 3: Call to Action (CTA) */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-10 md:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="absolute inset-0 bg-red-600/5 pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white relative z-10">
            Ready to Streamline Your Deliveries?
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto relative z-10">
            Join thousands of satisfied merchants and businesses partnering with us for fast and reliable nationwide logistics.
          </p>

          <div className="pt-2 relative z-10">
            <Button className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider  shadow-red-600/30 cursor-pointer">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}