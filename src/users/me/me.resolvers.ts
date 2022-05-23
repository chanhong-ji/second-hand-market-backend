import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    me: resolverProtected(async (_, __, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } })
    ),
  },
};

export default resolvers;
