import client from '../../client';
import { zoneIdProcess } from '../../shared.utils';
import { Resolvers } from '../../types';

const POST_N = 12;

const resolvers: Resolvers = {
  Query: {
    searchPost: async (_, { keyword, zoneFirst, zoneSecond, page }) => {
      const posts = await client.post.findMany({
        where: {
          title: { contains: keyword.toLowerCase() },
          zoneId: zoneIdProcess(zoneFirst, zoneSecond),
        },
        take: POST_N,
        ...(page && { skip: POST_N * (page - 1) }),
      });

      const totalResults = await client.post.count({
        where: {
          title: { contains: keyword.toLowerCase() },
          zoneId: zoneIdProcess(zoneFirst, zoneSecond),
        },
      });

      return { posts, totalResults };
    },
  },
};

export default resolvers;
