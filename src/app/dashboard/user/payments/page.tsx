"use client";

import { useEffect, useState } from "react";
import { CreditCard, DollarSign, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/shared/loading";

export default function UserPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/users/my-payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch payment history");

      setPayments(result.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch payment records." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

  // মোট সফল পেমেন্টের পরিমাণ হিসাব করা
  const totalSpent = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            Payment & Transaction <span className="text-red-700">History</span>
          </h2>
          <p className="text-xs text-gray-400">
            Review delivery fee payments, transaction gateways, and billing status logs.
          </p>
        </div>
        <div className="px-5 py-3 bg-[#050814] border border-emerald-500/30 rounded-2xl flex items-center gap-3 shadow-inner">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Total Paid Amount</p>
            <p className="text-lg font-extrabold text-emerald-400">৳ {totalSpent.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {payments.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-wider">
            No payment records found in your account.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Transaction ID</th>
                  <th className="py-4 px-4">Parcel Info</th>
                  <th className="py-4 px-4">Gateway</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {payments.map((p) => {
                  const isSuccess = p.status === "SUCCESS";
                  const isPending = p.status === "PENDING";

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-white">
                        {p.transactionId || "N/A"}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-white">{p.parcel?.category || "Shipment"}</p>
                        <p className="text-[10px] text-gray-400 truncate max-w-xs">{p.parcel?.deliveryAddress}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 font-mono text-[10px] uppercase font-bold">
                          {p.gateway}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-extrabold text-white">
                        ৳ {p.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isSuccess ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                          isPending ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                          "bg-red-700/20 text-red-500 border-red-700/30"
                        }`}>
                          {isSuccess && <CheckCircle2 className="h-3 w-3" />}
                          {isPending && <Clock className="h-3 w-3" />}
                          {!isSuccess && !isPending && <XCircle className="h-3 w-3" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-400 text-[11px]">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}