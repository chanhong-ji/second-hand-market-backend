import client from '../../client';
import { Resolvers } from '../../types';

const POST_N = 10;

const resolvers: Resolvers = {
  Query: {
    searchPost: async (_, { keyword, zoneId, categoryId, page }) => {
      await client.post.findMany({
        where: {
          title: { startsWith: keyword.toLowerCase() },
          ...(zoneId && { zoneId }),
          ...(categoryId && { categoryId }),
        },
        take: POST_N,
        ...(page && POST_N * (page - 1)),
      });
    },
  },
};

export default resolvers;
