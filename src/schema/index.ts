import { gql } from 'apollo-server-express';
import noteSchema from './note';
import customSchema from './custom';
import userSchema from './user';
import recipeSchema from './recipe';
import searchSchema from './search';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subsciption {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, noteSchema, recipeSchema, customSchema, searchSchema];
