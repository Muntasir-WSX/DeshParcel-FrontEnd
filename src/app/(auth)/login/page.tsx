"use client";

import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bike,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { handleGoogleAuthentication } from "@/app/(auth)/login/googleAuth";
import { loginUserApi } from "@/app/(auth)/login/login";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";

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

  const handleLoginSubmit = async (loginData: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const result = await loginUserApi(loginData);

      if (result?.data?.accessToken) {
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("userRole", result.data.user?.role || "USER");
      }

      toast.success("Login Successful!", {
        description: `Welcome back, ${result.data?.user?.name || "User"} (${result.data?.user?.role || "USER"})!`,
      });

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

  const handleDemoLogin = (
    roleEmail: string,
    rolePass: string,
    roleName: string,
  ) => {
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

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-[#070b19] text-slate-900 dark:text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full w-full overflow-hidden bg-slate-50 dark:bg-[#070b19]"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045600/26f88bef5ac4b46e3d4fccde85cda8c2_krkqgb.jpg"
          alt="DeshParcel Delivery Cover"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Light Overlay and Dark Overlay Blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-[#070b19]/95 dark:via-[#070b19]/40 dark:to-transparent" />

        {/* Floating Content Card at Bottom */}
        <div className="absolute bottom-10 left-10 right-10 z-10 p-6 rounded-3xl bg-white dark:bg-[#0b132b]/85 backdrop-blur-md border border-red-700/25 shadow-2xl space-y-2">
          <div className="trust-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700">
            <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
            Secure Nationwide Logistics
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
            Fast, Reliable & Transparent Delivery
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-300 max-w-md leading-relaxed">
            Manage your shipments, track parcels live, and scale your business
            with DeshParcel customer & merchant portal.
          </p>
        </div>
      </motion.div>

      {/* Right Side: Login Form Container */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center items-center px-6 lg:px-10 bg-slate-50 dark:bg-[#070b19] overflow-y-auto py-6"
      >
        <div className="w-full max-w-md bg-white dark:bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-7 shadow-2xl relative space-y-3.5">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-slate-200 dark:border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-[11px] text-slate-600 dark:text-gray-300">
              Sign in to your DeshParcel account or use one-click demo roles
            </p>
          </div>

          {/* ONE-CLICK DEMO LOGIN BUTTONS */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-gray-300 flex items-center gap-1">
                <UserCheck className="h-3 w-3 text-red-700" />
                One-Click Demo Login:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {/* Admin Button: Distinct Red Tint */}
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  handleDemoLogin("admin@deshparcel.com", "admin123", "Admin")
                }
                className="py-2 px-2 rounded-xl bg-red-100 dark:bg-red-950/50 border border-red-300 dark:border-red-700/60 text-red-700 dark:text-red-400 text-[11px] font-bold hover:bg-red-700 hover:text-white cursor-pointer text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldAlert className="h-3 w-3 text-red-700 dark:text-red-400 group-hover:text-white" />
                Admin
              </button>

              {/* User Button: Distinct Emerald Green Tint */}
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  handleDemoLogin("user@deshparcel.com", "Muntas!r25", "User")
                }
                className="py-2 px-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold hover:bg-emerald-600 hover:text-white cursor-pointer text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <User className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                User
              </button>

              {/* Rider Button: Distinct Amber/Orange Tint */}
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  handleDemoLogin("rider@deshparcel.com", "Muntas!r25", "Rider")
                }
                className="py-2 px-2 rounded-xl bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/40 text-amber-700 dark:text-amber-400 text-[11px] font-bold hover:bg-amber-600 hover:text-white cursor-pointer text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Bike className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                Rider
              </button>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 relative z-10">
            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 flex items-center gap-1.5">
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
                className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-red-700" />
                  Password
                </label>
                <Link
                  href="/ForgetPassword"
                  className="text-[10px] text-red-700 font-semibold hover:underline"
                >
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
                className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white cursor-pointer flex items-center justify-center gap-2 text-xs mt-1 shadow-red-600/20 transition-all"
            >
              {loading ? "Signing In..." : "Login"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-[10px] uppercase tracking-wider">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
            </div>

            {/* Redesigned Custom Google Sign-In Trigger Button */}
            <div className="flex justify-center w-full">
              <div className="w-full relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/15 bg-slate-100 dark:bg-[#050814] hover:bg-white/5 transition-all duration-300 shadow-md group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 gap-2.5 text-xs font-semibold text-slate-700 dark:text-gray-200">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.23 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 12s.43 3.88 1.19 5.42l4.09-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
                <div className="opacity-0 cursor-pointer w-full flex justify-center scale-125 py-0.5">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      if (credentialResponse.credential) {
                        toast.loading("Authenticating with Google...", {
                          id: "google-auth",
                        });
                        await handleGoogleAuthentication(
                          credentialResponse.credential,
                          "01712345678",
                          router,
                        );
                        toast.dismiss("google-auth");
                      }
                    }}
                    onError={() => {
                      toast.error("Google Sign-In Failed");
                    }}
                    useOneTap={false}
                    theme="filled_black"
                    shape="rectangular"
                    width="400"
                  />
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center pt-1">
              <p className="text-xs text-slate-600 dark:text-gray-300">
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="text-red-700 font-bold hover:underline"
                >
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
