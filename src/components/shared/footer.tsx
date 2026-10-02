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
  Send 
} from "lucide-react";
import Logo from "../logo/logo";

const socialLinks = [
  { icon: <FaFacebookF />, href: "https://github.com/Muntasir-WSX", label: "Facebook" },
  { icon: <FaTwitter />, href: "https://github.com/Muntasir-WSX", label: "Twitter" },
  { icon: <FaInstagram />, href: "https://github.com/Muntasir-WSX", label: "Instagram" },
  { icon: <FaLinkedinIn />, href: "https://github.com/Muntasir-WSX", label: "LinkedIn" },
  { icon: <FaGithub />, href: "https://github.com/Muntasir-WSX", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className=" rounded-t-[3rem] relative bg-[oklch(0.15_0.04_255)] text-white pt-20 pb-10 overflow-hidden border-t border-white/10 mt-20">
      
      {/* Background Image Banner with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
          alt="DeshParcel Footer Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[oklch(0.577_0.245_27.325)]/15 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Newsletter / Quick CTA Row */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white">
              Ready to Send Your First Parcel?
            </h3>
            <p className="text-sm text-gray-300">
              Join thousands of satisfied merchants and enjoy fastest nationwide delivery.
            </p>
          </div>
          
          <div className="flex items-center w-full lg:w-auto max-w-md bg-white/10 rounded-2xl p-1.5 border border-white/20 focus-within:ring-2 focus-within:ring-[oklch(0.577_0.245_27.325)]">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              className="flex-1 bg-transparent border-none outline-none text-white text-sm px-4 placeholder:text-gray-400 h-11"
            />
            <button 
              type="button"
              className="px-6 h-11 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer flex items-center gap-2"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)" }}
            >
              <span>Subscribe</span>
              <Send className="h-3.5 w-3.5" />
            </button>
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
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white hover:border-[oklch(0.577_0.245_27.325)] transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] font-heading">
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
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] font-heading">
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
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] font-heading">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="h-5 w-5 text-[oklch(0.577_0.245_27.325)] shrink-0 mt-0.5" />
                <span>Level 4, Ispahani Building, Agrabad, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
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