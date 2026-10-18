"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/mainloading";

export default function BlogHome() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const BACKEND_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${BACKEND_URL}/api/v1/public/blogs`);
        const result = await res.json();

        if (result.success) {
          setBlogs(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  return (
    <section className="relative max-w-6xl mx-auto px-6 md:px-12 my-28 text-slate-900 dark:text-white">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-700/15 backdrop-blur-md border border-red-700/30 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-red-700 shadow-sm">
          <Newspaper className="h-4 w-4 text-red-700" />
          Latest Updates & Articles
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight">
          News & <span className="text-red-700">Insights</span>
        </h2>

        <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base">
          Stay updated with logistics trends, company announcements, and expert
          merchant tips.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader />
        </div>
      ) : blogs.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl max-w-xl mx-auto">
          <p className="text-slate-600 dark:text-gray-300 text-sm">
            No blog articles published yet. Check back soon!
          </p>
        </div>
      ) : (
        /* Auto Sliding Carousel Container */
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="group rounded-3xl bg-white dark:bg-[#0b132b] backdrop-blur-md border border-slate-200 dark:border-white/10 hover:border-red-700/60 overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300"
              >
                {/* Blog Image */}
                <div className="relative h-64 md:h-auto md:w-1/2 overflow-hidden bg-gray-900 shrink-0">
                  <img
                    src={
                      blogs[currentIndex].image ||
                      "https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045600/26f88bef5ac4b46e3d4fccde85cda8c2_krkqgb.jpg"
                    }
                    alt={blogs[currentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-700 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    {blogs[currentIndex].category || "Logistics"}
                  </div>
                </div>

                {/* Blog Content & Details Link */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:w-1/2 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-slate-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-red-700" />
                        {new Date(
                          blogs[currentIndex].createdAt,
                        ).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-red-700" /> 3 min
                        read
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-red-700 transition-colors line-clamp-2">
                      {blogs[currentIndex].title}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {blogs[currentIndex].content}
                    </p>
                  </div>

                  {/* Read More / Details Link */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <Link
                      href={`/blog/${blogs[currentIndex].id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 hover:text-red-700 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-red-700 hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Previous Blog"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {blogs.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-6 bg-red-700" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-red-700 hover:text-white transition-colors cursor-pointer shadow-md"
              aria-label="Next Blog"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
