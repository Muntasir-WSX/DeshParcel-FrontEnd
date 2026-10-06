"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";
import { toast } from "sonner";
import { loginUserApi } from "@/app/(auth)/login/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (loginData: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await loginUserApi(loginData);

      toast.success("Login Successful!", {
        description: `Welcome back, ${result.data?.user?.name || "User"} (${result.data?.user?.role || "USER"})!`,
      });

      console.log("Login Response Data:", result.data);

      // Home page ba dashboard-e redirect kora
      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error: any) {
      toast.error("Login Failed", {
        description: error.message || "Something went wrong during login.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginSubmit(formData);
  };

  // One-Click Demo Login Handler with Exact Credentials
  const handleDemoLogin = (roleEmail: string, rolePass: string, roleName: string) => {
    const demoPayload = {
      email: roleEmail,
      password: rolePass,
    };
    setFormData(demoPayload);
    toast.info(`Logging in as ${roleName}...`, {
      description: `Email: ${roleEmail}`,
    });
    handleLoginSubmit(demoPayload);
  };

  const handleGoogleSignIn = () => {
    toast.info("Google Sign In", {
      description: "Redirecting to Google Authentication...",
    });
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white overflow-hidden">
      
      {/* Left Side: Full Cover Image */}
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
          sizes="100vw"
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700">
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

      {/* Right Side: Login Form Container */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center items-center px-6 lg:px-10 bg-[#070b19] overflow-y-auto py-6"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-7 shadow-2xl relative space-y-3.5">
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-white">
              Welcome Back
            </h2>
            <p className="text-[11px] text-gray-400">
              Sign in to your DeshParcel account or use one-click demo roles
            </p>
          </div>

          {/* ONE-CLICK DEMO LOGIN BUTTONS */}
          <div className="p-3 rounded-2xl bg-[#050814] border border-white/10 relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <UserCheck className="h-3 w-3 text-red-500" />
                One-Click Demo Login:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin("admin@deshparcel.com", "admin123", "Admin")}
                className="py-1.5 px-2 rounded-xl bg-red-600/20 border border-red-500/40 text-red-500 text-[11px] font-bold hover:bg-red-600 hover:text-white cursor-pointer text-center transition-all"
              >
                Admin
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin("user@deshparcel.com", "Muntas!r25", "User")}
                className="py-1.5 px-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 text-[11px] font-bold hover:bg-blue-600 hover:text-white cursor-pointer text-center transition-all"
              >
                User
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleDemoLogin("rider@deshparcel.com", "Muntas!r25", "Rider")}
                className="py-1.5 px-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold hover:bg-emerald-600 hover:text-white cursor-pointer text-center transition-all"
              >
                Rider
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 relative z-10">
            
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
                placeholder="name@example.com"
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
                <Link href="/ForgetPassword" className="text-[10px] text-red-700 font-semibold hover:underline">
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
              className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer flex items-center justify-center gap-2 text-xs mt-1 shadow-lg shadow-red-700/30"
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
              className="w-full py-2.5 px-4 rounded-xl bg-[#050814] hover:bg-white/10 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z" />
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

        </div>
      </motion.div>

    </div>
  );
}