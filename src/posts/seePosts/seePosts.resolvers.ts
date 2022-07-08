import client from '../../client';
import { CATEGORY_LIST } from '../../dataList';
import { zoneIdProcess } from '../../shared.utils';
import { Resolvers } from '../../types';

const PER_PAGE = 12;

const resolvers: Resolvers = {
  Query: {
    seePosts: async (_, { categoryName, page, zoneFirst, zoneSecond }) => {
      let posts = [];
      let totalResults;

      if (categoryName) {
        if (!CATEGORY_LIST.includes(categoryName)) {
          return null;
        }
        posts = await client.post.findMany({
          where: {
            zoneId: zoneIdProcess(zoneFirst, zoneSecond),
            category: {
              name: categoryName,
            },
            dealt: false,
          },
          take: PER_PAGE,
          ...(page && { skip: PER_PAGE * (page - 1) }),
          orderBy: {
            createdAt: 'desc',
          },
        });
        totalResults = await client.post.count({
          where: {
            zoneId: zoneIdProcess(zoneFirst, zoneSecond),
            category: {
              name: categoryName,
            },
          },
        });
      } else {
        posts = await client.post.findMany({
          where: {
            zoneId: zoneIdProcess(zoneFirst, zoneSecond),
            dealt: false,
          },
          take: PER_PAGE,
          ...(page && { skip: PER_PAGE * (page - 1) }),
          orderBy: {
            createdAt: 'desc',
          },
        });
        totalResults = await client.post.count({
          where: {
            zoneId: zoneIdProcess(zoneFirst, zoneSecond),
          },
        });
      }

      return {
        posts,
        totalResults,
      };
    },
  },
};

export default resolvers;
