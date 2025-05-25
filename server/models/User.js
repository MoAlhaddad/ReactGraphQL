// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
        type: Number,
        required: true,
      },
      isMarried: {
        type: Boolean,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    position: {
      type: String,
    },
    department: {
      type: String,
    },
    dateOfHire: {
      type: Date,
      default: Date.now,
    },
    isMarried: {
      type: Boolean,
    },
    address: {
      type: String,
    },
    ssn: {
      type: String, // mock sensitive data
    },
    bankAccount: {
      type: String, // mock sensitive data
    },
    photoUrl: {
      type: String, // uploaded via Uploadthing
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
