import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Post: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, avatar: true },
      }),
    zone: ({ zoneId }) =>
      client.zone.findUnique({
        where: { id: zoneId },
        select: { name: true, id: true },
      }),
    category: ({ categoryId }) =>
      client.category.findUnique({
        where: { id: categoryId },
        select: { id: true, name: true },
      }),
    isMine: ({ userId }, _, { loggedInUser }) =>
      Boolean(userId === loggedInUser?.id),
    isInterest: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const interest = await client.interest.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId: loggedInUser.id,
          },
        },
        select: { id: true },
      });

      return interest ? true : false;
    },
    interestsCount: ({ id }) =>
      client.interest.count({ where: { postId: id } }),
  },

  Category: {
    countPost: ({ id }) => client.post.count({ where: { categoryId: id } }),
  },
};

export default resolvers;
