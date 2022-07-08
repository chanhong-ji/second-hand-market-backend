import client from '../../client';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleFollow: resolverProtected(async (_, { userId }, { loggedInUser }) => {
      try {
        const targetUser = await client.user.count({ where: { id: userId } });
        if (targetUser === 0) throw new Error('User not found');

        const countFollowing = await client.user.count({
          where: {
            id: loggedInUser.id,
            following: { some: { id: userId } },
          },
        });

        if (countFollowing === 0) {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { connect: { id: userId } },
            },
          });
        } else {
          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: { disconnect: { id: userId } },
            },
          });
        }

        return { ok: true, id: userId };
      } catch (error) {
        return {
          ok: false,
          error: createErrorMessage('toggleFollow', error),
        };
      }
    }),
  },
};

export default resolvers;
