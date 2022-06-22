import client from '../../client';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

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

          await client.message.update({
            where: {
              id: messageId,
            },
            data: {
              read: true,
            },
          });
          return { ok: true };
        } catch (e) {
          return { ok: false, error: createErrorMessage('readMessage', e) };
        }
      }
    ),
  },
};

export default resolvers;
