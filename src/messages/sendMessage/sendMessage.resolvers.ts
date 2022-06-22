import { connect } from 'http2';
import client from '../../client';
import pubsub from '../../pubsub';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';
import { UPDATE_ROOM } from '../updateRoom/updateRoom.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: resolverProtected(
      async (_, { toUserId, payload }, { loggedInUser }) => {
        try {
          const room = await client.room.findFirst({
            where: {
              AND: [
                { users: { some: { id: toUserId } } },
                { users: { some: { id: loggedInUser.id } } },
              ],
            },
            select: {
              id: true,
            },
          });
          let message;
          if (room) {
            message = await client.message.create({
              data: {
                payload,
                userId: loggedInUser.id,
                roomId: room.id,
              },
            });
          } else {
            message = await client.message.create({
              data: {
                user: { connect: { id: loggedInUser.id } },
                payload,
                room: {
                  create: {
                    users: {
                      connect: [{ id: loggedInUser.id }, { id: toUserId }],
                    },
                  },
                },
              },
            });
          }
          pubsub.publish(UPDATE_ROOM, {
            updateRoom: {
              message,
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: createErrorMessage('sendMessage', e) };
        }
      }
    ),
  },
};
export default resolvers;
