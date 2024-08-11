import { gql } from "apollo-server-express";

export const typeDefsUsers = gql`
  type User {
    code: Int
    message: String
    id: ID
    fullName: String
    email: String
    token: String
  }

  input RegisterUserInput {
    fullName: String
    email: String
    password: String
  }

  input loginUserInput {
    fullName: String
    password: String
  }

  type Query {
    getUser: User
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User
    loginUser(user: loginUserInput): User
  }
`;
