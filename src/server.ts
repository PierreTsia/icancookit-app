import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const app = express();
const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: process.env.PORT || 3000 }, (): void =>
  console.log(`GraphQL is now running on http://localhost:3000/graphql`)
);
