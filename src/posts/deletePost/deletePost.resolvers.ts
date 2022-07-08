import client from '../../client';
import { createErrorMessage, deleteFromS3 } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    deletePost: resolverProtected(async (_, { id }, { loggedInUser }) => {
      try {
        const post = await client.post.findUnique({
          where: { id },
          select: { userId: true, photos: true },
        });
        if (!post) throw new Error('Post not found');

        if (post.userId !== loggedInUser.id) throw new Error('Not authorized');

        if (post?.photos?.length > 0) {
          for (let photo of post.photos) {
            await deleteFromS3(photo);
          }
        }

        await client.post.delete({ where: { id } });
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error: createErrorMessage('deletePost', error),
        };
      }
    }),
  },
};

export default resolvers;
