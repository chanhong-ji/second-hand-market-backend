import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const PER_PAGE = 10;

const resolvers: Resolvers = {
  Query: {
    seeRooms: resolverProtected(
      async (_, { userId, offset }, { loggedInUser }) => {
        try {
          if (userId !== loggedInUser.id) throw new Error();
          return client.room.findMany({
            where: {
              users: {
                some: { id: userId },
              },
            },
            select: {
              id: true,
              users: {
                select: { id: true, name: true },
              },
            },
            take: PER_PAGE,
            skip: offset ? offset : 0,
          });
        } catch (error) {
          return [];
        }
      }
    ),
  },
};
export default resolvers;
