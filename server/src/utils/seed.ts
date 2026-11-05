import mongoose from "mongoose";
import { Studio } from "../models/Studio.js";
import { User } from "../models/User.js";

const SEED_STUDIOS = [
  {
    title: "The Prism Cyclorama & Daylight Loft",
    category: "Photo Studio",
    hourlyRate: 85,
    securityDeposit: 150,
    maxCapacity: 15,
    location: "SoHo Arts District, New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    amenities: ["Corner Infinity Cyc Wall", "Profoto Lighting Grid", "North-Facing Skylights", "Hair & Makeup Vanity", "High-Speed WiFi", "Freight Elevator"],
    description: "A 2,400 sq.ft sunlit photography studio boasting a 3-wall curved seamless cyclorama, double-height ceilings, and full black-out motorized curtains.",
    ownerName: "Elena Rostova",
    ownerEmail: "host@studiospace.io",
    rating: 4.96,
    reviewsCount: 38,
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export async function seedDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 1) {
    console.log("[StudioSpace Seed] Skipping database seeding (MongoDB offline, running in resilient memory mode).");
    return;
  }
  try {
    // 1. Seed Studios if empty
    const studioCount = await Studio.countDocuments();
    if (studioCount === 0) {
      await Studio.insertMany(SEED_STUDIOS);
      console.log(`[StudioSpace Seed] Populated ${SEED_STUDIOS.length} production studios into MongoDB.`);
    }

    // 2. Seed Examiner Test Accounts if empty
    const hostUser = await User.findOne({ email: "host@studiospace.io" });
    if (!hostUser) {
      const host = new User({
        name: "Marcus Vance",
        email: "host@studiospace.io",
        password: "Password123",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        role: "host",
      });
      await host.save();
      console.log("[StudioSpace Seed] Seeded examiner Host account: host@studiospace.io");
    }

    const creatorUser = await User.findOne({ email: "creator@studiospace.io" });
    if (!creatorUser) {
      const creator = new User({
        name: "Elena Rostova",
        email: "creator@studiospace.io",
        password: "Password123",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        role: "creator",
      });
      await creator.save();
      console.log("[StudioSpace Seed] Seeded examiner Creator account: creator@studiospace.io");
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.warn(`[StudioSpace Seed] Notice: ${error.message}`);
  }
}
