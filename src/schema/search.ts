// @ts-ignore
import { gql } from 'apollo-server-express';

export default gql`
  type SpoonRecipe {
    id: ID!
    title: String
    readyInMinutes: Int
    servings: Int
    sourceUrl: String
    image: String
  }
  type RecipeDetails {
    id: ID!
    title: String!
    image: String
    dishTypes: [String]
    sourceName: String
    sourceUrl: String
    creditsText: String
    readyInMinutes: Int
    extendedIngredients: [Ingredient]
    summary: String
    winePairing: WinePairing
    cuisines: [String]
    instructions: String
  }
  type Ingredient {
    id: ID!
    name: String
    aisle: String
    consistency: String
    image: String
    amount: Float
    unit: String
  }
  type WinePairing {
    pairedWines: [String]
    pairingText: String
  }

  type Equipment {
    id: ID
    name: String
    image: String
  }
  type InstructionStep {
    ingredients: [Ingredient]
    number: Int
    step: String
    equipment: Equipment
  }

  input SearchInput {
    max: Int
    queryString: String
  }
  extend type Query {
    searchRecipes(searchInput: SearchInput): [SpoonRecipe]
    recipeDetails(spoonId: ID!): RecipeDetails
    recipeInstructions(spoonId: ID!): [InstructionStep]
  }
`;
