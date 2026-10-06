"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Search, ShieldCheck, ArrowRight, Building2, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Leadership Team Data
const leadership = [
  {
    name: "Tanvir Ahmed",
    role: "Chief Executive Officer (CEO)",
    image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770902014/user13_upighw.jpg",
    email: "ceo@deshparcel.com",
    phone: "+880 1700-111111"
  },
  {
    name: "Mainuddin Chowdhury",
    role: "Managing Director (MD)",
    image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1770900330/user10_oga6fp.jpg",
    email: "md@deshparcel.com",
    phone: "+880 1700-222222"
  },
  {
    name: "Farhan Ishtiaq",
    role: "Head of Operations & Logistics",
    image: "https://res.cloudinary.com/dnk0bvpym/image/upload/v1747153336/lawyers6_rgazsz.jpg",
    email: "operations@deshparcel.com",
    phone: "+880 1700-333333"
  }
];

// 30 Hub Managers Across Bangladesh
const hubManagers = [
  { district: "Dhaka Central", hub: "Motijheel Hub", manager: "Nazmul Hossain", phone: "+880 1811-000001", email: "dhaka.central@deshparcel.com" },
  { district: "Dhaka Uttara", hub: "Uttara Sector 7 Hub", manager: "Rakibul Islam", phone: "+880 1811-000002", email: "dhaka.uttara@deshparcel.com" },
  { district: "Chattogram", hub: "Agrabad Commercial Hub", manager: "Zillur Rahman", phone: "+880 1811-000003", email: "chattogram@deshparcel.com" },
  { district: "Sylhet", hub: "Zindabazar Hub", manager: "Imran Ahmed", phone: "+880 1811-000004", email: "sylhet@deshparcel.com" },
  { district: "Rajshahi", hub: "Shaheb Bazar Hub", manager: "Moniruzzaman", phone: "+880 1811-000005", email: "rajshahi@deshparcel.com" },
  { district: "Khulna", hub: "Shibbari Moor Hub", manager: "Tariqul Islam", phone: "+880 1811-000006", email: "khulna@deshparcel.com" },
  { district: "Barishal", hub: "Sadar Road Hub", manager: "Al-Amin Hossain", phone: "+880 1811-000007", email: "barishal@deshparcel.com" },
  { district: "Rangpur", hub: "Jahaj Company Moor", manager: "Mahfuzur Rahman", phone: "+880 1811-000008", email: "rangpur@deshparcel.com" },
  { district: "Mymensingh", hub: "Ganginar Par Hub", manager: "Shariful Islam", phone: "+880 1811-000009", email: "mymensingh@deshparcel.com" },
  { district: "Comilla", hub: "Kandirpar Hub", manager: "Nazim Uddin", phone: "+880 1811-000010", email: "comilla@deshparcel.com" },
  { district: "Gazipur", hub: "Chowrasta Hub", manager: "Sohag Mia", phone: "+880 1811-000011", email: "gazipur@deshparcel.com" },
  { district: "Narayanganj", hub: "Chashara Hub", manager: "Ripon Sarkar", phone: "+880 1811-000012", email: "narayanganj@deshparcel.com" },
  { district: "Bogra", hub: "Thana More Hub", manager: "Ashraful Alam", phone: "+880 1811-000013", email: "bogra@deshparcel.com" },
  { district: "Cox's Bazar", hub: "Kolatoli Hub", manager: "Saiful Islam", phone: "+880 1811-000014", email: "coxsbazar@deshparcel.com" },
  { district: "Jashore", hub: "Rupsha Hub", manager: "Habibur Rahman", phone: "+880 1811-000015", email: "jashore@deshparcel.com" },
  { district: "Tangail", hub: "Nisindhara Hub", manager: "Jahangir Alam", phone: "+880 1811-000016", email: "tangail@deshparcel.com" },
  { district: "Faridpur", hub: "Goalchamand Hub", manager: "Kamrul Hasan", phone: "+880 1811-000017", email: "faridpur@deshparcel.com" },
  { district: "Kishoreganj", hub: "Baidyabazar Hub", manager: "Nazrul Islam", phone: "+880 1811-000018", email: "kishoreganj@deshparcel.com" },
  { district: "Noakhali", hub: "Maijdee Court Hub", manager: "Belayet Hossain", phone: "+880 1811-000019", email: "noakhali@deshparcel.com" },
  { district: "Brahmanbaria", hub: "Press Club Hub", manager: "Shah Alam", phone: "+880 1811-000020", email: "brahmanbaria@deshparcel.com" },
  { district: "Pabna", hub: "Traffic More Hub", manager: "Anwar Hossain", phone: "+880 1811-000021", email: "pabna@deshparcel.com" },
  { district: "Dinajpur", hub: "Station Road Hub", manager: "Mokbul Hossain", phone: "+880 1811-000022", email: "dinajpur@deshparcel.com" },
  { district: "Jamalpur", hub: "Doyaganj Hub", manager: "Rafiqul Islam", phone: "+880 1811-000023", email: "jamalpur@deshparcel.com" },
  { district: "Habiganj", hub: "Shayestaganj Hub", manager: "Delwar Hossain", phone: "+880 1811-000024", email: "habiganj@deshparcel.com" },
  { district: "Sunamganj", hub: "Station Road Hub", manager: "Faysal Ahmed", phone: "+880 1811-000025", email: "sunamganj@deshparcel.com" },
  { district: "Patuakhali", hub: "Launch Ghat Hub", manager: "Hasan Mahmud", phone: "+880 1811-000026", email: "patuakhali@deshparcel.com" },
  { district: "Chandpur", hub: "Boro Station Hub", manager: "Kalam Patwary", phone: "+880 1811-000027", email: "chandpur@deshparcel.com" },
  { district: "Sirajganj", hub: "Bazar Station Hub", manager: "Abdul Alim", phone: "+880 1811-000028", email: "sirajganj@deshparcel.com" },
  { district: "Narsingdi", hub: "Jail Road Hub", manager: "Monir Hossain", phone: "+880 1811-000029", email: "narsingdi@deshparcel.com" },
  { district: "Satkhira", hub: "Borokhola Hub", manager: "Sajjad Hossain", phone: "+880 1811-000030", email: "satkhira@deshparcel.com" },
];

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHubs = hubManagers.filter(
    (item) =>
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pb-20">
      
      {/* 1. Cover Hero Section */}
      <section className="relative w-full pt-44 pb-32 md:pt-52 md:pb-40 px-6 md:px-12 rounded-b-[3rem] overflow-hidden shadow-2xl mb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/0baf4b9ee1a28ce305fb45c49d925e42_ru5dbc.jpg"
            alt="DeshParcel Contact Cover"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.04_255)]/95 via-[oklch(0.18_0.04_255)]/85 to-black/70 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white shadow-sm"
          >
            <MapPin className="h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
            Get in Touch With Us
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.15]"
          >
            We Are Here to Help Your <span style={{ color: "oklch(0.577 0.245 27.325)" }}>Business Grow</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Reach out to our executive leadership or connect directly with our nationwide hub managers across Bangladesh.
          </motion.p>
        </div>
      </section>

      {/* 2. Executive Leadership Team (CEO, MD & Head of Ops) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)] mb-2 block">
            Executive Board
          </span>
          <h2 className="text-3xl text-white md:text-4xl font-extrabold font-heading tracking-tight mb-3">
            Key Leadership
          </h2>
          <p className="text-muted-foreground text-white text-sm md:text-base">
            Direct contact information for our core management team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-card border border-border/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative w-full h-72 overflow-hidden bg-muted">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.577_0.245_27.325)]">
                    {leader.role}
                  </span>
                  <h3 className="text-xl text-white font-bold font-heading text-foreground mt-1">
                    {leader.name}
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                    <span className="text-white">{leader.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                    <span className="text-white">{leader.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Nationwide Hub Managers Directory with Background Image */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-28 rounded-[2.5rem] overflow-hidden py-20 text-white shadow-2xl border border-white/10">
        
        {/* Background Image 1 */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/96c6c5e25f9319e4635cf32fdc6cdb14_sn2npv.jpg"
            alt="Hub Network Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.04_255)]/95 via-[oklch(0.18_0.04_255)]/90 to-black/95 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white mb-3">
                <MapPin className="h-3.5 w-3.5 text-[oklch(0.577_0.245_27.325)]" />
                Nationwide Coverage
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
                30 Hub Managers Directory
              </h2>
              <p className="text-sm text-gray-300 mt-2">
                Search and connect with our hub managers across all districts of Bangladesh.
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search district, hub or manager..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-white/20 rounded-2xl pl-11 pr-4 py-3 text-xs md:text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[oklch(0.577_0.245_27.325)] transition-all shadow-lg"
              />
            </div>
          </div>

          {/* Hub Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHubs.length > 0 ? (
              filteredHubs.map((hub, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[oklch(0.577_0.245_27.325)]/80 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-[oklch(0.577_0.245_27.325)] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                      {hub.district}
                    </span>
                    <span className="text-xs text-gray-300 font-medium">{hub.hub}</span>
                  </div>

                  <div>
                    <p className="text-base font-bold text-white font-heading group-hover:text-[oklch(0.577_0.245_27.325)] transition-colors">{hub.manager}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Authorized Hub Manager</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-gray-300">
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                      <span className="font-medium">{hub.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-4 w-4 text-[oklch(0.577_0.245_27.325)] shrink-0" />
                      <span className="truncate">{hub.email}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-gray-400">
                No matching hub or manager found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Extra Corporate Fleet & Logistics Support Section with Second Image */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 rounded-[2.5rem] overflow-hidden py-24 text-white shadow-2xl border border-white/10">
        
        {/* Background Image 2 */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dnk0bvpym/image/upload/v1790876289/ccea22747d949b33e82c02293dc9404c_pi3mdk.jpg"
            alt="Corporate Fleet Support"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
            <Building2 className="h-4 w-4 text-[oklch(0.577_0.245_27.325)]" />
            Corporate Partnerships
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            Need Custom Fleet or <span style={{ color: "oklch(0.577 0.245 27.325)" }}>Enterprise Logistics?</span>
          </h2>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            Partner with DeshParcel for enterprise-grade bulk shipping, dedicated warehousing solutions, and priority supply chain management tailored to your business scale.
          </p>

          <div className="pt-2">
            <Button 
              size="lg" 
              className="rounded-full px-8 h-14 text-sm font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
              style={{ backgroundColor: "oklch(0.577 0.245 27.325)", color: "#fff" }}
            >
              Contact Corporate Desk
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}