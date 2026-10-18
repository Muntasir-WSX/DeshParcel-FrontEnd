"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Cookie } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white pt-28 pb-20 overflow-hidden">
      {/* 1. Hero Banner with Background Image */}
      <section className="relative py-20 md:py-32 my-8 rounded-3xl text-slate-900 dark:text-white px-6 md:px-16 shadow-2xl overflow-hidden max-w-7xl mx-auto border border-red-700/20 bg-slate-50 dark:bg-[#070b19]">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1792225464/cookiesDeshParcel_zqy5gc.jpg"
            alt="Cookie Policy Banner"
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          {/* Deep Dark Blue & Redish Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 dark:from-[#070b19]/95 dark:via-[#070b19]/85 dark:to-[#070b19]/70 backdrop-blur-[1px]" />
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
            <div className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-slate-200 dark:border-white/20 text-xs font-bold tracking-wide uppercase text-red-700 shadow-sm backdrop-blur-md">
              <Cookie className="h-4 w-4 text-red-700" />
              Tracking & Cookie Preferences
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
              Cookie <span className="text-red-700">Policy</span>
            </h1>

            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed font-medium">
              Learn how DeshParcel uses cookies and similar tracking
              technologies to enhance your browsing experience and platform
              functionality.
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
                className="rounded-2xl px-8 h-14 text-xs font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 w-full"
              >
                Back to Home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Detailed Cookie Content Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 my-20">
        <div className="bg-white dark:bg-[#0b132b] border border-red-700/25 rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 border-b border-slate-200 dark:border-white/10 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Understanding Our Cookie Usage
            </h2>
            <p className="text-xs text-slate-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 dark:text-gray-300 leading-relaxed relative z-10">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                1. What Are Cookies?
              </h3>
              <p>
                Cookies are small text files stored on your device when you
                visit our website. They help us recognize your browser, remember
                your preferences, and keep you securely logged into your
                dashboard.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                2. How We Use Cookies
              </h3>
              <p>
                We use cookies to maintain session states (authentication
                tokens), analyze platform traffic, remember dark/light mode
                preferences, and provide seamless parcel tracking interactions.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                3. Types of Cookies We Deploy
              </h3>
              <p>
                <span className="font-bold"># Essential Cookies</span>: Required
                for basic site navigation, security, and user login
                functionality. <br />
                <span className="font-bold">
                  # Performance & Analytics Cookies
                </span>
                : Help us understand how visitors interact with our pages to
                improve speed and layout.
                <br />
                <span className="font-bold"># Functional Cookies</span>:
                Remember your custom region and dashboard display settings.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-700" />
                4. Managing Cookie Preferences
              </h3>
              <p>
                You can choose to disable or block cookies through your browser
                settings. However, please note that disabling essential cookies
                may prevent you from logging into your user, rider, or admin
                dashboard.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600 dark:text-gray-300">
              Have questions regarding cookie tracking?
            </span>
            <Link href="/ContactUs">
              <Button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs cursor-pointer">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
