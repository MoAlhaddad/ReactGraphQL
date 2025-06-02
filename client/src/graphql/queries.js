import { useQuery, useMutation, gql } from "@apollo/client";

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
      photoUrl
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      age
      name
      isMarried
      position
      photoUrl
      clerkId  # ✅ Now you’re requesting it
    }
  }
`;


export const GET_USER = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
      position
      photoUrl
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
      photoUrl
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

// ------------------- SCHEDULE QUERIES -------------------

export const GET_SCHEDULES = gql`
  query GetSchedules($clerkId: String) {
    getSchedules(clerkId: $clerkId) {
      id
      weekStart
      weekEnd
      user {
        name
        email
        photoUrl
      }
      shifts {
        id
        date
        startTime
        endTime
      }
      tasks {
        id
        title
        description
      }
    }
  }
`;

export const GET_SCHEDULE_BY_ID = gql`
  query GetScheduleById($id: ID!) {
    getScheduleById(id: $id) {
      id
      clerkId
      weekStart
      weekEnd
      shifts {
        date
        startTime
        endTime
        totalHours
      }
      tasks {
        title
        description
        isCompleted
      }
    }
  }
`;

export const GET_USER_SCHEDULES = gql`
  query GetSchedulesByClerkId($clerkId: String!) {
    getSchedulesByClerkId(clerkId: $clerkId) {
      id
      weekStart
      weekEnd
      user {
        name
        email
        photoUrl
        clerkId
      }
      shifts {
        id
        date
        startTime
        endTime
      }
      tasks {
        id
        title
        description
      }
    }
  }
`;
