"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Weight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const citiesList = [
  "Chattogram",
  "Dhaka",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Cumilla",
  "Cox's Bazar",
  "Gazipur",
  "Narayanganj",
  "Chandpur"
];

export default function PricingPage() {
  const [pickupCity, setPickupCity] = useState("Chattogram");
  const [deliveryCity, setDeliveryCity] = useState("Dhaka");
  const [weight, setWeight] = useState<number>(1);
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // City to City = 80 BDT, City to Outside = 120 BDT
    let basePrice = pickupCity.toLowerCase() === deliveryCity.toLowerCase() ? 80 : 120;

    // Weight logic: up to 3 kg default, above 3 kg -> 10 BDT extra per kg
    let extraWeightCost = 0;
    if (weight > 3) {
      const extraKg = Math.ceil(weight - 3);
      extraWeightCost = extraKg * 10;
    }

    const total = basePrice + extraWeightCost;
    setCalculatedCost(total);
  };

  return (
    <div className="w-full pb-20 bg-[#070b19] text-white">
      
      {/* 1. Hero Section */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
            alt="DeshParcel Pricing Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/90 to-[#070b19]/80 backdrop-blur-[3px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white-500/15 backdrop-blur-md border border-white text-xs font-semibold uppercase tracking-wider text-red-700 shadow-sm"
          >
            <Zap className="h-4 w-4 text-red-700" />
            Transparent & Affordable Rates
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Simple Pricing, <span className="text-red-700">No Hidden Fees</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Calculate your shipping cost instantly based on destination and package weight with our smart pricing calculator.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive Calculator Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-[#0b132b] border border-red-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Glowing Red & Blue Accents */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10 space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700">
              <Calculator className="h-4 w-4 text-red-800" />
              Smart Rate Calculator
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Estimate Your Delivery Cost
            </h2>
            <p className="text-xs text-gray-400">
              City to City: ৳80 | City to Outside: ৳120 (Up to 3kg standard, +৳10/kg for extra weight)
            </p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pickup City */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  Pickup City / Region
                </label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {citiesList.map((city, idx) => (
                    <option key={idx} value={city} className="bg-[#0b132b] text-white">{city}</option>
                  ))}
                </select>
              </div>

              {/* Delivery City */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  Delivery City / Region
                </label>
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {citiesList.map((city, idx) => (
                    <option key={idx} value={city} className="bg-[#0b132b] text-white">{city}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <Weight className="h-3.5 w-3.5 text-red-500" />
                Package Weight (KG) — <span className="text-white font-semibold">First 3 KG standard</span>
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 1)}
                className="w-full bg-[#050814] border border-white/10 text-white rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Calculate Button */}
            <Button
              type="submit"
              className="w-full py-4 rounded-2xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white  shadow-lg  cursor-pointer"
            >
              Calculate Shipping Cost
            </Button>
          </form>

          {/* Result Display Box */}
          {calculatedCost !== null && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 rounded-2xl bg-[#050814] border border-red-500/30 text-center space-y-2 relative z-10 shadow-inner"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Estimated Shipping Fee</p>
              <h3 className="text-4xl font-extrabold font-heading text-red-500">
                ৳{calculatedCost}
              </h3>
              <p className="text-xs text-gray-400">
                Route: {pickupCity} to {deliveryCity} ({weight} KG)
              </p>
            </motion.div>
          )}

        </div>
      </section>

      {/* 3. Pricing Rule Breakdown Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
            Pricing Structure
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
            How Our Pricing Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-[#0b132b] border border-white/10 shadow-lg space-y-4 hover:border-red-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold border border-red-500/20">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">City vs Outside Delivery</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span><strong className="text-white">City to City (Same City):</strong> Flat ৳80 (e.g., Chattogram to Chattogram).</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span><strong className="text-white">City to Outside:</strong> Flat ৳120 (e.g., Chattogram to Dhaka or Chandpur).</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-[#0b132b] border border-white/10 shadow-lg space-y-4 hover:border-red-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold border border-red-500/20">
              <Weight className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-white">Weight Policy</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span><strong className="text-white">Up to 3 KG:</strong> Covered under default base pricing (Documents or Parcels).</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span><strong className="text-white">Above 3 KG:</strong> Additional ৳10 charged for every extra KG.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}