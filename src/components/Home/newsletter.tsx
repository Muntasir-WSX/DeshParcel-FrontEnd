"use client";

import { useState } from "react";
import { Send, CheckCircle2, PackageCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/public/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to subscribe");

      toast.success("Successfully Subscribed!", {
        description: "Thank you for joining the DeshParcel newsletter community.",
      });
      setEmail("");
    } catch (error: any) {
      toast.error("Subscription Failed", {
        description: error.message || "Could not subscribe at the moment. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 my-28">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-white to-white dark:from-[#0b132b] dark:via-[#151e3f] dark:to-[#0b132b] border border-red-700/30 p-8 md:p-14 shadow-2xl text-slate-900 dark:text-white">
        
        {/* Background Glow Elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/5 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white shadow-sm">
              <PackageCheck className="h-4 w-4 text-red-700" />
              Stay Connected With Us
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight leading-tight">
              Ready to Scale Your <span className="text-red-700">Deliveries?</span>
            </h2>

            <p className="text-slate-600 dark:text-gray-300 text-xs md:text-sm max-w-xl leading-relaxed">
              Subscribe to our weekly newsletter for logistics insights, exclusive merchant discounts, and feature updates. Or start shipping right now with DeshParcel.
            </p>
          </div>

          {/* Right Newsletter Subscription Form */}
          <div className="lg:col-span-5 bg-slate-100 dark:bg-[#050814]/70 border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-heading">
              Join Our Newsletter
            </h3>
            <p className="text-xs text-slate-600 dark:text-gray-300">
              No spam. Get valuable e-commerce shipping tips straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/15 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 cursor-pointer"
              >
                {loading ? "Subscribing..." : "Subscribe Now"}
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}