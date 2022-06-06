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

    zone: ({ id }) =>
      client.user
        .findUnique({ where: { id }, select: { id: true } })
        .zone({ select: { id: true, name: true } }),

    postsCount: ({ id }) => client.post.count({ where: { userId: id } }),

    posts: ({ id }, { offset }) =>
      client.post.findMany({
        where: { userId: id },
        take: POST_N,
        skip: offset ?? 0,
      }),

    isMe: ({ id }, _, { loggedInUser }) => Boolean(id === loggedInUser?.id),
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser || id === loggedInUser?.id) return false;
      const following = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });
      return !!following ? true : false;
    },
  },
};

export default resolvers;
