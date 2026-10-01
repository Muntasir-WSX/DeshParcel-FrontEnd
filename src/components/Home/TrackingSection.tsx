"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, PackageCheck } from "lucide-react";

export default function TrackingSection() {
  const [trackingId, setTrackingId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;
    // Static for now, functionality can be added later
    alert(`Tracking order: ${trackingId}`);
  };

  return (
    <div className="-mt-10 relative z-20 max-w-4xl mx-auto px-4">
      <div className="bg-background/95 backdrop-blur-xl border border-border/80 shadow-2xl rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <PackageCheck className="h-5 w-5 text-[oklch(0.577_0.245_27.325)]" />
          <h3 className="text-lg font-bold tracking-tight">Instant Shipment Tracking</h3>
        </div>
        
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input 
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your Tracking ID (e.g. DP-984321)" 
              className="w-full pl-12 pr-4 h-14 rounded-2xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] text-foreground font-medium transition-all"
            />
          </div>
          <Button 
            type="submit"
            className="h-14 px-8 rounded-2xl text-base font-semibold shadow-md cursor-pointer"
            style={{ backgroundColor: "oklch(0.577_0.245_27.325)", color: "#fff" }}
          >
            Track Order
          </Button>
        </form>
      </div>
    </div>
  );
}