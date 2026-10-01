"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, Bike, ArrowRight } from "lucide-react";
import Logo from "../logo/logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
      <div 
        className={`w-full transition-all duration-500 rounded-full px-5 py-2.5 flex items-center justify-between border backdrop-blur-xl ${
          isScrolled 
            ? "max-w-5xl bg-white/95 border-gray-200 shadow-xl shadow-black/10 scale-[0.98] dark:bg-gray-950/95 dark:border-gray-800" 
            : "max-w-7xl bg-white/95 border-gray-200/80 shadow-2xl shadow-black/20 dark:bg-gray-950/95 dark:border-gray-800"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation Links (Centered Capsule Feel) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full bg-gray-100/80 border border-gray-200/50 dark:bg-gray-900 dark:border-gray-800">
          <Link href="/track" className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-gray-800 hover:text-[oklch(0.577_0.245_27.325)] dark:text-gray-200 transition-colors cursor-pointer">
            Track
          </Link>
          <Link href="/pricing" className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-gray-800 hover:text-[oklch(0.577_0.245_27.325)] dark:text-gray-200 transition-colors cursor-pointer">
            Pricing
          </Link>
          <Link href="/about" className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-gray-800 hover:text-[oklch(0.577_0.245_27.325)] dark:text-gray-200 transition-colors cursor-pointer">
            About
          </Link>

          {/* More Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-200/50 text-gray-800 dark:text-gray-200 text-xs font-bold tracking-wider uppercase h-8 px-3 cursor-pointer data-[state=open]:bg-gray-200/50">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/services" className="block select-none space-y-1 rounded-xl p-2.5 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 text-xs font-bold uppercase tracking-wider cursor-pointer">
                          Services
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/coverage" className="block select-none space-y-1 rounded-xl p-2.5 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 text-xs font-bold uppercase tracking-wider cursor-pointer">
                          Coverage Area
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/contact" className="block select-none space-y-1 rounded-xl p-2.5 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 text-xs font-bold uppercase tracking-wider cursor-pointer">
                          Contact Us
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/become-rider">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full px-4 text-xs font-bold uppercase tracking-wider border-[oklch(0.577_0.245_27.325)]/40 text-gray-800 hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white dark:text-gray-200 hover:border-[oklch(0.577_0.245_27.325)] transition-all group cursor-pointer h-9 bg-white dark:bg-gray-950"
            >
              <Bike className="mr-1.5 h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-colors" />
              Be a Rider
            </Button>
          </Link>
          
          <Link href="/login">
            <Button 
              size="sm"
              className="rounded-full px-5 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all group cursor-pointer h-9"
              style={{ backgroundColor: "oklch(0.22 0.05 255)", color: "#fff" }}
            >
              Sign In
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col gap-3 md:hidden z-50 animate-in fade-in slide-in-from-top-4">
          <Link href="/track" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">Track</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">Pricing</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">Services</Link>
          <Link href="/coverage" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">Coverage Area</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-200 text-xs font-bold uppercase tracking-wider">Contact Us</Link>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
            <Link href="/become-rider" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full rounded-full justify-center text-xs font-bold uppercase tracking-wider border-[oklch(0.577_0.245_27.325)]/40 text-gray-800 dark:text-gray-200 hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white hover:border-[oklch(0.577_0.245_27.325)] transition-all group cursor-pointer"
              >
                <Bike className="mr-2 h-4 w-4 text-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-colors" />
                Be a Rider
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                className="w-full rounded-full justify-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                style={{ backgroundColor: "oklch(0.22 0.05 255)", color: "#fff" }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}