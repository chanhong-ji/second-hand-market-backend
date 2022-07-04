import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { phone, password }) => {
      // Check if the user exists
      try {
        const user = await client.user.findUnique({
          where: { phone },
          select: { id: true, password: true },
        });
        if (!user) throw new Error('User not found with phone number.');

        // Check the password is right
        const ok = await bcrypt.compare(password, user?.password);
        if (ok) {
          // Issue token
          try {
            if (process.env.PRIVATE_KEY) {
              const token = await jwt.sign(
                { id: user.id },
                process.env.PRIVATE_KEY
              );
              return { ok: true, token };
            }
          } catch (error) {
            return { ok: false, error: 'jwt sign error:' + error };
          }
        } else {
          throw new Error('Wrong Password');
        }
      } catch (error) {
        return {
          ok: false,
          error: `DB error from login resolver:${error}`,
        };
      }
    },
  },
};

export default resolvers;
