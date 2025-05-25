import { ApolloServer } from "@apollo/server";
import { startStandaloneServer }  from  "@apollo/server/standalone";

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


const typeDefs = `
    type Query {
     getUsers: [User]
     getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
    
        id: ID
        name: String
        age: Int
        isMarried: Boolean

    }
`;
const resolvers = {

    Query: {
        getUsers: () => {
            return users;
        },
        getUserById: (parent, args) => {
            const id = args.id
            return users.find((user) => user.id === id);
        }

    },

    Mutation: {
        createUser: (parent, args) => {
            const {name, age, isMarried} = args;
            const newUser = {
                id: (users.length + 1).toString(),
                name,
                age,
                isMarried,
            };
            console.log(newUser);
            users.push(newUser);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: {port: 5000},
});

console.log(`Server Running at ${url}`);



//4 important terms for graphql
//// Query, Mutation
//// typeDefs just defining the types  resolvers