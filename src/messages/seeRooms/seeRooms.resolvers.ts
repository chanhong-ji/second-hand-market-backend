import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const PER_PAGE = 10;

const resolvers: Resolvers = {
  Query: {
    seeRooms: resolverProtected(async (_, { offset }, { loggedInUser }) => {
      try {
        return client.room.findMany({
          where: {
            users: {
              some: { id: loggedInUser.id },
            },
          },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            postId: true,
          },
          take: PER_PAGE,
          skip: offset ? offset : 0,
        });
      } catch (error) {
        return [];
      }
    }),
  },
};
export default resolvers;
