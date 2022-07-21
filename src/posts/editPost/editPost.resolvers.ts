import client from '../../client';
import { createErrorMessage } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPost: resolverProtected(
      async (
        _,
        { id, title, caption, categoryName, price },
        { loggedInUser }
      ) => {
        try {
          const prevPost = await client.post.findUnique({
            where: { id },
            select: { photos: true, userId: true },
          });
          if (!prevPost) throw new Error('Post not found');
          if (prevPost.userId !== loggedInUser.id)
            throw new Error('Not authorized');

          await client.post.update({
            where: {
              id,
            },
            data: {
              title,
              caption,
              category: {
                connect: {
                  name: categoryName,
                },
              },
              price,
            },
          });
          return { ok: true, id };
        } catch (error) {
          return {
            ok: false,
            error: createErrorMessage('editPost', error),
          };
        }
      }
    ),
  },
};

export default resolvers;
