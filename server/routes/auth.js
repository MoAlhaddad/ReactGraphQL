// routes/auth.js (or wherever you handle routes)
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/sync-user", async (req, res) => {
  const { email, clerkId } = req.body;

  if (!email || !clerkId) {
    return res.status(400).json({ message: "Missing email or clerkId" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No matching user in MongoDB." });
    }

    // Sync clerkId if missing
    if (!user.clerkId) {
      user.clerkId = clerkId;
      await user.save();
    }

    return res.status(200).json({ message: "User synced successfully", user });
  } catch (error) {
    console.error("Sync error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
