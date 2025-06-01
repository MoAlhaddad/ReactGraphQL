// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.model("Admin", adminSchema);
