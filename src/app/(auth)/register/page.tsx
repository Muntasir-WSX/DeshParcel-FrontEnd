"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";

const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(bdPhoneRegex, "Must be a valid BD mobile number (013, 014, 015, 016, 017, 018, 019)"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(strongPasswordRegex, "Must include uppercase, lowercase, number & special character"),
  role: z.literal("CUSTOMER").default("CUSTOMER"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof registerSchema>, undefined, RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://desh-parcel-backend.vercel.app";
      
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setLoading(false);
      setSuccessData({
        success: true,
        message: result.message || "User registered successfully! A verification email has been sent.",
        data: result.data,
      });
    } catch (error: any) {
      setLoading(false);
      alert(error.message || "Something went wrong!");
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Initiating Google Sign In...");
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white">
      
      {/* Left Side: Register Form */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center px-6 lg:px-10 py-12 bg-[#070b19]"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative space-y-4">
          
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-white">
              Create Customer Account
            </h2>
            <p className="text-[11px] text-gray-400">
              Register securely to start managing and tracking your parcels
            </p>
          </div>

          {successData ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050814] border border-red-700/40 rounded-2xl p-6 text-center space-y-4 relative z-10"
            >
              <CheckCircle2 className="h-10 w-10 text-red-700 mx-auto" />
              <h3 className="text-base font-bold text-white">{successData.message}</h3>
              <p className="text-xs text-gray-300">
                Registered Email: <span className="text-red-700 font-semibold">{successData.data.email}</span>
              </p>
              <p className="text-[11px] text-emerald-400">Please check your inbox/spam folder for verification mail sent via Nodemailer.</p>
              
              {/* Sign In Redirect Button */}
              <div className="pt-2">
                <Link href="/login">
                  <Button 
                    className="w-full py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Sign In Now</span>
                    <LogIn className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 relative z-10">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <User className="h-3 w-3 text-red-700" /> Full Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                />
                {errors.name && <p className="text-[10px] text-red-700">{errors.name.message}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-red-700" /> Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                />
                {errors.email && <p className="text-[10px] text-red-700">{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-red-700" /> Phone Number (BD Operator: 013-019)
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="017xxxxxxxx"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                />
                {errors.phone && <p className="text-[10px] text-red-700">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-red-700" /> Password (A-Z, a-z, 0-9, Special Char)
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-red-700"
                />
                {errors.password && <p className="text-[10px] text-red-700">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white cursor-pointer flex items-center justify-center gap-2 text-xs mt-2"
              >
                {loading ? "Registering Account..." : "Create Account"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

           


              <div className="text-center pt-2">
                <p className="text-xs text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-700 font-bold hover:underline">
                    Login Here
                  </Link>
                </p>
              </div>

            </form>
          )}

        </div>
      </motion.div>

      {/* Right Side Image */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full w-full min-h-screen overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045616/a4bca95a455b946a5a6a63617c340c1b_lxn8bb.jpg"
          alt="DeshParcel Register Cover"
          fill
          priority
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[11px] font-bold uppercase tracking-wider text-red-700">
            <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
            Join Our Network
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-white">
            Start Your Journey With DeshParcel
          </h2>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Create your account today with validated credentials and experience secure parcel delivery across 64 districts.
          </p>
        </div>
      </motion.div>

    </div>
  );
}