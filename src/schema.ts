import 'graphql-import-node';
import typeDefs from './schema/index';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
