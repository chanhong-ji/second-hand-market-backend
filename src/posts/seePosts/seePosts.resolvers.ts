import client from '../../client';
import { Resolvers } from '../../types';

const POST_N = 10;

const resolvers: Resolvers = {
  Query: {
    seePosts: async (_, { zoneId, categoryId, page }) => {
      if (categoryId) {
        return client.post.findMany({
          where: {
            zoneId,
            categoryId,
          },
          take: POST_N,
          ...(page && { skip: POST_N * (page - 1) }),
        });
      } else {
        return client.post.findMany({
          where: {
            zoneId,
          },
          take: POST_N,
          ...(page && { skip: POST_N * (page - 1) }),
        });
      }
    },
  },
};

export default resolvers;
