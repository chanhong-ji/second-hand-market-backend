import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import schema from './schema';
import { getMeUser } from './users/users.utils';
import { graphqlUploadExpress } from 'graphql-upload';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

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
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
