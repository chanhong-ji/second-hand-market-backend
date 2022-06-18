import client from '../../client';
import { CATEGORY_LIST } from '../../dataList';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createCategory: async (_, { names }) => {
      const namesAfter = names.filter((name: string) =>
        CATEGORY_LIST.includes(name)
      );

      const { count } = await client.category.createMany({
        data: namesAfter.map((name: string) => ({
          name,
        })),
        skipDuplicates: true,
      });

      return { ok: true, count };
    },
  },
};

export default resolvers;
