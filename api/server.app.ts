import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { VideoResolver } from './app/services/video/video.resolver';
import { CategoryResolver } from './app/services/category/category.resolver';
import { CollectionResolver } from './app/services/collection/collection.resolver';
const app: express.Application = express();
const path = '/app/graphql';
const PORT = process.env.PORT || 4003;
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      VideoResolver,
      CategoryResolver,
      CollectionResolver
    ],
  });
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });
  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log(`🚀 started http://localhost:${PORT}${path}`);
  });
};

main();
