import client from '../../client';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const PER_PAGE = 10;

const resolvers: Resolvers = {
  Query: {
    seeInterests: resolverProtected(async (_, { offset }, { loggedInUser }) =>
      client.interest.findMany({
        where: { userId: loggedInUser.id },
        take: PER_PAGE,
        skip: offset ? offset : 0,
        orderBy: {
          updatedAt: 'desc',
        },
      })
    ),
  },
};

export default resolvers;
