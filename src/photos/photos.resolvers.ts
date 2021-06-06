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
  },
};

export default resolvers;
