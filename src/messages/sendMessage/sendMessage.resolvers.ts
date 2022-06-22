import client from '../../client';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

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
          if (room) {
            await client.message.create({
              data: {
                payload,
                userId: loggedInUser.id,
                roomId: room.id,
              },
            });
          } else {
            await client.room.create({
              data: {
                users: {
                  connect: [{ id: loggedInUser.id }, { id: toUserId }],
                },
                messages: {
                  create: {
                    payload,
                    userId: loggedInUser.id,
                  },
                },
              },
            });
          }
          return { ok: true };
        } catch (e) {
          return { ok: false, error: createErrorMessage('sendMessage', e) };
        }
      }
    ),
  },
};
export default resolvers;
