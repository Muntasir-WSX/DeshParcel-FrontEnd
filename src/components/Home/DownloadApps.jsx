"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

const GooglePlayIconIcon = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 240 + (padding * 2); 
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 280"
      width={size}
      height={size}
      fill="none"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        backgroundColor: background !== 'transparent' ? background : undefined
      }}
    >
      <path fill="#EA4335" d="M119.553 134.916L1.06 259.061a32.14 32.14 0 0 0 47.062 19.071l133.327-75.934z"/>
      <path fill="#FBBC04" d="M239.37 113.814L181.715 80.79l-64.898 56.95l65.162 64.28l57.216-32.67a31.345 31.345 0 0 0 0-55.537z"/>
      <path fill="#4285F4" d="M1.06 23.487A30.6 30.6 0 0 0 0 31.61v219.327a32.3 32.3 0 0 0 1.06 8.124l122.555-120.966z"/>
      <path fill="#34A853" d="m120.436 141.274l61.278-60.483L48.564 4.503A32.85 32.85 0 0 0 32.051 0C17.644-.028 4.978 9.534 1.06 23.399z"/>
    </svg>
  );
};

export default function DownloadApps() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 my-28">
      
      {/* Main Container Box with Dark Navy & Red Theme */}
      <div className="relative rounded-[2.5rem] bg-[#0b132b] border border-red-700/25 p-8 md:p-14 overflow-hidden shadow-2xl">
        
        {/* Deep & Dark Red Glow Effects */}
        <div className="absolute -top-16 -right-16 w-96 h-96 bg-red-800/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-red-900/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          
          <div className="trust-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-xs font-semibold uppercase tracking-wider text-red-400 shadow-sm mx-auto">
            <Smartphone className="h-3.5 w-3.5 text-red-700" />
            DeshParcel Mobile App
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
            Download the{" "}
            <span className="text-red-700">DeshParcel Merchant App</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Download the DeshParcel Merchant App and manage deliveries, live
            tracking, orders, and COD operations easily from one convenient
            platform anytime.
          </p>

          {/* App Store & Google Play Official Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            
            {/* App Store Button */}
            <Link 
              href="https://apple.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="transition-transform hover:scale-105"
            >
              <div className="bg-black/90 border border-white/20 rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-xl cursor-pointer">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" 
                  alt="App Store" 
                  width={22} 
                  height={22} 
                />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 leading-none">Download on the</p>
                  <p className="text-xs font-bold text-white tracking-wide mt-0.5">App Store</p>
                </div>
              </div>
            </Link>

            {/* Google Play Button using Custom SVG */}
            <Link 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="transition-transform hover:scale-105"
            >
              <div className="bg-black/90 border border-white/20 rounded-xl px-5 py-2.5 flex items-center gap-3 shadow-xl cursor-pointer">
                <GooglePlayIconIcon size={26} />
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-wider text-gray-400 leading-none">GET IT ON</p>
                  <p className="text-xs font-bold text-white tracking-wide mt-0.5">Google Play</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}