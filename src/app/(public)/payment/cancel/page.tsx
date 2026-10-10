"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentCancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/user");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#0b132b] border border-amber-500/30 rounded-3xl p-8 md:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-xl"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/40 shadow-inner">
          <AlertCircle className="h-10 w-10 text-amber-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold font-heading text-white">Payment Cancelled</h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            You cancelled the payment process. Redirecting you to your dashboard...
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/dashboard/user" className="block w-full">
            <Button className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2">
              <LayoutDashboard className="h-4 w-4" /> Go to Dashboard Now
            </Button>
          </Link>

          <Link href="/" className="block w-full">
            <Button variant="outline" className="w-full h-12 rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-xs font-bold uppercase tracking-wider cursor-pointer bg-[#050814] transition-all flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}