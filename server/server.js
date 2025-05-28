import { ApolloServer } from "@apollo/server";
import { startStandaloneServer }  from  "@apollo/server/standalone";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";




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
      getUsers: async () => {
        return await User.find(); // MongoDB now
      },
      getUserById: async (_, args) => {
        return await User.findById(args.id);
      },
    },
  
    Mutation: {
      createUser: async (_, args) => {
        const newUser = new User({
          name: args.name,
          age: args.age,
          isMarried: args.isMarried,
          email: args.email,
          phone: args.phone,
          position: args.position,
          department: args.department,
          dateOfHire: args.dateOfHire,
          address: args.address,
          ssn: args.ssn,
          bankAccount: args.bankAccount,
          photoUrl: args.photoUrl,
        });
  
        await newUser.save();
        console.log("New user created:", newUser);
        return newUser;
      },
    },
  };
async function startServer() {
    try {
      await connectDB(); // Connect to MongoDB first
      console.log("Connected to MongoDB");
  
      const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
  
      const { url } = await startStandaloneServer(server, {
        listen: { port: 5000 },
        context: async ({ req, res }) => ({ req, res }),
        cors: {
          origin: "http://localhost:5173", // Allow your Vite frontend
          credentials: true,
        },
      });
  
      console.log(`Server Running at ${url}`);
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }
  
  startServer();