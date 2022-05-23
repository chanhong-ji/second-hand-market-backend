import client from '../client';
import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Zone: {
    countUser: ({ id }) => client.user.count({ where: { zoneId: id } }),

    countPost: ({ id }) => client.post.count({ where: { zoneId: id } }),
  },
};

export default resolvers;
