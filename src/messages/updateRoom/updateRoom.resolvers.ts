import client from '../../client';
import pubsub from '../../pubsub';

export const UPDATE_ROOM = 'UPDATE_ROOM';

const resolvers = {
  Subscription: {
    updateRoom: {
      subscribe: async (_: any, { roomId }: any, { loggedInUser }: any) => {
        if (!loggedInUser) throw new Error('Not authorized');
        const roomCount = await client.room.count({
          where: {
            id: roomId,
            users: { some: { id: loggedInUser.id } },
          },
        });
        if (roomCount === 0) throw new Error('Not authorized');
        return pubsub.asyncIterator([UPDATE_ROOM]);
      },

      resolve: async (
        { updateRoom: { result } }: any,
        { roomId }: any,
        { loggedInUser }: any
      ) => result,
    },
  },
};

export default resolvers;
