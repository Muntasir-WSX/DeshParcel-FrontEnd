"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPageComponent() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white overflow-hidden items-center">
      
      {/* Left Side: Error Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center px-6 lg:px-12 py-12 bg-[#070b19] z-10"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 shadow-2xl relative space-y-6 text-center">
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700 mx-auto relative z-10">
            <ShieldAlert className="h-3.5 w-3.5 text-red-700" />
            Error 404 • Page Not Found
          </div>

          <div className="space-y-2 relative z-10">
            <h1 className="text-5xl lg:text-6xl font-black font-heading text-white tracking-wider">
              4<span className="text-red-700">0</span>4
            </h1>
            <h2 className="text-lg font-bold text-gray-200">
              Oops! Page Not Found
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
            <Link href="/" className="flex-1">
              <Button 
                className="w-full py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-700/20"
              >
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Button>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex-1 py-3 px-4 rounded-xl bg-[#050814] hover:bg-white/10 border border-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
          </div>

        </div>
      </motion.div>

      {/* Right Side Cover Image (Matching your theme image style) */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full min-h-screen w-full overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/24408b43c55bd2d8c6e00386eb2b3241_dklk51.jpg"
          alt="DeshParcel 404 Cover"
          fill
          priority
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700">
            <ShieldAlert className="h-3.5 w-3.5 text-red-700" />
            DeshParcel Logistics
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-white">
            Lost in Transit? Let&apos;s Get You Back on Track
          </h2>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Navigate safely through our nationwide delivery network and track your shipments without hassle.
          </p>
        </div>
      </motion.div>

    </div>
  );
}