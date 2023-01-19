import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createErrorMessage } from '../../shared.utils';
import client from '../../client';
import { Resolvers } from '../../types';
import config from '../../config';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { phone, password }) => {
      try {
        const user = await client.user.findUnique({
          where: { phone },
          select: { id: true, password: true },
        });
        if (!user) throw new Error('User not found with phone number.');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Wrong Password');

        const token = jwt.sign({ id: user.id }, config.jwt.secretKey, {
          expiresIn: config.jwt.expiresInSec,
        });

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
