import client from '../../client';
import { Resolvers } from '../../types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createErrorMessage } from '../../shared.utils';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { phone, password }) => {
      try {
        const existingUser = await client.user.findUnique({
          where: { phone },
          select: { id: true, password: true },
        });
        if (!existingUser) throw new Error('User not found with phone number.');

        const passwordMatch = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!passwordMatch) throw new Error('Wrong Password');

        const token = await jwt.sign(
          { id: existingUser.id },
          process.env?.PRIVATE_KEY ?? ''
        );
        return { ok: true, token };
      } catch (error) {
        return {
          ok: false,
          error: createErrorMessage('login', error),
        };
      }
    },
  },
};

export default resolvers;
