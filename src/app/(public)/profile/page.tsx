"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Shield, Edit2, Camera, Save, X, ArrowLeft } from "lucide-react";
import { getLoggedInUserProfile, updateLoggedInUserProfile } from "./profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/shared/mainloading";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getLoggedInUserProfile();
      setProfile(data);
      setFormData({
        name: data?.name || "",
        phone: data?.phone || "",
        email: data?.email || "",
      });
    } catch (error: any) {
      toast.error("Session Expired", {
        description: error.message || "Please login again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateLoggedInUserProfile(formData, selectedImage);

      toast.success("Profile Updated!", {
        description: "Your changes and profile picture have been saved successfully.",
      });

      await fetchUserData();
      setIsEditing(false);
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error: any) {
      toast.error("Update Failed", {
        description: error.message || "Something went wrong.",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center text-xs tracking-wider uppercase">
       <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b19] text-white pb-20 relative">
      
      {/* 1. Modern Top Banner Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full h-[280px] md:h-[340px] overflow-hidden shadow-2xl border-b border-red-700/25 flex items-start justify-between px-6 md:px-12 pt-8"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791490136/2f85953737e8001e2c4cac3804098083_xgntck.jpg"
            alt="Profile Banner" 
            sizes="100vw"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-[#070b19]/70 to-[#070b19]/30 backdrop-blur-[1px]" />
        </div>
      </motion.div>

      {/* 2. Floating Profile Card (Modern Overlay Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-xl mx-auto px-4 -mt-24 md:-mt-28 relative z-20"
      >
        <div className="bg-[#0b132b] border border-red-700/30 rounded-3xl p-6 md:p-10 shadow-2xl relative space-y-6 backdrop-blur-xl">
          
          {/* Top Action Bar: Edit Toggle */}
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Account Profile</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-full h-8 px-4 text-[11px] font-bold uppercase border-white/20 text-white hover:bg-white hover:text-black cursor-pointer bg-[#050814] shadow-sm"
            >
              {isEditing ? <X className="h-3.5 w-3.5 mr-1" /> : <Edit2 className="h-3.5 w-3.5 mr-1" />}
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          {/* Header Avatar */}
          <div className="text-center pb-2 relative space-y-3">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 bg-red-700/20 text-red-500 rounded-full flex items-center justify-center text-3xl font-bold border-2 border-red-700/40 shadow-xl overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : profile?.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile?.name?.charAt(0) || "U"
                )}
              </div>

              {/* Image Upload Icon if Editing */}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-red-700 hover:bg-red-800 p-2 rounded-full cursor-pointer shadow-lg transition-all">
                  <Camera className="h-4 w-4 text-white" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold font-heading text-white">{profile?.name}</h1>
              <span className="inline-block mt-1 px-3.5 py-1 rounded-full bg-red-700/20 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-700/30">
                {profile?.role}
              </span>
            </div>
          </div>

          {/* Conditional Rendering: View Mode vs Edit Form Mode */}
          {!isEditing ? (
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-4 bg-[#050814] p-4 rounded-2xl border border-white/10">
                <Mail className="h-4 w-4 text-red-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Email Address</p>
                  <p className="font-semibold text-white text-sm">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#050814] p-4 rounded-2xl border border-white/10">
                <Phone className="h-4 w-4 text-red-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Phone Number</p>
                  <p className="font-semibold text-white text-sm">{profile?.phone || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#050814] p-4 rounded-2xl border border-white/10">
                <Shield className="h-4 w-4 text-red-500 shrink-0" />
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">Account Verification</p>
                  <p className="font-semibold text-emerald-400 text-sm">
                    {profile?.isVerified ? "Verified User" : "Unverified"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={updating}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer flex items-center justify-center gap-2 text-xs mt-4 shadow-lg shadow-red-700/30"
              >
                <Save className="h-4 w-4" />
                {updating ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          )}

        </div>
      </motion.div>

    </div>
  );
}