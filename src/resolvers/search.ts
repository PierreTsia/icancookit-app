// @ts-ignore
import { ApolloError } from 'apollo-server-express';
import { Ctx, AdvancedSearchParameter } from './types';
import SpoonService from '../services/spoon';
import { Entities, SpoonRecipe } from '../services/types/spoon.model';
interface SearchInputArgs {
  max: number;
  queryString: string;
}

interface AdvancedSearchInputArgs extends SearchInputArgs {
  parameters: AdvancedSearchParameter[];
}

export default {
  Query: {
    advancedSearchRecipes: async (
      _: any,
      { advancedSearchInput }: { advancedSearchInput: AdvancedSearchInputArgs },
      { currentUser }: Ctx
    ): Promise<SpoonRecipe[]> => {
      if (!currentUser) throw new ApolloError('Authentication required');
      try {
        const { queryString, max, parameters } = advancedSearchInput;
        const spoon = new SpoonService(Entities.RECIPES);
        return await spoon.advancedSearchRecipes(queryString, max, parameters);
      } catch (e) {
        throw new ApolloError(e || 'Advanced Search error');
      }
    },
    searchRecipes: async (
      _: any,
      { searchInput }: { searchInput: SearchInputArgs },
      { currentUser }: Ctx
    ): Promise<SpoonRecipe[]> => {
      if (!currentUser) throw new ApolloError('Authentication required');
      try {
        const spoon = new SpoonService(Entities.RECIPES);
        const { max, queryString } = searchInput;
        return await spoon.searchRecipes(queryString, max);
      } catch (e) {
        throw new ApolloError(e || 'Search error');
      }
    },
    recipeDetails: async (_: any, { spoonId }: { spoonId: string }, { currentUser }: Ctx) => {
      if (!currentUser) throw new ApolloError('Authentication required');
      try {
        const spoon = new SpoonService(Entities.RECIPES);
        return await spoon.searchRecipeDetails(spoonId);
      } catch (e) {
        console.log(e);
      }
    },
    recipeInstructions: async (_: any, { spoonId }: { spoonId: string }, { currentUser }: Ctx) => {
      if (!currentUser) throw new ApolloError('Authentication required');
      try {
        const spoon = new SpoonService(Entities.RECIPES);
        return await spoon.searchRecipeInstructions(spoonId);
      } catch (e) {
        throw new ApolloError(e || 'Error retrieving instructions');
      }
    },
  },
};
