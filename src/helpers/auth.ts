require('dotenv').config({ path: '.env' });
import md5 from 'md5';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import User, { UserDocument } from './../models/user';

export const createToken = (user: UserDocument) => {
  const { _id } = user;
  const secret: Secret = process.env.SECRET!;
  const expiresIn = '12hr';
  return jwt.sign({ _id }, secret, { expiresIn });
};

export const createAvatar = (handle: string): string => {
  const adorable = 'https://api.adorable.io/avatars/';
  const size = '100';
  const format = 'png';
  return `${adorable}${size}/${md5(handle)}.${format}`;
};

export const encryptedPassword = async (clearPwd: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(clearPwd, salt);
};

export const getUserFromToken = async (token: string | undefined): Promise<UserDocument | null> => {
  if (token) {
    try {
      const bearerId = await jwt.verify(token, process.env.SECRET!);
      const user = await User.findById(bearerId);
      if (!user) {
        throw new ApolloError('🚷User not found');
      }
      return user;
    } catch (e) {
      throw new ApolloError('🚷Invalid Token : your session has expired. Please sign in again.');
    }
  }
  return null;
};
