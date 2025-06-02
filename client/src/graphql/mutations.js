import {useQuery, useMutation, gql} from "@apollo/client";


export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $age: Int!
    $isMarried: Boolean!
    $email: String!
    $phone: String!
    $position: String!
    $department: String!
    $dateOfHire: String!
    $address: String!
    $ssn: String!
    $bankAccount: String!
    $photoUrl: String!
  ) {
    createUser(
      name: $name
      age: $age
      isMarried: $isMarried
      email: $email
      phone: $phone
      position: $position
      department: $department
      dateOfHire: $dateOfHire
      address: $address
      ssn: $ssn
      bankAccount: $bankAccount
      photoUrl: $photoUrl
    ) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $age: Int
    $isMarried: Boolean
    $email: String
    $phone: String
    $position: String
    $department: String
    $dateOfHire: String
    $address: String
    $ssn: String
    $bankAccount: String
    $photoUrl: String
  ) {
    updateUser(
      id: $id
      name: $name
      age: $age
      isMarried: $isMarried
      email: $email
      phone: $phone
      position: $position
      department: $department
      dateOfHire: $dateOfHire
      address: $address
      ssn: $ssn
      bankAccount: $bankAccount
      photoUrl: $photoUrl
    ) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;


// ------------------- SCHEDULE MUTATIONS -------------------

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule(
    $clerkId: String!
    $weekStart: String!
    $weekEnd: String!
    $shifts: [ShiftInput!]!
    $tasks: [TaskInput!]!
  ) {
    createSchedule(
      clerkId: $clerkId
      weekStart: $weekStart
      weekEnd: $weekEnd
      shifts: $shifts
      tasks: $tasks
    ) {
      id
      clerkId
      weekStart
      weekEnd
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $id: ID!
    $clerkId: String
    $weekStart: String
    $weekEnd: String
    $shifts: [ShiftInput!]
    $tasks: [TaskInput!]
  ) {
    updateSchedule(
      id: $id
      clerkId: $clerkId
      weekStart: $weekStart
      weekEnd: $weekEnd
      shifts: $shifts
      tasks: $tasks
    ) {
      id
      clerkId
      weekStart
      weekEnd
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;