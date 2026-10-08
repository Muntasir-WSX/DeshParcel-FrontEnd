"use client";

import { useEffect, useState } from "react";
import { Users, Shield, Ban, CheckCircle, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/shared/loading";



export default function UsersControlPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers(meta.page);
  }, [meta.page]);

  const fetchUsers = async (pageNumber: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users?page=${pageNumber}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch users");

      setUsers(result.data.result);
      setMeta(result.data.meta);
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Could not fetch users." });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      setActionLoading(userId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to update role");

      toast.success("Role Updated!", { description: `User role changed to ${newRole}` });
      fetchUsers(meta.page);
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

 
  const handleBanUser = async (userId: string) => {
    try {
      setActionLoading(userId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users/${userId}/ban`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to ban user");

      toast.success("User Banned", { description: "The user account has been restricted." });
      fetchUsers(meta.page);
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };
  const handleUnbanUser = async (userId: string) => {
    try {
      setActionLoading(userId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users/${userId}/unban`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to unban user");

      toast.success("User Unbanned", { description: "The user account has been restored." });
      fetchUsers(meta.page);
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-white">
            User <span className="text-red-700">Management</span>
          </h2>
          <p className="text-xs text-gray-400">
            Oversee all registered platform users, manage permissions, and enforce security policies.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#050814] border border-white/10 rounded-2xl text-xs font-bold text-gray-300">
          Total Users: <span className="text-red-700">{meta.total}</span>
        </div>
      </div>

      <div className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center"><LoadingSkeleton></LoadingSkeleton></div>
        ) : users.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs uppercase tracking-wider">No users found in the system.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">User Name</th>
                  <th className="py-4 px-4">Email Address</th>
                  <th className="py-4 px-4">Phone</th>
                  <th className="py-4 px-4">Role & Status</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-700/20 text-red-700 flex items-center justify-center font-extrabold text-xs border border-red-700/30">
                        {u.name?.charAt(0) || "U"}
                      </div>
                      {u.name}
                    </td>
                    <td className="py-4 px-4 text-gray-300">{u.email}</td>
                    <td className="py-4 px-4 text-gray-300">{u.phone || "N/A"}</td>
                    <td className="py-4 px-4 space-x-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        u.role === "ADMIN" ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                        u.role === "MODERATOR" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        "bg-white/10 text-gray-300 border-white/20"
                      }`}>
                        {u.role}
                      </span>
                      {u.isBanned && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-red-700/20 text-red-500 border border-red-700/30">
                          Banned
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      {u.role === "CUSTOMER" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === u.id}
                          onClick={() => handleUpdateRole(u.id, "MODERATOR")}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-600/30 cursor-pointer"
                        >
                          Make Moderator
                        </Button>
                      )}
                      {u.role === "MODERATOR" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === u.id}
                          onClick={() => handleUpdateRole(u.id, "CUSTOMER")}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-gray-600/20 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600/30 cursor-pointer"
                        >
                          Make User
                        </Button>
                      )}
                      {u.role !== "ADMIN" && (
                        u.isBanned ? (
                          <Button
                            size="sm"
                            disabled={actionLoading === u.id}
                            onClick={() => handleUnbanUser(u.id)}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-600/30 cursor-pointer"
                          >
                            Unban
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            disabled={actionLoading === u.id}
                            onClick={() => handleBanUser(u.id)}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-red-700/20 text-red-700 hover:bg-red-700 hover:text-white border border-red-700/30 cursor-pointer"
                          >
                            Ban
                          </Button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
          <p className="text-xs text-gray-400">
            Page <span className="text-white font-bold">{meta.page}</span> of {Math.ceil(meta.total / meta.limit) || 1}
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={meta.page <= 1}
              onClick={() => setMeta({ ...meta, page: meta.page - 1 })}
              className="h-8 px-3 text-xs bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={meta.page * meta.limit >= meta.total}
              onClick={() => setMeta({ ...meta, page: meta.page + 1 })}
              className="h-8 px-3 text-xs bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black cursor-pointer"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}