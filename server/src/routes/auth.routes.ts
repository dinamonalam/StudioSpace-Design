import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken, setAuthCookie, clearAuthCookie } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// In-memory fallback accounts for resilient offline operation
let IN_MEMORY_USERS: Array<{
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  image: string;
  role: string;
}> = [
  {
    _id: "67295839201948271649277a",
    name: "Marcus Vance",
    email: "host@studiospace.io",
    passwordHash: bcrypt.hashSync("Password123", 10),
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    role: "host",
  },
  {
    _id: "67295839201948271649277b",
    name: "Elena Rostova",
    email: "creator@studiospace.io",
    passwordHash: bcrypt.hashSync("Password123", 10),
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    role: "creator",
  },
];

function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

// POST /api/auth/register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, photoUrl } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        error: "Name, email, and password are required.",
      });
      return;
    }

    // Password validation criteria per assignment rules
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isMinLength) {
      res.status(400).json({
        success: false,
        error: "Password must have at least one uppercase letter, one lowercase letter, and minimum 6 characters.",
      });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        res.status(400).json({
          success: false,
          error: "An account with this email address already exists.",
        });
        return;
      }

      const user = new User({
        name: name.trim(),
        email: cleanEmail,
        password: password,
        image: photoUrl?.trim() || "",
        role: "creator",
      });

      await user.save();

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      setAuthCookie(res, token);

      res.status(201).json({
        success: true,
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
      });
      return;
    }

    // In-memory register
    const existing = IN_MEMORY_USERS.find((u) => u.email === cleanEmail);
    if (existing) {
      res.status(400).json({
        success: false,
        error: "An account with this email address already exists.",
      });
      return;
    }

    const mockId = new mongoose.Types.ObjectId().toString();
    const newUser = {
      _id: mockId,
      name: name.trim(),
      email: cleanEmail,
      passwordHash: bcrypt.hashSync(password, 10),
      image: photoUrl?.trim() || "",
      role: "creator",
    };
    IN_MEMORY_USERS.push(newUser);

    const token = generateToken({
      id: mockId,
      email: cleanEmail,
      name: name.trim(),
      role: "creator",
    });

    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: mockId,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
        role: newUser.role,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to register user.",
    });
  }
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Email and password are required.",
      });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isMongoConnected()) {
      const user = await User.findOne({ email: cleanEmail });
      if (!user || !user.password) {
        res.status(401).json({
          success: false,
          error: "Invalid email or password.",
        });
        return;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          error: "Invalid email or password.",
        });
        return;
      }

      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      setAuthCookie(res, token);

      res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
      });
      return;
    }

    // In-memory login fallback
    const user = IN_MEMORY_USERS.find((u) => u.email === cleanEmail);
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
      return;
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    setAuthCookie(res, token);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to log in.",
    });
  }
});

// POST /api/auth/google
router.post("/google", async (req: Request, res: Response) => {
  try {
    const { name, email, image } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: "Google email is required.",
      });
      return;
    }

    const cleanEmail = email.toLowerCase().trim();
    let userId = new mongoose.Types.ObjectId().toString();
    const userName = name || cleanEmail.split("@")[0];

    if (isMongoConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      if (!user) {
        user = new User({
          name: userName,
          email: cleanEmail,
          image: image || "",
          role: "creator",
        });
        await user.save();
      } else if (image && !user.image) {
        user.image = image;
        await user.save();
      }
      userId = user._id.toString();
    }

    const token = generateToken({
      id: userId,
      email: cleanEmail,
      name: userName,
      role: "creator",
    });

    setAuthCookie(res, token);

    res.json({
      success: true,
      message: "Google authentication successful",
      token,
      user: {
        id: userId,
        name: userName,
        email: cleanEmail,
        image: image || "",
        role: "creator",
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Google authentication failed.",
    });
  }
});

// GET /api/auth/me (Protected - validates HTTPOnly cookie)
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  try {
    if (isMongoConnected() && req.user?.id) {
      const user = await User.findById(req.user.id).select("-password");
      if (user) {
        res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          },
        });
        return;
      }
    }

    // In-memory fallback
    res.json({
      success: true,
      user: {
        id: req.user?.id || "seed-user",
        name: req.user?.name || "Verified Creator",
        email: req.user?.email,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        role: req.user?.role || "creator",
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch user session.",
    });
  }
});

// POST /api/auth/logout
router.post("/logout", (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

export default router;
