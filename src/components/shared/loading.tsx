"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  type?: "card" | "table" | "profile" | "dashboard" | "fullpage";
  count?: number;
}

export default function LoadingSkeleton({ type = "card", count = 3 }: LoadingSkeletonProps) {
  
  // Full Page Loading Skeleton
  if (type === "fullpage") {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#070b19]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-red-500/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Content...
        </p>
      </div>
    );
  }

  // Card Grid Skeleton
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-[#0b132b] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl relative overflow-hidden"
          >
            {/* Shimmer Effect Animation */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="w-12 h-12 rounded-2xl bg-white/10 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-3 w-full bg-white/5 rounded-md animate-pulse" />
              <div className="h-3 w-5/6 bg-white/5 rounded-md animate-pulse" />
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="h-4 w-20 bg-white/10 rounded-md animate-pulse" />
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Table Row Skeleton
  if (type === "table") {
    return (
      <div className="w-full bg-[#0b132b] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse mb-6" />
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#050814] border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 bg-white/10 rounded-md animate-pulse" />
                  <div className="h-3 w-20 bg-white/5 rounded-md animate-pulse" />
                </div>
              </div>
              <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Dashboard Stats/Profile Skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0b132b] border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl">
          <div className="h-3 w-24 bg-white/10 rounded-md animate-pulse" />
          <div className="h-8 w-16 bg-white/15 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
}