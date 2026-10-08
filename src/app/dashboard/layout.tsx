"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Bike, 
  ShieldCheck, 
  Menu, 
  ArrowLeft, 
  DollarSign,
  Wallet,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import Logo from "@/components/logo/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
      setUserRole(role);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center text-xs uppercase tracking-wider">
        Verifying Security & Session...
      </div>
    );
  }

 
  const adminLinks = [
    { name: "Over all", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Parcels", href: "/dashboard/admin/parcels", icon: Package },
    { name: "All Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Approve Riders", href: "/dashboard/admin/riders", icon: Bike },
    { name: "Payments & Revenue", href: "/dashboard/admin/payments", icon: DollarSign },
  ];


  const riderLinks = [
    { name: "Rider Dashboard", href: "/dashboard/rider", icon: LayoutDashboard },
    { name: "Assigned Parcels", href: "/dashboard/rider/parcels", icon: ClipboardList },
    { name: "Earnings & Cashout", href: "/dashboard/rider/earnings", icon: Wallet },
  ];

 
  const currentLinks = userRole === "RIDER" ? riderLinks : adminLinks;
  const panelTitle = userRole === "RIDER" ? "Rider Delivery Hub" : "Admin Control Panel";

  return (
    <div className="flex min-h-screen bg-[#070b19] text-white w-full overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#0b132b] border-r border-red-700/20 hidden lg:flex flex-col p-6 space-y-8 shadow-2xl relative z-20">
        <div className="flex items-center justify-between">
          <Logo />
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pb-2">
            {panelTitle}
          </p>
          <nav className="flex flex-col space-y-1.5">
            {currentLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-red-700 text-white  shadow-red-700/30"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 rounded-xl text-xs font-bold uppercase tracking-wider border-white/20 text-white bg-[#050814] hover:bg-white hover:text-black cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar Header */}
        <header className="h-20 border-b border-red-700/20 bg-[#0b132b]/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-4">
            
            {/* Mobile & Tablet Drawer Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
<button 
                  className="lg:hidden p-2.5 rounded-xl bg-[#050814] border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Open Sidebar Menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-[#0b132b] border-r border-red-700/30 text-white p-6 flex flex-col space-y-8">
                <div className="flex items-center justify-between">
                  <Logo />
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pb-2">
                    {panelTitle}
                  </p>
                  <nav className="flex flex-col space-y-1.5">
                    {currentLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                            isActive
                              ? "bg-red-700 text-white  shadow-red-700/30"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {link.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
                  <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 rounded-xl text-xs font-bold uppercase tracking-wider border-white/20 text-white bg-[#050814] hover:bg-white hover:text-black cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="font-heading font-extrabold text-base md:text-xl text-white tracking-wide">
                {userRole === "RIDER" ? "Rider" : "Admin"} <span className="text-red-700">Dashboard</span>
              </h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                {userRole === "RIDER" 
                  ? "Manage assigned deliveries, earnings, and status workflows." 
                  : "Manage parcels, users, and logistics metrics from one centralized hub."}
              </p>
            </div>
          </div>

          {/* Right Header Status Badge */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-700/10 border border-red-700/30 text-[10px] font-bold uppercase tracking-wider text-red-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified {userRole === "RIDER" ? "Rider" : "Admin"}
            </span>
          </div>
        </header>

        {/* Dashboard Dynamic Page Content */}
        <main className="flex-1 w-full p-6 md:p-10 overflow-y-auto bg-[#070b19]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}