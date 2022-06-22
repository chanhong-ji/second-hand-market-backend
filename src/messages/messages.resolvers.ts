import client from '../client';
import { Resolvers } from '../types';

const PER_PAGE = 20;

const resolvers: Resolvers = {
  Room: {
    unreadTotal: async ({ id }, _, { loggedInUser }) =>
      client.message.count({
        where: {
          roomId: id,
          userId: { not: loggedInUser.id },
          read: false,
        },
      }),

    users: ({ id }) =>
      client.room
        .findFirst({
          where: {
            id,
          },
        })
        .users({
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        }),

    messages: ({ id }, { offset }) =>
      client.message.findMany({
        where: {
          id,
        },
        take: PER_PAGE,
        skip: offset ? offset : 0,
      }),
  },
};

export default resolvers;
