"use client";

import { AlertTriangle, MapPin, PlusCircle, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/shared/loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function UserParcelsPage() {
  const [parcels, setParcels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Delete/Cancel Modal State (Shadcn AlertDialog)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    parcelId: string | null;
    trackingId: string;
  }>({
    isOpen: false,
    parcelId: null,
    trackingId: "",
  });

  // Review Modal State
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    parcelId: string | null;
    trackingId: string;
  }>({
    isOpen: false,
    parcelId: null,
    trackingId: "",
  });

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchMyParcels();
  }, [fetchMyParcels]);

  const fetchMyParcels = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/users/my-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to fetch parcels");

      setParcels(result.data);
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Could not fetch your parcels.",
      });
    } finally {
      setLoading(false);
    }
  };

  const executeDeleteParcel = async () => {
    if (!deleteModal.parcelId) return;

    const parcelId = deleteModal.parcelId;
    setDeleteModal({ isOpen: false, parcelId: null, trackingId: "" });

    try {
      setActionLoading(parcelId);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/parcels/${parcelId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete parcel");

      toast.success("Parcel Deleted", {
        description:
          "The shipment has been successfully cancelled and removed.",
      });
      fetchMyParcels();
    } catch (error: any) {
      toast.error("Action Failed", { description: error.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModal.parcelId) return;

    try {
      setSubmittingReview(true);
      const token = localStorage.getItem("accessToken");
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const res = await fetch(`${BACKEND_URL}/api/v1/users/my-reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          parcelId: reviewModal.parcelId,
          rating,
          comment,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to submit review");

      toast.success("Review Submitted", {
        description: "Thank you for your valuable feedback!",
      });
      setReviewModal({ isOpen: false, parcelId: null, trackingId: "" });
      setRating(5);
      setComment("");
      fetchMyParcels();
    } catch (error: any) {
      toast.error("Review Failed", { description: error.message });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/25 rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            My Booked <span className="text-red-700">Parcels</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-gray-300 mt-1">
            View all your shipments, monitor current transit milestones, and
            manage bookings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-100 dark:bg-[#050814] border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-gray-300">
            Total Parcels:{" "}
            <span className="text-red-700">{parcels.length}</span>
          </div>
          <Link href="/create-parcel">
            <Button className="h-10 px-4 text-xs font-bold uppercase bg-red-600 hover:bg-red-700 text-white rounded-2xl cursor-pointer shadow-sm">
              <PlusCircle className="h-4 w-4 mr-1.5" /> Book New
            </Button>
          </Link>
        </div>
      </div>

      {/* Parcels Table / List */}
      <div className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/20 rounded-3xl p-6 shadow-xl overflow-hidden">
        {parcels.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-slate-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
              No parcels booked by you yet.
            </p>
            <Link href="/dashboard/user/create-parcel">
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase font-bold cursor-pointer shadow-sm"
              >
                Book Your First Parcel
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  <th className="py-4 px-4">Tracking ID & Category</th>
                  <th className="py-4 px-4">Receiver Info</th>
                  <th className="py-4 px-4">Delivery Address</th>
                  <th className="py-4 px-4">Status & Payment</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs">
                {parcels.map((p) => {
                  const isPending = p.status === "PENDING";
                  const isDelivered = p.status === "DELIVERED";
                  const hasReviewed = !!p.review;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-mono font-bold text-slate-900 dark:text-white">
                          {p.trackingId}
                        </p>
                        <p className="text-[10px] text-red-700 uppercase font-semibold mt-0.5">
                          {p.category} • {p.weight} kg
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-gray-300">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {p.receiverName}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400">
                          {p.receiverPhone}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-slate-700 dark:text-gray-300 max-w-xs truncate">
                        <p className="flex items-center gap-1 text-[11px]">
                          <MapPin className="h-3 w-3 text-red-700 shrink-0" />{" "}
                          {p.deliveryAddress}
                        </p>
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                            isDelivered
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30"
                              : isPending
                                ? "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-500/30"
                                : "bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-500/30"
                          }`}
                        >
                          {p.status}
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400">
                          Fee: ৳{p.payment?.amount || 0} (
                          {p.payment?.status || "PENDING"})
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link href={`/Track`} target="_blank">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-slate-100 dark:bg-[#050814] border-slate-300 dark:border-white/20 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                          >
                            Track
                          </Button>
                        </Link>

                        {/* Give Review Button for Delivered Parcels */}
                        {isDelivered && !hasReviewed && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setReviewModal({
                                isOpen: true,
                                parcelId: p.id,
                                trackingId: p.trackingId,
                              })
                            }
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-400 hover:bg-amber-500 hover:text-white border border-amber-300 dark:border-amber-500/30 cursor-pointer transition-all"
                          >
                            <Star className="h-3 w-3 mr-1" /> Give Review
                          </Button>
                        )}

                        {hasReviewed && (
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold inline-block px-2">
                            Reviewed ✓
                          </span>
                        )}

                        {isPending && (
                          <Button
                            size="sm"
                            disabled={actionLoading === p.id}
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                parcelId: p.id,
                                trackingId: p.trackingId,
                              })
                            }
                            className="h-7 px-3 text-[10px] font-bold uppercase bg-red-100 dark:bg-red-700/20 text-red-700 hover:bg-red-700 hover:text-white border border-red-300 dark:border-red-700/30 cursor-pointer transition-all"
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shadcn AlertDialog for Cancellation */}
      <AlertDialog
        open={deleteModal.isOpen}
        onOpenChange={(open) =>
          !open && setDeleteModal({ ...deleteModal, isOpen: false })
        }
      >
        <AlertDialogContent className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/30 text-slate-900 dark:text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-700/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center text-red-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Cancel & Delete Parcel
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Are you sure you want to cancel booking for tracking ID{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                {deleteModal.trackingId}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4 border-t border-slate-200 dark:border-white/10 flex gap-2">
            <AlertDialogCancel className="bg-slate-100 hover:bg-slate-200 dark:bg-[#050814] dark:hover:bg-white/10 border-slate-300 dark:border-white/20 text-slate-800 dark:text-white rounded-xl text-xs cursor-pointer">
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDeleteParcel}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
            >
              Yes, Cancel Parcel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Shadcn AlertDialog for Review Submission */}
      <AlertDialog
        open={reviewModal.isOpen}
        onOpenChange={(open) =>
          !open && setReviewModal({ ...reviewModal, isOpen: false })
        }
      >
        <AlertDialogContent className="bg-white dark:bg-[#0b132b] border border-slate-200 dark:border-red-700/30 text-slate-900 dark:text-white rounded-3xl shadow-2xl p-6">
          <AlertDialogHeader className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Star className="h-5 w-5 fill-amber-500 dark:fill-amber-400" />
            </div>
            <AlertDialogTitle className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
              Rate Your Experience
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
              Leave a review and rating for tracking ID{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                {reviewModal.trackingId}
              </span>
              . Your feedback helps us improve.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleReviewSubmit} className="space-y-4 py-2">
            {/* Star Rating Picker */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-300">
                Rating (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Comment Box */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-600 dark:text-gray-300">
                Your Feedback / Comment
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here (min 2 characters)..."
                className="w-full bg-slate-100 dark:bg-[#050814] border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-700 transition-colors resize-none"
              />
            </div>

            <AlertDialogFooter className="pt-4 border-t border-slate-200 dark:border-white/10 flex gap-2">
              <AlertDialogCancel
                type="button"
                className="bg-slate-100 hover:bg-slate-200 dark:bg-[#050814] dark:hover:bg-white/10 border-slate-300 dark:border-white/20 text-slate-800 dark:text-white rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={submittingReview}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
