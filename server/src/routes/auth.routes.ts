import { Router, Request, Response } from "express";
import { User } from "../models/User.js";
import { generateToken, setAuthCookie, clearAuthCookie } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

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

    // Check if user already exists
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      res.status(400).json({
        success: false,
        error: "An account with this email address already exists.",
      });
      return;
    }

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      image: photoUrl?.trim() || "",
      role: "creator",
    });

    await user.save();

    // Issue JWT cookie
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

    const user = await User.findOne({ email: email.toLowerCase().trim() });
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

    // Issue JWT cookie
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

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      user = new User({
        name: name || email.split("@")[0],
        email: email.toLowerCase().trim(),
        image: image || "",
        role: "creator",
      });
      await user.save();
    } else if (image && !user.image) {
      user.image = image;
      await user.save();
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
      message: "Google authentication successful",
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
      error: error.message || "Google authentication failed.",
    });
  }
});

// GET /api/auth/me (Protected - validates HTTPOnly cookie)
router.get("/me", requireAuth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found.",
      });
      return;
    }

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

