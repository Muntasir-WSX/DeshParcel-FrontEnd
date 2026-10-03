"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Building, ShieldCheck, Zap } from "lucide-react";

// Comprehensive Coverage Destinations across Bangladesh
const coverageDestinations = [
  { division: "Dhaka Division", hubs: 12, deliveryTime: "24 Hours (Express)", districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Kishoreganj", "Narsingdi", "Manikganj", "Munshiganj", "Rajbari", "Shariatpur", "Madaripur"] },
  { division: "Chattogram Division", hubs: 10, deliveryTime: "24 - 48 Hours", districts: ["Chattogram", "Cox's Bazar", "Noakhali", "Comilla", "Brahmanbaria", "Chandpur", "Feni", "Lakshmipur", "Khagrachhari", "Bandarban", "Rangamati"] },
  { division: "Sylhet Division", hubs: 5, deliveryTime: "48 Hours", districts: ["Sylhet", "Habiganj", "Sunamganj", "Moulvibazar"] },
  { division: "Rajshahi & Rangpur", hubs: 12, deliveryTime: "48 Hours", districts: ["Rajshahi", "Bogra", "Pabna", "Sirajganj", "Natore", "Naogaon", "Chapainawabganj", "Joypurhat", "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"] },
  { division: "Khulna & Barishal", hubs: 10, deliveryTime: "48 - 72 Hours", districts: ["Khulna", "Jashore", "Satkhira", "Kushtia", "Jhenaidah", "Magura", "Narail", "Chuadanga", "Meherpur", "Bagerhat", "Barishal", "Patuakhali", "Bhola", "Pirojpur", "Jhalokati", "Barguna"] }
];

export default function CoveragePage() {
  return (
    <div className="w-full pb-20 bg-[#070b19] text-white overflow-x-hidden">
      
      {/* 1. Cover Hero Section */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20 bg-[#070b19]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
            alt="DeshParcel Coverage Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[2px]" />
        </div>

        {/* Glowing Background Accents */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-bold uppercase tracking-wider text-red-400 shadow-sm"
          >
            <MapPin className="h-4 w-4 text-red-500" />
            Nationwide Logistics Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Delivering to All <span className="text-red-500">64 Districts</span> in Bangladesh
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore our complete nationwide coverage network, delivery hubs, and express timelines across every corner of Bangladesh.
          </motion.p>
        </div>
      </section>

      {/* 2. Section Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[11px] font-bold uppercase tracking-widest text-red-400">
            We are available in 64 districts
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-white">
            Regional Hubs & Coverage Destinations
          </h2>
          <p className="text-gray-300 text-sm">
            We deliver almost all over Bangladesh with secure tracking and reliable express transit times.
          </p>
        </div>
      </section>

      {/* 3. Destination Cards with Image Background & Overlay */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coverageDestinations.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-red-500/50 p-8 flex flex-col justify-between group min-h-[420px] bg-[#0b132b]"
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/96c6c5e25f9319e4635cf32fdc6cdb14_sn2npv.jpg"
                  alt={item.division}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                {/* Theme Overlay (Dark Blue & Redish Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#070b19]/90 via-[#070b19]/80 to-[#070b19]/95 backdrop-blur-[2px]" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    Fully Active
                  </span>
                  <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5 bg-[#0b132b]/80 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    <Building className="h-3.5 w-3.5 text-red-500" />
                    {item.hubs} Hubs
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                  {item.division}
                </h3>

                <p className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 bg-[#0b132b]/60 px-3 py-2 rounded-xl backdrop-blur-md border border-white/10 w-fit">
                  <Zap className="h-3.5 w-3.5 text-red-500" />
                  Delivery Timeline: <span className="text-white font-bold">{item.deliveryTime}</span>
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Covered Districts:</p>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {item.districts.map((dist, dIdx) => (
                      <span 
                        key={dIdx} 
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[#050814]/80 text-gray-200 border border-white/15 backdrop-blur-sm shadow-sm"
                      >
                        {dist}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5 font-medium text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  Secure Express Network
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}