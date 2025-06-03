import { User } from "../models/User.js";
import { Schedule } from "../models/Schedule.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.find();
      return users.map((user) => ({
        ...user.toObject(),
        id: user._id.toString(),
        clerkId: user.clerkId || null, // Ensure clerkId is returned
      }));
    },

    getUserById: async (_, { id }) => {
      const user = await User.findById(id);
      return user ? { ...user.toObject(), id: user._id.toString() } : null;
    },

    getSchedules: async (_, { clerkId }) => {
      if (clerkId) {
        return await Schedule.find({ clerkId });
      }
      return await Schedule.find();
    },

    getScheduleByUser: async (_, { userId }) => {
      const user = await User.findById(userId);
      if (!user) return [];
      return await Schedule.find({ clerkId: user.clerkId });
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      const newUser = new User({ ...args });
      await newUser.save();
      console.log("✅ New user created:", newUser);
      return newUser;
    },

    updateUser: async (_, { id, ...updateFields }) => {
      const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
      if (!updatedUser) throw new Error("User not found");
      console.log("✅ User updated:", updatedUser);
      return updatedUser;
    },

    deleteUser: async (_, { id }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new Error("User not found");
      console.log("❌ User deleted:", deletedUser);
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
          console.log(`🔁 ClerkId synced for ${email}`);
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

        const securePassword = "A9@r!XcZ*3kP2025"; // Consider storing securely
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
      if (!clerkId || !weekStart || !weekEnd || !Array.isArray(shifts) || !Array.isArray(tasks)) {
        throw new Error("All required schedule fields must be provided.");
      }

      const newSchedule = new Schedule({
        clerkId,
        weekStart: new Date(weekStart),
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
    updateSchedule: async (_, { id, clerkId, weekStart, weekEnd, shifts, tasks }) => {
  const updated = await Schedule.findByIdAndUpdate(
    id,
    {
      ...(clerkId && { clerkId }),
      ...(weekStart && { weekStart: new Date(weekStart) }),
      ...(weekEnd && { weekEnd: new Date(weekEnd) }),
      ...(shifts && { shifts }),
      ...(tasks && { tasks }),
    },
    { new: true }
  );

  if (!updated) throw new Error("Schedule not found");
  console.log("🔄 Schedule updated:", updated);
  return updated;
},
  },

  Schedule: {
    user: async (schedule) => {
      return await User.findOne({ clerkId: schedule.clerkId });
    },
  },

  Shift: {
    id: (shift) => shift._id.toString(),
  },

  Task: {
    id: (task) => task._id.toString(),
  },
};
