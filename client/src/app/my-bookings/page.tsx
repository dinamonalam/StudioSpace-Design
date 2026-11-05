"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Booking, BookingStatus } from "@/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  XCircle,
  FileText,
  Compass,
} from "lucide-react";

const INITIAL_BOOKINGS: Booking[] = [
  {
    _id: "bk-101",
    studioId: "studio-1",
    studioTitle: "The Prism Cyclorama & Daylight Loft",
    creatorEmail: "creator@studiospace.io",
    creatorName: "Elena Rostova",
    hostEmail: "elena@prismstudios.com",
    bookingDate: "2026-11-12",
    startTime: "10:00",
    endTime: "14:00",
    totalHours: 4,
    hourlyRate: 85,
    totalPrice: 490,
    status: "Pending",
  },
  {
    _id: "bk-102",
    studioId: "studio-2",
    studioTitle: "Apex Sound Stage & Virtual Production Suite",
    creatorEmail: "creator@studiospace.io",
    creatorName: "Elena Rostova",
    hostEmail: "marcus@apexstages.la",
    bookingDate: "2026-11-20",
    startTime: "08:00",
    endTime: "16:00",
    totalHours: 8,
    hourlyRate: 195,
    totalPrice: 1960,
    status: "Confirmed",
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === bookingId ? { ...b, status: "Cancelled" as BookingStatus } : b
      )
    );
    toast.success("Booking was successfully cancelled.");
  };

  const handleDownloadInvoice = (booking: Booking) => {
    toast.success(`Generated PDF Invoice for Booking #${booking._id}!`);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed":
        return <Badge variant="success">Confirmed</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending Approval</Badge>;
      case "Completed":
        return <Badge variant="primary">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#17191C] text-[#F5F0E8] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs uppercase font-semibold text-[#E7A65A] tracking-widest block mb-1">
            Production Schedule
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F0E8]">
            My Studio Bookings
          </h1>
          <p className="text-xs sm:text-sm text-[#858A90] mt-1">
            Track your reserved workspace sessions, download invoices, and manage upcoming shoot hours.
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-6 rounded-2xl bg-[#24272B] border border-[#32363C] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(booking.status)}
                    <span className="text-xs text-[#858A90]">
                      Booking ID: #{booking._id}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#F5F0E8]">
                    {booking.studioTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#858A90]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#E7A65A]" />
                      <span>{booking.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#E7A65A]" />
                      <span>
                        {booking.startTime} - {booking.endTime} ({booking.totalHours} hrs)
                      </span>
                    </div>
                    <div className="font-bold text-[#E7A65A]">
                      Total: ${booking.totalPrice}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {booking.status === "Confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(booking)}
                      className="gap-1.5 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Invoice</span>
                    </Button>
                  )}

                  {booking.status === "Pending" && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancelBooking(booking._id)}
                      className="gap-1.5 text-xs"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Booking</span>
                    </Button>
                  )}

                  <Link href={`/studios/${booking.studioId}`}>
                    <Button variant="secondary" size="sm" className="text-xs">
                      View Studio
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-[#24272B] border border-[#32363C] p-8">
            <Calendar className="w-10 h-10 text-[#858A90] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-xl font-bold text-[#F5F0E8] mb-2">
              No Studio Bookings Found
            </h3>
            <p className="text-xs text-[#858A90] mb-6">
              You haven't reserved any creative workspaces yet. Explore verified daylight lofts and sound stages.
            </p>
            <Link href="/studios">
              <Button variant="primary" size="md">
                <Compass className="w-4 h-4 mr-2" />
                Explore Studios
              </Button>
            </Link>
          </div>
        )}
      </div>
      </div>
    </ProtectedRoute>
  );
}

