"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, CheckCircle2, Clock, Truck, MapPin, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/parcels/tracking/${trackingId.trim()}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Shipment not found.");
      }

      setSearchResult(result.data);
    } catch (error: any) {
      setSearchResult(null);
      toast.error("Tracking Failed", { description: error.message || "Could not retrieve parcel tracking info." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-20 text-slate-900 dark:text-white">
      
      {/* Hero Banner Section */}
      <section className="relative w-full pt-48 pb-36 md:pt-60 md:pb-44 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20 border-b border-red-700/20 bg-slate-50 dark:bg-[#070b19]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791013954/fa2ace3be2ddbd52671264bb3e7b7736_b23nfm.jpg"
            alt="DeshParcel Tracking Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          {/* Light Mode White Gradient & Dark Mode Fixed Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 dark:from-[#070b19]/95 dark:via-[#070b19]/85 dark:to-[#070b19]/70 backdrop-blur-[3px]" />
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-xs font-bold uppercase tracking-wider text-red-700 shadow-sm"
          >
            <Package className="h-4 w-4 text-red-700" />
            Real-Time Shipment Tracking
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white leading-[1.15]"
          >
            Track Your <span className="text-red-700">Parcel Instantly</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Enter your tracking ID below to check the exact live status and location of your shipment.
          </motion.p>
        </div>
      </section>

      {/* Interactive Tracking Input & Results Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-white dark:bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-8 space-y-2 relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Enter Tracking Code
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-300">
              Type your tracking code to preview live status from database server.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 relative z-10 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 dark:text-gray-300" />
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID..."
                className="w-full h-13 pl-11 pr-5 rounded-2xl bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-gray-500 text-sm outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-13 px-8 rounded-2xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 cursor-pointer shrink-0"
            >
              {loading ? "Searching..." : "Track Package"}
            </Button>
          </form>

          {/* Search Result Display */}
          {hasSearched && (
            <div className="mt-10 relative z-10">
              {searchResult ? (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-100 dark:bg-[#050814] border border-red-700/30 rounded-2xl p-6 md:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-red-700 font-bold block">Shipment ID: {searchResult.trackingId}</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">Status: <span className="text-red-700">{searchResult.status}</span></h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-600 dark:text-gray-300">Category & Weight</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {searchResult.category} ({searchResult.weight} kg)
                      </p>
                    </div>
                  </div>

                  {/* Address & Sender/Receiver Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white dark:bg-[#0b132b] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
                      <p className="text-slate-600 dark:text-gray-300 uppercase font-bold text-[10px]">Receiver Info</p>
                      <p className="font-bold text-slate-900 dark:text-white">{searchResult.receiverName}</p>
                      <p className="text-slate-600 dark:text-gray-300">{searchResult.receiverPhone}</p>
                      <p className="text-slate-600 dark:text-gray-300 truncate">{searchResult.deliveryAddress}</p>
                    </div>
                    <div className="bg-white dark:bg-[#0b132b] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-1">
                      <p className="text-slate-600 dark:text-gray-300 uppercase font-bold text-[10px]">Pickup Address</p>
                      <p className="text-slate-600 dark:text-gray-300 truncate">{searchResult.pickupAddress}</p>
                    </div>
                  </div>

                  {/* Tracking Logs / Timeline Steps */}
                  <div className="space-y-4 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300">Transit Logs & History</p>
                    <div className="space-y-3">
                      {searchResult.trackingLogs?.map((log: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-red-700/20 text-red-700 text-[10px] font-bold uppercase border border-red-700/30">
                              {log.status}
                            </span>
                            <p className="text-xs text-slate-900 dark:text-white font-medium">{log.note}</p>
                          </div>
                          <p className="text-[10px] text-gray-500 shrink-0">
                            {new Date(log.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-100 dark:bg-[#050814] border border-red-700/20 rounded-2xl p-8 text-center space-y-3"
                >
                  <ShieldAlert className="h-10 w-10 text-red-700 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Shipment Found</h4>
                  <p className="text-xs text-slate-600 dark:text-gray-300 max-w-md mx-auto">
                    We couldn&apos;t find any parcel matching this tracking number in our database. Please double check the ID.
                  </p>
                </motion.div>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}