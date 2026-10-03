"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Briefcase, Zap, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Box, title: "Standard Parcel", desc: "Cost-effective door-to-door delivery for personal goods.", price: "From ৳60" },
  { icon: Zap, title: "Express Urgent", desc: "Priority delivery within 4-6 hours for emergency items.", price: "From ৳120" },
  { icon: Briefcase, title: "Corporate", desc: "Customized bulk shipping and supply chain solutions.", price: "Custom" },
  { icon: Globe, title: "Cross-Border", desc: "Seamless international courier with customs clearance.", price: "From ৳500" },
];

export default function PopularServices() {
  return (
    <section className="relative py-16 md:py-24 w-full max-w-[92%] md:max-w-7xl mx-auto rounded-3xl overflow-hidden my-16 text-white px-6 md:px-12 shadow-2xl border border-red-700/20 bg-[#070b19]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-screeny42-11053643_w8f7g8.jpg"
          alt="DeshParcel Services Background"
          fill
          className="object-cover object-center filter brightness-90"
        />
        {/* Deep Dark Blue & Redish Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 border border-red-700/30 text-xs font-bold uppercase tracking-widest text-red-700 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
              Our Offerings
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-heading text-white">
              Popular Delivery Services
            </h2>
          </div>
          
          <p className="text-xs md:text-sm text-gray-300 max-w-md md:text-right font-medium leading-relaxed">
            Tailored logistics solutions designed to match your personal and business demands efficiently.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#0b132b]/90 backdrop-blur-md text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden border border-white/10 hover:border-red-700/50"
              >
                {/* Red Top Border Accent on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-700/30 flex items-center justify-center mb-5 text-red-700 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white font-heading leading-tight group-hover:text-red-700 transition-colors">{srv.title}</h3>
                  <p className="text-xs md:text-sm text-gray-300 mb-6 leading-relaxed">{srv.desc}</p>
                </div>
                
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Starting at</span>
                    <span className="font-extrabold text-sm text-red-700">{srv.price}</span>
                  </div>
                  <Link href="/Services" className="w-9 h-9 rounded-2xl bg-[#050814] border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 shadow-sm">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
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