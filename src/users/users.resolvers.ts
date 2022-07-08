import client from '../client';
import { Resolvers } from '../types';

const PER_PAGE = 9;

const resolvers: Resolvers = {
  User: {
    followerCount: ({ id }) =>
      client.user.count({
        where: {
          following: { some: { id } },
        },
      }),

    followingCount: async ({ id }) => {
      const li = await client.user
        .findUnique({ where: { id }, select: { id: true } })
        .following({ select: { id: true } });
      return li.length;
    },

    dealtCount: ({ id }) =>
      client.post.count({
        where: {
          userId: id,
          dealt: true,
        },
      }),

    zoneName: async ({ zoneId }) => {
      const zone = await client.zone.findUnique({
        where: { id: zoneId },
        select: { name: true },
      });
      return zone?.name ?? '';
    },

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
      return following ? true : false;
    },

    interestCount: ({ id }) =>
      client.interest.count({
        where: {
          userId: id,
        },
      }),
  },
};

export default resolvers;
