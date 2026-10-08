"use client";

import { useEffect, useState } from "react";
import { 
  Bike, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  KeyRound, 
  AlertTriangle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/shared/loading";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

export default function RiderParcelsPage() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // OTP Modal State for Delivery Confirmation
  const [otpModal, setOtpModal] = useState<{
    isOpen: boolean;
    parcelId: string | null;
    trackingId: string;
    otpInput: string;
  }>({
    isOpen: false,
    parcelId: null,
    trackingId: "",
    otpInput: "",
  });

  useEffect(() => {
    fetchAssignedParcels();
  }, []);

  const fetchAssignedParcels = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/rider/assigned-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch assigned parcels");

      setParcels(result.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch parcels." });
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyAndDeliver = async () => {
    if (!otpModal.parcelId || otpModal.otpInput.length !== 4) {
      toast.error("Invalid OTP", { description: "Please enter a valid 4-digit delivery OTP." });
      return;
    }

    try {
      setActionLoading(otpModal.parcelId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/rider/parcels/${otpModal.parcelId}/deliver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp: otpModal.otpInput }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "OTP verification failed");

      toast.success("Parcel Delivered Successfully!", { 
        description: "The delivery has been verified and recorded in your earnings." 
      });

      setOtpModal({ isOpen: false, parcelId: null, trackingId: "", otpInput: "" });
      fetchAssignedParcels();
    } catch (error: any) {
      toast.error("Verification Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            Assigned <span className="text-red-700">Parcels Hub</span>
          </h2>
          <p className="text-xs text-gray-400">
            View order details, track destination addresses, and complete deliveries using customer OTP verification.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#050814] border border-white/10 rounded-2xl text-xs font-bold text-gray-300">
          Total Assigned: <span className="text-red-700">{parcels.length}</span>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {parcels.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-wider">
            No parcels assigned to you yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Tracking ID & Category</th>
                  <th className="py-4 px-4">Sender Contact</th>
                  <th className="py-4 px-4">Receiver & Delivery Address</th>
                  <th className="py-4 px-4">Status & OTP Security</th>
                  <th className="py-4 px-4 text-right">Delivery Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {parcels.map((p) => {
                  const isOutForDelivery = p.status === "OUT_FOR_DELIVERY";
                  const isDelivered = p.status === "DELIVERED";

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-mono font-bold text-white">{p.trackingId}</p>
                        <p className="text-[10px] text-red-700 uppercase font-semibold">{p.category} • COD: Tk{p.codAmount || 0}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        <p className="font-semibold text-white">{p.sender?.name}</p>
                        <p className="text-[10px] text-gray-400">{p.sender?.phone || "No phone"}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-300 max-w-xs">
                        <p className="font-semibold text-white">{p.receiverName} ({p.receiverPhone})</p>
                        <p className="text-[10px] text-gray-400 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-red-700 shrink-0" /> {p.deliveryAddress}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isDelivered ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                          isOutForDelivery ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                          "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}>
                          {p.status}
                        </span>
                        {isOutForDelivery && p.deliveryOtp && (
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-700/10 border border-red-700/30 text-red-700 font-mono text-xs font-extrabold tracking-widest">
                            <KeyRound className="h-3.5 w-3.5 animate-pulse" />
                            OTP: {p.deliveryOtp}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {isDelivered ? (
                          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                            Completed
                          </span>
                        ) : isOutForDelivery ? (
                          <Button
                            size="sm"
                            disabled={actionLoading === p.id}
                            onClick={() => setOtpModal({
                              isOpen: true,
                              parcelId: p.id,
                              trackingId: p.trackingId,
                              otpInput: "",
                            })}
                            className="h-8 px-4 text-[10px] font-bold uppercase bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer  shadow-emerald-600/20"
                          >
                            Verify & Deliver
                          </Button>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            Move to Out for Delivery first
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* OTP Input Modal for Delivery Confirmation */}
      <AlertDialog open={otpModal.isOpen} onOpenChange={(open) => !open && setOtpModal({ ...otpModal, isOpen: false })}>
        <AlertDialogContent className="bg-[#0b132b] border border-red-700/30 text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700/20 border border-red-700/30 flex items-center justify-center text-red-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg">
              Confirm Delivery OTP
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-400 leading-relaxed">
              Enter the 4-digit verification code provided by the customer for tracking ID <span className="text-white font-bold">{otpModal.trackingId}</span> to complete the delivery.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <input
              type="text"
              maxLength={4}
              value={otpModal.otpInput}
              onChange={(e) => setOtpModal({ ...otpModal, otpInput: e.target.value.replace(/\D/g, '') })}
              placeholder="Enter 4-digit OTP"
              className="w-full bg-[#050814] border border-white/20 text-white text-center text-xl font-mono tracking-widest rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-700"
            />
          </div>

          <AlertDialogFooter className="pt-2 border-t border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black rounded-xl text-xs cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleVerifyAndDeliver}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer  shadow-emerald-600/30"
            >
              Verify & Complete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}