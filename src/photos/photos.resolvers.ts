import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) =>
      await client.user.findUnique({ where: { id: userId } }),
    hashtags: async ({ id }, _, { client }) =>
      await client.hashtag.findMany({
        where: { photos: { some: { id } } },
      }),
    likes: async ({ id }, _, { client }) =>
      await client.like.count({ where: { photoId: id } }),
    comments: async ({ id }, _, { client }) =>
      await client.comment.findMany({ where: { photoId: id } }),
    commentNumber: async ({ id }, _, { client }) =>
      await client.comment.count({ where: { photoId: id } }),
    isMine: async ({ userId }, _, { loggedInUser }) =>
      userId === loggedInUser?.id,
  },
};

export default resolvers;
