import client from '../../client';
import pubsub from '../../pubsub';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';
import { UPDATE_ROOM } from '../updateRoom/updateRoom.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    readMessage: resolverProtected(
      async (_, { messageId }, { loggedInUser }) => {
        try {
          const message = await client.message.findFirst({
            where: {
              id: messageId,
              userId: { not: loggedInUser.id },
              room: {
                users: {
                  some: { id: loggedInUser.id },
                },
              },
            },
            select: {
              id: true,
            },
          });
          if (!message) throw new Error('Message not found');

          const updatedMessage = await client.message.update({
            where: {
              id: messageId,
            },
            data: {
              read: true,
            },
          });
          pubsub.publish(UPDATE_ROOM, {
            updateRoom: {
              result: {
                message: updatedMessage,
                read: true,
              },
            },
          });
          return { ok: true, id: message.id };
        } catch (e) {
          return { ok: false, error: createErrorMessage('readMessage', e) };
        }
      }
    ),
  },
};

export default resolvers;
