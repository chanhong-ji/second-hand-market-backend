import { Context, Resolver } from '../types';
import jwt from 'jsonwebtoken';
import client from '../client';

interface JwtPayload {
  id: number;
}

export const getMeUser = async (token: string) => {
  try {
    const { id } = (await jwt.verify(
      token,
      process.env.PRIVATE_KEY
    )) as JwtPayload;
    const user = await client.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};

export const resolverProtected =
  (resolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      if (info.operation.operation === 'query') return null;
      return {
        ok: false,
        error: `DB error from protected resolver: Not authorized. Blocked by protected resolver`,
      };
    } else {
      return resolver(root, args, context, info);
    }
  };
