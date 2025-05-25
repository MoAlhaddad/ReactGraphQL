import { ApolloServer } from "@apollo/server";
import { startStandaloneServer }  from  "@apollo/server/standalone";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";

const users = [
    {
      id: "1",
      name: "Alice Johnson",
      age: 28,
      isMarried: false
    },
    {
      id: "2",
      name: "Michael Smith",
      age: 34,
      isMarried: true
    },
    {
      id: "3",
      name: "Sara Lee",
      age: 22,
      isMarried: false
    },
    {
      id: "4",
      name: "David Kim",
      age: 45,
      isMarried: true
    },
    {
      id: "5",
      name: "Juan Martinez",
      age: 31,
      isMarried: false
    }
  ];


// const typeDefs = `
//     type Query {
//      getUsers: [User]
//      getUserById(id: ID!): User
//     }

//     type Mutation {
//         createUser(name: String!, age: Int!, isMarried: Boolean!): User
//     }

//     type User {
    
//         id: ID
//         name: String
//         age: Int
//         isMarried: Boolean

//     }
// `;

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
// const resolvers = {

//     Query: {
//         getUsers: () => {
//             return users;
//         },
//         getUserById: (parent, args) => {
//             const id = args.id
//             return users.find((user) => user.id === id);
//         }

//     },

//     Mutation: {
//         createUser: (parent, args) => {
//             const {name, age, isMarried} = args;
//             const newUser = {
//                 id: (users.length + 1).toString(),
//                 name,
//                 age,
//                 isMarried,
//             };
//             console.log(newUser);
//             users.push(newUser);
//             return newUser;
//         },
//     },
// };
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
      });
  
      console.log(`Server Running at ${url}`);
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  }
  
  startServer();
  

// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// const { url } = await startStandaloneServer(server, {
//     listen: {port: 5000},
// });





//4 important terms for graphql
//// Query, Mutation
//// typeDefs just defining the types  resolvers