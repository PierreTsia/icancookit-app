import dayjs from 'dayjs';
import { ApolloError } from 'apollo-server-express';
import { RecipeDocument, RecipeId } from './../models/recipe';
import { Ctx, SaveRecipeArgs } from './types';
import { UserId } from '../models/user';
import SpoonService from '../services/spoon';
import { Entities } from '../services/types/spoon.model';

export default {
  Query: {
    getRecipes: async (_: any, args: any, { currentUser, User, Recipe }: Ctx): Promise<RecipeDocument[]> => {
      if (!currentUser) {
        throw new ApolloError('Authentication required');
      }
      let recipes: RecipeDocument[] = [];
      try {
        recipes = await Recipe.find().exec();
        const spoon = new SpoonService(Entities.RECIPES);
        const results = await spoon.searchRecipes('feta', 12);
        console.log(results);
      } catch (e) {
        throw new ApolloError(e || 'Error retrieving all recipes');
      }
      return recipes;
    },
    getOneRecipe: async (
      _: any,
      { _id }: { _id: RecipeId },
      { currentUser, Recipe }: Ctx
    ): Promise<RecipeDocument> => {
      if (!currentUser) {
        throw new ApolloError('Authentication required');
      }
      try {
        return (await Recipe.findById(_id).exec()) || ({} as RecipeDocument);
      } catch (e) {
        throw new ApolloError(e || `Error retrieving recipe with id ${_id}`);
      }
    },
    getUserRecipes: async (_: any, { userId }: { userId: UserId }, { currentUser, Recipe }: Ctx) => {
      if (!currentUser) {
        throw new ApolloError('Authentication required');
      }
      let userRecipes: any;
      try {
        userRecipes = await Recipe.find({ userId });
      } catch (e) {
        throw new ApolloError(e || 'Error retrieving user recipes');
      }
      return userRecipes;
    },
  },
  Mutation: {
    saveRecipe: async (
      _: any,
      { saveRecipeInput }: SaveRecipeArgs,
      { currentUser, Recipe }: Ctx
    ): Promise<RecipeDocument> => {
      if (!currentUser) {
        throw new ApolloError('Authentication required');
      }
      const recipeToSave = {
        ...saveRecipeInput,
        userId: currentUser._id,
        date: dayjs().toDate(),
      };
      try {
        const newRecipe = await Recipe.create(recipeToSave);
        return newRecipe;
      } catch (e) {
        throw new ApolloError(e || 'Error trying to save recipe');
      }
    },
  },
};
