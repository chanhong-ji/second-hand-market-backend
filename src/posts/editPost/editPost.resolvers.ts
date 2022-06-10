import client from '../../client';
// import { deleteFromS3, uploadToS3 } from '../../shared.utils';
import { Resolvers } from '../../types';
import { resolverProtected } from '../../users/users.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPost: resolverProtected(
      async (_, { id, title, caption, categoryId }, { loggedInUser }) => {
        try {
          const prevPost = await client.post.findUnique({
            where: { id },
            select: { photos: true, userId: true },
          });
          if (!prevPost) throw new Error('Post not found');
          if (prevPost.userId !== loggedInUser.id)
            throw new Error('Not authorized');

          // let photoUrls = [];
          // if (prevPost?.photos) {
          //   for (let photo of prevPost.photos) {
          //     await deleteFromS3(photo);
          //   }
          // }

          // if (newPhotos?.length > 0) {
          //   for (let photo of newPhotos) {
          //     const location = await uploadToS3(
          //       await photo,
          //       loggedInUser.id,
          //       'post'
          //     );
          //     photoUrls.push(location);
          //   }
          // }

          await client.post.update({
            where: { id },
            data: {
              title,
              caption,
              // photos: photoUrls,
              ...(categoryId && {
                category: {
                  connect: { id: categoryId },
                },
              }),
            },
          });
          return { ok: true };
        } catch (error) {
          return {
            ok: false,
            error: `DB error from editPost resolver:${error}`,
          };
        }
      }
    ),
  },
};

export default resolvers;
