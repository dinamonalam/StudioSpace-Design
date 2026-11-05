import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Wishlist } from "../models/Wishlist.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Fallback in-memory wishlist cache when MongoDB daemon is offline
let IN_MEMORY_WISHLISTS: Array<{ userEmail: string; studioId: string }> = [];

function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// -----------------------------------------------------------------------------
// GET /api/wishlists
// Protected (requireAuth): Return array of studio IDs wishlisted by current user
// -----------------------------------------------------------------------------
router.get("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected()) {
      const items = await Wishlist.find({ userEmail });
      const studioIds = items.map((item) => item.studioId);
      res.json({
        success: true,
        studioIds,
      });
      return;
    }

    const items = IN_MEMORY_WISHLISTS.filter(
      (w) => w.userEmail.toLowerCase() === userEmail
    );
    res.json({
      success: true,
      studioIds: items.map((w) => w.studioId),
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve wishlist items.",
    });
  }
});

// -----------------------------------------------------------------------------
// POST /api/wishlists/:studioId
// Protected (requireAuth): Toggle wishlist state for studio
// -----------------------------------------------------------------------------
router.post("/:studioId", requireAuth, async (req: Request, res: Response) => {
  try {
    const { studioId } = req.params;
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (!studioId) {
      res.status(400).json({
        success: false,
        error: "Studio ID is required to update wishlist.",
      });
      return;
    }

    if (isMongoConnected()) {
      const existing = await Wishlist.findOne({ userEmail, studioId });

      if (existing) {
        await Wishlist.deleteOne({ _id: existing._id });
        res.json({
          success: true,
          isWishlisted: false,
          message: "Removed studio from your wishlist.",
        });
        return;
      }

      await Wishlist.create({ userEmail, studioId });
      res.json({
        success: true,
        isWishlisted: true,
        message: "Saved studio to your wishlist.",
      });
      return;
    }

    // In-memory toggle fallback
    const index = IN_MEMORY_WISHLISTS.findIndex(
      (w) => w.userEmail.toLowerCase() === userEmail && w.studioId === studioId
    );

    if (index !== -1) {
      IN_MEMORY_WISHLISTS.splice(index, 1);
      res.json({
        success: true,
        isWishlisted: false,
        message: "Removed studio from your wishlist.",
      });
      return;
    }

    IN_MEMORY_WISHLISTS.push({ userEmail: userEmail || "", studioId });
    res.json({
      success: true,
      isWishlisted: true,
      message: "Saved studio to your wishlist.",
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to update wishlist.",
    });
  }
});

export default router;

