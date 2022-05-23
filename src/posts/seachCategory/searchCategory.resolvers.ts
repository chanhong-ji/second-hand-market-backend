import client from '../../client';
import { Resolvers } from '../../types';

const N_CATEGORY = 20;

const resolvers: Resolvers = {
  Query: {
    searchCategory: (_, { keyword, offset }) =>
      client.category.findMany({
        where: {
          name: { startsWith: keyword },
        },
        select: {
          name: true,
          id: true,
        },
        take: N_CATEGORY,
        skip: offset ?? 0,
      }),
  },
};

export default resolvers;
