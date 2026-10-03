"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "muntasir@gmail.com",
    password: "Muntasir123",
  });

  const [loading, setLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting Login Payload:", formData);

    setTimeout(() => {
      setLoading(false);
      setLoginResponse({
        success: true,
        message: "Login successful!",
        data: {
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMmIyZDhmLWZmNjQtNDVkZC05YTI1LWRkZTA2NDBjMmI1YSIsImVtYWlsIjoibXVudGFzaXJAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzkxMDQ1Njg0LCJleHAiOjE3OTE2NTA0ODR9.H-gTZtOX5NTkFKcdoJwQRtqb8C6ujLGxv3jSBCpEUaM",
          user: {
            id: "722b2d8f-ff64-45dd-9a25-dde0640c2b5a",
            name: "Muntasir Mahmud",
            email: formData.email,
            googleId: null,
            phone: "01849643758",
            role: "CUSTOMER",
            isVerified: false,
            isBanned: false,
            createdAt: "2026-09-22T16:01:47.051Z",
            updatedAt: "2026-09-22T19:26:29.610Z"
          }
        }
      });
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    console.log("Initiating Google Sign In...");
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white overflow-hidden">
      
      {/* Left Side: Full Cover Image Taking Entire Left Half */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full w-full overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045600/26f88bef5ac4b46e3d4fccde85cda8c2_krkqgb.jpg"
          alt="DeshParcel Delivery Cover"
          fill
          priority
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        {/* Floating Branding Caption */}
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
            Secure Nationwide Logistics
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-white">
            Fast, Reliable & Transparent Delivery
          </h2>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Manage your shipments, track parcels live, and scale your business with DeshParcel customer & merchant portal.
          </p>
        </div>
      </motion.div>

      {/* Right Side: Compact Login Form Container (No Scrolling Required) */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center items-center px-6 lg:px-10 bg-[#070b19]"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative space-y-4">
          
          {/* Glowing Accents */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Placed Inside Form Container at the Top */}
          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-white">
              Welcome Back
            </h2>
            <p className="text-[11px] text-gray-400">
              Sign in to your DeshParcel account to continue
            </p>
          </div>

          {loginResponse ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050814] border border-red-700/40 rounded-2xl p-5 text-center space-y-3 relative z-10"
            >
              <ShieldCheck className="h-9 w-9 text-red-700 mx-auto" />
              <h3 className="text-base font-bold text-white">{loginResponse.message}</h3>
              <p className="text-xs text-gray-400">
                Logged in as <span className="text-red-700 font-semibold">{loginResponse.data.user.name}</span> ({loginResponse.data.user.role})
              </p>
              <div className="pt-1">
                <Button 
                  onClick={() => setLoginResponse(null)}
                  className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Sign Out / Reset
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-3.5 relative z-10">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-red-700" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="muntasir@gmail.com"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-red-700" />
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[10px] text-red-700 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all  cursor-pointer flex items-center justify-center gap-2 text-xs mt-1"
              >
                {loading ? "Signing In..." : "Login"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-3 text-gray-500 text-[10px] uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2.5 px-4 rounded-xl bg-[#050814] hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"
                  />
                </svg>
                Sign in with Google
              </button>

              {/* Register Link */}
              <div className="text-center pt-1">
                <p className="text-xs text-gray-400">
                  Don&apos;t have an account yet?{" "}
                  <Link href="/register" className="text-red-700 font-bold hover:underline">
                    Register Now
                  </Link>
                </p>
              </div>

            </form>
          )}

        </div>
      </motion.div>

    </div>
  );
}