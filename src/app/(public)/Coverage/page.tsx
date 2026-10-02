"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Phone, Mail, Building, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import Leaflet map to prevent SSR window reference error in Next.js
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Comprehensive Division & Hub Coverage Data with Lat/Lng for Leaflet Map
const divisionsData = [
  {
    id: "dhaka",
    name: "Dhaka Division",
    hubs: 12,
    position: [23.8103, 90.4125], // Dhaka Center
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Kishoreganj", "Narsingdi", "Manikganj", "Munshiganj", "Rajbari", "Shariatpur", "Madaripur"],
    deliveryTime: "24 Hours (Express)",
    status: "Fully Active"
  },
  {
    id: "chattogram",
    name: "Chattogram Division",
    hubs: 10,
    position: [22.3569, 91.7832], // Chattogram Center
    districts: ["Chattogram", "Cox's Bazar", "Noakhali", "Comilla", "Brahmanbaria", "Chandpur", "Feni", "Lakshmipur", "Khagrachhari", "Bandarban", "Rangamati"],
    deliveryTime: "24 - 48 Hours",
    status: "Fully Active"
  },
  {
    id: "sylhet",
    name: "Sylhet Division",
    hubs: 5,
    position: [24.8949, 91.8687], // Sylhet Center
    districts: ["Sylhet", "Habiganj", "Sunamganj", "Moulvibazar"],
    deliveryTime: "48 Hours",
    status: "Fully Active"
  },
  {
    id: "rajshahi",
    name: "Rajshahi & Rangpur Division",
    hubs: 12,
    position: [24.3636, 88.6241], // Rajshahi Center
    districts: ["Rajshahi", "Bogra", "Pabna", "Sirajganj", "Natore", "Naogaon", "Chapainawabganj", "Joypurhat", "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
    deliveryTime: "48 Hours",
    status: "Fully Active"
  },
  {
    id: "khulna",
    name: "Khulna & Barishal Division",
    hubs: 10,
    position: [22.8456, 89.5403], // Khulna Center
    districts: ["Khulna", "Jashore", "Satkhira", "Kushtia", "Jhenaidah", "Magura", "Narail", "Chuadanga", "Meherpur", "Bagerhat", "Barishal", "Patuakhali", "Bhola", "Pirojpur", "Jhalokati", "Barguna"],
    deliveryTime: "48 - 72 Hours",
    status: "Fully Active"
  }
];

export default function CoveragePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDivision, setActiveDivision] = useState(divisionsData[0]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const filteredDivisions = divisionsData.map((div) => ({
    ...div,
    filteredDistricts: div.districts.filter((dist) =>
      dist.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(
    (div) =>
      div.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      div.filteredDistricts.length > 0
  );

  return (
    <div className="w-full pb-20 bg-background text-foreground">
      
      {/* 1. Cover Hero Section with New Cloudinary Banner */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876291/pexels-alex-kovshovik-37538283_kxdpzq.jpg"
            alt="DeshParcel Coverage Banner"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
          >
            <MapPin className="h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
            Nationwide Logistics Network
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            Delivering to All <span style={{ color: "oklch(0.577 0.245 27.325)" }}>64 Districts</span> in Bangladesh
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore our real-time interactive regional hubs, sorting stations, and express delivery timelines across Bangladesh.
          </motion.p>
        </div>
      </section>

      {/* 2. Leaflet Interactive Map & Region Inspector Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] mb-2 block">
            Live Interactive Leaflet Map
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight mb-3">
            Bangladesh Regional Hubs Locator
          </h2>
          <p className="text-muted-foreground text-sm">
            Click on any division or marker on the map to inspect active hub density and delivery lead times.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Leaflet Map Container */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-4 shadow-2xl relative overflow-hidden min-h-[480px] flex flex-col">
            <div className="absolute top-6 left-6 z-[400] bg-black/80 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl border border-white/20 shadow-xl">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[oklch(0.577_0.245_27.325)] block">
                Selected Region
              </span>
              <span className="text-sm font-extrabold font-heading">{activeDivision.name}</span>
            </div>

            <div className="w-full h-[430px] rounded-2xl overflow-hidden relative z-10 mt-2">
              {mapLoaded && (
                <MapContainer
                  center={[23.6850, 90.3563]} // Bangladesh Center
                  zoom={7}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {divisionsData.map((div) => (
                    <Marker 
                      key={div.id} 
                      position={div.position as [number, number]}
                      eventHandlers={{
                        click: () => setActiveDivision(div)
                      }}
                    >
                      <Popup>
                        <div className="p-1 space-y-1">
                          <strong className="font-heading text-sm">{div.name}</strong>
                          <p className="text-xs text-gray-600">{div.hubs} Hubs Operating</p>
                          <p className="text-xs font-bold text-[oklch(0.577_0.245_27.325)]">{div.deliveryTime}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          {/* Right: Selected Division Districts & Search Bar */}
          <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold font-heading text-foreground">
                  Covered Districts
                </h3>
                <span className="text-xs font-bold px-3 py-1 bg-muted rounded-full text-muted-foreground">
                  {activeDivision.districts.length} Districts
                </span>
              </div>

              {/* District Search Input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Search district in Bangladesh..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)]"
                />
              </div>

              {/* District Pills List */}
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-1">
                {activeDivision.districts.map((dist, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border/80 text-xs font-semibold text-foreground flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                    {dist}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[oklch(0.577_0.245_27.325)]/10 border border-[oklch(0.577_0.245_27.325)]/30 space-y-1">
              <p className="text-xs font-bold text-[oklch(0.577_0.245_27.325)] uppercase tracking-wider">
                Express Transit Guarantee
              </p>
              <p className="text-xs text-muted-foreground">
                All districts connected with real-time tracking and automated dispatch systems.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Division & Hub Details Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] mb-1 block">
            Full Network Breakdown
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold font-heading">
            Divisional Hubs & Timelines
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDivisions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-[oklch(0.577_0.245_27.325)]/50 transition-all space-y-5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[oklch(0.577_0.245_27.325)]/10 text-[oklch(0.577_0.245_27.325)] text-xs font-bold uppercase tracking-wider">
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                    <Building className="h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)]" />
                    {item.hubs} Hubs
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading group-hover:text-[oklch(0.577_0.245_27.325)] transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs font-semibold text-muted-foreground">
                  Estimated Delivery: <span className="text-foreground">{item.deliveryTime}</span>
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 max-h-24 overflow-hidden">
                  {item.districts.map((dist, dIdx) => (
                    <span key={dIdx} className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-medium text-muted-foreground">
                      {dist}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <Button 
                  variant="outline"
                  onClick={() => setActiveDivision(item)}
                  className="w-full rounded-xl text-xs font-bold uppercase tracking-wider border-border hover:bg-[oklch(0.577_0.245_27.325)] hover:text-white hover:border-[oklch(0.577_0.245_27.325)] transition-all cursor-pointer"
                >
                  Locate on Map
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}