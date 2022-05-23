import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Post: {
    isMine: ({ id, userId, zoneId, dealt }, _, { loggedInUser }) =>
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
};

export default resolvers;
