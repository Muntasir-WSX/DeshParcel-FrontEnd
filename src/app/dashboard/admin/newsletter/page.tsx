"use client";

import { Calendar, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/shared/mainloading";
import { Button } from "@/components/ui/button";

export default function AdminNewslettersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/newsletters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        setSubscribers(result.data);
      } else {
        throw new Error(result.message || "Failed to load newsletters");
      }
    } catch (error: any) {
      toast.error("Error", { description: error.message });
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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            Newsletter <span className="text-red-700">Subscribers</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">
            View and manage users subscribed to DeshParcel promotional emails &
            updates.
          </p>
        </div>

        <Button
          onClick={fetchSubscribers}
          variant="outline"
          className="h-10 px-4 text-xs font-bold uppercase border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh List
        </Button>
      </div>

      {/* Subscribers Table Container */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 flex items-center gap-2">
            <Mail className="h-4 w-4 text-red-700" /> Total Subscribers (
            {subscribers.length})
          </span>
        </div>

        {subscribers.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-gray-400 text-xs">
            No subscribers found yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-800 dark:text-white">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] uppercase font-bold text-slate-500 dark:text-gray-400">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Subscribed Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {subscribers.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-400 dark:text-gray-500">
                      {index + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {item.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-red-700" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
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
