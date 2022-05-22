import client from '../../client';
import { Resolvers } from '../../types';

const ZONE_N = 10;

const resolvers: Resolvers = {
  Query: {
    searchZone: async (_, { keyword, offset }) =>
      client.zone.findMany({
        where: { name: { startsWith: keyword } },
        take: ZONE_N,
        ...(offset && { skip: offset }),
      }),
  },
};

export default resolvers;
