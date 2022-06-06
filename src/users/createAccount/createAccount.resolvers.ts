import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (_, { name, password, phone, zoneId }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            phone,
          },
        });
        if (existingUser)
          throw new Error('Account already exists with this phone number');

        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            name,
            password: hashedPassword,
            phone,
            zone: { connect: { id: zoneId } },
          },
        });
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error: `DB error from createAccount resolver:${error}`,
        };
      }
    },
  },
};

export default resolvers;
