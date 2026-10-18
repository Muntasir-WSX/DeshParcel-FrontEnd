"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  return (
    <section className="relative max-w-5xl mx-auto px-6 md:px-12 my-28 text-slate-900 dark:text-white">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 flex flex-col items-center">
        {/* Top Trust Badge Style Applied */}
        <div className="trust-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-white/90 shadow-sm w-fit">
          <MessageSquareQuote className="h-5 w-5 md:h-4 md:w-4 text-red-700" />
          Client Testimonials
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight">
          What Our <span className="text-red-700">Merchants Say</span>
        </h2>

        <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base">
          Real feedback from merchants and customers who trust DeshParcel for
          their deliveries.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12 text-slate-600 dark:text-gray-300 flex justify-center">
          <p>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-xl mx-auto">
          <p className="text-slate-600 dark:text-gray-300 text-sm">
            No reviews found yet. Be the first to leave a review after your
            delivery!
          </p>
        </div>
      ) : (
        /* Rotating Carousel View */
        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full p-8 md:p-10 rounded-3xl bg-white dark:bg-[#0b132b] backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Ratings */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < reviews[currentIndex].rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm md:text-base text-slate-700 dark:text-gray-200 leading-relaxed italic">
                    "{reviews[currentIndex].comment}"
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-700/20 border border-red-700/40 flex items-center justify-center overflow-hidden shrink-0">
                      {reviews[currentIndex].user?.profileImage ? (
                        <img
                          src={reviews[currentIndex].user.profileImage}
                          alt={reviews[currentIndex].user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-red-700" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                        {reviews[currentIndex].user?.name ||
                          "Anonymous Merchant"}
                      </h4>
                      <p className="text-[10px] text-red-700 uppercase tracking-wider font-semibold">
                        Verified Customer
                      </p>
                    </div>
                  </div>

                  {/* Indicators / Counter */}
                  <div className="text-xs text-slate-600 dark:text-gray-300 font-mono">
                    {currentIndex + 1} / {reviews.length}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-6">
            {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-red-700 hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Previous Review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {reviews.map((_, idx) => (
                // biome-ignore lint/a11y/useButtonType: <explanation>
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 bg-red-700"
                      : "w-2 bg-slate-300 dark:bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-red-700 hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Next Review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
