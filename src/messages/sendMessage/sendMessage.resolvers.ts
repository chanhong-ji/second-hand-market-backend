import client from '../../client';
import pubsub from '../../pubsub';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';
import { UPDATE_ROOM } from '../updateRoom/updateRoom.resolvers';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: resolverProtected(
      async (_, { postId, payload }, { loggedInUser }) => {
        try {
          const room = await client.room.findFirst({
            where: {
              postId,
              users: {
                some: { id: loggedInUser.id },
              },
            },
            select: {
              id: true,
            },
          });

          const post = await client.post.findUnique({
            where: { id: postId },
            select: { userId: true },
          });
          if (!post) throw new Error('Post not found');

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
                      connect: [{ id: loggedInUser.id }, { id: post.userId }],
                    },
                    postId,
                  },
                },
              },
            });
          }
          pubsub.publish(UPDATE_ROOM, {
            updateRoom: {
              result: {
                message,
                read: false,
              },
            },
          });
          return { ok: true, ...(!!!room && { id: message.roomId }) };
        } catch (e) {
          return { ok: false, error: createErrorMessage('sendMessage', e) };
        }
      }
    ),
  },
};
export default resolvers;
