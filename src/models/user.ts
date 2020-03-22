import * as mongoose from 'mongoose';
import { createAvatar, encryptedPassword } from '../helpers/auth';

export interface UserDocument extends mongoose.Document {
  handle: string;
  email: string;
  password: string;
  avatar: string;
  joinDate: Date;
}

const schema: mongoose.SchemaDefinition = {
  handle: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  joinDate: {
    type: Date,
    required: true,
  },
};

const collectionName: string = 'user';
const userSchema: mongoose.Schema = new mongoose.Schema(schema);

userSchema.pre<UserDocument>('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await encryptedPassword(this.password);
  next();
});
userSchema.pre<UserDocument>('save', function(next) {
  this.avatar = createAvatar(this.handle);
  next();
});

const User: mongoose.Model<UserDocument> = mongoose.model(collectionName, userSchema);

export default User;
