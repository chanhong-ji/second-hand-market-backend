import client from '../../client';
import { createErrorMessage, uploadToS3 } from '../../shared.utils';
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
        try {
          if (newPhotos?.length > 3)
            throw new Error('Photo should be less than 3');
          let photoUrls = [];
          try {
            for (let photo of newPhotos) {
              const photoUrl = await uploadToS3(
                await photo,
                loggedInUser.id,
                'post'
              );
              photoUrls.push(photoUrl);
            }
          } catch (error) {
            throw new Error('AWS S3 upload error');
          }

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
            error: createErrorMessage('createPost', error),
          };
        }
      }
    ),
  },
};

export default resolvers;
