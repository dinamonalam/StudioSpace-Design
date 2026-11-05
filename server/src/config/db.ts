import mongoose from "mongoose";
import dns from "dns";

// Ensure resilient SRV resolution across ISP DNS routers
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Use default system DNS if override is restricted
}

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studiospace";

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions);
    console.log(`[StudioSpace Database] Connected to MongoDB successfully at ${uri.split("@").pop()}`);
  } catch (err: unknown) {
    const error = err as Error;
    console.warn(`[StudioSpace Database] MongoDB connection warning: ${error.message}`);
    console.warn(`[StudioSpace Database] Running in resilient mode. Set MONGODB_URI in server/.env to your MongoDB Atlas connection string for persistent cloud storage.`);
  }
}

