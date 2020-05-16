export const BASE_IMG_URL = 'https://spoonacular.com/recipeImages/';
export const INGREDIENT_URL = 'https://spoonacular.com/cdn/ingredients_100x100/';

export enum Entities {
  RECIPES = 'recipes',
  INGREDIENTS = 'ingredients',
}
export enum IMG_SIZE {
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
    console.log('obj Ingredieny', obj);

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
      this.extendedIngredients = obj.extendedIngredients.map((ingredient: any) => new Ingredient(ingredient));
    }
  }
}

export class SpoonStep {
  ingredients: Ingredient[] = [];
  number: number;
  step: string;
  equipment: any;
  constructor(obj: any) {
    this.ingredients = obj.ingredients.map((i: any) => new Ingredient(i));
    this.number = obj.number;
    this.step = obj.step;
    this.equipment = obj.equipment && obj.equipment.id ? obj.equipment : null;
  }
}
