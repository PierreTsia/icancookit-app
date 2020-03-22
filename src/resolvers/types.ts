import mongoose from 'mongoose';
import { NoteDocument } from '../models/note';
import { UserDocument } from '../models/user';

export interface Ctx {
  currentUser: UserDocument | null;
  Note: mongoose.Model<NoteDocument>;
  User: mongoose.Model<UserDocument>;
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
