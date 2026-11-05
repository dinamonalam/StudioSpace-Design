import mongoose, { Schema, Document } from "mongoose";

export interface IStudio extends Document {
  title: string;
  category: "Photo Studio" | "Film Stage" | "Podcast Room" | "Music Suite" | "Art Workshop";
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  description: string;
  ownerName: string;
  ownerEmail: string;
  rating: number;
  reviewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudioSchema = new Schema<IStudio>(
  {
    title: {
      type: String,
      required: [true, "Studio title is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Photo Studio", "Film Stage", "Podcast Room", "Music Suite", "Art Workshop"],
      index: true,
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
      min: [1, "Hourly rate must be at least $1"],
    },
    securityDeposit: {
      type: Number,
      required: [true, "Security deposit is required"],
      default: 0,
    },
    maxCapacity: {
      type: Number,
      required: [true, "Max capacity is required"],
      min: [1, "Capacity must be at least 1 person"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    amenities: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
    },
    ownerEmail: {
      type: String,
      required: [true, "Owner email is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1.0,
      max: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for category and rating for fast sorting and exploration
StudioSchema.index({ category: 1, rating: -1 });

export const Studio = mongoose.model<IStudio>("Studio", StudioSchema);

