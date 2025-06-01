import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { User } from "./models/User.js";

dotenv.config(); // Load .env variables

const MONGO_URI = process.env.MONGO_URI;
const CLERK_API_KEY = process.env.CLERK_SECRET_KEY;

if (!MONGO_URI || !CLERK_API_KEY) {
  console.error("Missing MONGO_URI or CLERK_SECRET_KEY in .env");
  process.exit(1);
}

async function getAllClerkUsers() {
  const response = await fetch("https://api.clerk.com/v1/users", {
    headers: {
      Authorization: `Bearer ${CLERK_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Clerk users: ${response.statusText}`);
  }

  return await response.json();
}

async function updateUsersWithClerkId() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected successfully");

  const clerkUsers = await getAllClerkUsers();
  const allMongoUsers = await User.find();

  for (const mongoUser of allMongoUsers) {
    const matchedClerkUser = clerkUsers.find((clerkUser) =>
      clerkUser.email_addresses.some(
        (email) => email.email_address.toLowerCase() === mongoUser.email.toLowerCase()
      )
    );

    if (matchedClerkUser) {
      mongoUser.clerkId = matchedClerkUser.id;
      await mongoUser.save();
      console.log(`Updated user ${mongoUser.email} with clerkId ${matchedClerkUser.id}`);
    } else {
      console.log(`No Clerk user found for ${mongoUser.email}`);
    }
  }

  await mongoose.disconnect();
  console.log("Finished updating clerkIds");
}

updateUsersWithClerkId().catch((err) => {
  console.error("Error updating clerkIds:", err);
  process.exit(1);
});
