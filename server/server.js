import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./db.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

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
