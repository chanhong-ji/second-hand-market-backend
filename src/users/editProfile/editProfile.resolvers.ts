import client from '../../client';
import { deleteFromS3, uploadToS3 } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: resolverProtected(
      async (_, { name, password, avatar, zones, posts }, { loggedInUser }) => {
        let newAvatar = null;
        try {
          if (avatar) {
            const user = await client.user.findUnique({
              where: { id: loggedInUser.id },
              select: { id: true, avatar: true, zones: true, posts: true },
            });
            try {
              if (user?.avatar) await deleteFromS3(user.avatar);
              newAvatar = await uploadToS3(avatar, loggedInUser.id, 'avatar');
            } catch (error) {
              return { ok: false, error: `S3 upload error: ${error}` };
            }
          }
        } catch (error) {
          return { ok: false, error: `DB error: ${error}` };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            name,
            ...(password && { password: await bcrypt.hash(password, 5) }),
            ...(newAvatar && { avatar: newAvatar }),
          },
        });
      }
    ),
  },
};

export default resolvers;
