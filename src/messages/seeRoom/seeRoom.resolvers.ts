import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Query: {
    seeRoom: resolverProtected((_, { roomId }, { loggedInUser }) =>
      client.room.findFirst({
        where: {
          id: roomId,
          users: { some: { id: loggedInUser.id } },
        },
      })
    ),
  },
};
export default resolvers;
