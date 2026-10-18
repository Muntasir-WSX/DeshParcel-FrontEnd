"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/mainloading";

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
      
        const res = await fetch(`${BACKEND_URL}/api/v1/public/blogs/${id}`);
        const result = await res.json();
        
        if (result.success) {
          setBlog(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-2xl font-bold font-heading">Blog Article Not Found</h2>
        <p className="text-gray-400 text-xs">The article you are looking for does not exist or has been removed.</p>
        <Link href="/">
          <Button className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase cursor-pointer">
            Back To Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-28 text-white space-y-8">
      
      {/* Back Button */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      {/* Blog Header */}
      <div className="space-y-4">
        <div className="inline-flex px-3 py-1 rounded-full bg-red-700/20 border border-red-700/30 text-[10px] font-bold uppercase tracking-wider text-red-700">
          {blog.category || "General"}
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold font-heading tracking-tight leading-snug">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 pt-2 border-t border-white/10">
          <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-red-700" /> {blog.author || "Admin"}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-red-700" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-red-700" /> {blog.readTime || "3 min read"}</span>
        </div>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="relative h-72 md:h-96 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Blog Content */}
      <div className="bg-[#0b132b] border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl space-y-6 text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
        <p>{blog.content}</p>
      </div>

    </article>
  );
}