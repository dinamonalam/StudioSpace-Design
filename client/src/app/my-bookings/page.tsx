"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Booking, BookingStatus } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  getMyBookings,
  cancelBooking,
  downloadBookingInvoicePdf,
} from "@/services/bookingService";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  Download,
  XCircle,
  FileText,
  Compass,
  AlertTriangle,
  Loader2,
  DollarSign,
  Building,
} from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Failed to load reservations:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;

    try {
      setIsCancelling(true);
      const res = await cancelBooking(bookingToCancel._id);
      if (res.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === bookingToCancel._id ? { ...b, status: "Cancelled" } : b
          )
        );
        toast.success("Reservation cancelled successfully.");
        setBookingToCancel(null);
      } else {
        toast.error(res.error || "Failed to cancel reservation.");
      }
    } catch {
      toast.error("Error cancelling reservation.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDownloadInvoice = (booking: Booking) => {
    try {
      downloadBookingInvoicePdf(booking);
      toast.success(
        `Generated Printable PDF Invoice for #${booking._id.slice(-6).toUpperCase()}!`
      );
    } catch {
      toast.error("Could not generate invoice preview.");
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed":
        return <Badge variant="success">Confirmed Slot</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending Approval</Badge>;
      case "Completed":
        return <Badge variant="primary">Completed Shoot</Badge>;
      case "Cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-1">
                Production Schedule
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
                My Studio Reservations
              </h1>
              <p className="text-xs sm:text-sm text-[#858A90] mt-1">
                Track your reserved workspace sessions, generate official PDF receipts, and manage upcoming shoot hours.
              </p>
            </div>

            <Link href="/studios">
              <Button variant="outline" size="md" className="gap-2 font-medium">
                <Compass className="w-4 h-4" />
                <span>Explore More Studios</span>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl bg-[#24272B] border border-[#32363C] p-6 space-y-3 animate-pulse"
                >
                  <div className="h-5 bg-[#32363C] rounded w-1/3" />
                  <div className="h-4 bg-[#32363C] rounded w-1/2" />
                  <div className="h-10 bg-[#17191C] rounded" />
                </div>
              ))}
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="rounded-2xl bg-[#24272B] border border-[#32363C] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl hover:border-white/10 transition-all duration-200"
                >
                  {/* Left: Studio details and timing */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-xl font-bold text-[#F5F0E8]">
                        {booking.studioTitle}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#858A90]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#E7A65A]" />
                        <span>{booking.bookingDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#E7A65A]" />
                        <span>
                          {booking.startTime} – {booking.endTime} ({booking.totalHours} hrs)
                        </span>
                      </div>
                      <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#17191C] border border-white/5 text-[#858A90]">
                        REF: #{booking._id.slice(-6).toUpperCase()}
                      </div>
                    </div>

                    <div className="text-xs text-[#858A90]">
                      <span>Host contact: </span>
                      <span className="text-[#F5F0E8] font-medium">{booking.hostEmail}</span>
                    </div>
                  </div>

                  {/* Right: Pricing and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center md:items-end lg:items-center gap-4 justify-between md:justify-end border-t md:border-t-0 border-[#32363C] pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-[#858A90] block">Total Amount</span>
                      <span className="font-serif text-2xl font-bold text-[#E7A65A]">
                        ${booking.totalPrice}
                      </span>
                      <span className="text-[11px] text-[#858A90] block">
                        (${booking.hourlyRate}/hr + deposit)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* PDF Invoice Generator (Optional Requirement) */}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDownloadInvoice(booking)}
                        className="gap-1.5 text-xs font-semibold"
                        title="Download official PDF receipt"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Invoice</span>
                      </Button>

                      {/* Cancel Reservation */}
                      {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setBookingToCancel(booking)}
                          className="gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel Slot</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 px-4 rounded-3xl bg-[#24272B] border border-[#32363C]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E7A65A]/10 border border-[#E7A65A]/30 flex items-center justify-center text-[#E7A65A]">
                <Calendar className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-2">
                No Workspace Reservations Yet
              </h2>
              <p className="text-sm text-[#858A90] max-w-md mx-auto mb-6">
                You haven&apos;t booked any sound stages, daylight cyc walls, or music suites yet. Explore top spaces to schedule your next production.
              </p>
              <Link href="/studios">
                <Button variant="primary" size="md" className="gap-2 font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Explore All Studios</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Custom Confirmation Modal Dialog for Cancellation (No browser alert) */}
        {bookingToCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-3xl bg-[#24272B] border border-[#32363C] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-1.5">
                  Cancel Reservation?
                </h3>
                <p className="text-xs sm:text-sm text-[#858A90] leading-relaxed">
                  Are you sure you want to cancel your shoot slot at{" "}
                  <strong className="text-[#F5F0E8]">
                    &quot;{bookingToCancel.studioTitle}&quot;
                  </strong>{" "}
                  on {bookingToCancel.bookingDate} ({bookingToCancel.startTime} – {bookingToCancel.endTime})? The reserved time will be returned to the public marketplace.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setBookingToCancel(null)}
                  disabled={isCancelling}
                >
                  Keep Reservation
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConfirmCancel}
                  disabled={isCancelling}
                  className="bg-rose-600 hover:bg-rose-500 text-white border-transparent gap-2 font-semibold"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Confirm Cancellation</span>
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
