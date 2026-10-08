"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, MapPin, User, Phone, Weight, Tag, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CreateParcelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    receiverName: "",
    receiverPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    category: "",
  });
  const [parcelImage, setParcelImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setParcelImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const data = new FormData();
      data.append("receiverName", formData.receiverName);
      data.append("receiverPhone", formData.receiverPhone);
      data.append("pickupAddress", formData.pickupAddress);
      data.append("deliveryAddress", formData.deliveryAddress);
      data.append("weight", formData.weight);
      data.append("category", formData.category);

      if (parcelImage) {
        data.append("image", parcelImage);
      }

      const res = await fetch(`${BACKEND_URL}/api/v1/parcels`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const contentType = res.headers.get("content-type") || "";
      const responseText = await res.text();
      let result: { message?: string; error?: string; data?: { trackingId?: string } } | null = null;

      if (responseText && contentType.includes("application/json")) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("The backend returned malformed JSON while creating the parcel.");
        }
      }

      if (!res.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            responseText.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() ||
            `Parcel request failed (${res.status}).`,
        );
      }

      if (!result) {
        throw new Error("The backend returned an invalid response while creating the parcel.");
      }

      toast.success("Parcel Booked Successfully!", {
        description: `Tracking ID: ${result.data?.trackingId || "Generated"}`,
      });

      router.push("/dashboard/user");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      toast.error("Booking Failed", { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-20 text-white space-y-12">
      
      {/* 1. Hero Banner Section (Centered Content) */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full pt-44 pb-44 px-8 md:px-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-red-700/25 flex flex-col items-center justify-center text-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791012807/6b5d791c1002361cf027e2abb4036429_nx8o3m.jpg"
            alt="Create Parcel Banner" 
            sizes="100vw"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/90 to-[#070b19]/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-red-500 shadow-sm">
            <Package className="h-4 w-4 text-red-500" />
            Fast & Secure Shipping Network
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]">
            Book a <span className="text-red-700">Parcel Shipment</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-2xl leading-relaxed font-normal">
            Fill in the shipment details below to dispatch your packages securely across nationwide delivery hubs with real-time tracking and trusted courier service.
          </p>
        </div>
      </motion.section>

      {/* 2. Create Parcel Form Card */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 md:px-0"
      >
        <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-lg md:text-xl font-extrabold font-heading text-white">
              Shipment Information Form
            </h2>
            <p className="text-xs text-gray-400">
              Provide accurate receiver and package specifications for smooth delivery handling.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Receiver Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-red-500" /> Receiver Name
                </label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="e.g. Your Receiver's Name"
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              {/* Receiver Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-red-500" /> Receiver Phone
                </label>
                <input
                  type="text"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" /> Pickup Address
                </label>
                <textarea
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  placeholder="Enter complete pickup address..."
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 h-24 resize-none"
                  required
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" /> Delivery Address
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  placeholder="Enter complete destination address..."
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 h-24 resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight (kg) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <Weight className="h-3.5 w-3.5 text-red-500" /> Weight (Kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 1.5"
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-red-500" /> Parcel Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics, Clothing, Documents"
                  className="w-full bg-[#050814] border border-white/15 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700"
                  required
                />
              </div>
            </div>

            {/* Optional Parcel Image Upload */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-red-500" /> Parcel Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-[#050814] border border-white/15 text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-red-700/20 file:text-red-500 hover:file:bg-red-700 hover:file:text-white rounded-xl text-xs cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 rounded-2xl text-xs font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer shadow-lg shadow-red-700/30 transition-all flex items-center gap-2"
              >
                {loading ? "Booking Parcel..." : "Confirm & Book Shipment"} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

          </form>

        </div>
      </motion.section>

    </div>
  );
}