import {
  createErrorMessage,
  deleteFromS3,
  uploadToS3,
  zoneIdProcess,
} from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../users.utils';
import bcrypt from 'bcrypt';
import client from '../../client';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: resolverProtected(
      async (
        _,
        { name, password, avatar, zoneFirst, zoneSecond },
        { loggedInUser }
      ) => {
        try {
          let newAvatar;

          // AWS 이미지 처리
          if (avatar) {
            const user = await client.user.findUnique({
              where: { id: loggedInUser.id },
              select: { id: true, avatar: true, posts: true },
            });
            try {
              if (user?.avatar) await deleteFromS3(user.avatar);
              newAvatar = await uploadToS3(avatar, loggedInUser.id, 'avatar');
            } catch (error) {
              return {
                ok: false,
                error: createErrorMessage('editProfile(S3 upload)', error),
              };
            }
          }

          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              name,
              zoneId: zoneIdProcess(zoneFirst, zoneSecond),
              ...(password && { password: await bcrypt.hash(password, 5) }),
              ...(newAvatar && { avatar: newAvatar }),
            },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: createErrorMessage('editProfile', error),
          };
        }
      }
    ),
  },
};

export default resolvers;
