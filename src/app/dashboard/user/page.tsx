"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, PlusCircle, MapPin, Trash2, Clock, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
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

export default function UserParcelsPage() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Delete/Cancel Modal State (Shadcn AlertDialog)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    parcelId: string | null;
    trackingId: string;
  }>({
    isOpen: false,
    parcelId: null,
    trackingId: "",
  });

  useEffect(() => {
    fetchMyParcels();
  }, []);

  const fetchMyParcels = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/users/my-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch parcels");

      setParcels(result.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch your parcels." });
    } finally {
      setLoading(false);
    }
  };

  const executeDeleteParcel = async () => {
    if (!deleteModal.parcelId) return;

    const parcelId = deleteModal.parcelId;
    setDeleteModal({ isOpen: false, parcelId: null, trackingId: "" });

    try {
      setActionLoading(parcelId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/parcels/${parcelId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete parcel");

      toast.success("Parcel Deleted", { description: "The shipment has been successfully cancelled and removed." });
      fetchMyParcels();
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
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
      
      {/* Header Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            My Booked <span className="text-red-700">Parcels</span>
          </h2>
          <p className="text-xs text-gray-400">
            View all your shipments, monitor current transit milestones, and manage bookings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#050814] border border-white/10 rounded-2xl text-xs font-bold text-gray-300">
            Total Parcels: <span className="text-red-700">{parcels.length}</span>
          </div>
          <Link href="/dashboard/user/create-parcel">
            <Button className="h-10 px-4 text-xs font-bold uppercase bg-red-700 hover:bg-red-800 text-white rounded-2xl cursor-pointer  shadow-red-700/30">
              <PlusCircle className="h-4 w-4 mr-1.5" /> Book New
            </Button>
          </Link>
        </div>
      </div>

      {/* Parcels Table / List */}
      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {parcels.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-gray-400 text-xs uppercase tracking-wider">No parcels booked by you yet.</p>
            <Link href="/dashboard/user/create-parcel">
              <Button size="sm" className="bg-red-700 hover:bg-red-800 text-white text-xs uppercase font-bold cursor-pointer">
                Book Your First Parcel
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Tracking ID & Category</th>
                  <th className="py-4 px-4">Receiver Info</th>
                  <th className="py-4 px-4">Delivery Address</th>
                  <th className="py-4 px-4">Status & Payment</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {parcels.map((p) => {
                  const isPending = p.status === "PENDING";
                  const isDelivered = p.status === "DELIVERED";

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-mono font-bold text-white">{p.trackingId}</p>
                        <p className="text-[10px] text-red-500 uppercase font-semibold">{p.category} • {p.weight} kg</p>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        <p className="font-semibold text-white">{p.receiverName}</p>
                        <p className="text-[10px] text-gray-400">{p.receiverPhone}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-300 max-w-xs truncate">
                        <p className="flex items-center gap-1 text-[11px]">
                          <MapPin className="h-3 w-3 text-red-500 shrink-0" /> {p.deliveryAddress}
                        </p>
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                          isDelivered ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                          isPending ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                          "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}>
                          {p.status}
                        </span>
                        <p className="text-[10px] text-gray-400">
                          Fee: ৳{p.payment?.amount || 0} ({p.payment?.status || "PENDING"})
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link href={`/Track`} target="_blank">
                          <Button size="sm" variant="outline" className="h-7 px-3 text-[10px] font-bold uppercase bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer">
                            Track
                          </Button>
                        </Link>
                        {isPending && (
                          <Button
                            size="sm"
                            disabled={actionLoading === p.id}
                            onClick={() => setDeleteModal({ isOpen: true, parcelId: p.id, trackingId: p.trackingId })}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-red-700/20 text-red-500 hover:bg-red-700 hover:text-white border border-red-700/30 cursor-pointer"
                          >
                            Cancel
                          </Button>
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

      {/* Shadcn AlertDialog for Cancellation */}
      <AlertDialog open={deleteModal.isOpen} onOpenChange={(open) => !open && setDeleteModal({ ...deleteModal, isOpen: false })}>
        <AlertDialogContent className="bg-[#0b132b] border border-red-700/30 text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700/20 border border-red-700/30 flex items-center justify-center text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg">
              Cancel & Delete Parcel
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-400 leading-relaxed">
              Are you sure you want to cancel booking for tracking ID <span className="text-white font-bold">{deleteModal.trackingId}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black rounded-xl text-xs cursor-pointer">
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDeleteParcel}
              className="bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer  shadow-red-700/30"
            >
              Yes, Cancel Parcel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}