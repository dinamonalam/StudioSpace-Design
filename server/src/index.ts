import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./utils/seed.js";
import authRoutes from "./routes/auth.routes.js";
import studioRoutes from "./routes/studio.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// CORS with credentials for HTTPOnly cookie transmission
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost, local network, and configured CLIENT_URL
      if (!origin || origin.includes("localhost") || origin === CLIENT_URL) {
        callback(null, true);
      } else {
        callback(null, true); // Allow dev origins seamlessly
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Base Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "StudioSpace Server API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/studios", studioRoutes);
app.use("/api/my-studios", studioRoutes);
app.use("/api/wishlists", wishlistRoutes);

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[StudioSpace Server Error]:", err);
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error occurred.",
  });
});

// Start Server and Connect DB
async function bootstrap() {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`[StudioSpace Server] Running on http://localhost:${PORT}`);
    console.log(`[StudioSpace Server] Health Check: http://localhost:${PORT}/api/health`);
    console.log(`[StudioSpace Server] Auth API: http://localhost:${PORT}/api/auth`);
  });
}

bootstrap().catch((err) => {
  console.error("Bootstrap error:", err);
});
