import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePost: async (_, { id }) => client.post.findUnique({ where: { id } }),
  },
};

export default resolvers;
