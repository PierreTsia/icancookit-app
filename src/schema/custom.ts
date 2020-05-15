import { gql } from 'apollo-server-express';
export default gql`
  scalar Date
  scalar Time
  scalar DateTime
  enum DifficultyLevel {
    EASY
    MEDIUM
    ADVANCED
    EXPERT
  }
`;
