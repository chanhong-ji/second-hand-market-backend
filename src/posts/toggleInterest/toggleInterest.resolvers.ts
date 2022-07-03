import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    toggleInterest: resolverProtected(async (_, { id }, { loggedInUser }) => {
      try {
        const post = await client.post.findUnique({
          where: { id },
          select: {
            userId: true,
          },
        });

        if (!post) throw new Error('Post not found');
        if (post.userId === loggedInUser.id)
          throw new Error('Post onwer not allowed');

        const interest = await client.interest.findUnique({
          where: {
            postId_userId: {
              postId: id,
              userId: loggedInUser.id,
            },
          },
          select: { id: true },
        });

        if (interest) {
          await client.interest.delete({
            where: {
              postId_userId: {
                postId: id,
                userId: loggedInUser.id,
              },
            },
          });
        } else {
          await client.interest.create({
            data: {
              post: { connect: { id } },
              user: { connect: { id: loggedInUser.id } },
            },
          });
        }

        return { ok: true, id };
      } catch (error) {
        return {
          ok: false,
          error: `DB error from toggleInterest resolver:${error}`,
        };
      }
    }),
  },
};

export default resolvers;
