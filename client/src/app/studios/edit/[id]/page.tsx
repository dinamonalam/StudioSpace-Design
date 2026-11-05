"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { getStudioById, updateStudio } from "@/services/studioService";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Save,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Photo Studio",
  "Film Stage",
  "Podcast Room",
  "Music Suite",
  "Art Workshop",
];

const AVAILABLE_AMENITIES = [
  "Corner Infinity Cyc Wall",
  "Motorized Lighting Grid",
  "Acoustic Soundproofing (NC-20)",
  "4K Cinema Cameras",
  "Dolby Atmos Monitoring",
  "High-Speed Fiber WiFi",
  "Hair & Makeup Vanity",
  "Drive-In Loading Dock",
  "Camlock 3-Phase Power",
  "Air Conditioning & HVAC",
  "Acoustic Vocal Booth",
  "Green Screen Curtain",
];

export default function EditStudioPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Photo Studio");
  const [hourlyRate, setHourlyRate] = useState("95");
  const [securityDeposit, setSecurityDeposit] = useState("150");
  const [maxCapacity, setMaxCapacity] = useState("15");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");

  useEffect(() => {
    async function loadStudioData() {
      try {
        setLoading(true);
        const data = await getStudioById(id);
        if (data) {
          setTitle(data.title || "");
          setCategory(data.category || "Photo Studio");
          setHourlyRate(String(data.hourlyRate || 95));
          setSecurityDeposit(String(data.securityDeposit || 0));
          setMaxCapacity(String(data.maxCapacity || 10));
          setLocation(data.location || "");
          setImageUrl(data.imageUrl || "");
          setDescription(data.description || "");
          setSelectedAmenities(data.amenities || []);
          setHostName(data.ownerName || "Host");
          setHostEmail(data.ownerEmail || "");
        } else {
          toast.error("Studio not found.");
          router.push("/my-listings");
        }
      } catch (err) {
        console.error("Failed to load studio:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadStudioData();
    }
  }, [id, router]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !imageUrl.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await updateStudio(id, {
        title: title.trim(),
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit || 0),
        maxCapacity: Number(maxCapacity || 10),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        amenities: selectedAmenities,
        description: description.trim(),
      });

      if (res.success) {
        toast.success(`Studio "${title}" updated successfully!`);
        router.push("/my-listings");
      } else {
        toast.error(res.error || "Failed to update studio listing.");
      }
    } catch {
      toast.error("Error updating studio listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C5A66A] animate-spin" />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F4F0E5] dark:bg-[#123C32] text-[#123C32] dark:text-[#F4F0E5] py-14 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 hover:text-[#C5A66A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Listings</span>
          </Link>

          <div className="mb-8">
            <span className="text-xs uppercase font-bold text-[#C5A66A] tracking-wider block mb-1">
              Host Facility Editor
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123C32] dark:text-[#F4F0E5]">
              Update Studio Listing
            </h1>
            <p className="text-sm text-[#123C32]/75 dark:text-[#F4F0E5]/75 mt-1">
              Keep your pricing, gear inventory, and amenities current for production teams.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1A4D41] border border-[#123C32]/10 dark:border-white/10 shadow-sm space-y-8"
          >
            {/* Host Read-Only Info */}
            <div className="p-4 rounded-2xl bg-[#F4F0E5]/70 dark:bg-[#123C32]/60 border border-[#123C32]/10 dark:border-white/10 text-xs text-[#123C32]/70 dark:text-[#F4F0E5]/70 flex flex-col sm:flex-row justify-between gap-2">
              <span>
                <strong className="text-[#123C32] dark:text-[#F4F0E5]">Listing Host:</strong> {hostName}
              </span>
              <span>
                <strong className="text-[#123C32] dark:text-[#F4F0E5]">Host Email:</strong> {hostEmail} (Read-only)
              </span>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#123C32] dark:text-[#F4F0E5] border-b border-[#123C32]/10 dark:border-white/10 pb-2">
                Studio Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Studio Title *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Studio Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-[#1A4D41]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Hourly Rate ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="number"
                      required
                      min="1"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Security Deposit ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="number"
                      min="0"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Max Capacity *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="number"
                      required
                      min="1"
                      value={maxCapacity}
                      onChange={(e) => setMaxCapacity(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                  Facility Address / Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#123C32] dark:text-[#F4F0E5] border-b border-[#123C32]/10 dark:border-white/10 pb-2">
                Cover Photography
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <div>
                  <label className="block text-xs font-semibold text-[#123C32]/70 dark:text-[#F4F0E5]/70 uppercase tracking-wider mb-2">
                    Cover Image URL *
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-[#123C32]/50 dark:text-[#F4F0E5]/50" />
                    <input
                      type="url"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors"
                    />
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#123C32]/10 dark:border-white/10 bg-[#F4F0E5]/40 dark:bg-[#123C32]/40 shadow-sm">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                      unoptimized
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#123C32] dark:text-[#F4F0E5] border-b border-[#123C32]/10 dark:border-white/10 pb-2">
                Amenities & Equipment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        isChecked
                          ? "bg-[#C5A66A]/20 border-[#C5A66A] text-[#123C32] dark:text-[#F4F0E5]"
                          : "bg-[#F4F0E5]/40 dark:bg-[#123C32]/40 border-[#123C32]/10 dark:border-white/10 text-[#123C32]/70 dark:text-[#F4F0E5]/70 hover:border-[#C5A66A]"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isChecked ? "text-[#C5A66A]" : "text-[#123C32]/30 dark:text-[#F4F0E5]/30"
                        }`}
                      />
                      <span className="line-clamp-1">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#123C32] dark:text-[#F4F0E5] border-b border-[#123C32]/10 dark:border-white/10 pb-2">
                Overview & Description
              </h2>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F4F0E5]/60 dark:bg-[#123C32]/50 border border-[#123C32]/15 dark:border-white/15 text-sm text-[#123C32] dark:text-[#F4F0E5] focus:outline-none focus:border-[#C5A66A] transition-colors resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-4 border-t border-[#123C32]/10 dark:border-white/10">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => router.push("/my-listings")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="gap-2 font-semibold shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Listing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
