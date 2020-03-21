import { gql } from 'apollo-server-express';
export default gql`
  type Note {
    _id: ID!
    title: String!
    content: String!
    date: DateTime!
  }

  extend type Query {
    getAllNotes: [Note!]
    getNote(_id: ID!): Note
  }
`;
