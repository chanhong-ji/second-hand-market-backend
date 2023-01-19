import client from '../../client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { id }) => client.user.findUnique({ where: { id } }),
  },
};

export default resolvers;
