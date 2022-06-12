import client from '../../client';
import { uploadToS3 } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    createPost: resolverProtected(
      async (
        _,
        { title, caption, price, photos: newPhotos, categoryName },
        { loggedInUser }
      ) => {
        if (newPhotos?.length > 3)
          return { ok: false, error: 'Photo should be less than 3' };
        let photoUrls = [];
        try {
          for (let photo of newPhotos) {
            const location = await uploadToS3(
              await photo,
              loggedInUser.id,
              'post'
            );
            photoUrls.push(location);
          }
        } catch (error) {
          return {
            ok: false,
            error: `S3 error from createPost resolver:${error}`,
          };
        }

        try {
          await client.post.create({
            data: {
              title,
              caption,
              price,
              photos: photoUrls,
              zone: { connect: { id: loggedInUser.zoneId } },
              dealt: false,
              user: { connect: { id: loggedInUser.id } },
              category: { connect: { name: categoryName } },
            },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: `DB error from createPost resolver:${error}`,
          };
        }
      }
    ),
  },
};

export default resolvers;
