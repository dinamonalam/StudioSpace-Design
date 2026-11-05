export type StudioCategory =
  | "Photo Studio"
  | "Film Stage"
  | "Podcast Room"
  | "Music Suite"
  | "Art Workshop";

export interface Studio {
  _id: string;
  title: string;
  category: StudioCategory;
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
  reviewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  creatorEmail: string;
  creatorName: string;
  hostEmail: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string;   // HH:mm format, e.g. "10:00"
  endTime: string;     // HH:mm format, e.g. "14:00"
  totalHours: number;
  hourlyRate: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

