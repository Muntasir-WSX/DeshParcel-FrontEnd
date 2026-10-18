"use client";

import { Calendar, Edit3, PlusCircle, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/shared/mainloading";
import { Button } from "@/components/ui/button";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Logistics",
    image: "",
    content: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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
    } catch (_error: any) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingBlogId(null);
    setFormData({ title: "", category: "Logistics", image: "", content: "" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: any) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title || "",
      category: blog.category || "Logistics",
      image: blog.image || "",
      content: blog.content || "",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const url = editingBlogId
        ? `${BACKEND_URL}/api/v1/admin/blogs/${editingBlogId}`
        : `${BACKEND_URL}/api/v1/admin/blogs`;

      const method = editingBlogId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save blog");

      toast.success(
        editingBlogId
          ? "Blog Updated Successfully!"
          : "Blog Published Successfully!",
      );
      setIsModalOpen(false);
      setEditingBlogId(null);
      setFormData({ title: "", category: "Logistics", image: "", content: "" });
      fetchBlogs();
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog Deleted");
      fetchBlogs();
    } catch (_error: any) {
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0b132b] border border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            Manage <span className="text-red-700">Blogs & Articles</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-300">
            Publish, update, or remove announcements and logistics insights.
          </p>
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className="h-10 px-4 text-xs font-bold uppercase bg-red-700 hover:bg-red-700 text-white rounded-2xl cursor-pointer shadow-red-700/30"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" /> Add New Blog
        </Button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="relative h-44 w-full bg-gray-900">
              <img
                src={
                  blog.image ||
                  "https://res.cloudinary.com/dnk0bvpym/image/upload/v1791045600/26f88bef5ac4b46e3d4fccde85cda8c2_krkqgb.jpg"
                }
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-700 text-[10px] font-bold uppercase text-white">
                {blog.category || "General"}
              </span>
            </div>
            <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-600 dark:text-gray-300 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-red-700" />{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-gray-300 line-clamp-2">
                  {blog.content}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end gap-2">
                <Button
                  size="sm"
                  onClick={() => handleOpenEditModal(blog)}
                  className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-slate-900 dark:hover:text-white border border-blue-600/30 h-8 text-[10px] uppercase font-bold cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="bg-red-700/20 text-red-700 hover:bg-red-700 hover:text-white border border-red-700/30 h-8 text-[10px] uppercase font-bold cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b132b] border border-red-700/30 w-full max-w-lg rounded-3xl p-6 shadow-2xl text-slate-900 dark:text-white space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className="text-lg font-bold font-heading">
                {editingBlogId ? "Update Blog Post" : "Publish New Blog Post"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-gray-300">
                  Blog Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter blog title..."
                  className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-gray-300">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Logistics, Merchant Guide"
                  className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-gray-300">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-gray-300">
                  Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write full blog article here..."
                  className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white outline-none focus:border-red-700 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white hover:bg-white hover:text-black text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-700 hover:bg-red-700 text-white text-xs font-bold uppercase cursor-pointer"
                >
                  {submitting
                    ? "Saving..."
                    : editingBlogId
                      ? "Update Blog"
                      : "Publish Blog"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
