import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Studio, type IStudio } from "../models/Studio.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Fallback in-memory studios for resilient execution when MongoDB daemon is offline
let IN_MEMORY_STUDIOS: Array<Record<string, any>> = [
  {
    _id: "67295839201948271649281a",
    title: "The Prism Cyclorama & Daylight Loft",
    category: "Photo Studio",
    hourlyRate: 85,
    securityDeposit: 150,
    maxCapacity: 15,
    location: "SoHo Arts District, New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Corner Infinity Cyc Wall", "Profoto Lighting Grid", "North-Facing Skylights", "Hair & Makeup Vanity", "High-Speed WiFi", "Freight Elevator"],
    description: "A 2,400 sq.ft sunlit photography studio boasting a 3-wall curved seamless cyclorama, double-height ceilings, and full black-out motorized curtains.",
    ownerName: "Marcus Vance",
    ownerEmail: "host@studiospace.io",
    rating: 4.96,
    reviewsCount: 38,
    createdAt: new Date("2026-01-15T10:00:00Z"),
    updatedAt: new Date("2026-01-15T10:00:00Z"),
  },
  {
    _id: "67295839201948271649281b",
    title: "Apex Sound Stage & Virtual Production Suite",
    category: "Film Stage",
    hourlyRate: 195,
    securityDeposit: 400,
    maxCapacity: 40,
    location: "Culver City Arts Corridor, Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Ultra-Quiet Soundproofing (NC-20)", "Motorized Lighting Grid", "3-Phase 400A Camlock Power", "Green Screen Curtain", "Production Green Room", "Drive-in Loading Bay"],
    description: "Engineered specifically for feature films, music videos, and commercial shoots. Fully isolated acoustic acoustics with camlock power distribution.",
    ownerName: "Marcus Vance",
    ownerEmail: "host@studiospace.io",
    rating: 4.98,
    reviewsCount: 52,
    createdAt: new Date("2026-01-20T11:00:00Z"),
    updatedAt: new Date("2026-01-20T11:00:00Z"),
  },
  {
    _id: "67295839201948271649281c",
    title: "The Broadcast Room — 4-Mic 4K Podcast Lounge",
    category: "Podcast Room",
    hourlyRate: 65,
    securityDeposit: 100,
    maxCapacity: 8,
    location: "West Loop, Chicago, IL",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
    amenities: ["4x Shure SM7B Microphones", "RØDECaster Pro II Console", "3x Sony FX3 4K Cinema Cameras", "Acoustic Wood Slats & Ambient LED", "Live Streaming Bridge", "Podcast Table & Lounge Chairs"],
    description: "Turnkey multi-camera podcast recording lounge with warm mid-century modern aesthetic, RGB accent lighting, and automated multi-track recording.",
    ownerName: "Sarah Jenkins",
    ownerEmail: "sarah@broadcastchicago.com",
    rating: 4.92,
    reviewsCount: 29,
    createdAt: new Date("2026-02-01T14:00:00Z"),
    updatedAt: new Date("2026-02-01T14:00:00Z"),
  },
  {
    _id: "67295839201948271649281d",
    title: "Velvet Analog & Dolby Atmos Mixing Suite",
    category: "Music Suite",
    hourlyRate: 110,
    securityDeposit: 250,
    maxCapacity: 10,
    location: "East Nashville Historic District, Nashville, TN",
    imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Dolby Atmos 7.1.4 Monitoring", "Neve 1073 Preamps", "Steinway Model B Grand Piano", "Vintage Tape Machine", "Acoustic Vocal Isolation Booth", "Custom Modular Synth Rack"],
    description: "Premier tracking and mixing haven featuring world-class acoustic treatment by Walters-Storyk Design Group, tube condenser microphones, and analog outboard mastering hardware.",
    ownerName: "Julian Thorne",
    ownerEmail: "julian@velvetmusic.io",
    rating: 4.97,
    reviewsCount: 44,
    createdAt: new Date("2026-02-10T15:30:00Z"),
    updatedAt: new Date("2026-02-10T15:30:00Z"),
  },
  {
    _id: "67295839201948271649281e",
    title: "Atelier Lumin — Sunlit Ceramic & Painting Studio",
    category: "Art Workshop",
    hourlyRate: 50,
    securityDeposit: 80,
    maxCapacity: 20,
    location: "Pioneer Square, Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Electric Pottery Wheels", "Ventilated Ceramic Kiln", "Heavy-Duty Wooden Workbenches", "Northern Natural Skylights", "Washout Sink Station", "Exhibition Display Walls"],
    description: "Expansive creative atelier surrounded by exposed brick walls, timber beams, and soaring 16ft windows. Ideal for sculpture, printmaking, and fine art workshops.",
    ownerName: "Chloe Dupont",
    ownerEmail: "chloe@atelierlumin.art",
    rating: 4.89,
    reviewsCount: 21,
    createdAt: new Date("2026-02-15T09:00:00Z"),
    updatedAt: new Date("2026-02-15T09:00:00Z"),
  },
  {
    _id: "67295839201948271649281f",
    title: "Industrial Vault — Dark Aesthetic Editorial Studio",
    category: "Photo Studio",
    hourlyRate: 90,
    securityDeposit: 150,
    maxCapacity: 12,
    location: "Wynwood Arts District, Miami, FL",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Raw Concrete Textures", "Haze & Fog Machine Allowed", "RGB Tube Tube Lighting Grid", "Industrial Roll-up Door", "VIP Dressing Suite", "High-End Sound System"],
    description: "Moody, brutalist production loft with distressed concrete walls, architectural steel beams, and versatile spotlight staging for lookbooks and editorial music videos.",
    ownerName: "Marcus Vance",
    ownerEmail: "host@studiospace.io",
    rating: 4.95,
    reviewsCount: 33,
    createdAt: new Date("2026-02-20T13:00:00Z"),
    updatedAt: new Date("2026-02-20T13:00:00Z"),
  },
];

// Helper to determine whether to query MongoDB or Memory Store
function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// -----------------------------------------------------------------------------
// GET /api/studios
// Public: Explore studios with search, category, sort, price, amenities, limit
// -----------------------------------------------------------------------------
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      amenity,
      sort = "newest",
      limit,
      page = "1",
    } = req.query;

    if (isMongoConnected()) {
      const query: Record<string, any> = {};

      if (category && category !== "All") {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { title: { $regex: String(search), $options: "i" } },
          { location: { $regex: String(search), $options: "i" } },
        ];
      }

      if (minPrice || maxPrice) {
        query.hourlyRate = {};
        if (minPrice) query.hourlyRate.$gte = Number(minPrice);
        if (maxPrice) query.hourlyRate.$lte = Number(maxPrice);
      }

      if (amenity) {
        const amenities = Array.isArray(amenity) ? amenity : [amenity];
        query.amenities = { $all: amenities };
      }

      let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
      if (sort === "price_asc") sortOptions = { hourlyRate: 1 };
      if (sort === "price_desc") sortOptions = { hourlyRate: -1 };
      if (sort === "rating_desc") sortOptions = { rating: -1 };

      const pageSize = limit ? Number(limit) : 50;
      const currentPage = Math.max(1, Number(page));
      const skip = (currentPage - 1) * pageSize;

      const total = await Studio.countDocuments(query);
      const studios = await Studio.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

      res.json({
        success: true,
        count: studios.length,
        total,
        page: currentPage,
        studios,
      });
      return;
    }

    // In-memory filter fallback
    let filtered = [...IN_MEMORY_STUDIOS];

    if (category && category !== "All") {
      filtered = filtered.filter((s) => s.category === category);
    }

    if (search) {
      const term = String(search).toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.location.toLowerCase().includes(term)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((s) => s.hourlyRate >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((s) => s.hourlyRate <= Number(maxPrice));
    }

    if (amenity) {
      const amenities = Array.isArray(amenity) ? amenity : [amenity];
      filtered = filtered.filter((s) =>
        amenities.every((a) => s.amenities.includes(a))
      );
    }

    if (sort === "price_asc") {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sort === "price_desc") {
      filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sort === "rating_desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const pageSize = limit ? Number(limit) : 50;
    const paginated = filtered.slice(0, pageSize);

    res.json({
      success: true,
      count: paginated.length,
      total: filtered.length,
      studios: paginated,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch studios.",
    });
  }
});

// -----------------------------------------------------------------------------
// GET /api/my-studios
// Protected: Get listings owned by authenticated host (ownerEmail match)
// -----------------------------------------------------------------------------
router.get("/my-listings", requireAuth, async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected()) {
      const studios = await Studio.find({ ownerEmail: userEmail }).sort({
        createdAt: -1,
      });
      res.json({
        success: true,
        count: studios.length,
        studios,
      });
      return;
    }

    const studios = IN_MEMORY_STUDIOS.filter(
      (s) => s.ownerEmail.toLowerCase() === userEmail
    );
    res.json({
      success: true,
      count: studios.length,
      studios,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch your studio listings.",
    });
  }
});

// -----------------------------------------------------------------------------
// GET /api/studios/:id
// Public: Retrieve single studio by ID
// -----------------------------------------------------------------------------
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const studio = await Studio.findById(id);
      if (!studio) {
        res.status(404).json({
          success: false,
          error: "Studio space not found.",
        });
        return;
      }
      res.json({
        success: true,
        studio,
      });
      return;
    }

    const found = IN_MEMORY_STUDIOS.find((s) => String(s._id) === id);
    if (!found) {
      res.status(404).json({
        success: false,
        error: "Studio space not found.",
      });
      return;
    }

    res.json({
      success: true,
      studio: found,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve studio details.",
    });
  }
});

// -----------------------------------------------------------------------------
// POST /api/studios
// Protected (requireAuth): Create new workspace listing
// Enforces reading verified ownerName and ownerEmail from session (Req 9)
// -----------------------------------------------------------------------------
router.post("/", requireAuth, async (req: Request, res: Response) => {
  try {
    const {
      title,
      category,
      hourlyRate,
      securityDeposit,
      maxCapacity,
      location,
      imageUrl,
      amenities,
      description,
    } = req.body;

    if (!title || !category || !hourlyRate || !location || !imageUrl || !description) {
      res.status(400).json({
        success: false,
        error: "Title, category, hourly rate, location, cover image, and overview are required.",
      });
      return;
    }

    // Read authenticated host info securely from verified JWT session
    const ownerEmail = req.user?.email?.toLowerCase().trim();
    const ownerName = req.user?.name || "Verified Studio Host";

    const newStudioData = {
      title: title.trim(),
      category,
      hourlyRate: Number(hourlyRate),
      securityDeposit: Number(securityDeposit || 0),
      maxCapacity: Number(maxCapacity || 10),
      location: location.trim(),
      imageUrl: imageUrl.trim(),
      amenities: Array.isArray(amenities) ? amenities : [],
      description: description.trim(),
      ownerName,
      ownerEmail,
      rating: 5.0,
      reviewsCount: 1,
    };

    if (isMongoConnected()) {
      const studio = new Studio(newStudioData);
      await studio.save();

      res.status(201).json({
        success: true,
        message: "Studio listed successfully on StudioSpace.",
        studio,
      });
      return;
    }

    // In-memory storage fallback
    const mockId = new mongoose.Types.ObjectId().toString();
    const inMemoryStudio = {
      _id: mockId,
      ...newStudioData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    IN_MEMORY_STUDIOS.unshift(inMemoryStudio);

    res.status(201).json({
      success: true,
      message: "Studio listed successfully on StudioSpace.",
      studio: inMemoryStudio,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to create studio listing.",
    });
  }
});

// -----------------------------------------------------------------------------
// PUT /api/studios/:id
// Protected (requireAuth): Update studio listing with ownership verification (Req 9)
// -----------------------------------------------------------------------------
router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const studio = await Studio.findById(id);
      if (!studio) {
        res.status(404).json({
          success: false,
          error: "Studio listing not found.",
        });
        return;
      }

      // Check ownership - reject unauthorized modification with 403 Forbidden
      if (studio.ownerEmail.toLowerCase() !== userEmail) {
        res.status(403).json({
          success: false,
          error: "Forbidden: You do not have permission to edit another host's listing.",
        });
        return;
      }

      // Update editable fields
      const {
        title,
        category,
        hourlyRate,
        securityDeposit,
        maxCapacity,
        location,
        imageUrl,
        amenities,
        description,
      } = req.body;

      if (title) studio.title = title.trim();
      if (category) studio.category = category;
      if (hourlyRate) studio.hourlyRate = Number(hourlyRate);
      if (securityDeposit !== undefined) studio.securityDeposit = Number(securityDeposit);
      if (maxCapacity) studio.maxCapacity = Number(maxCapacity);
      if (location) studio.location = location.trim();
      if (imageUrl) studio.imageUrl = imageUrl.trim();
      if (amenities) studio.amenities = Array.isArray(amenities) ? amenities : [];
      if (description) studio.description = description.trim();

      await studio.save();

      res.json({
        success: true,
        message: "Studio listing updated successfully.",
        studio,
      });
      return;
    }

    // In-memory update
    const index = IN_MEMORY_STUDIOS.findIndex((s) => String(s._id) === id);
    if (index === -1) {
      res.status(404).json({
        success: false,
        error: "Studio listing not found.",
      });
      return;
    }

    const existing = IN_MEMORY_STUDIOS[index];
    if (existing.ownerEmail.toLowerCase() !== userEmail) {
      res.status(403).json({
        success: false,
        error: "Forbidden: You do not have permission to edit another host's listing.",
      });
      return;
    }

    IN_MEMORY_STUDIOS[index] = {
      ...existing,
      ...req.body,
      ownerEmail: existing.ownerEmail, // Preserve original owner
      ownerName: existing.ownerName,
      updatedAt: new Date(),
    };

    res.json({
      success: true,
      message: "Studio listing updated successfully.",
      studio: IN_MEMORY_STUDIOS[index],
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to update studio listing.",
    });
  }
});

// -----------------------------------------------------------------------------
// DELETE /api/studios/:id
// Protected (requireAuth): Delete studio listing with ownership verification (Req 9)
// -----------------------------------------------------------------------------
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userEmail = req.user?.email?.toLowerCase().trim();

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const studio = await Studio.findById(id);
      if (!studio) {
        res.status(404).json({
          success: false,
          error: "Studio listing not found.",
        });
        return;
      }

      // Check ownership
      if (studio.ownerEmail.toLowerCase() !== userEmail) {
        res.status(403).json({
          success: false,
          error: "Forbidden: You cannot delete a studio owned by another creator.",
        });
        return;
      }

      await Studio.findByIdAndDelete(id);

      res.json({
        success: true,
        message: "Studio listing deleted successfully from StudioSpace.",
      });
      return;
    }

    // In-memory delete
    const index = IN_MEMORY_STUDIOS.findIndex((s) => String(s._id) === id);
    if (index === -1) {
      res.status(404).json({
        success: false,
        error: "Studio listing not found.",
      });
      return;
    }

    if (IN_MEMORY_STUDIOS[index].ownerEmail.toLowerCase() !== userEmail) {
      res.status(403).json({
        success: false,
        error: "Forbidden: You cannot delete a studio owned by another creator.",
      });
      return;
    }

    IN_MEMORY_STUDIOS.splice(index, 1);

    res.json({
      success: true,
      message: "Studio listing deleted successfully from StudioSpace.",
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to delete studio listing.",
    });
  }
});

export default router;

