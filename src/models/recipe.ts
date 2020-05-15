import * as mongoose from 'mongoose';
import { UserId } from './user';
import { As } from './common';

export type RecipeId = string & As<'RecipeId'>;

export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}
export interface RecipeDocument extends mongoose.Document {
  title: string;
  userId: UserId;
  content: string;
  ingredients: string[];
  date: Date;
  difficultyLevel: DifficultyLevel;
}

const schema: mongoose.SchemaDefinition = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  difficultyLevel: {
    type: DifficultyLevel,
    required: true,
  },
});

const collectionName: string = 'recipe';
const recipeSchema: mongoose.Schema = new mongoose.Schema(schema);

const Recipe: mongoose.Model<RecipeDocument> = mongoose.model(collectionName, recipeSchema);

export default Recipe;
