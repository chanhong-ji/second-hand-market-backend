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

      resolve: (
        { updateRoom: { message } }: any,
        { roomId }: any,
        { loggedInUser }: any,
        _: any
      ) => message,
    },
  },
};

export default resolvers;
