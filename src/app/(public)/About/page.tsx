"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="w-full bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white pb-20 overflow-hidden">
      {/* 1. Hero Cover Section with Cloudinary Background */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20 border-b border-red-700/20 bg-slate-50 dark:bg-[#070b19]">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/24408b43c55bd2d8c6e00386eb2b3241_dklk51.jpg"
            alt="DeshParcel About Cover"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60 dark:from-[#070b19]/95 dark:via-[#070b19]/85 dark:to-[#070b19]/60 backdrop-blur-[2px]" />
        </div>

        {/* Glow Effects (Pure Red Theme) */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-xs font-semibold uppercase tracking-wider text-red-700 shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-red-700" />
            About DeshParcel Logistics
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white leading-[1.15]"
          >
            Empowering Commerce Across{" "}
            <span className="text-red-700">Bangladesh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We are more than just a courier service. We bridge the gap between
            businesses and their customers with speed, reliability, and utmost
            care.
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
            <div className="trust-badge inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-700">
                Our Journey
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
              Building the Future of Fast & Secure Nationwide Logistics
            </h2>

            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              Founded with a vision to revolutionize the courier industry in
              Bangladesh, DeshParcel started with a small team and a big dream.
              Today, we power tens of thousands of e-commerce businesses by
              streamlining their supply chain and cash-on-delivery (COD)
              management.
            </p>

            <div className="space-y-3 text-slate-900 dark:text-white pt-2">
              {[
                "100% Automated Parcel Tracking System",
                "Fastest Next-Day Delivery Guarantee",
                "Secure & Hassle-Free COD Payments",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-red-700 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/Services">
                <Button
                  size="lg"
                  className="rounded-xl px-7 h-12 text-sm font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-all"
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
            className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b132b]"
          >
            <Image
              src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/3ac6da767bb3adc52ae07880de66c6d9_vefxzu.jpg"
              alt="DeshParcel Team & Operations"
              fill
              className="object-cover object-center filter brightness-95"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us Grid */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-20 rounded-[2.5rem] overflow-hidden py-24 text-slate-900 dark:text-white shadow-2xl border border-red-700/25 bg-white dark:bg-[#0b132b]">
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full opacity-15">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/96c6c5e25f9319e4635cf32fdc6cdb14_sn2npv.jpg"
            alt="Why Choose Us Background"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-700 mb-2 block">
              Core Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight mb-3 text-slate-900 dark:text-white">
              Why Businesses Choose DeshParcel
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base">
              We combine cutting-edge technology with extensive field experience
              to deliver excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-[#070b19]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-xl hover:border-red-700/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-700/15 text-red-700 border border-red-700/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <Icon className="h-6 w-6 text-red-700" />
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white font-heading group-hover:text-red-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
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
