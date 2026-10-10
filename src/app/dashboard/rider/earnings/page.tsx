"use client";

import { useEffect, useState } from "react";
import { DollarSign, Wallet, ArrowUpRight, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/shared/loading";

export default function RiderEarningsPage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Cashout Form State
  const [amount, setAmount] = useState("");
  const [bkashNo, setBkashNo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const profileRes = await fetch(`${BACKEND_URL}/api/v1/rider/profile-earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileResult = await profileRes.json();

      const reportRes = await fetch(`${BACKEND_URL}/api/v1/rider/earnings-report`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reportResult = await reportRes.json();

      if (profileRes.ok) setProfileData(profileResult.data);
      if (reportRes.ok) setReport(reportResult.data);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Failed to fetch earnings report." });
    } finally {
      setLoading(false);
    }
  };

  const handleCashoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/rider/cashout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount), bkashNo }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Cashout failed");

      toast.success("Cashout Requested Successfully!", {
        description: `Your withdrawal ticket for Tk${amount} has been submitted to admin.`,
      });
      setAmount("");
      setBkashNo("");
      fetchEarningsData();
    } catch (error: any) {
      toast.error("Cashout Failed", { description: error.message });
    } finally {
      setSubmitting(false);
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

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
            Earnings & <span className="text-red-700">Cashout Hub</span>
          </h2>
          <p className="text-xs text-gray-400">
            Track your daily, weekly, and monthly delivery commissions, and request instant bKash cashouts.
          </p>
        </div>
        <div className="bg-[#050814] border border-emerald-500/30 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-inner">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Total Wallet Balance</p>
            <p className="text-xl font-extrabold text-emerald-400">{riderDetails?.balance?.toLocaleString() || 0}Tk</p>
          </div>
        </div>
      </div>

      {/* Earnings Report Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Daily Report */}
        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Today's Performance</p>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase border border-blue-500/30">Daily</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-white"> {report?.daily?.income || 0} Tk</h3>
            <p className="text-xs text-gray-400">Delivered: <span className="text-emerald-400 font-bold">{report?.daily?.deliveredCount || 0} parcels</span></p>
          </div>
        </div>

        {/* Weekly Report */}
        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">This Week's Earnings</p>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase border border-purple-500/30">Weekly</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-white"> {report?.weekly?.income || 0} Tk</h3>
            <p className="text-xs text-gray-400">Delivered: <span className="text-emerald-400 font-bold">{report?.weekly?.deliveredCount || 0} parcels</span></p>
          </div>
        </div>

        {/* Monthly Report */}
        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">This Month's Earnings</p>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30">Monthly</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-white"> {report?.monthly?.income || 0} Tk</h3>
            <p className="text-xs text-gray-400">Delivered: <span className="text-emerald-400 font-bold">{report?.monthly?.deliveredCount || 0} parcels</span></p>
          </div>
        </div>

      </div>

      {/* Cashout Request Form Section */}
      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 lg:p-8 shadow-xl max-w-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold font-heading text-white">Request bKash Cashout</h3>
          <p className="text-xs text-gray-400">Minimum cashout amount is 100 BDT. Funds will be transferred after admin approval.</p>
        </div>

        <form onSubmit={handleCashoutSubmit} className="space-y-4">
          <div className="space-y-1.5">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label className="text-[10px] font-bold uppercase text-gray-400">Withdrawal Amount (BDT)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          <div className="space-y-1.5">
            {/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label className="text-[10px] font-bold uppercase text-gray-400">bKash Account Number</label>
            <input
              type="text"
              value={bkashNo}
              onChange={(e) => setBkashNo(e.target.value)}
              placeholder="017XXXXXXXX"
              className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 text-xs font-bold uppercase bg-red-700 hover:bg-red-800 text-white rounded-xl cursor-pointer  shadow-red-700/30 transition-all"
          >
            {submitting ? "Submitting Request..." : "Submit Cashout Ticket"}
          </Button>
        </form>
      </div>

    </div>
  );
}