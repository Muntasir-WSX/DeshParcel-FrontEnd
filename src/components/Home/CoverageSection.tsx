"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CoverageSection() {
  return (
    <section className="relative py-20 md:py-28 my-16 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-500/20 bg-[#070b19]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/0baf4b9ee1a28ce305fb45c49d925e42_ru5dbc.jpg"
          alt="DeshParcel Coverage Nationwide"
          fill
          className="object-cover object-center filter brightness-90"
        />
        {/* Deep Dark Blue & Redish Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
      </div>

      {/* Decorative Glow Effects */}
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-500/15 rounded-full blur-3xl pointer-events-none z-1" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-bold tracking-wide uppercase text-red-400 shadow-sm">
            <MapPin className="h-4 w-4 text-red-500" />
            Nationwide Network
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
            Delivering to All <span className="text-red-500">64 Districts</span> Across Bangladesh
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
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
              className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              Check Coverage Area
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}