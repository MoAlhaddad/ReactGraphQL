import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      age: Int!
      isMarried: Boolean!
      email: String!
      phone: String!
      position: String!
      department: String!
      dateOfHire: String!
      address: String!
      ssn: String!
      bankAccount: String!
      photoUrl: String!
    ): User

    updateUser(
      id: ID!
      name: String
      age: Int
      isMarried: Boolean
      email: String
      phone: String
      position: String
      department: String
      dateOfHire: String
      address: String
      ssn: String
      bankAccount: String
      photoUrl: String
    ): User

    deleteUser(id: ID!): User

    createAdmin(apiKey: String!, email: String!, fullName: String!): AdminResponse
  }

  type AdminResponse {
    success: Boolean!
    message: String
    adminId: ID
  }

  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
    email: String
    phone: String
    position: String
    department: String
    dateOfHire: String
    address: String
    ssn: String
    bankAccount: String
    photoUrl: String
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUserById: async (_, { id }) => await User.findById(id),
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

    createAdmin: async (_, { apiKey, email, fullName }) => {
      if (apiKey !== process.env.CLERK_SECRET_KEY) {
        throw new Error("Unauthorized: Invalid API Key");
      }

      try {
        // Check if admin already exists
        const existingAdmins = await clerkClient.users.getUserList({
          emailAddress: [email],
        });

        if (existingAdmins.length > 0) {
          return { success: false, message: "Admin already exists" };
        }

        // Split full name
        const [firstName, ...lastParts] = fullName.trim().split(" ");
        const lastName = lastParts.join(" ");

        // Create new admin with provided email
        const securePassword = "A9@r!XcZ*3kP2025";
        const newAdmin = await clerkClient.users.createUser({
          emailAddress: [email],
          firstName,
          lastName,
          password: securePassword,
        });

        // Optionally assign admin role here

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
  },
};

async function startServer() {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 5000 },
      context: async ({ req, res }) => ({ req, res }),
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    console.log(`🚀 Server running at ${url}`);
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
