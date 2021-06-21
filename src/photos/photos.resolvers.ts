import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) =>
      await client.user.findUnique({ where: { id: userId } }),
    hashtags: async ({ id }, _, { client }) =>
      await client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),
    likeNumber: async ({ id }, _, { client }) =>
      await client.like.count({ where: { photoId: id } }),
    comments: async ({ id }, _, { client }) =>
      await client.comment.findMany({ where: { photoId: id } }),
    commentNumber: async ({ id }, _, { client }) =>
      await client.comment.count({ where: { photoId: id } }),
    isMine: async ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser?.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const ok = await client.like.findUnique({
        where: {
          userId_photoId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: { id: true },
      });
      if (ok) return true;
      return false;
    },
  },
};

export default resolvers;
