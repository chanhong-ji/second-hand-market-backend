import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    createZone: resolverProtected(async (_, { name }) => {
      try {
        const exist = await client.zone.count({ where: { name } });
        if (exist > 0) return new Error('Zone already exists with this name');

        await client.zone.create({
          data: { name },
        });

        return { ok: true };
      } catch (error) {
        return { ok: false, error };
      }
    }),
  },
};

export default resolvers;
