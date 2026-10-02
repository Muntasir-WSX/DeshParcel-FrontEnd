"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CoverageSection() {
  return (
    <section className="relative py-20 md:py-28 my-16 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-white/10">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/0baf4b9ee1a28ce305fb45c49d925e42_ru5dbc.jpg"
          alt="DeshParcel Coverage Nationwide"
          fill
          className="object-cover object-center"
        />
        {/* Deep Dark Blue & Black Gradient Overlay (As requested) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_255)]/95 via-[oklch(0.18_0.04_255)]/85 to-black/70 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Glow Effect */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[oklch(0.577_0.245_27.325)]/20 rounded-full blur-3xl pointer-events-none z-1" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide uppercase text-white/90 shadow-sm">
            <MapPin className="h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
            Nationwide Network
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            Delivering to All <span style={{ color: "oklch(0.577 0.245 27.325)" }}>64 Districts</span> Across Bangladesh
          </h2>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed font-medium">
            From metropolitan cities to remote upazilas, our extensive coverage ensures your parcel reaches its destination securely and on time.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/coverage">
            <Button 
              size="lg" 
              className="rounded-full px-8 h-14 text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
            >
              Check Coverage Area
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}