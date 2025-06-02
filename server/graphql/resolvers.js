import { User } from "../models/User.js";
import { Schedule } from "../models/Schedule.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUserById: async (_, { id }) => await User.findById(id),
    getSchedules: async () => await Schedule.find().populate("user"),
    getScheduleByUser: async (_, { userId }) =>
      await Schedule.find({ user: userId }).populate("user"),
  },

  Mutation: {
    createUser: async (_, args) => {
      const newUser = new User({ ...args });
      await newUser.save();
      console.log("New user created:", newUser);
      return newUser;
    },

    updateUser: async (_, { id, ...updateFields }) => {
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedUser) throw new Error("User not found");
      console.log("User updated:", updatedUser);
      return updatedUser;
    },

    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("User not found");
      console.log("User deleted:", deletedUser);
      return deletedUser;
    },

    syncClerkUser: async (_, { email, clerkId }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return {
            success: false,
            message: "No matching user found in MongoDB.",
            user: null,
          };
        }

        if (!user.clerkId) {
          user.clerkId = clerkId;
          await user.save();
          console.log(`✅ ClerkId synced for ${email}`);
        }

        return {
          success: true,
          message: "User synced with Clerk ID successfully.",
          user,
        };
      } catch (error) {
        console.error("Error syncing user:", error);
        return {
          success: false,
          message: "Internal server error.",
          user: null,
        };
      }
    },

    createAdmin: async (_, { apiKey, email, fullName }) => {
      if (apiKey !== process.env.CLERK_SECRET_KEY) {
        throw new Error("Unauthorized: Invalid API Key");
      }

      try {
        const existingAdmins = await clerkClient.users.getUserList({
          emailAddress: [email],
        });

        if (existingAdmins.length > 0) {
          return { success: false, message: "Admin already exists" };
        }

        const [firstName, ...lastParts] = fullName.trim().split(" ");
        const lastName = lastParts.join(" ");

        const securePassword = "A9@r!XcZ*3kP2025"; // Consider better security
        const newAdmin = await clerkClient.users.createUser({
          emailAddress: [email],
          firstName,
          lastName,
          password: securePassword,
        });

        return {
          success: true,
          message: "Admin created successfully",
          adminId: newAdmin.id,
        };
      } catch (error) {
        console.error("Error creating admin:", error);
        return {
          success: false,
          message: "Failed to create admin",
        };
      }
    },

    createSchedule: async (_, { clerkId, weekStart, weekEnd, shifts, tasks }) => {
      const newSchedule = new Schedule({
        clerkId,
        weekStart: new Date(weekStart), // Convert string/timestamp to Date
        weekEnd: new Date(weekEnd),
        shifts,
        tasks,
      });

      await newSchedule.save();
      console.log("✅ Schedule created for clerkId:", clerkId);
      return newSchedule;
    },

    deleteSchedule: async (_, { id }) => {
      const deleted = await Schedule.findByIdAndDelete(id);
      return deleted;
    },
  },

  // Add these to map _id to id for nested Shift and Task types:
  Shift: {
    id: (shift) => shift._id.toString(),
  },

  Task: {
    id: (task) => task._id.toString(),
  },
};
