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
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300">
      <div 
        className={`w-full max-w-7xl transition-all duration-500 rounded-2xl px-6 py-3 flex items-center justify-between border ${
          isScrolled 
            ? "mx-auto max-w-5xl bg-background/85 backdrop-blur-md shadow-xl border-border/60 py-2.5 scale-[0.98]" 
            : "bg-background/95 backdrop-blur-sm shadow-md border-border/40"
        }`}
      >
        {/* Logo (Works as Home Link) */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link href="/track" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Track
          </Link>
          <Link href="/pricing" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            Pricing
          </Link>
          <Link href="/about" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer">
            About
          </Link>

          {/* More Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50 text-sm font-medium h-9 px-3 cursor-pointer">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2 bg-popover text-popover-foreground rounded-xl shadow-xl border border-border">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/services" 
                          className="block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground text-sm font-medium cursor-pointer"
                        >
                          Services
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/coverage" 
                          className="block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground text-sm font-medium cursor-pointer"
                        >
                          Coverage Area
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link 
                          href="/contact" 
                          className="block select-none space-y-1 rounded-md p-2.5 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-foreground text-sm font-medium cursor-pointer"
                        >
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

        {/* Right Action Buttons (Be a Rider & Sign In / Register) */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/become-rider">
            <Button 
              variant="outline" 
              className="rounded-xl px-4 font-medium border-[oklch(0.577_0.245_27.325)]/30 text-foreground hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white hover:border-[oklch(0.577_0.245_27.325)] transition-all group cursor-pointer"
            >
              <Bike className="mr-1.5 h-4 w-4 text-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-colors" />
              Be a Rider
            </Button>
          </Link>
          
          <Link href="/login">
            <Button className="rounded-xl px-5 font-medium shadow-sm hover:shadow transition-all group cursor-pointer">
              Sign In
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
<button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted text-foreground cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-background border border-border rounded-2xl shadow-2xl p-5 flex flex-col gap-3 md:hidden z-50 animate-in fade-in slide-in-from-top-4">
          <Link href="/track" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Track</Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Pricing</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Services</Link>
          <Link href="/coverage" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Coverage Area</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Contact Us</Link>
          
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link href="/become-rider" onClick={() => setMobileMenuOpen(false)}>
              <Button 
                variant="outline" 
                className="w-full rounded-xl justify-center border-[oklch(0.577_0.245_27.325)]/30 hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white hover:border-[oklch(0.577_0.245_27.325)] transition-all group cursor-pointer"
              >
                <Bike className="mr-2 h-4 w-4 text-[oklch(0.577_0.245_27.325)] group-hover:text-white transition-colors" />
                Be a Rider
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl justify-center cursor-pointer">Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}