import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { ApolloError } from 'apollo-server-express';
import { Ctx, SignUpInput, SignInInput, AuthPayload } from './types';
import { createToken } from './../helpers/auth';

export default {
  Mutation: {
    signup: async (_: any, { email, password, handle }: SignUpInput, { User }: Ctx): Promise<AuthPayload> => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new ApolloError('User with this email already exists');
        }

        const user = await new User({ email, password, handle, joinDate: dayjs().toDate() }).save();
        const token = createToken(user);
        return { user, token };
      } catch (e) {
        throw new ApolloError(e || 'Error signing up');
      }
    },

    signin: async (_: any, { email, password }: SignInInput, { User }: Ctx): Promise<AuthPayload> => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError(`No user registered with email ${email}`);
        }
        const isPwdValid = await bcrypt.compare(password, user.password);
        if (!isPwdValid) {
          throw new ApolloError(`Password doesn't match`);
        }

        const token = await createToken(user);
        return { user, token };
      } catch (e) {
        throw new ApolloError(e || 'Error signing in');
      }
    },
  },
};
