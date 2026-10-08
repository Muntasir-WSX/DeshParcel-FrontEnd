"use client";

import { useEffect, useState } from "react";
import { Package, CheckCircle2, Trash2, UserPlus, Truck, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/shared/mainloading";
import LoadingSkeleton from "@/components/shared/loading";

export default function ManageParcelsPage() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [riders, setRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [selectedRiderId, setSelectedRiderId] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [rejectReason, setRejectReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    fetchParcelsAndRiders();
  }, []);

  const fetchParcelsAndRiders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // 1. Fetch All Parcels
      const parcelRes = await fetch(`${BACKEND_URL}/api/v1/admin/parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const parcelResult = await parcelRes.json();
      if (!parcelRes.ok) throw new Error(parcelResult.message || "Failed to fetch parcels");
      const userRes = await fetch(`${BACKEND_URL}/api/v1/admin/users?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userResult = await userRes.json();

      setParcels(parcelResult.data);
      
      if (userRes.ok) {
        const approvedRiders = userResult.data.result.filter(
          (u: any) => u.role === "RIDER" && u.riderProfile?.isApproved
        );
        setRiders(approvedRiders);
      }
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch parcel data." });
    } finally {
      setLoading(false);
    }
  };

 
  const handleApproveParcel = async (parcelId: string) => {
    try {
      setActionLoading(parcelId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/parcels/${parcelId}/approve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to approve parcel");

      toast.success("Parcel Approved!", { description: "The parcel has been approved for dispatch." });
      fetchParcelsAndRiders();
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcel || !selectedRiderId) return;

    try {
      setActionLoading(selectedParcel.id);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/parcels/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          parcelId: selectedParcel.id,
          riderId: selectedRiderId,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to assign rider");

      toast.success("Rider Assigned!", { description: "The parcel has been successfully assigned to the rider." });
      setIsAssignModalOpen(false);
      setSelectedParcel(null);
      setSelectedRiderId("");
      fetchParcelsAndRiders();
    } catch (error: any) {
      toast.error("Assignment Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParcel) return;

    try {
      setActionLoading(selectedParcel.id);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/parcels/${selectedParcel.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: rejectReason }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to reject parcel");

      toast.success("Parcel Rejected", { description: "The parcel has been cancelled and removed." });
      setIsRejectModalOpen(false);
      setSelectedParcel(null);
      setRejectReason("");
      fetchParcelsAndRiders();
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
       <LoadingSkeleton></LoadingSkeleton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            Parcel <span className="text-red-700">Management Hub</span>
          </h2>
          <p className="text-xs text-gray-400">
            Monitor system-wide shipments, approve orders, assign delivery riders, and manage fulfillment workflows.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#050814] border border-white/10 rounded-2xl text-xs font-bold text-gray-300">
          Total Parcels: <span className="text-red-700">{parcels.length}</span>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {parcels.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-wider">
            No parcels found in the system.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Tracking ID & Category</th>
                  <th className="py-4 px-4">Sender & Receiver</th>
                  <th className="py-4 px-4">Delivery Address</th>
                  <th className="py-4 px-4">Status & Rider</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {parcels.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-mono font-bold text-white">{p.trackingId}</p>
                      <p className="text-[10px] text-red-500 uppercase font-semibold">{p.category} • ৳ {p.codAmount || 0}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      <p className="font-semibold text-white">From: {p.sender?.name || "Customer"}</p>
                      <p className="text-[10px] text-gray-400">To: {p.receiverName} ({p.receiverPhone})</p>
                    </td>
                    <td className="py-4 px-4 text-gray-300 max-w-xs truncate">
                      <p className="flex items-center gap-1"><MapPin className="h-3 w-3 text-red-500 shrink-0" /> {p.deliveryAddress}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        p.status === "DELIVERED" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                        p.status === "APPROVED" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        p.status === "ASSIGNED" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                        p.status === "CANCELLED" ? "bg-red-700/20 text-red-700 border-red-700/30" :
                        "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}>
                        {p.status}
                      </span>
                      {p.rider && (
                        <p className="text-[10px] text-gray-400 mt-1">Rider: <span className="text-white font-bold">{p.rider.name}</span></p>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {p.status === "PENDING" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === p.id}
                          onClick={() => handleApproveParcel(p.id)}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                          Approve
                        </Button>
                      )}

                      {p.status === "APPROVED" && (
                        <Button
                          size="sm"
                          onClick={() => { setSelectedParcel(p); setIsAssignModalOpen(true); }}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                        >
                          Assign Rider
                        </Button>
                      )}

                      {p.status !== "DELIVERED" && p.status !== "CANCELLED" && (
                        <Button
                          size="sm"
                          onClick={() => { setSelectedParcel(p); setIsRejectModalOpen(true); }}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-red-700/20 text-red-700 hover:bg-red-700 hover:text-white border border-red-700/30 cursor-pointer"
                        >
                          Reject
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Rider Modal */}
      {isAssignModalOpen && selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b132b] border border-red-700/30 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <h3 className="text-base font-extrabold font-heading text-white">
              Assign Rider for <span className="text-red-700">{selectedParcel.trackingId}</span>
            </h3>
            
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Select Approved Rider</label>
                <select
                  value={selectedRiderId}
                  onChange={(e) => setSelectedRiderId(e.target.value)}
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                >
                  <option value="">-- Choose Rider Partner --</option>
                  {riders.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.phone || r.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="rounded-xl text-xs bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs bg-red-700 hover:bg-red-800 text-white cursor-pointer"
                >
                  Confirm Assignment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject / Delete Modal */}
      {isRejectModalOpen && selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b132b] border border-red-700/30 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <h3 className="text-base font-extrabold font-heading text-white">
              Reject Parcel <span className="text-red-700">{selectedParcel.trackingId}</span>
            </h3>
            
            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">Reason for Rejection</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter rejection reason (e.g. invalid address, prohibited item)..."
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700 h-24 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="rounded-xl text-xs bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl text-xs bg-red-700 hover:bg-red-800 text-white cursor-pointer"
                >
                  Confirm Rejection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}