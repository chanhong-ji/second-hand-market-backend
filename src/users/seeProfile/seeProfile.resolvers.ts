import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    seeProfile: resolverProtected((_, { id }) =>
      client.user.findUnique({ where: { id } })
    ),
  },
};

export default resolvers;
