import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Booking, type IBooking } from "../models/Booking.js";
import { Studio } from "../models/Studio.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { bookingSchema } from "../validators/index.js";

const router = Router();

// Fallback in-memory bookings for resilient execution when MongoDB daemon is offline
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sampleDate = tomorrow.toISOString().split("T")[0];

let IN_MEMORY_BOOKINGS: Array<Record<string, any>> = [
  {
    _id: "67295839201948271649299a",
    studioId: "67295839201948271649281a",
    studioTitle: "The Prism Cyclorama & Daylight Loft",
    creatorEmail: "creator@studiospace.io",
    creatorName: "Elena Rostova",
    hostEmail: "host@studiospace.io",
    bookingDate: sampleDate,
    startTime: "12:00",
    endTime: "16:00",
    totalHours: 4,
    hourlyRate: 85,
    totalPrice: 490, // (4 * 85) + 150 deposit
    status: "Confirmed",
    createdAt: new Date("2026-03-01T10:00:00Z"),
    updatedAt: new Date("2026-03-01T10:00:00Z"),
  },
  {
    _id: "67295839201948271649299b",
    studioId: "67295839201948271649281b",
    studioTitle: "Apex Sound Stage & Virtual Production Suite",
    creatorEmail: "creator@studiospace.io",
    creatorName: "Elena Rostova",
    hostEmail: "host@studiospace.io",
    bookingDate: sampleDate,
    startTime: "09:00",
    endTime: "13:00",
    totalHours: 4,
    hourlyRate: 195,
    totalPrice: 1180, // (4 * 195) + 400 deposit
    status: "Pending",
    createdAt: new Date("2026-03-02T14:30:00Z"),
    updatedAt: new Date("2026-03-02T14:30:00Z"),
  },
];

function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// -----------------------------------------------------------------------------
// GET /api/bookings/my-bookings
// Protected (requireAuth): Return reservations for the current authenticated user
// -----------------------------------------------------------------------------
router.get("/my-bookings", requireAuth, async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected()) {
      const bookings = await Booking.find({
        $or: [{ creatorEmail: userEmail }, { hostEmail: userEmail }],
      }).sort({ createdAt: -1 });

      res.json({
        success: true,
        count: bookings.length,
        bookings,
      });
      return;
    }

    const bookings = IN_MEMORY_BOOKINGS.filter(
      (b) =>
        b.creatorEmail.toLowerCase() === userEmail ||
        b.hostEmail.toLowerCase() === userEmail
    ).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve your reservations.",
    });
  }
});

// -----------------------------------------------------------------------------
// POST /api/bookings
// Protected (requireAuth): Create reservation with Double-Booking Collision Prevention (Challenge 2)
// Enforces reading verified creatorName and creatorEmail from session (Req 9)
// Overlap condition: existing.startTime < requested.endTime AND existing.endTime > requested.startTime
// -----------------------------------------------------------------------------
router.post("/", requireAuth, validateBody(bookingSchema), async (req: Request, res: Response) => {
  try {
    const { studioId, studioTitle, hostEmail, bookingDate, startTime, endTime, hourlyRate, totalPrice } =
      req.body;

    if (!studioId || !bookingDate || !startTime || !endTime) {
      res.status(400).json({
        success: false,
        error: "Studio ID, booking date, start time, and end time are required.",
      });
      return;
    }

    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);

    if (isNaN(startHour) || isNaN(endHour) || endHour <= startHour) {
      res.status(400).json({
        success: false,
        error: "Invalid reservation time window: End time must be after start time.",
      });
      return;
    }

    const totalHours = endHour - startHour;

    // Verified creator identity from HTTPOnly JWT session
    const creatorEmail = req.user?.email?.toLowerCase().trim();
    const creatorName = req.user?.name || "Verified Creator";

    // -------------------------------------------------------------------------
    // Challenge 2: Double-Booking Collision Detection
    // -------------------------------------------------------------------------
    if (isMongoConnected()) {
      const collision = await Booking.findOne({
        studioId,
        bookingDate,
        status: { $in: ["Confirmed", "Pending"] },
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      });

      if (collision) {
        res.status(409).json({
          success: false,
          error: `Time Collision: This studio is already booked on ${bookingDate} between ${collision.startTime} and ${collision.endTime}. Please select another time slot.`,
        });
        return;
      }

      const booking = new Booking({
        studioId,
        studioTitle: studioTitle || "StudioSpace Production Facility",
        creatorEmail,
        creatorName,
        hostEmail: hostEmail ? hostEmail.toLowerCase().trim() : "host@studiospace.io",
        bookingDate,
        startTime,
        endTime,
        totalHours,
        hourlyRate: Number(hourlyRate || 85),
        totalPrice: Number(totalPrice || totalHours * 85),
        status: "Confirmed",
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Studio reserved successfully! Confirmation generated.",
        booking,
      });
      return;
    }

    // In-Memory collision detection fallback
    const collision = IN_MEMORY_BOOKINGS.find(
      (b) =>
        b.studioId === studioId &&
        b.bookingDate === bookingDate &&
        ["Confirmed", "Pending"].includes(b.status) &&
        b.startTime < endTime &&
        b.endTime > startTime
    );

    if (collision) {
      res.status(409).json({
        success: false,
        error: `Time Collision: This studio is already booked on ${bookingDate} between ${collision.startTime} and ${collision.endTime}. Please select another time slot.`,
      });
      return;
    }

    const mockId = new mongoose.Types.ObjectId().toString();
    const inMemoryBooking = {
      _id: mockId,
      studioId,
      studioTitle: studioTitle || "StudioSpace Production Facility",
      creatorEmail,
      creatorName,
      hostEmail: hostEmail ? hostEmail.toLowerCase().trim() : "host@studiospace.io",
      bookingDate,
      startTime,
      endTime,
      totalHours,
      hourlyRate: Number(hourlyRate || 85),
      totalPrice: Number(totalPrice || totalHours * 85),
      status: "Confirmed",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    IN_MEMORY_BOOKINGS.unshift(inMemoryBooking);

    res.status(201).json({
      success: true,
      message: "Studio reserved successfully! Confirmation generated.",
      booking: inMemoryBooking,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process studio reservation.",
    });
  }
});

// -----------------------------------------------------------------------------
// PATCH /api/bookings/:id/cancel
// Protected (requireAuth): Cancel pending or confirmed reservation
// -----------------------------------------------------------------------------
router.patch("/:id/cancel", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const booking = await Booking.findById(id);
      if (!booking) {
        res.status(404).json({
          success: false,
          error: "Reservation not found.",
        });
        return;
      }

      if (
        booking.creatorEmail.toLowerCase() !== userEmail &&
        booking.hostEmail.toLowerCase() !== userEmail
      ) {
        res.status(403).json({
          success: false,
          error: "Forbidden: You are not authorized to cancel this booking.",
        });
        return;
      }

      booking.status = "Cancelled";
      await booking.save();

      res.json({
        success: true,
        message: "Reservation cancelled successfully.",
        booking,
      });
      return;
    }

    // In-memory cancellation
    const booking = IN_MEMORY_BOOKINGS.find((b) => String(b._id) === id);
    if (!booking) {
      res.status(404).json({
        success: false,
        error: "Reservation not found.",
      });
      return;
    }

    if (
      booking.creatorEmail.toLowerCase() !== userEmail &&
      booking.hostEmail.toLowerCase() !== userEmail
    ) {
      res.status(403).json({
        success: false,
        error: "Forbidden: You are not authorized to cancel this booking.",
      });
      return;
    }

    booking.status = "Cancelled";
    booking.updatedAt = new Date();

    res.json({
      success: true,
      message: "Reservation cancelled successfully.",
      booking,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to cancel reservation.",
    });
  }
});

export default router;

