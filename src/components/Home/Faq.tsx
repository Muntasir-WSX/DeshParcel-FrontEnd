"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How can I book a parcel delivery with DeshParcel?",
    a: "You can easily book a pickup by clicking 'Send a Parcel' from your dashboard or homepage, entering your pickup and drop-off details, and confirming your order in less than 2 minutes."
  },
  {
    q: "What are your delivery timelines across Bangladesh?",
    a: "We offer Same-Day delivery within major metropolitan areas (under 6 hours) and Next-Day nationwide delivery across all 64 districts."
  },
  {
    q: "How does Cash on Delivery (COD) payment work?",
    a: "We collect the full product price from your customer upon successful delivery and process secure merchant payouts the very next business day with 0% hidden charges."
  },
  {
    q: "How can I track my live shipment?",
    a: "Simply enter your unique Tracking ID into the tracking bar on our homepage or Tracking page to view real-time status updates and rider location."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-12 my-28 text-white">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-xs font-semibold uppercase tracking-wider text-red-700 shadow-sm">
          <HelpCircle className="h-3.5 w-3.5 text-red-700" />
          Got Questions?
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">
          Frequently Asked <span className="text-red-700">Questions</span>
        </h2>
        <p className="text-gray-300 text-sm">
          Find quick answers about our shipping rates, delivery zones, and merchant policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bg-[#0b132b] border border-white/10 rounded-2xl p-6 shadow-xl transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex justify-between items-center text-left cursor-pointer group"
              >
                <h3 className={`text-base md:text-lg font-bold font-heading transition-colors ${isOpen ? "text-red-700" : "text-white group-hover:text-red-700"}`}>
                  {faq.q}
                </h3>
                <div className="p-2 rounded-xl bg-[#070b19] border border-white/10 shrink-0 ml-4">
                  {isOpen ? <Minus className="h-4 w-4 text-red-700" /> : <Plus className="h-4 w-4 text-gray-400" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-white/10 mt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}