import client from '../client';
import { Resolvers } from '../types';

const POST_N = 5;

const resolvers: Resolvers = {
  User: {
    followingCount: ({ id }) =>
      client.user.count({
        where: {
          following: { some: { id } },
        },
      }),

    posts: ({ id }, { offset }) =>
      client.post.findMany({
        where: { userId: id },
        select: {
          id: true,
          title: true,
          photos: true,
          dealt: true,
        },
        take: POST_N,
        skip: offset ?? 0,
      }),
  },
};

export default resolvers;
