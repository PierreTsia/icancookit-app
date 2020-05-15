import { ApolloError } from 'apollo-server-express';
import { Ctx } from './types';
import SpoonService, { Entities, SpoonRecipe } from '../services/spoon';
interface SearchInputArgs {
  searchInput: {
    max: number;
    queryString: string;
  };
}

export default {
  Query: {
    searchRecipes: async (
      _: any,
      { searchInput }: SearchInputArgs,
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
  },
};
