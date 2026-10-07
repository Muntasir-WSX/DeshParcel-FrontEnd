"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Shield } from "lucide-react";
import { getLoggedInUserProfile } from "./profile"; // সঠিক রিলেটিভ পাথ

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getLoggedInUserProfile();
        setProfile(data);
      } catch (error: any) {
        toast.error("Session Expired", {
          description: error.message || "Please login again.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center text-xs tracking-wider uppercase">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white pt-32 px-6 flex justify-center">
      <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative space-y-6">
        
        {/* Header Avatar */}
        <div className="text-center pb-4 border-b border-white/10 space-y-2">
          <div className="w-16 h-16 bg-red-700/20 text-red-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-red-700/40 shadow-inner">
            {profile?.name?.charAt(0) || "U"}
          </div>
          <h1 className="text-xl font-extrabold font-heading text-white">{profile?.name}</h1>
          <span className="inline-block px-3 py-1 rounded-full bg-red-700/20 text-red-700 text-[10px] font-bold uppercase tracking-wider border border-red-700/30">
            {profile?.role}
          </span>
        </div>

        {/* Details Cards */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 bg-[#050814] p-3.5 rounded-xl border border-white/10">
            <Mail className="h-4 w-4 text-red-700 shrink-0" />
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Email Address</p>
              <p className="font-semibold text-white">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#050814] p-3.5 rounded-xl border border-white/10">
            <Phone className="h-4 w-4 text-red-700 shrink-0" />
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Phone Number</p>
              <p className="font-semibold text-white">{profile?.phone || "Not Provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#050814] p-3.5 rounded-xl border border-white/10">
            <Shield className="h-4 w-4 text-red-700 shrink-0" />
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">Account Verification</p>
              <p className="font-semibold text-emerald-400">
                {profile?.isVerified ? "Verified User" : "Unverified"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}