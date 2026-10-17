"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-[#070b19] text-white pt-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-[#070b19]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225410/terms_ninvks.jpg"
            alt="Terms of Service Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
        </div>

        {/* Decorative Glow Effects */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-4"
          >
            <div className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm backdrop-blur-md">
              <FileText className="h-4 w-4 text-red-700" />
              Legal & User Agreement
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Terms of <span className="text-red-700">Service</span>
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              Please read these terms and conditions carefully before using DeshParcel logistics platform, booking shipments, or registering for an account.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
          >
            <Link href="/">
              <Button 
                size="lg" 
                className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-700 hover:bg-red-700 text-white flex items-center justify-center gap-2 w-full"
              >
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 2. Detailed Terms Content Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden space-y-8">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 border-b border-white/10 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              General Conditions & Agreement
            </h2>
            <p className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-300 leading-relaxed relative z-10">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using the DeshParcel website, mobile applications, or courier services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access our platform or use our logistics services.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                2. User Accounts & Security
              </h3>
              <p>
                To use certain features of the platform (such as creating parcels or tracking shipments), you must register for an account. You are responsible for safeguarding your password and for all activities that occur under your account.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                3. Prohibited Items & Restrictions
              </h3>
              <p>
                Users are strictly prohibited from shipping illegal substances, explosives, firearms, perishable goods without prior approval, or hazardous materials. DeshParcel reserves the right to inspect any package for safety compliance.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                4. Payment & COD Policies
              </h3>
              <p>
                All delivery fees must be paid in accordance with current pricing schedules. Cash on Delivery (COD) amounts collected by riders are processed and remitted to merchants according to our standard next-day payout cycle.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                5. Limitation of Liability
              </h3>
              <p>
                DeshParcel shall not be liable for any indirect, incidental, special, or consequential damages resulting from service interruptions, delays beyond our control, or incorrect address information provided by the user.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-400">Have questions regarding our terms?</span>
            <Link href="/ContactUs">
              <Button className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Contact Legal Support
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}