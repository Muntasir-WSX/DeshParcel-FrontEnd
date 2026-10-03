"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bike, User, Mail, Phone, Lock, FileText, Shield, 
  ArrowRight, CheckCircle2, Clock, DollarSign, Zap, Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HighlightsSection from "@/components/Home/HighlightsSection";


export default function BecomeRiderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleType: "Bike",
    vehicleNumber: "",
    licenseNumber: "",
    nidNumber: "",
    role: "RIDER",
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting Rider Application:", formData);

    setTimeout(() => {
      setLoading(false);
      setSubmittedData({
        success: true,
        message: "Rider application submitted successfully! Please wait for approval.",
        data: {
          id: "r-722b2d8f-ff64",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: "RIDER",
          vehicleType: formData.vehicleType,
          isVerified: false,
        },
      });
    }, 1000);
  };

  return (
    <div className="w-full bg-[#070b19] text-white min-h-screen">
      
      {/* 1. Banner & Hero Section (Full Width Edge-to-Edge) */}
      <section className="relative w-full pt-44 pb-32 md:pt-56 md:pb-44 px-6 md:px-12 overflow-hidden shadow-2xl border-b border-white/10 bg-[#070b19]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791037739/643ed1c149e6fc7ca94c353f3bb0514d_en1cdw.jpg"
            alt="Become a Rider Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-105"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[2px]" />
        </div>

        {/* Glowing Accents */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/30 text-xs font-bold uppercase tracking-wider text-red-700 shadow-sm"
          >
            <Bike className="h-4 w-4 text-red-700" />
            Join Our Delivery Fleet
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Become a <span className="text-red-700">DeshParcel Rider</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium"
          >
            Earn on your own schedule, deliver packages securely across your city, and grow with our nationwide logistics network.
          </motion.p>
        </div>
      </section>

      {/* Main Container for rest of the sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-20">

        {/* 2. Rider Registration Form Section */}
        <section className="max-w-4xl mx-auto w-full bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10 space-y-2 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white">
              Rider Registration Form
            </h2>
            <p className="text-xs text-gray-400">
              Fill out your personal and vehicle details to register as an approved rider.
            </p>
          </div>

          {submittedData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050814] border border-red-700/40 rounded-2xl p-8 text-center space-y-4 relative z-10"
            >
              <CheckCircle2 className="h-14 w-14 text-red-700 mx-auto" />
              <h3 className="text-xl font-bold text-white">
                {submittedData.message}
              </h3>
              <p className="text-xs text-gray-400">
                Registered Account:{" "}
                <span className="text-red-700 font-semibold">
                  {submittedData.data.email}
                </span>{" "}
                ({submittedData.data.role})
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => setSubmittedData(null)}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Register Another Rider
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-red-700" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Muntasir Mahmud"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-red-700" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rider@gmail.com"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-red-700" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 01800000000"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-red-700" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Bike className="h-3.5 w-3.5 text-red-700" />
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 cursor-pointer"
                  >
                    <option value="Bike" className="bg-[#0b132b]">Bike</option>
                    <option value="Cycle" className="bg-[#0b132b]">Cycle</option>
                    <option value="Scooter" className="bg-[#0b132b]">Scooter</option>
                  </select>
                </div>

                {/* Vehicle Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-red-700" />
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    required
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g. DHAKA-METRO-p-1245"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* License Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-red-700" />
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    required
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="e.g. LIC-987854823"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>

                {/* NID Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-red-700" />
                    NID Number
                  </label>
                  <input
                    type="text"
                    name="nidNumber"
                    required
                    value={formData.nidNumber}
                    onChange={handleChange}
                    placeholder="e.g. NID-199876533227"
                    className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer flex items-center justify-center gap-2 text-xs "
                >
                  {loading ? "Submitting Application..." : "Submit Rider Application"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </section>

        {/* 3. A Rider's Soul Duty Section */}
        <section className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              Core Responsibility
            </span>
            <h2 className="text-2xl font-extrabold font-heading text-white">
              A Rider&apos;s Soul Duty
            </h2>
            <p className="text-xs text-gray-400">
              Our commitment to safety, speed, and absolute reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-[#050814] border border-white/10 space-y-2 shadow-md">
              <Shield className="h-6 w-6 text-red-700" />
              <h4 className="text-sm font-bold text-white">
                Safe & Secure Handling
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Treating every parcel with utmost care to ensure zero damage during transit.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#050814] border border-white/10 space-y-2 shadow-md">
              <Clock className="h-6 w-6 text-red-700" />
              <h4 className="text-sm font-bold text-white">Punctuality First</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Delivering packages on time, maintaining trust between merchants and customers.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Rider Benefits Section */}
        <section className="bg-[#0b132b] border border-red-700/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700">
              Rider Perks
            </span>
            <h2 className="text-2xl font-extrabold font-heading text-white">
              Why Ride With Us
            </h2>
            <p className="text-xs text-gray-400">
              Enjoy flexible earnings and amazing perks as part of our elite fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-[#050814] border border-white/10 space-y-3 text-center shadow-md">
              <DollarSign className="h-7 w-7 text-red-700 mx-auto" />
              <h4 className="text-xs font-bold text-white">Weekly Payouts</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Get your hard-earned money transferred directly every week without delay.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#050814] border border-white/10 space-y-3 text-center shadow-md">
              <Zap className="h-7 w-7 text-red-700 mx-auto" />
              <h4 className="text-xs font-bold text-white">Flexible Hours</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Choose when you want to work and maintain complete freedom over your schedule.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#050814] border border-white/10 space-y-3 text-center shadow-md">
              <Award className="h-7 w-7 text-red-700 mx-auto" />
              <h4 className="text-xs font-bold text-white">Bonus & Incentives</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Earn extra bonuses upon completing milestone targets and high-rating deliveries.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Highlights Section */}
        <section className="max-w-7xl mx-auto space-y-20 bg-[#0b132b] border border-red-700/20 rounded-3xl p-8 md:p-12 shadow-xl">
          <HighlightsSection />
        </section>

      </div>
    </div>
  );
}