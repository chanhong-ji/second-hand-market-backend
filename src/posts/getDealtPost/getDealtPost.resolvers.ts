import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    getDealtPost: resolverProtected((_, { id }) =>
      client.post.update({
        where: { id },
        data: {
          dealt: true,
        },
      })
    ),
  },
};

export default resolvers;
