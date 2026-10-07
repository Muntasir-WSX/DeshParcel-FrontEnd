"use client";

import { Truck, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function loader() {
  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col items-center justify-center space-y-6">
      <div className="relative w-64 h-16 flex items-center overflow-hidden border-b border-white/10 pb-2">
        <motion.div
          initial={{ x: -60 }}
          animate={{ x: 260 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="absolute flex items-center gap-2 text-red-600"
        >
          <Truck className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
          <div className="w-3 h-3 bg-blue-500 rounded-sm animate-pulse" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      </div>

      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest uppercase text-white font-heading">
          <PackageCheck className="h-4 w-4 text-red-600 animate-bounce" />
          DeshParcel Logistics
        </div>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider animate-pulse">
          Transporting your data securely...
        </p>
      </div>
    </div>
  );
}
