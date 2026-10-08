"use client";

import { useEffect, useState } from "react";
import { Users, Shield, Ban, CheckCircle, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
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

export default function UsersControlPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: "ROLE" | "BAN" | "UNBAN" | null;
    userId: string | null;
    payload?: string;
  }>({
    isOpen: false,
    title: "",
    description: "",
    actionType: null,
    userId: null,
  });

  useEffect(() => {
    fetchUsers(meta.page);
  }, [meta.page]);

  const fetchUsers = async (pageNumber: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/users?page=${pageNumber}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
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

  // আসল এক্সিকিউশন ফাংশন (কনফার্ম করার পর কল হবে)
  const executeAction = async () => {
    if (!confirmModal.userId || !confirmModal.actionType) return;

    const userId = confirmModal.userId;
    const actionType = confirmModal.actionType;
    const payload = confirmModal.payload;

    setConfirmModal({ isOpen: false, title: "", description: "", actionType: null, userId: null });

    try {
      setActionLoading(userId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      let endpoint = "";
      let method = "PATCH";
      let bodyData: any = null;

      if (actionType === "ROLE") {
        endpoint = `${BACKEND_URL}/api/v1/admin/users/${userId}/role`;
        bodyData = { role: payload };
      } else if (actionType === "BAN") {
        endpoint = `${BACKEND_URL}/api/v1/admin/users/${userId}/ban`;
      } else if (actionType === "UNBAN") {
        endpoint = `${BACKEND_URL}/api/v1/admin/users/${userId}/unban`;
      }

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...(bodyData && { body: JSON.stringify(bodyData) }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Action failed");

      if (actionType === "ROLE") {
        toast.success("Role Updated!", { description: `User role successfully changed to ${payload}` });
      } else if (actionType === "BAN") {
        toast.success("User Banned", { description: "The user account has been restricted." });
      } else if (actionType === "UNBAN") {
        toast.success("User Unbanned", { description: "The user account has been restored." });
      }

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
          <div className="py-20 flex justify-center"><LoadingSkeleton /></div>
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
                          onClick={() => setConfirmModal({
                            isOpen: true,
                            title: "Promote to Moderator",
                            description: `Are you sure you want to promote ${u.name} to Moderator? They will gain administrative management privileges.`,
                            actionType: "ROLE",
                            userId: u.id,
                            payload: "MODERATOR",
                          })}
                          className="h-7 px-3 text-[10px] font-bold uppercase bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-600/30 cursor-pointer"
                        >
                          Make Moderator
                        </Button>
                      )}
                      {u.role === "MODERATOR" && (
                        <Button
                          size="sm"
                          disabled={actionLoading === u.id}
                          onClick={() => setConfirmModal({
                            isOpen: true,
                            title: "Demote to User",
                            description: `Are you sure you want to demote ${u.name} back to a regular Customer?`,
                            actionType: "ROLE",
                            userId: u.id,
                            payload: "CUSTOMER",
                          })}
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
                            onClick={() => setConfirmModal({
                              isOpen: true,
                              title: "Unban User Account",
                              description: `Are you sure you want to restore access for ${u.name}?`,
                              actionType: "UNBAN",
                              userId: u.id,
                            })}
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-600/30 cursor-pointer"
                          >
                            Unban
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            disabled={actionLoading === u.id}
                            onClick={() => setConfirmModal({
                              isOpen: true,
                              title: "Ban User Account",
                              description: `Are you sure you want to ban ${u.name}? They will lose platform access immediately.`,
                              actionType: "BAN",
                              userId: u.id,
                            })}
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

      <AlertDialog open={confirmModal.isOpen} onOpenChange={(open) => !open && setConfirmModal({ ...confirmModal, isOpen: false })}>
        <AlertDialogContent className="bg-[#0b132b] border border-red-700/30 text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-700/20 border border-red-700/30 flex items-center justify-center text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg">
              {confirmModal.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-400 leading-relaxed">
              {confirmModal.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-[#050814] border-white/20 text-white hover:bg-white hover:text-black rounded-xl text-xs cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeAction}
              className="bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer  shadow-red-700/30"
            >
              Confirm Action
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}