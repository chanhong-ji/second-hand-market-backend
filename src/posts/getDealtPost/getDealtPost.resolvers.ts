import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    getDealtPost: resolverProtected(async (_, { id }) => {
      try {
        await client.post.update({
          where: { id },
          data: {
            dealt: true,
          },
        });
      } catch (error) {
        return {
          ok: false,
          error: `DB error from getDealtPost resolver:${error}`,
        };
      }

      return { ok: true };
    }),
  },
};

export default resolvers;
