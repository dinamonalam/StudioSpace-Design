import { z } from "zod";

// Password rule: Uppercase, Lowercase, min 6 chars
const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter");

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address format"),
  password: passwordValidation,
  photoUrl: z.string().url("Photo URL must be a valid URL").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address format"),
  password: z.string().min(1, "Password is required"),
});

export const studioSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  category: z.enum(
    ["Photo Studio", "Film Stage", "Podcast Room", "Music Suite", "Art Workshop"],
    {
      errorMap: () => ({
        message: "Category must be one of: Photo Studio, Film Stage, Podcast Room, Music Suite, Art Workshop",
      }),
    }
  ),
  hourlyRate: z.coerce.number().min(1, "Hourly rate must be at least $1"),
  securityDeposit: z.coerce.number().min(0, "Security deposit cannot be negative").default(0),
  maxCapacity: z.coerce.number().min(1, "Capacity must be at least 1 person").default(10),
  location: z.string().min(3, "Location must be at least 3 characters"),
  imageUrl: z.string().url("Cover image URL must be a valid URL"),
  amenities: z.array(z.string()).default([]),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const updateStudioSchema = studioSchema.partial();

export const bookingSchema = z
  .object({
    studioId: z.string().min(1, "Studio ID is required"),
    studioTitle: z.string().optional(),
    hostEmail: z.string().email("Invalid host email").optional(),
    bookingDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Booking date must be in YYYY-MM-DD format"),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:mm format"),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "End time must be in HH:mm format"),
    hourlyRate: z.coerce.number().min(1).optional(),
    totalPrice: z.coerce.number().min(1).optional(),
  })
  .refine(
    (data) => {
      const start = parseInt(data.startTime.split(":")[0], 10);
      const end = parseInt(data.endTime.split(":")[0], 10);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

