"use client";

import { useEffect, useState } from "react";
import { DollarSign, CheckCircle2, XCircle, Clock, ArrowUpRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/shared/mainloading";
import LoadingSkeleton from "@/components/shared/loading";

export default function PaymentsRevenuePage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/withdrawal-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch withdrawal requests");

      setWithdrawals(result.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch payment/withdrawal data." });
    } finally {
      setLoading(false);
    }
  };
  const handleWithdrawalAction = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    try {
      setActionLoading(requestId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/withdrawal-requests/${requestId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || `Failed to ${status.toLowerCase()} request`);

      toast.success(`Request ${status === "APPROVED" ? "Approved" : "Rejected"}!`, {
        description: `The rider cashout request has been successfully updated.`,
      });
      fetchWithdrawals();
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
  const totalPendingAmount = withdrawals
    .filter((w) => w.status === "PENDING")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalApprovedAmount = withdrawals
    .filter((w) => w.status === "APPROVED")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            Payments & <span className="text-red-700">Revenue Hub</span>
          </h2>
          <p className="text-xs text-gray-400">
            Monitor platform cash flow, review rider earnings withdrawal requests, and process payouts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 bg-[#050814] border border-emerald-500/30 rounded-2xl text-xs font-bold text-emerald-400 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Total Payouts Done: ৳ {totalApprovedAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#0b132b] border border-amber-500/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending Cashout Requests</p>
            <h3 className="text-2xl font-extrabold text-amber-400">৳ {totalPendingAmount.toLocaleString()}</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Withdrawal Tickets</p>
            <h3 className="text-2xl font-extrabold text-white">{withdrawals.length} Requests</h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-700/10 text-red-700 border border-red-700/20">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Withdrawal Requests Table */}
      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Rider Withdrawal Requests</h3>
            <p className="text-xs text-gray-400">Approve or reject pending earnings cashout submissions from delivery partners.</p>
          </div>
        </div>

        {withdrawals.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs uppercase tracking-wider">
            No withdrawal requests submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Rider Info</th>
                  <th className="py-4 px-4">Amount Requested</th>
                  <th className="py-4 px-4">Payment Method</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-bold text-white">{w.rider?.name || "Unknown Rider"}</p>
                      <p className="text-[10px] text-gray-400">{w.rider?.email} • {w.rider?.phone || "No phone"}</p>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-emerald-400 text-sm">
                      ৳ {w.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-300 uppercase font-semibold">
                      {w.method || "Bank / Mobile Banking"}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        w.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                        w.status === "REJECTED" ? "bg-red-700/20 text-red-700 border-red-700/30" :
                        "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {w.status === "PENDING" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            disabled={actionLoading === w.id}
                            onClick={() => handleWithdrawalAction(w.id, "APPROVED")}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            disabled={actionLoading === w.id}
                            onClick={() => handleWithdrawalAction(w.id, "REJECTED")}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-red-700/20 text-red-700 hover:bg-red-700 hover:text-white border border-red-700/30 cursor-pointer"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          Processed
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

    </div>
  );
}