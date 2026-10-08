"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaGithub 
} from "react-icons/fa";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ArrowRight
} from "lucide-react";
import Logo from "../logo/logo";
import { Button } from "../ui/button";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://github.com/Muntasir-WSX", label: "Facebook" },
  { icon: <FaTwitter />, href: "https://github.com/Muntasir-WSX", label: "Twitter" },
  { icon: <FaInstagram />, href: "https://github.com/Muntasir-WSX", label: "Instagram" },
  { icon: <FaLinkedinIn />, href: "https://github.com/Muntasir-WSX", label: "LinkedIn" },
  { icon: <FaGithub />, href: "https://github.com/Muntasir-WSX", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070b19] text-white overflow-hidden border-t border-red-700/20 pt-16 pb-12">
      
      {/* Background Image Banner with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
          alt="DeshParcel Footer Background"
          fill
          className="object-cover object-center filter brightness-90"
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-700/10 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
       {/* Quick Parcel Estimate & Booking CTA */}
        <div className="bg-[#0b132b] backdrop-blur-md border border-red-700/25 rounded-3xl p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-700/10 px-3 py-1 rounded-full border border-red-700/20">
              Instant Shipping Support
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Ready to Send Your First <span className="text-red-700">DeshParcel</span> Package?
            </h3>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl">
              Calculate shipping costs instantly or book a pickup in less than 2 minutes. Fast, reliable, and transparent nationwide service.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative z-10 shrink-0">
            <Link href="/Pricing" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto px-6 h-12 rounded-2xl text-xs font-bold uppercase tracking-wider text-white border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer bg-[#050814]"
              >
                Check Pricing
              </Button>
            </Link>
            <Link href="/Track" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto px-6 h-12 rounded-2xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <span>Track Parcel</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              DeshParcel is Bangladesh’s fastest and most reliable logistics and courier platform, connecting 64 districts with secure and express delivery.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <Link 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-[#0b132b] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-red-700 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing & Rates</Link></li>
              <li><Link href="/coverage" className="text-sm text-gray-300 hover:text-white transition-colors">Coverage Area</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-red-700 font-heading">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Standard Parcel</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Express Delivery</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Corporate Logistics</Link></li>
              <li><Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Cross-Border Shipping</Link></li>
              <li><Link href="/become-rider" className="text-sm text-gray-300 hover:text-white transition-colors">Be a Rider</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-red-700 font-heading">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
                <span>Level 4, Ispahani Building, Agrabad, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-red-700 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-red-700 shrink-0" />
                <span>support@deshparcel.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} DeshParcel Logistics & Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}