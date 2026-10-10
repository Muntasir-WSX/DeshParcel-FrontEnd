/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { useEffect, useState } from "react";
import { 
  Bike, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Send,
  MapPin,
  XCircle
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

export default function RiderOverviewPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [parcels, setParcels] = useState<any[]>([]);
  const [earningsReport, setEarningsReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Cashout Modal State
  const [isCashoutOpen, setIsCashoutOpen] = useState(false);
  const [cashoutAmount, setCashoutAmount] = useState("");
  const [bkashNo, setBkashNo] = useState("");

  // Status Update Confirmation Modal State
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    parcelId: string | null;
    trackingId: string;
    nextStatus: string;
  }>({
    isOpen: false,
    parcelId: null,
    trackingId: "",
    nextStatus: "",
  });

  useEffect(() => {
    fetchRiderData();
  }, []);

  const fetchRiderData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      // 1. Profile & Earnings
      const profileRes = await fetch(`${BACKEND_URL}/api/v1/rider/profile-earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileResult = await profileRes.json();

      // 2. Assigned Parcels
      const parcelsRes = await fetch(`${BACKEND_URL}/api/v1/rider/assigned-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const parcelsResult = await parcelsRes.json();

      // 3. Earnings Report
      const reportRes = await fetch(`${BACKEND_URL}/api/v1/rider/earnings-report`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reportResult = await reportRes.json();

      if (profileRes.ok) setProfileData(profileResult.data);
      if (parcelsRes.ok) setParcels(parcelsResult.data);
      if (reportRes.ok) setEarningsReport(reportResult.data);

    } catch (error: any) {
      toast.error("Error", { description: error.message || "Failed to fetch rider information." });
    } finally {
      setLoading(false);
    }
  };

  const handleCashoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setActionLoading("cashout");
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/rider/cashout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(cashoutAmount), bkashNo }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Cashout failed");

      toast.success("Cashout Requested Successfully!", {
        description: `Your withdrawal ticket for Tk${cashoutAmount} has been submitted to admin.`,
      });
      setCashoutAmount("");
      setBkashNo("");
      setIsCashoutOpen(false);
      await fetchRiderData();
    } catch (error: any) {
      toast.error("Cashout Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };


  const executeStatusUpdate = async () => {
    if (!statusModal.parcelId || !statusModal.nextStatus) return;

    const { parcelId, nextStatus } = statusModal;
    setStatusModal({ isOpen: false, parcelId: null, trackingId: "", nextStatus: "" });

    try {
      setActionLoading(parcelId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/rider/parcels/${parcelId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus, note: `Status updated to ${nextStatus} by rider` }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update status");

      toast.success("Status Updated!", { description: `Parcel moved to ${nextStatus}` });
      fetchRiderData();
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

  const riderDetails = profileData?.riderDetails;
  const dailyStats = profileData?.dailyStats;

  return (
    <div className="space-y-8">
      
      {/* Rider Header & Wallet Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/20 border border-red-700/30 text-[10px] font-bold uppercase tracking-wider text-red-700">
            <Bike className="h-3.5 w-3.5" />
            Verified Rider Partner
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
            Welcome back, <span className="text-red-700">{riderDetails?.name || "Rider"}</span>
          </h2>
          <p className="text-xs text-gray-400">
            {riderDetails?.email} • {riderDetails?.phone || "No phone provided"}
          </p>
        </div>

        
      </div>

      {/* Daily Performance Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0b132b] border border-emerald-500/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Income</p>
            <h3 className="text-2xl font-extrabold text-emerald-400">Tk {dailyStats?.dailyIncome || 0}</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#0b132b] border border-blue-500/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Delivered Today</p>
            <h3 className="text-2xl font-extrabold text-white">{dailyStats?.dailyDelivered || 0} Parcels</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#0b132b] border border-purple-500/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending Pickup</p>
            <h3 className="text-2xl font-extrabold text-white">{dailyStats?.dailyPending || 0} Parcels</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Cancelled Today</p>
            <h3 className="text-2xl font-extrabold text-red-700">{dailyStats?.dailyCancelled || 0} Parcels</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-700/10 text-red-700 border border-red-700/20">
            <XCircle className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Assigned Parcels Section */}
      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base md:text-lg font-bold font-heading text-white">Assigned Parcels</h3>
            <p className="text-xs text-gray-400">Manage your active delivery duties and update shipment states.</p>
          </div>
        </div>

        {parcels.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-wider">
            No parcels currently assigned to you.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Tracking ID & Category</th>
                  <th className="py-4 px-4">Sender Info</th>
                  <th className="py-4 px-4">Receiver & Address</th>
                  <th className="py-4 px-4">Current Status</th>
                  <th className="py-4 px-4 text-right">Actions / Next State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {parcels.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-mono font-bold text-white">{p.trackingId}</p>
                      <p className="text-[10px] text-red-700 uppercase font-semibold">{p.category} • COD: Tk{p.codAmount || 0}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-300">
                      <p className="font-semibold text-white">{p.sender?.name}</p>
                      <p className="text-[10px] text-gray-400">{p.sender?.phone}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-300 max-w-xs">
                      <p className="font-semibold text-white">{p.receiverName} ({p.receiverPhone})</p>
                      <p className="text-[10px] text-gray-400 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-red-700 shrink-0" /> {p.deliveryAddress}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {p.status === "ASSIGNED" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === p.id}
                          onClick={() => setStatusModal({
                            isOpen: true,
                            parcelId: p.id,
                            trackingId: p.trackingId,
                            nextStatus: "PICKED_UP",
                          })}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                          Mark Picked Up
                        </Button>
                      )}
                      {p.status === "PICKED_UP" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === p.id}
                          onClick={() => setStatusModal({
                            isOpen: true,
                            parcelId: p.id,
                            trackingId: p.trackingId,
                            nextStatus: "AT_HUB",
                          })}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                        >
                          Send to Hub
                        </Button>
                      )}
                      {p.status === "AT_HUB" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === p.id}
                          onClick={() => setStatusModal({
                            isOpen: true,
                            parcelId: p.id,
                            trackingId: p.trackingId,
                            nextStatus: "OUT_FOR_DELIVERY",
                          })}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                        >
                          Out for Delivery
                        </Button>
                      )}
                      {p.status === "OUT_FOR_DELIVERY" && (
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          Waiting for Delivery OTP
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cashout Request Modal */}
      {isCashoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0b132b] border border-red-700/30 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-6">
            <h3 className="text-base font-extrabold font-heading text-white">
              Request Earnings <span className="text-red-700">Cashout</span>
            </h3>
            
            <form onSubmit={handleCashoutSubmit} className="space-y-4">
              <div className="space-y-1">
                {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label className="text-[10px] font-bold uppercase text-gray-400">Amount (Min 100 BDT)</label>
                <input
                  type="number"
                  value={cashoutAmount}
                  onChange={(e) => setCashoutAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400">bKash Number</label>
                <input
                  type="text"
                  value={bkashNo}
                  onChange={(e) => setBkashNo(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCashoutOpen(false)}
                  className="rounded-xl text-xs bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading === "cashout"}
                  className="rounded-xl text-xs bg-red-700 hover:bg-red-800 text-white cursor-pointer"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Update Confirmation Dialog (SweetAlert Style) */}
      <AlertDialog open={statusModal.isOpen} onOpenChange={(open) => !open && setStatusModal({ ...statusModal, isOpen: false })}>
        <AlertDialogContent className="bg-[#0b132b] border border-red-700/30 text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700/20 border border-red-700/30 flex items-center justify-center text-red-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg">
              Confirm Status Update
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-400 leading-relaxed">
              Are you sure you want to update parcel <span className="text-white font-bold">{statusModal.trackingId}</span> status to <span className="text-emerald-400 font-bold uppercase">{statusModal.nextStatus}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black rounded-xl text-xs cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeStatusUpdate}
              className="bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer  shadow-red-700/30"
            >
              Confirm Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}