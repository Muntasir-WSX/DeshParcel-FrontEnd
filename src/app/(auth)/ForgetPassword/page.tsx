"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, KeyRound, Lock, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { forgotPasswordApi, resetPasswordApi } from "@/app/(auth)/ForgetPassword/forgetpassword";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"REQUEST_OTP" | "RESET_PASSWORD">("REQUEST_OTP");
  const [loading, setLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await forgotPasswordApi({ email });
      toast.success("OTP Sent Successfully!", {
        description: result.message || "Please check your email inbox or spam folder.",
      });
      setStep("RESET_PASSWORD"); // Switch to OTP & New Password Step
    } catch (error: any) {
      toast.error("Request Failed", {
        description: error.message || "Could not send OTP. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await resetPasswordApi({ email, otp, newPassword });
      toast.success("Password Reset Successful!", {
        description: result.message || "You can now login with your new password.",
      });

      
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      toast.error("Reset Failed", {
        description: error.message || "Invalid OTP or something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white overflow-hidden">
      
      {/* Left Side: Cover Image */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full w-full overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045600/26f88bef5ac4b46e3d4fccde85cda8c2_krkqgb.jpg"
          alt="DeshParcel Recovery Cover"
          fill
          priority
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700">
            <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
            Account Security Recovery
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-white">
            Recover Access to Your Account
          </h2>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Verify your identity securely with a one-time passcode (OTP) sent directly to your registered email.
          </p>
        </div>
      </motion.div>

      {/* Right Side: Form Container */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center items-center px-6 lg:px-10 bg-[#070b19] overflow-y-auto py-6"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative space-y-4">
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-white">
              {step === "REQUEST_OTP" ? "Forgot Password?" : "Reset Password"}
            </h2>
            <p className="text-[11px] text-gray-400">
              {step === "REQUEST_OTP" 
                ? "Enter your email address to receive a verification OTP" 
                : `Enter the OTP sent to ${email} and set your new password`}
            </p>
          </div>

          {step === "REQUEST_OTP" ? (
            /* Step 1 Form: Request OTP */
            <form onSubmit={handleRequestOtp} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-red-700" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer flex items-center justify-center gap-2 text-xs  shadow-red-700/30"
              >
                {loading ? "Sending OTP..." : "Send Reset OTP"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5">
                  <ArrowLeft className="h-3 w-3 text-red-700" /> Back to Login
                </Link>
              </div>
            </form>
          ) : (
            /* Step 2 Form: Enter OTP & New Password */
            <form onSubmit={handleResetPassword} className="space-y-3.5 relative z-10">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <KeyRound className="h-3 w-3 text-red-700" />
                  Verification OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-[#050814] border border-white/10 text-white tracking-widest text-center font-bold rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-red-700" />
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer flex items-center justify-center gap-2 text-xs mt-2  shadow-red-700/30"
              >
                {loading ? "Resetting Password..." : "Update Password & Login"}
                <CheckCircle2 className="h-4 w-4" />
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep("REQUEST_OTP")}
                  className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Didn't receive code? Resend OTP
                </button>
              </div>
            </form>
          )}

        </div>
      </motion.div>

    </div>
  );
}