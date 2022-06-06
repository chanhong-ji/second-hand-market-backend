import { deleteFromS3, uploadToS3 } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';
import bcrypt from 'bcrypt';
import client from '../../client';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: resolverProtected(
      async (_, { name, password, avatar, zoneId }, { loggedInUser }) => {
        let newAvatar;
        try {
          if (avatar) {
            const user = await client.user.findUnique({
              where: { id: loggedInUser.id },
              select: { id: true, avatar: true, posts: true },
            });
            try {
              if (user?.avatar) await deleteFromS3(user.avatar);
              newAvatar = await uploadToS3(avatar, loggedInUser.id, 'avatar');
            } catch (error) {
              return { ok: false, error: `S3 upload error: ${error}` };
            }
          }
        } catch (error) {
          return {
            ok: false,
            error: `DB error from editProfile resolver:${error}`,
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            ...(password && { password: await bcrypt.hash(password, 5) }),
            ...(newAvatar && { avatar: newAvatar }),
            ...(zoneId && { zoneId }),
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
