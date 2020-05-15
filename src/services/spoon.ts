require('dotenv').config({ path: 'variables.env' });
import axios from 'axios';
const BASE_IMG_URL = 'https://spoonacular.com/recipeImages/';
const INGREDIENT_URL = 'https://spoonacular.com/cdn/ingredients_100x100/';
export enum Entities {
  RECIPES = 'recipes',
  INGREDIENTS = 'ingredients',
}
enum IMG_SIZE {
  XSMALL = '90x90',
  SMALL = '240x150',
  MEDIUM = '312x231',
  LARGE = '556x370',
  XLARGE = '636x393',
}

export class Ingredient {
  id: number;
  name: string;
  aisle: string;
  consistency: string;
  image: string;
  amount: number;
  unit: string;
  constructor(obj: any) {
    this.aisle = obj.aisle;
    this.amount = obj.amount;
    this.consistency = obj.consistency;
    this.id = obj.id;
    this.name = obj.name;
    this.image = `${INGREDIENT_URL}${obj.image}`;
    this.unit = obj.unit;
  }
}

export class SpoonRecipe {
  id: number;
  title: string;
  readyInMinutes: number;
  summary: string;
  cuisines: string[];
  instructions: string;
  servings: 6;
  sourceUrl: string;
  image: string;
  dishTypes: string[];
  sourceName: string;
  creditsText: string;
  extendedIngredients: Ingredient[] = [];

  constructor(obj: any) {
    this.id = obj.id;
    this.title = obj.title;
    this.readyInMinutes = obj.readyInMinutes;
    this.summary = obj.summary;
    this.cuisines = obj.cuisines;
    this.instructions = obj.instructions;
    this.servings = obj.servings;
    this.sourceUrl = obj.sourceUrl;
    this.image = `${BASE_IMG_URL}${obj.id}-${IMG_SIZE.MEDIUM}.${obj.imageType}`;
    this.dishTypes = obj.dishTypes;
    this.sourceName = obj.sourceName;
    this.sourceUrl = obj.sourceUrl;
    this.creditsText = obj.creditsText;
    if (obj.extendedIngredients) {
      this.extendedIngredients = obj.extendedIngredients.map(
        (indegredient: any) => new Ingredient(indegredient)
      );
    }
  }
}

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

  private recipeDetailsUrl(recipeId: string) {
    return `${this.URL}/${this.entities}/${recipeId}/information?&apiKey=${this.API_KEY}`;
  }
  private searchRecipesUrl(query: string, max: number) {
    return `${this.URL}/${this.entities}/search?query=${query}&number=${max}&apiKey=${this.API_KEY}`;
  }
}
