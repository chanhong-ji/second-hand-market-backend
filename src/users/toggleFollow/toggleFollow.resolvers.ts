import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: resolverProtected(async (_, { id }, { loggedInUser }) => {
      const count = await client.user.count({
        where: {
          id: loggedInUser.id,
          following: { some: { id } },
        },
      });
      try {
        if (count === 0) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { connect: { id } },
            },
          });
        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { disconnect: { id } },
            },
          });
        }
        return { ok: true, id };
      } catch (error) {
        return {
          ok: false,
          error: `DB error from toggleFoolow resolver:${error}`,
        };
      }
    }),
  },
};

export default resolvers;
