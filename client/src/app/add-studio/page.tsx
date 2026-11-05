"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { createStudio, uploadImageToImgBB } from "@/services/studioService";
import { toast } from "sonner";
import {
  Building2,
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  UploadCloud,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

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

export default function AddStudioPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Photo Studio");
  const [hourlyRate, setHourlyRate] = useState("95");
  const [securityDeposit, setSecurityDeposit] = useState("150");
  const [maxCapacity, setMaxCapacity] = useState("15");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
  );
  const [description, setDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "Corner Infinity Cyc Wall",
    "High-Speed Fiber WiFi",
    "Hair & Makeup Vanity",
  ]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      toast.info("Uploading image to ImgBB CDN...");
      const uploadedUrl = await uploadImageToImgBB(file);
      setImageUrl(uploadedUrl);
      toast.success("Studio cover image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image. Please paste an image URL directly.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !imageUrl.trim() || !description.trim()) {
      toast.error("Please fill in all required studio listing fields.");
      return;
    }

    if (Number(hourlyRate) < 1) {
      toast.error("Hourly rate must be at least $1/hour.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createStudio({
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
        toast.success(`Studio "${title}" listed successfully on StudioSpace!`);
        router.push("/my-listings");
      } else {
        toast.error(res.error || "Failed to publish listing.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-2">
              Host Workspace Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
              List a New Production Studio
            </h1>
            <p className="text-sm text-[#858A90] mt-1.5">
              Share your creative facility with vetted directors, photographers, and audio engineers.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-[#24272B] border border-[#32363C] shadow-2xl space-y-8"
          >
            {/* Host Verified Info */}
            <div className="p-4 rounded-2xl bg-[#17191C]/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#858A90]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E7A65A]" />
                <span>
                  <strong className="text-[#F5F0E8]">Host Identity:</strong>{" "}
                  {user?.name || "Marcus Vance"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#F5F0E8]">Contact Email:</span>{" "}
                {user?.email || "host@studiospace.io"} (Read-only)
              </div>
            </div>

            {/* Section 1: Basic Specifications */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#F5F0E8] border-b border-[#32363C] pb-2">
                Studio Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Studio Title *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Apex Sound Stage & Virtual LED Suite"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] placeholder:text-[#858A90]/50 focus:outline-none focus:border-[#E7A65A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Studio Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A] transition-colors"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Hourly Rate ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                    <input
                      type="number"
                      required
                      min="1"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Security Deposit ($)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                    <input
                      type="number"
                      min="0"
                      value={securityDeposit}
                      onChange={(e) => setSecurityDeposit(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Max Capacity (Guests) *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                    <input
                      type="number"
                      required
                      min="1"
                      value={maxCapacity}
                      onChange={(e) => setMaxCapacity(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                  Facility Address / Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. 424 Broadway, SoHo Arts District, New York, NY"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] placeholder:text-[#858A90]/50 focus:outline-none focus:border-[#E7A65A] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: ImgBB Image Upload & Visual Media */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#F5F0E8] border-b border-[#32363C] pb-2">
                Visual Media & Photography
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <div>
                  <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                    Cover Image URL *
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-[#858A90]" />
                    <input
                      type="url"
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] focus:outline-none focus:border-[#E7A65A] transition-colors"
                    />
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                      Or Upload via ImgBB CDN
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#32363C] hover:border-[#E7A65A] rounded-xl cursor-pointer bg-[#17191C]/50 transition-colors">
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 text-[#E7A65A] animate-spin" />
                          <span className="text-xs text-[#E7A65A]">Uploading to ImgBB...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4 text-[#858A90]" />
                          <span className="text-xs text-[#858A90]">Select Studio Photo File</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Cover Image Preview */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#32363C] bg-[#17191C]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Studio Preview"
                      fill
                      sizes="50vw"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#858A90]">
                      <ImageIcon className="w-8 h-8 mb-2 stroke-1" />
                      <span className="text-xs">No image preview</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Amenities */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#32363C] pb-2">
                <h2 className="font-serif text-xl font-bold text-[#F5F0E8]">
                  Production Amenities & Equipment
                </h2>
                <span className="text-xs text-[#858A90]">
                  {selectedAmenities.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        isChecked
                          ? "bg-[#E7A65A]/15 border-[#E7A65A] text-[#F5F0E8]"
                          : "bg-[#17191C] border-[#32363C] text-[#858A90] hover:border-white/20"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isChecked ? "text-[#E7A65A]" : "text-[#858A90]/40"
                        }`}
                      />
                      <span className="line-clamp-1">{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 4: Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#F5F0E8] border-b border-[#32363C] pb-2">
                Detailed Overview & Rules
              </h2>
              <div>
                <label className="block text-xs font-semibold text-[#858A90] uppercase tracking-wider mb-2">
                  Studio Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your studio's acoustic qualities, natural light, shooting dimensions, gear inventory, and load-in specifications..."
                  className="w-full px-4 py-3 rounded-xl bg-[#17191C] border border-[#32363C] text-sm text-[#F5F0E8] placeholder:text-[#858A90]/50 focus:outline-none focus:border-[#E7A65A] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-[#32363C]">
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
                className="w-full sm:w-auto gap-2 font-semibold shadow-lg shadow-[#E7A65A]/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Listing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Studio Listing</span>
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
