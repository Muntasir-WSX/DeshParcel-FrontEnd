"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 rounded-3xl text-white px-6 md:px-16 shadow-2xl border border-white/10 min-h-[620px] flex items-center">
      {/* Background Image spanning the entire section */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/7533ef36f512067645af5b25bbd7fe39_xkvdym.jpg"
          alt="DeshParcel Logistics Fleet Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Heavy Dark Blue Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_255)] via-[oklch(0.18_0.04_255)]/95 to-[oklch(0.15_0.03_250)]/75 backdrop-blur-[1px]" />
      </div>

      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[oklch(0.577_0.245_27.325)]/20 rounded-full blur-3xl pointer-events-none z-1" />

      {/* Content with Framer Motion */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wide uppercase mb-6 text-white/90 shadow-sm"
        >
          <Zap className="h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)]" />
          Fastest Nationwide Logistics in Bangladesh
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 font-heading drop-shadow-md">
          Reliable Logistics & <span style={{ color: "oklch(0.577 0.245 27.325)" }}>Freight Solutions</span>
        </h1>

        <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl font-normal drop-shadow">
          We provide end-to-end logistics and freight services designed to keep your supply chain moving smoothly, securely, and efficiently worldwide.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href="/dashboard/create-parcel">
            <Button 
              size="lg" 
              className="rounded-2xl px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all group cursor-pointer"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
            >
              Send a Parcel
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link href="/services">
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-2xl px-8 h-12 text-base font-semibold border-white/20 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer backdrop-blur-sm"
            >
              Our Services
            </Button>
          </Link>
        </div>

        {/* Quick Trust Badges */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/15">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[oklch(0.577_0.245_27.325)]" />
            <span className="text-xs md:text-sm font-medium text-gray-200">100% Secure</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-[oklch(0.577_0.245_27.325)]" />
            <span className="text-xs md:text-sm font-medium text-gray-200">24/7 Express</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-[oklch(0.577_0.245_27.325)]" />
            <span className="text-xs md:text-sm font-medium text-gray-200">Live Tracking</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}