import mongoose, { Schema, Document } from "mongoose";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface IBooking extends Document {
  studioId: string;
  studioTitle: string;
  creatorEmail: string;
  creatorName: string;
  hostEmail: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  totalHours: number;
  hourlyRate: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    studioId: {
      type: String,
      required: [true, "Studio ID is required"],
      index: true,
    },
    studioTitle: {
      type: String,
      required: [true, "Studio title is required"],
    },
    creatorEmail: {
      type: String,
      required: [true, "Creator email is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    creatorName: {
      type: String,
      required: [true, "Creator name is required"],
    },
    hostEmail: {
      type: String,
      required: [true, "Host email is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    bookingDate: {
      type: String,
      required: [true, "Booking date is required (YYYY-MM-DD)"],
      index: true,
    },
    startTime: {
      type: String,
      required: [true, "Start time is required (HH:mm)"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required (HH:mm)"],
    },
    totalHours: {
      type: Number,
      required: true,
      min: 1,
    },
    hourlyRate: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// High-speed compound index for Challenge 2 collision detection & schedule queries
BookingSchema.index({ studioId: 1, bookingDate: 1, status: 1 });

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);

