import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { graphqlUploadExpress } from 'graphql-upload';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import schema from './schema';
import { getMeUser } from './users/users.utils';
import config from './config';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const { token } = req.headers;
      if (token && typeof token === 'string') {
        return { loggedInUser: await getMeUser(token) };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    introspection: true,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(ctx: any) {
        if (ctx?.token) {
          return { loggedInUser: await getMeUser(ctx.token) };
        }
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((resolve: any) =>
    httpServer.listen(config.host.port, resolve)
  );

  console.log('🚀 Server ready ');
  process.env.NODE_ENV !== 'production' &&
    console.log(`at http://localhost:${config.host.port}/graphql`);
}

startApolloServer();
