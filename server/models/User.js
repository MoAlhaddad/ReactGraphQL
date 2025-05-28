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
      type: String, // url we need from  imgbb
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
