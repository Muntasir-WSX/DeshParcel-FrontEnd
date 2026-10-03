"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";

// Zod Schema for Registration
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().default("CUSTOMER"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
      name: "Nurul Islam",
      email: "islam@gmail.com",
      phone: "01960554472",
      password: "Mubasshir123",
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setLoading(true);
    console.log("Submitting Register Payload:", data);

    setTimeout(() => {
      setLoading(false);
      setSuccessData({
        success: true,
        message: "User registered successfully! Please verify your account.",
        data: {
          id: "c6b9e717-c698-4f68-9073-4e19ebd9a9b3",
          name: data.name,
          email: data.email,
          googleId: null,
          phone: data.phone,
          role: data.role,
          isVerified: false,
          isBanned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    console.log("Initiating Google Sign In...");
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#070b19] text-white overflow-hidden">
      
      {/* Left Side: Compact Register Form Container */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 lg:col-span-5 h-full flex flex-col justify-center items-center px-6 lg:px-10 bg-[#070b19] overflow-y-auto"
      >
        <div className="w-full max-w-md bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl relative space-y-4 my-auto">
          
          {/* Glowing Accents */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Logo Placed Inside Form Container at the Top */}
          <div className="flex flex-col items-center justify-center relative z-10 pb-2 border-b border-white/10">
            <Logo />
          </div>

          <div className="text-center space-y-0.5 relative z-10">
            <h2 className="text-xl font-extrabold font-heading text-white">
              Create Account
            </h2>
            <p className="text-[11px] text-gray-400">
              Register as a Customer to manage your deliveries
            </p>
          </div>

          {successData ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050814] border border-red-700/40 rounded-2xl p-5 text-center space-y-3 relative z-10"
            >
              <CheckCircle2 className="h-9 w-9 text-red-700 mx-auto" />
              <h3 className="text-base font-bold text-white">{successData.message}</h3>
              <p className="text-xs text-gray-400">
                Registered Email: <span className="text-red-400 font-semibold">{successData.data.email}</span> ({successData.data.role})
              </p>
              <div className="pt-1">
                <Button 
                  onClick={() => setSuccessData(null)}
                  className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Register Another
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 relative z-10">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <User className="h-3 w-3 text-red-700" />
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Nurul Islam"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
                {errors.name && <p className="text-[10px] text-red-400">{errors.name.message}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-red-700" />
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="islam@gmail.com"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
                {errors.email && <p className="text-[10px] text-red-400">{errors.email.message}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-red-700" />
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="01960554472"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
                {errors.phone && <p className="text-[10px] text-red-400">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-red-700" />
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full bg-[#050814] border border-white/10 text-white rounded-xl px-3.5 py-2 text-xs outline-none focus:ring-2 focus:ring-red-700 shadow-inner"
                />
                {errors.password && <p className="text-[10px] text-red-700">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all cursor-pointer flex items-center justify-center gap-2 text-xs mt-1"
              >
                {loading ? "Creating Account..." : "Register"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>

              {/* Divider */}
              <div className="relative flex py-0.5 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-3 text-gray-500 text-[10px] uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-2 px-4 rounded-xl bg-[#050814] hover:bg-white/10 border border-white/15 text-white text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm"
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
                Sign up with Google
              </button>

              {/* Login Link */}
              <div className="text-center pt-1">
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

      {/* Right Side: Full Cover Image (Now on the Right Side) */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:col-span-7 relative h-full w-full overflow-hidden"
      >
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045616/a4bca95a455b946a5a6a63617c340c1b_lxn8bb.jpg"
          alt="DeshParcel Register Cover"
          fill
          priority
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-[#070b19]/20 to-transparent" />
        
        {/* Floating Branding Caption */}
        <div className="absolute bottom-10 left-10 right-10 z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-red-700" />
            Join Our Network
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-white">
            Start Your Journey With DeshParcel
          </h2>
          <p className="text-xs text-gray-300 max-w-md leading-relaxed">
            Create your customer or merchant account today and experience seamless, nationwide parcel delivery.
          </p>
        </div>
      </motion.div>

    </div>
  );
}