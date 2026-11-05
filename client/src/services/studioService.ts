import { Studio } from "@/types";
import { FEATURED_STUDIOS } from "@/data/mockStudios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface CreateStudioPayload {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  description: string;
}

/**
 * Upload an image file to ImgBB API with fallback
 */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "c1e84df1a48c1e28509804b4070a7f1a";
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.data?.url) {
      return data.data.url;
    }
  } catch (error) {
    console.warn("ImgBB upload failed, falling back to local object URL:", error);
  }

  // Fallback to local preview URL if network/quota fails
  return URL.createObjectURL(file);
}

/**
 * Fetch studios with filters, search, and sorting
 */
export async function getStudios(params?: {
  search?: string;
  category?: string;
  sort?: string;
  limit?: number;
}): Promise<Studio[]> {
  try {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.category && params.category !== "All")
      query.set("category", params.category);
    if (params?.sort) query.set("sort", params.sort);
    if (params?.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE_URL}/studios?${query.toString()}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.studios)) {
        return data.studios;
      }
    }
  } catch (err) {
    console.warn("Backend fetch failed, using fallback mock studios:", err);
  }

  // Fallback to rich seed mock data
  let fallback = [...FEATURED_STUDIOS];
  if (params?.category && params.category !== "All") {
    fallback = fallback.filter((s) => s.category === params.category);
  }
  if (params?.search) {
    const term = params.search.toLowerCase();
    fallback = fallback.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        s.location.toLowerCase().includes(term)
    );
  }
  if (params?.limit) {
    fallback = fallback.slice(0, params.limit);
  }
  return fallback;
}

/**
 * Fetch a single studio by ID
 */
export async function getStudioById(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/studios/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.studio) {
        return data.studio;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch studio from API, checking fallback:", err);
  }

  return FEATURED_STUDIOS.find((s) => s._id === id) || null;
}

/**
 * Fetch studios owned by the authenticated host
 */
export async function getMyStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/studios/my-listings`, {
      method: "GET",
      credentials: "include", // Transmits HTTPOnly JWT cookie
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.studios)) {
        return data.studios;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch host studios:", err);
  }

  // Return host-matching mock studios if offline
  return FEATURED_STUDIOS.filter((s) => s.ownerEmail === "host@studiospace.io");
}

/**
 * Create a new studio listing
 */
export async function createStudio(
  payload: CreateStudioPayload
): Promise<{ success: boolean; studio?: Studio; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/studios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Transmits HTTPOnly JWT cookie
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || "Failed to list studio." };
    }

    return { success: true, studio: data.studio };
  } catch (err: unknown) {
    const error = err as Error;
    return { success: false, error: error.message || "Network error listing studio." };
  }
}

/**
 * Update an existing studio listing
 */
export async function updateStudio(
  id: string,
  payload: Partial<CreateStudioPayload>
): Promise<{ success: boolean; studio?: Studio; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/studios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Transmits HTTPOnly JWT cookie
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || "Failed to update studio." };
    }

    return { success: true, studio: data.studio };
  } catch (err: unknown) {
    const error = err as Error;
    return { success: false, error: error.message || "Network error updating studio." };
  }
}

/**
 * Delete a studio listing
 */
export async function deleteStudio(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/studios/${id}`, {
      method: "DELETE",
      credentials: "include", // Transmits HTTPOnly JWT cookie
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || "Failed to delete studio." };
    }

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    return { success: false, error: error.message || "Network error deleting studio." };
  }
}

