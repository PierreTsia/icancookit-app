import { gql } from 'apollo-server-express';
export default gql`
  type User {
    _id: ID!
    handle: String!
    email: String!
    password: String!
    avatar: String!
    joinDate: DateTime!
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Mutation {
    signup(email: String!, password: String!, handle: String!): AuthPayload
    signin(email: String!, password: String!): AuthPayload
  }
`;
