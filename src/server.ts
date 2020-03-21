require('dotenv').config({ path: '.env' });
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
const mongoose = require('mongoose');
const dbPath: string = process.env.MONGO_URI || '';

import Note from './models/note';

mongoose
  .connect(dbPath, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('💾 💾 Database connected');
  })
  .catch((e: any) => {
    console.log(e);
  });
const app = express();
const server = new ApolloServer({
  schema,
  context: async () => ({
    Note,
  }),
  introspection: true,
  playground: true,
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: process.env.PORT || 3000 }, (): void => {
  console.log(`GraphQL is now running on http://localhost:3000/graphql`);
});
