"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const steps = [
  { step: "01", title: "Book Pickup", desc: "Fill out the online booking form with pickup and delivery details." },
  { step: "02", title: "Parcel Collection", desc: "Our rider collects your parcel directly from your doorstep." },
  { step: "03", title: "Safe Transit", desc: "Your item is processed and dispatched via secure transit hubs." },
  { step: "04", title: "Successful Delivery", desc: "Delivered safely to the recipient with live delivery confirmation." },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 md:py-32 w-full max-w-7xl mx-auto px-6 md:px-16 my-16 rounded-3xl text-white shadow-2xl overflow-hidden border border-red-700/20 bg-[#070b19]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/3ac6da767bb3adc52ae07880de66c6d9_vefxzu.jpg"
          alt="DeshParcel Working Process Background"
          fill
          className="object-cover object-center filter brightness-90"
        />
        {/* Dark Blue & Redish Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

      {/* Content Container */}
      <div className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border  border-red-700/30 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm mb-3"
          >
            <ShieldCheck className="h-4 w-4 text-red-700" />
            Simple Process
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading text-white mb-4"
          >
            How <span className="text-red-700">DeshParcel</span> Works
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base font-medium"
          >
            Send your packages in 4 easy steps without any hassle.
          </motion.p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative p-6 md:p-8 rounded-3xl bg-[#0b132b]/90 backdrop-blur-md border border-white/10 shadow-xl hover:border-red-700/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              {/* Background Step Number Watermark */}
              <span className="absolute top-4 right-5 text-4xl md:text-5xl font-black text-white/5 font-heading group-hover:text-red-700/10 transition-colors">
                {item.step}
              </span>

              <div>
                <div className="w-11 h-11 rounded-2xl bg-red-600 text-white font-extrabold flex items-center justify-center mb-5 text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white font-heading group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}