require('dotenv').config({ path: 'variables.env' });
import axios from 'axios';
import { Entities, SpoonRecipe, SpoonStep } from './types/spoon.model';

export default class SpoonService {
  readonly API_KEY = process.env.SPOON_API_KEY;
  readonly URL = `${process.env.SPOON_API_URL}`;
  entities: Entities = Entities.RECIPES;
  constructor(entities: Entities) {
    this.entities = entities;
  }
  async searchRecipes(queryString: string, max: number): Promise<SpoonRecipe[]> {
    try {
      const { data } = await axios.get(this.searchRecipesUrl(queryString, max));
      return data.results.map((result: any) => new SpoonRecipe(result));
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
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

  private recipeDetailsUrl(recipeId: string) {
    return `${this.URL}/${this.entities}/${recipeId}/information?&apiKey=${this.API_KEY}`;
  }
  private searchRecipesUrl(query: string, max: number) {
    return `${this.URL}/${this.entities}/search?query=${query}&number=${max}&apiKey=${this.API_KEY}`;
  }

  private recipeInstructionsUrl(recipeId: string) {
    return `${this.URL}/${this.entities}/${recipeId}/analyzedInstructions?&apiKey=${this.API_KEY}`;
  }
}
