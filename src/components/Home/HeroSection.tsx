"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full pt-36 pb-32 md:pt-44 md:pb-40 mb-32 overflow-visible bg-[#070b19]">
      
      {/* Background Image spanning the entire top area */}
      <div className="absolute inset-0 z-0 w-full h-full rounded-b-[3rem] overflow-hidden shadow-2xl">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/7533ef36f512067645af5b25bbd7fe39_xkvdym.jpg"
          alt="DeshParcel Logistics Background"
          fill
          priority
          className="object-cover object-center filter brightness-90"
        />
        {/* Updated Dark Blue & Redish Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/60 md:from-[#070b19]/95 md:via-[#070b19]/75 md:to-[#070b19]/40 backdrop-blur-[2px]" />
      </div>

      {/* Glowing Accents behind hero content */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Side: Content, CTA & Track Input */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 md:space-y-8"
        >
          {/* Top Small Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-semibold tracking-wide text-white/90 shadow-sm w-fit">
            <ShieldCheck className="h-3.5 w-3.5 md:h-4 md:w-4 text-[oklch(0.577_0.245_27.325)]" />
            Your Trusted Logistics Partner
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-white font-heading">
            <span style={{ color: "oklch(0.577 0.245 27.325)" }}>Trusted & Reliable</span> <br />
            Courier Service in <br className="hidden sm:block" />
            Bangladesh
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
            We deliver your parcels faster and safer, making DeshParcel the most trusted delivery partner for your business.
          </p>

          {/* Actions Row: Button + Track Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 md:pt-4">
            <Link href="/dashboard/create-parcel" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto rounded-xl px-6 md:px-8 h-14 text-sm font-bold shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
                style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
              >
                <User className="mr-2 h-5 w-5" />
                Send a Parcel
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            {/* Track Parcel Input Wrapper */}
            <div className="flex items-center w-full sm:max-w-sm bg-[#050814]/90 backdrop-blur-md rounded-xl p-1.5 shadow-xl border border-white/20 focus-within:ring-2 focus-within:ring-[oklch(0.577_0.245_27.325)] transition-all">
              <div className="pl-3 pr-2 text-gray-400">
                <Search className="h-5 w-5 text-red-700" />
              </div>
              <input 
                type="text" 
                placeholder="Track Parcel..." 
                className="flex-1 bg-transparent border-none outline-none text-white text-sm font-medium px-2 placeholder:text-gray-400 h-11"
              />
              <Button size="icon" className="h-11 w-11 rounded-lg shrink-0 cursor-pointer" style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Delivery Rider Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative w-full h-[550px] xl:h-[600px] flex justify-center items-end -mb-10 xl:-mb-16">
            <Image
              src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/7533ef36f512067645af5b25bbd7fe39_xkvdym.jpg"
              alt="DeshParcel Delivery Rider"
              fill
              className="object-contain object-bottom scale-110 drop-shadow-2xl filter brightness-95"
            />
          </div>
        </motion.div>
      </div>

     {/* Floating Bottom Stats Card (Hidden on Mobile, Visible on Small screens & up) */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[92%] sm:w-[85%] max-w-5xl bg-[#0b132b] border border-red-500/25 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 py-6 md:py-8 px-4 md:px-6 hidden sm:grid grid-cols-3 gap-0 divide-x divide-white/10 text-white"
      >
        <div className="flex flex-col items-center justify-center text-center px-2 md:px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white font-heading mb-1">3500</h3>
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Merchants</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-2 md:px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white font-heading mb-1">1.5M+</h3>
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Deliveries</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-2 md:px-4">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white font-heading mb-1">64 Dist.</h3>
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Home Delivery</p>
        </div>
      </motion.div>
      
    </section>
  );
}