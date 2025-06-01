// routes/createAdmin.js
import express from "express";
import { Admin } from "../models/Admin.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();


router.post("/create-admin", async (req, res) => {
  const { apiKey, email, fullName } = req.body;

  if (apiKey !== process.env.CLERK_SECRET_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (!email || !fullName) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, fullName });
    await newAdmin.save();

    return res.status(201).json({ message: "Admin created", admin: newAdmin });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
