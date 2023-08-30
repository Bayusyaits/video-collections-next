import "reflect-metadata";
import * as express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import { merge } from "lodash";
import { typeDefs as UserTypeDefs } from "./app/services/user/typeDefs";
import { typeDefs as CategoryTypeDefs } from "./app/services/category/typeDefs";
import { typeDefs as VideoTypeDefs } from "./app/services/video/typeDefs";
import { typeDefs as CollectionTypeDefs } from "./app/services/collection/typeDefs";
import { typeDefs as VideoCollectionTypeDefs } from "./app/services/video-collection/typeDefs";
import { typeDefs as VideoCategoryTypeDefs } from "./app/services/video-category/typeDefs";
import {
   Query as UserQuery,
   Mutation as UserMutations
} from "./app/services/user/resolvers";
import {
  Query as CategoryQuery,
  Mutation as CategoryMutations
} from "./app/services/category/resolvers";
import {
  Query as VideoQuery,
  Mutation as VideoMutations
} from "./app/services/video/resolvers";
import {
 Query as CollectionQuery,
 Mutation as CollectionMutations
} from "./app/services/collection/resolvers";
import {
  Query as VideoCollectionQuery,
  Mutation as VideoCollectionMutations
} from "./app/services/video-collection/resolvers";
import {
  Query as VideoCategoryQuery,
  Mutation as VideoCategoryMutations
} from "./app/services/video-category/resolvers";
const PORT = process.env.PORT || 4003;

const startServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs: [ 
      CategoryTypeDefs,
      UserTypeDefs,
      VideoTypeDefs,
      CollectionTypeDefs,
      VideoCollectionTypeDefs,
      VideoCategoryTypeDefs
    ],
    resolvers: merge(
      {
        Query: {
          ...CategoryQuery,
          ...UserQuery,
          ...VideoQuery,
          ...CollectionQuery,
          ...VideoCollectionQuery,
          ...VideoCategoryQuery
        },
        Mutation: {
          ...CategoryMutations,
          ...UserMutations,
          ...VideoMutations,
          ...CollectionMutations,
          ...VideoCollectionMutations,
          ...VideoCategoryMutations
        }
      }
    ),
  });
  const server = new ApolloServer({ 
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });

  const app: express.Application = express();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
