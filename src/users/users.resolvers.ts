import client from '../client';
import { Resolvers } from '../types';

const PER_PAGE = 9;

const resolvers: Resolvers = {
  User: {
    followingCount: ({ id }) =>
      client.user.count({
        where: {
          following: { some: { id } },
        },
      }),

    dealtCount: ({ id }) =>
      client.post.count({
        where: {
          userId: id,
          dealt: true,
        },
      }),

    zone: ({ id }) =>
      client.user
        .findUnique({ where: { id }, select: { id: true } })
        .zone({ select: { id: true, name: true } }),
    zoneFirst: ({ zoneId }) => +zoneId.slice(0, -2),
    zoneSecond: ({ zoneId }) => +zoneId.slice(-2),

    postsCount: ({ id }) => client.post.count({ where: { userId: id } }),

    posts: ({ id }, { offset }) =>
      client.post.findMany({
        where: { userId: id },
        take: PER_PAGE,
        skip: offset ?? 0,
        orderBy: {
          createdAt: 'desc',
        },
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
