import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    seeFollowing: resolverProtected(
      async (_, { userId, offset }, { loggedInUser }) => {
        try {
          if (userId !== loggedInUser.id) return [];
          const following = await client.user
            .findUnique({
              where: { id: loggedInUser.id },
            })
            .following({
              select: {
                id: true,
                name: true,
                avatar: true,
                zoneId: true,
              },
              take: 20,
              skip: offset ? offset : 0,
            });
          return following;
        } catch (error) {
          return [];
        }
      }
    ),
  },
};

export default resolvers;
