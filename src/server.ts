require('dotenv').config({ path: '.env' });
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import Note from './models/note';
import User from './models/user';
import { getUserFromToken } from './helpers/auth';
import { Ctx } from './resolvers/types';

const dbPath: string = process.env.MONGO_URI || '';
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
  formatError: error => ({
    name: error.name,
    message: error.message.replace('Context creation failed:', ''),
  }),
  context: async ({ req }): Promise<Ctx> => ({
    currentUser: await getUserFromToken(req.headers.authorization),
    Note,
    User,
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
