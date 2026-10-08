"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Users, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "35K+", label: "Active Merchants" },
  { value: "20M+", label: "Successful Deliveries" },
  { value: "64", label: "Districts Covered" },
  { value: "99.8%", label: "On-Time Delivery" },
];

const features = [
  {
    icon: Truck,
    title: "Lightning-Fast Delivery",
    desc: "We ensure express pickup and secure delivery across all 64 districts of Bangladesh with real-time tracking.",
  },
  {
    icon: ShieldCheck,
    title: "100% Parcel Safety",
    desc: "Advanced security protocols and careful handling guarantee your products reach recipients in pristine condition.",
  },
  {
    icon: Users,
    title: "Merchant-Centric Support",
    desc: "Dedicated account managers and 24/7 customer support tailored specifically for e-commerce businesses.",
  },
  {
    icon: Award,
    title: "Trusted Nationwide",
    desc: "Recognized as one of the most reliable logistics partners by top-tier online retailers and merchants.",
  },
];

export default function About() {
  return (
    <div className="w-full pb-20">
      
      {/* 1. Hero Cover Section with Cloudinary Background */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20">
        
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/24408b43c55bd2d8c6e00386eb2b3241_dklk51.jpg"
            alt="DeshParcel About Cover"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white/90 shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
            About DeshParcel Logistics
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Empowering Commerce Across <span style={{ color: "oklch(0.577 0.245 27.325)" }}>Bangladesh</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We are more than just a courier service. We bridge the gap between businesses and their customers with speed, reliability, and utmost care.
          </motion.p>
        </div>
      </section>



      {/* 3. Our Story / Vision Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.577_0.245_27.325)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)]">
                Our Journey
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
              Building the Future of Fast & Secure Nationwide Logistics
            </h2>

            <p className="text-muted-foreground leading-relaxed text-white text-sm md:text-base">
              Founded with a vision to revolutionize the courier industry in Bangladesh, DeshParcel started with a small team and a big dream. Today, we power tens of thousands of e-commerce businesses by streamlining their supply chain and cash-on-delivery (COD) management.
            </p>

            <div className="space-y-3 text-white pt-2">
              {[
                "100% Automated Parcel Tracking System",
                "Fastest Next-Day Delivery Guarantee",
                "Secure & Hassle-Free COD Payments"
              ].map((item, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/Services">
                <Button 
                  size="lg" 
                  className="rounded-xl px-7 h-12 text-sm font-bold  group cursor-pointer"
                  style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-border"
          >
            <Image
              src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/3ac6da767bb3adc52ae07880de66c6d9_vefxzu.jpg"
              alt="DeshParcel Team & Operations"
              fill
              className="object-cover object-center"
            />
          </motion.div>

        </div>
      </section>

    {/* 4. Why Choose Us Grid */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-20 rounded-[2.5rem] overflow-hidden py-24 text-white shadow-2xl border border-white/10">
        
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/96c6c5e25f9319e4635cf32fdc6cdb14_sn2npv.jpg"
            alt="Why Choose Us Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.04_255)]/95 via-[oklch(0.18_0.04_255)]/90 to-black/95 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] mb-2 block">
              Core Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight mb-3 text-white">
              Why Businesses Choose DeshParcel
            </h2>
            <p className="text-gray-300 text-sm md:text-base">
              We combine cutting-edge technology with extensive field experience to deliver excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 shadow-xl hover:border-[oklch(0.577_0.245_27.325)]/80 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[oklch(0.577_0.245_27.325)] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-white font-heading group-hover:text-[oklch(0.577_0.245_27.325)] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}