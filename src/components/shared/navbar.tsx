/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

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

  const navLinks = [
    { name: "Track", href: "/Track" },
    { name: "Pricing", href: "/Pricing" },
    { name: "About", href: "/About" },
  ];

  const dropdownLinks = [
    { name: "Services", href: "/Services", desc: "Explore our delivery & shipping solutions" },
    { name: "Coverage Area", href: "/Coverage", desc: "Check districts and hub locations" },
    { name: "Contact Us", href: "/ContactUs", desc: "Get in touch with our support team" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500">
      <div 
        className={`w-full transition-all duration-500 rounded-full px-5 md:px-6 py-2.5 md:py-3 flex items-center justify-between border backdrop-blur-2xl shadow-2xl ${
          isScrolled 
            ? "max-w-5xl bg-[#0B132B]/90 border-white/25 shadow-black/50 scale-[0.98]" 
            : "max-w-7xl bg-[#0B132B]/60 border-white/20 shadow-black/40"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Desktop & Tablet Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1 rounded-full bg-[#0B132B]/80 border border-white/15 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`relative px-3 lg:px-3.5 py-1.5 text-[11px] lg:text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer group ${
                  isActive ? "text-[oklch(0.577_0.245_27.325)]" : "text-white hover:text-[oklch(0.577_0.245_27.325)]"
                }`}
              >
                {link.name}
                {/* Underline Hover & Active Effect */}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[oklch(0.577_0.245_27.325)] transition-all duration-300 transform ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            );
          })}

          {/* Better Dropdown Menu (More) */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/15 text-white hover:text-[oklch(0.577_0.245_27.325)] text-[11px] lg:text-xs font-bold tracking-wider uppercase h-8 px-2.5 lg:px-3 cursor-pointer data-[state=open]:bg-white/15 focus:bg-transparent">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1.5 p-3 bg-[#0B132B]/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/15">
                    {dropdownLinks.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link 
                            href={item.href} 
                            className="block select-none space-y-1 rounded-xl p-3 transition-all hover:bg-white/10 hover:text-[oklch(0.577_0.245_27.325)] group cursor-pointer"
                          >
                            <div className="text-xs font-extrabold uppercase tracking-wider flex items-center justify-between">
                              <span>{item.name}</span>
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[oklch(0.577_0.245_27.325)]" />
                            </div>
                            <p className="text-[10px] text-gray-300 font-normal leading-normal">
                              {item.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right Action Buttons (Optimized for Tablet & Desktop) */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Link href="/become-rider">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full px-3.5 lg:px-4 text-[11px] lg:text-xs font-bold uppercase tracking-wider border-white/30 text-white hover:bg-white hover:text-black transition-all group cursor-pointer h-9 bg-[#0B132B]/80 backdrop-blur-sm"
            >
              <Bike className="mr-1 h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)] group-hover:text-black transition-colors" />
              Be a Rider
            </Button>
          </Link>
          
          <Link href="/login">
            <Button 
              size="sm"
              className="rounded-full px-4 lg:px-5 text-[11px] lg:text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all group cursor-pointer h-9"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
            >
              Sign In
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-[#0B132B]/80 text-white cursor-pointer hover:bg-white/20 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#0B132B]/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 flex flex-col gap-2.5 md:hidden z-50">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {dropdownLinks.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-4 py-2.5 rounded-xl hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-2 border-t border-white/15 flex flex-col gap-2.5">
            <Link href="/become-rider" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full rounded-full justify-center text-xs font-bold uppercase tracking-wider h-10 border-white/30 text-white bg-[#0B132B]/80 hover:bg-white hover:text-black">
                <Bike className="mr-2 h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
                Be a Rider
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-full justify-center text-xs font-bold uppercase bg-red-700 text-white hover:bg-white hover:text-red-700 tracking-wider h-10" variant="outline" >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}