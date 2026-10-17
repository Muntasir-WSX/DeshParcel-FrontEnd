"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquareQuote, User } from "lucide-react";
import Loader from "@/components/shared/mainloading";


export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/api/v1/public/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-6 md:px-12 my-28 text-white">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 flex flex-col items-center">
        
        {/* Top Trust Badge Style Applied */}
        <div className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-white/90 shadow-sm w-fit">
          <MessageSquareQuote className="h-5 w-5 md:h-4 md:w-4 text-red-700" />
          Client Testimonials
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight">
          What Our <span className="text-red-500">Merchants Say</span>
        </h2>
        
        <p className="text-gray-300 text-sm md:text-base">
          Real feedback from merchants and customers who trust DeshParcel for their deliveries.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 text-sm">
         <Loader />
        </div>
      ) : reviews.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-[#0b132b] border border-white/10 rounded-3xl p-8 shadow-xl max-w-xl mx-auto">
          <p className="text-gray-400 text-sm">No reviews found yet. Be the first to leave a review after your delivery!</p>
        </div>
      ) : (
        /* Reviews Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#0b132b] backdrop-blur-md border border-white/10 hover:border-red-700/60 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-red-700/20 border border-red-700/40 flex items-center justify-center overflow-hidden shrink-0">
                  {review.user?.profileImage ? (
                    <img
                      src={review.user.profileImage}
                      alt={review.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {review.user?.name || "Anonymous Merchant"}
                  </h4>
                  <p className="text-[10px] text-red-400 uppercase tracking-wider font-semibold">
                    Verified Customer
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </section>
  );
}