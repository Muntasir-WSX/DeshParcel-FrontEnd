"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#070b19] text-white pt-28 pb-20 overflow-hidden">
      
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-[#070b19]">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225433/privacy_eutmkd.jpg"
            alt="Privacy Policy Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b19]/95 via-[#070b19]/85 to-[#070b19]/70 backdrop-blur-[1px]" />
        </div>

        {/* Decorative Glow Effects */}
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-red-700/15 rounded-full blur-3xl pointer-events-none z-1" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none z-1" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-red-700" />
              Data Protection & Security
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
              Privacy <span className="text-red-700">Policy</span>
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              We value your trust and are committed to safeguarding your personal information. Read how we collect, use, and protect your data.
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

      {/* 2. Detailed Privacy Content Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden space-y-8">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 border-b border-white/10 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Our Commitment to Privacy
            </h2>
            <p className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-300 leading-relaxed relative z-10">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                1. Information We Collect
              </h3>
              <p>
                At DeshParcel, we collect personal details that you provide directly, including your name, email address, phone number, and pickup or delivery addresses when creating an account or booking a shipment.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                2. How We Use Your Information
              </h3>
              <p>
                We use collected information to process parcel deliveries, send real-time tracking updates, manage merchant payouts, handle customer support queries, and improve overall service reliability.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                3. Data Security & Storage
              </h3>
              <p>
                We implement robust security protocols, data encryption, and restricted database access to ensure your private information remains completely safe from unauthorized disclosure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                4. Third-Party Disclosures
              </h3>
              <p>
                We do not sell, trade, or transfer your personally identifiable information to outside parties, except trusted partners who assist us in operating our logistics network and website infrastructure.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-400">Have questions about your data privacy?</span>
            <Link href="/ContactUs">
              <Button className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Contact Privacy Desk
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}