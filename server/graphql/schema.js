export const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    getSchedules: [Schedule]
    getScheduleByUser(userId: ID!): [Schedule]
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

    syncClerkUser(email: String!, clerkId: String!): SyncResponse

    deleteSchedule(id: ID!): Schedule
  }

  type AdminResponse {
    success: Boolean!
    message: String
    adminId: ID
  }
  
  type SyncResponse {
    success: Boolean!
    message: String!
    user: User
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
    clerkId: String
  }

  type Task {
  title: String
  description: String
  isCompleted: Boolean
}

type Shift {
  date: String
  startTime: String
  endTime: String
  totalHours: Float
}

type Schedule {
  id: ID
  clerkId: String
  weekStart: String
  weekEnd: String
  shifts: [Shift]
  tasks: [Task]
  createdAt: String
  updatedAt: String
}

extend type Query {
  getSchedules(clerkId: String!): [Schedule]
  getScheduleById(id: ID!): Schedule
}

extend type Mutation {
  createSchedule(
    clerkId: String!
    weekStart: String!
    weekEnd: String!
    shifts: [ShiftInput]
    tasks: [TaskInput]
  ): Schedule
}

input ShiftInput {
  date: String
  startTime: String
  endTime: String
  totalHours: Float
}

input TaskInput {
  title: String
  description: String
  isCompleted: Boolean
}

`;
