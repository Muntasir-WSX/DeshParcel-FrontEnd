"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Package, 
  Bike, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3 
} from "lucide-react";
import { toast } from "sonner";
import Loader from "@/components/shared/mainloading";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/dashboard-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch dashboard statistics");
      }

      setStats(result.data);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Something went wrong while fetching stats.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: ` ${stats?.totalRevenue?.toLocaleString() || 0} Tk`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Total Parcels",
      value: stats?.totalParcels || 0,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Active Riders",
      value: stats?.totalRiders || 0,
      icon: Bike,
      color: "text-red-700",
      bg: "bg-red-700/10",
      border: "border-red-700/20",
    },
  ];

  const chartData = stats?.parcelStatusCounts?.map((item: any) => ({
    status: item.status,
    count: item._count.status,
  })) || [];

  const COLORS = ["#b91c1c", "#1d4ed8", "#047857", "#6d28d9", "#b45309"];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/20 border border-red-700/30 text-[10px] font-bold uppercase tracking-wider text-red-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            System Control Center
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
            Welcome back, <span className="text-red-700">Admin</span>
          </h2>
          <p className="text-xs text-gray-400 max-w-xl">
            Monitor real-time system metrics, track parcel statuses, evaluate platform revenue, and oversee logistics performance across the network.
          </p>
        </div>

        <div className="relative z-10 bg-[#050814] border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-4 shadow-inner">
          <div className="p-3 rounded-xl bg-red-700/20 text-red-700">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Platform Status</p>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Fully Operational
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              className={`bg-[#0b132b] border ${card.border} rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-red-700/40 transition-all`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {card.title}
                </p>
                <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Parcel Status Distribution */}
        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base md:text-lg font-bold font-heading text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-700" />
                Parcel Workflow Analytics
              </h3>
              <p className="text-xs text-gray-400">
                Visual representation of parcels across different active states.
              </p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                  dataKey="status" 
                  stroke="#9ca3af" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#050814", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Count Summary Grid */}
        <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 lg:p-8 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base md:text-lg font-bold font-heading text-white">
                Detailed Status Counts
              </h3>
              <p className="text-xs text-gray-400">
                Exact numbers for each parcel operational status.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
            {stats?.parcelStatusCounts?.map((item: any, idx: number) => (
              <div key={idx} className="bg-[#050814] border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {item.status}
                  </p>
                  <p className="text-xl font-extrabold text-white">
                    {item._count.status}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 text-red-700">
                  <Package className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}