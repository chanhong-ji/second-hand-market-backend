import client from '../../client';
import { CATEGORY_LIST } from '../../dataList';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createCategory: async () => {
      const names = CATEGORY_LIST;

      const { count } = await client.category.createMany({
        data: names.map((name: string) => ({
          name,
        })),
        skipDuplicates: true,
      });

      return { ok: true, count };
    },
  },
};

export default resolvers;
