import mongoose, { Schema, Document } from "mongoose";

export interface IWishlist extends Document {
  userEmail: string;
  studioId: string;
  createdAt: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    studioId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index ensuring a user can only favorite a studio once
WishlistSchema.index({ userEmail: 1, studioId: 1 }, { unique: true });

export const Wishlist = mongoose.model<IWishlist>("Wishlist", WishlistSchema);

