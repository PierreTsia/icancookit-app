import mongoose from 'mongoose';
import { NoteDocument } from '../models/note';
import { UserDocument, UserId } from '../models/user';
import { DifficultyLevel, RecipeDocument } from '../models/recipe';

export interface Ctx {
  currentUser: UserDocument | null;
  Note: mongoose.Model<NoteDocument>;
  User: mongoose.Model<UserDocument>;
  Recipe: mongoose.Model<RecipeDocument>;
}
export interface SaveRecipeArgs {
  saveRecipeInput: {
    userId: RecipeDocument['userId'];
    title: RecipeDocument['title'];
    content: RecipeDocument['content'];
    ingredients: RecipeDocument['ingredients'];
    difficultyLevel: DifficultyLevel;
    date: RecipeDocument['date'];
  };
}

export interface SignUpInput {
  email: UserDocument['email'];
  password: UserDocument['password'];
  handle: UserDocument['handle'];
}
export interface SignInInput {
  email: UserDocument['email'];
  password: UserDocument['password'];
}

export interface AuthPayload {
  token: string;
  user: UserDocument;
}
