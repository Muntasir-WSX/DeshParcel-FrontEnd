"use client";

import { useCallback, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Package, CreditCard, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PaymentPage({ params }: { params: Promise<{ parcelId: string }> }) {
  const { parcelId } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  const fetchPaymentDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      if (!token) {
        throw new Error("Session expired. Please log in again.");
      }

      const res = await fetch(`${BACKEND_URL}/api/v1/payments/${parcelId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch payment details");

      setPaymentData(result.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    } finally {
      setLoading(false);
    }
  }, [parcelId]);

  useEffect(() => {
    void fetchPaymentDetails();
  }, [fetchPaymentDetails]);

  const handleBkashPayment = async () => {
    try {
      setPaying(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/payments/bkash/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ parcelId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "bKash initialization failed");

      const redirectUrl = result.data?.bkashURL || result.data?.bkashGatewayURL || result.data?.url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.log("bKash Response Data:", result.data); 
        throw new Error("Invalid bKash gateway URL received.");
      }
    } catch (error: any) {
      toast.error("Payment Failed", { description: error.message });
      setPaying(false);
    }
  };

  const handleSslPayment = async () => {
    try {
      setPaying(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/payments/ssl/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ parcelId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "SSLCommerz initialization failed");

      // SSLCommerz Gateway URL এ রিডাইরেক্ট
      if (result.data?.gatewayPageURL) {
        window.location.href = result.data.gatewayPageURL;
      } else {
        throw new Error("Invalid SSLCommerz gateway URL received.");
      }
    } catch (error: any) {
      toast.error("Payment Failed", { description: error.message });
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b19] flex items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin text-red-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white py-24 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-[#0b132b] border border-red-700/30 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-8"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-700/10 border border-red-700/30 text-[10px] font-bold uppercase tracking-wider text-red-500">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Checkout
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-white">Complete Your Payment</h1>
          <p className="text-xs text-gray-400">Choose your preferred gateway to finalize your parcel shipment.</p>
        </div>

        {/* Bill Details */}
        <div className="bg-[#050814] border border-white/10 rounded-2xl p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center text-gray-400">
            <span>Parcel Reference ID:</span>
            <span className="font-mono text-white">{parcelId.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <span>Payment Status:</span>
            <span className="font-bold text-amber-400 uppercase tracking-wider">{paymentData?.status || "PENDING"}</span>
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm font-bold text-white">
            <span>Total Payable Amount:</span>
            <span className="text-red-500 text-lg">৳ {paymentData?.amount || 0}</span>
          </div>
        </div>

        {/* Payment Gateway Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleBkashPayment}
            disabled={paying}
            className="w-full h-14 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-pink-600/20 transition-all"
          >
            {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
            Pay with bKash
          </Button>

          <Button
            onClick={handleSslPayment}
            disabled={paying}
            className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-emerald-600/20 transition-all"
          >
            {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Package className="h-4 w-4" />}
            Pay with SSLCommerz (Cards / Bank / MFS)
          </Button>
        </div>

      </motion.div>
    </div>
  );
}