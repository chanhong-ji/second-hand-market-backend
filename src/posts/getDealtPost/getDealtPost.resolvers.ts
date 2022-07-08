import client from '../../client';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    getDealtPost: resolverProtected(
      async (_, { id: postId }, { loggedInUser }) => {
        try {
          const post = await client.post.findUnique({
            where: { id: postId },
            select: { userId: true },
          });

          if (!post) throw Error('Post not found');
          if (post?.userId !== loggedInUser.id) throw Error('Not authorized');

          await client.post.update({
            where: { id: postId },
            data: {
              dealt: true,
            },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: createErrorMessage('getDealtPost', error),
          };
        }
      }
    ),
  },
};

export default resolvers;
