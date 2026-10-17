"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, PackageCheck } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    value: "1+ Years",
    label: "Industry Excellence",
    desc: "Delivering trust and reliable logistics solutions since inception.",
  },
  {
    icon: PackageCheck,
    value: "More than 1000",
    label: "Successful Deliveries",
    desc: "Safely delivered parcels across all 64 districts of Bangladesh.",
  },
  {
    icon: Users,
    value: ' 12 Partners',
    label: "Active E-commerce Partners",
    desc: "Empowering online merchants with next-day payouts and COD.",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "On-Time Success Rate",
    desc: "Committed to lightning-fast speed and absolute security.",
  },
];

export default function Achievments() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 my-28 rounded-[2.5rem] overflow-hidden py-24 text-white shadow-2xl border border-red-700/25 bg-[#0b132b]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 w-full h-full opacity-15">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/ccea22747d949b33e82c02293dc9404c_pi3mdk.jpg"
          alt="DeshParcel Achievements Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0" />

      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-xs font-semibold uppercase tracking-wider text-red-700 shadow-sm">
            <Trophy className="h-3.5 w-3.5 text-red-700" />
            Our Milestones
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
            Our Proven <span className="text-red-700">Track Record</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Numbers that define our dedication, reliability, and nationwide growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[#070b19]/85 backdrop-blur-md border border-white/10 hover:border-red-700/60 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group text-center flex flex-col items-center justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-700/15 border border-red-700/30 text-red-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Icon className="h-7 w-7 text-red-700" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
                    {stat.value}
                  </h3>
                  <h4 className="text-sm font-bold text-red-700 uppercase tracking-wider">
                    {stat.label}
                  </h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}