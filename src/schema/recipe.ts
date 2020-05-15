import { gql } from 'apollo-server-express';

export default gql`
  type Recipe {
    _id: ID!
    userId: ID!
    title: String!
    content: String!
    ingredients: [String]!
    difficultyLevel: DifficultyLevel!
    date: DateTime!
  }
  input SaveRecipeInput {
    title: String
    content: String
    ingredients: [String]
    difficultyLevel: DifficultyLevel
  }

  extend type Query {
    getRecipes: [Recipe!]
    getOneRecipe(_id: ID!): Recipe
    getUserRecipes(userId: ID!): [Recipe]
  }
  extend type Mutation {
    saveRecipe(saveRecipeInput: SaveRecipeInput): Recipe!
  }
`;
