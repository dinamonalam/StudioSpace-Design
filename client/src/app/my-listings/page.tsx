"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Studio } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getMyStudios, deleteStudio } from "@/services/studioService";
import { toast } from "sonner";
import {
  PlusCircle,
  Edit,
  Trash2,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Loader2,
  Building,
} from "lucide-react";

export default function MyListingsPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [studioToDelete, setStudioToDelete] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function loadListings() {
      try {
        setLoading(true);
        const data = await getMyStudios();
        setStudios(data);
      } catch (err) {
        console.error("Failed to load listings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadListings();
  }, []);

  const handleConfirmDelete = async () => {
    if (!studioToDelete) return;

    try {
      setIsDeleting(true);
      const res = await deleteStudio(studioToDelete._id);
      if (res.success) {
        setStudios((prev) => prev.filter((s) => s._id !== studioToDelete._id));
        toast.success(`Studio "${studioToDelete.title}" removed successfully!`);
        setStudioToDelete(null);
      } else {
        toast.error(res.error || "Failed to delete studio listing.");
      }
    } catch {
      toast.error("Error deleting studio listing.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] py-14 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-bold text-[#C5A66A] tracking-wider block mb-1">
                Host Management
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
                My Studio Listings
              </h1>
              <p className="text-xs sm:text-sm text-[#123C32]/70 dark:text-[#F4F0E5]/70 mt-1">
                Manage your active production facilities, update specs, and monitor listings.
              </p>
            </div>
            <Link href="/add-studio">
              <Button variant="primary" size="md" className="gap-2 font-semibold">
                <PlusCircle className="w-4 h-4" />
                <span>Add New Studio</span>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 p-4 space-y-4 animate-pulse shadow-sm"
                >
                  <div className="aspect-[16/9] bg-[#123C32]/10 dark:bg-white/10 rounded-xl" />
                  <div className="h-5 bg-[#123C32]/10 dark:bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-[#123C32]/10 dark:bg-white/10 rounded w-1/2" />
                  <div className="h-10 bg-[#123C32]/10 dark:bg-white/10 rounded" />
                </div>
              ))}
            </div>
          ) : studios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studios.map((studio) => (
                <div
                  key={studio._id}
                  className="rounded-2xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-[#C5A66A]/60 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/9] w-full bg-[#F4F0E5]/40 dark:bg-[#123C32]/40">
                      <Image
                        src={studio.imageUrl}
                        alt={studio.title}
                        fill
                        sizes="33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary">{studio.category}</Badge>
                      </div>
                      <div className="absolute top-3 right-3 bg-[#123C32]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#F4F0E5] border border-white/10">
                        ${studio.hourlyRate}/hr
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-[#123C32] dark:text-[#F4F0E5] line-clamp-1 mb-1">
                        {studio.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A66A] shrink-0" />
                        <span className="line-clamp-1">{studio.location}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F4F0E5]/70 dark:bg-[#123C32]/60 text-xs mb-4 border border-[#123C32]/10 dark:border-white/10">
                        <div>
                          <span className="text-[#123C32]/60 dark:text-[#F4F0E5]/60 block">Capacity:</span>
                          <span className="font-semibold text-[#123C32] dark:text-[#F4F0E5]">
                            Up to {studio.maxCapacity} people
                          </span>
                        </div>
                        <div>
                          <span className="text-[#123C32]/60 dark:text-[#F4F0E5]/60 block">Deposit:</span>
                          <span className="font-semibold text-[#123C32] dark:text-[#F4F0E5]">
                            ${studio.securityDeposit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-[#123C32]/10 dark:border-white/10 mt-2">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="p-2 text-[#123C32]/60 dark:text-[#F4F0E5]/60 hover:text-[#C5A66A] hover:bg-[#F4F0E5] dark:hover:bg-[#123C32] rounded-lg transition-colors"
                      title="View Public Listing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <Link href={`/studios/edit/${studio._id}`}>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="gap-1.5 text-xs font-medium"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStudioToDelete(studio)}
                        className="gap-1.5 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#C5A66A]/10 border border-[#C5A66A]/30 flex items-center justify-center text-[#C5A66A]">
                <Building className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#123C32] dark:text-[#F4F0E5] mb-2">
                No Workspace Listings Yet
              </h2>
              <p className="text-sm text-[#123C32]/70 dark:text-[#F4F0E5]/70 max-w-md mx-auto mb-6">
                You haven&apos;t listed any studios or creative sound stages yet. Start monetizing your space today!
              </p>
              <Link href="/add-studio">
                <Button variant="primary" size="md" className="gap-2 font-semibold">
                  <PlusCircle className="w-4 h-4" />
                  <span>List Your First Studio</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Custom Confirmation Modal Dialog (No browser alert) */}
        {studioToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#123C32] dark:text-[#F4F0E5] mb-1.5">
                  Confirm Listing Deletion
                </h3>
                <p className="text-xs sm:text-sm text-[#123C32]/70 dark:text-[#F4F0E5]/70 leading-relaxed">
                  Are you sure you want to remove{" "}
                  <strong className="text-[#123C32] dark:text-[#F4F0E5]">
                    &quot;{studioToDelete.title}&quot;
                  </strong>{" "}
                  from StudioSpace? All dynamic slot availability and listing data will be permanently deleted.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStudioToDelete(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="bg-rose-600 hover:bg-rose-700 text-white border-transparent gap-2 font-semibold"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Permanently Delete</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
