import { User } from '@prisma/client';
import { GraphQLScalarType } from 'graphql';

type Context = {
  loggedInUser: User;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
