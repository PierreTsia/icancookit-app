require('dotenv').config({ path: 'variables.env' });
import axios from 'axios';
import { Entities, SpoonRecipe, SpoonStep } from './types/spoon.model';
import { AdvancedSearchParameter, ParamSlugs } from '../resolvers/types';

export default class SpoonService {
  readonly API_KEY = process.env.SPOON_API_KEY;
  readonly URL = `${process.env.SPOON_API_URL}`;
  readonly MORE_INFOS_PARAM: AdvancedSearchParameter = {
    value: true,
    type: 'boolean',
    slug: ParamSlugs.addRecipeInformation,
  };
  readonly INGREDIENT_INFOS_PARAM: AdvancedSearchParameter = {
    value: true,
    type: 'boolean',
    slug: ParamSlugs.fillIngredients,
  };
  readonly DEFAULT_PARAMS = [this.MORE_INFOS_PARAM, this.INGREDIENT_INFOS_PARAM];
  entities: Entities = Entities.RECIPES;
  constructor(entities: Entities) {
    this.entities = entities;
  }
  async searchRecipes(queryString: string, max: number): Promise<SpoonRecipe[]> {
    try {
      const { data } = await axios.get(this.searchRecipesUrl(queryString, max));
      return data.results.map((result: any) => new SpoonRecipe(result));
    } catch (e) {
      throw new Error(e);
    }
  }
  async advancedSearchRecipes(
    queryString: string,
    max: number,
    parameters: AdvancedSearchParameter[]
  ): Promise<SpoonRecipe[]> {
    const { data } = await axios.get(this.advancedSearchRecipesUrl(queryString, max, parameters));
    return data.results.map((result: any) => new SpoonRecipe(result));
  }
  async searchRecipeDetails(recipeId: string): Promise<SpoonRecipe> {
    try {
      const { data } = await axios.get(this.recipeDetailsUrl(recipeId));
      return new SpoonRecipe(data);
    } catch (e) {
      throw new Error(e);
    }
  }
  async searchRecipeInstructions(recipeId: string): Promise<any> {
    try {
      const { data } = await axios.get(this.recipeInstructionsUrl(recipeId));
      return data[0].steps.map((s: any) => new SpoonStep(s));
    } catch (e) {
      throw new Error(e);
    }
  }

  private recipeDetailsUrl(recipeId: string): string {
    return `${this.URL}/${this.entities}/${recipeId}/information?&apiKey=${this.API_KEY}`;
  }
  private searchRecipesUrl(query: string, max: number): string {
    return `${this.URL}/${this.entities}/search?query=${query}&number=${max}&apiKey=${this.API_KEY}`;
  }

  private recipeInstructionsUrl(recipeId: string): string {
    return `${this.URL}/${this.entities}/${recipeId}/analyzedInstructions?&apiKey=${this.API_KEY}`;
  }

  private advancedSearchRecipesUrl(
    query: string,
    max: number,
    parameters: AdvancedSearchParameter[]
  ): string {
    return `${this.URL}/${this.entities}/complexSearch?query=${query}&number=${max}${this.mapParams([
      ...parameters,
      ...this.DEFAULT_PARAMS,
    ])}&apiKey=${this.API_KEY}`;
  }

  private mapParams(parameters: AdvancedSearchParameter[]): string {
    return parameters.map((param) => `&${param.slug}=${param.value}`).join('');
  }
}
