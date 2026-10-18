"use client";

import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useEffect, useState } from "react";
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
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function RidersApprovalPage() {
  const [riders, setRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    riderId: string | null;
    riderName: string;
  }>({
    isOpen: false,
    riderId: null,
    riderName: "",
  });

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch riders");

      const riderList = result.data.result.filter(
        (u: any) => u.role === "RIDER",
      );
      setRiders(riderList);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Could not fetch riders.",
      });
    } finally {
      setLoading(false);
    }
  };

  const executeApproveRider = async () => {
    if (!confirmModal.riderId) return;

    const riderId = confirmModal.riderId;
    setConfirmModal({ isOpen: false, riderId: null, riderName: "" });

    try {
      setActionLoading(riderId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://desh-parcel-backend.vercel.app";

      const res = await fetch(
        `${BACKEND_URL}/api/v1/admin/riders/${riderId}/approve`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to approve rider");

      toast.success("Rider Approved!", {
        description:
          "The rider account is now active and ready for deliveries.",
      });
      fetchRiders();
    } catch (error: any) {
      toast.error("Approval Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            Rider <span className="text-red-700">Verification & Approval</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-300 mt-1">
            Review delivery partner applications, verify vehicle information,
            and authorize active riders.
          </p>
        </div>
        <div className="px-4 py-2 bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-gray-300">
          Total Riders: <span className="text-red-700">{riders.length}</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {riders.length === 0 ? (
          <div className="py-20 text-center text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
            No rider accounts found in the system.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  <th className="py-4 px-4">Rider Name</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">Vehicle Details</th>
                  <th className="py-4 px-4">NID Number</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
                {riders.map((r) => {
                  const isApproved = r.riderProfile?.isApproved;
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-700/20 text-red-700 flex items-center justify-center font-extrabold text-xs border border-red-200 dark:border-red-700/30">
                          {r.name?.charAt(0) || "R"}
                        </div>
                        {r.name}
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-gray-300">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {r.email}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400">
                          {r.phone || "No phone"}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-gray-300">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {r.riderProfile?.vehicleType || "Bike"}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase">
                          {r.riderProfile?.vehicleNumber || "N/A"}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-gray-300 font-mono text-[11px]">
                        {r.riderProfile?.nidNumber || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        {isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-500/30">
                            <CheckCircle2 className="h-3 w-3" /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-300 dark:border-amber-500/30">
                            <Clock className="h-3 w-3" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {!isApproved ? (
                          <Button
                            size="sm"
                            disabled={actionLoading === r.id}
                            onClick={() =>
                              setConfirmModal({
                                isOpen: true,
                                riderId: r.id,
                                riderName: r.name,
                              })
                            }
                            className="h-8 px-4 text-[10px] font-bold uppercase bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-all shadow-sm"
                          >
                            Approve Rider
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            disabled
                            className="h-8 px-4 text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-600/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 cursor-not-allowed opacity-90"
                          >
                            Active Partner
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

      {/* SweetAlert Style Confirmation Dialog */}
      <AlertDialog
        open={confirmModal.isOpen}
        onOpenChange={(open) =>
          !open && setConfirmModal({ ...confirmModal, isOpen: false })
        }
      >
        <AlertDialogContent className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/30 text-slate-900 dark:text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-700/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center text-red-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Authorize Delivery Partner
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Are you sure you want to approve{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                {confirmModal.riderName}
              </span>{" "}
              as an active delivery rider? They will be authorized to accept and
              fulfill parcels.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t border-slate-200 dark:border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-slate-100 hover:bg-slate-200 dark:bg-[#050814] dark:hover:bg-white/10 border-slate-300 dark:border-white/20 text-slate-800 dark:text-white rounded-xl text-xs cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeApproveRider}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              Yes, Approve Rider
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
