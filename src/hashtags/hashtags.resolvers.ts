import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Hashtag: {
    photos: async ({ id }, { page }, { client }) =>
      await client.photo.findMany({
        where: { hashtags: { some: { id } } },
        skip: (page - 1) * 5,
        take: 5,
      }),
    photoNumber: async ({ id }, _, { client }) =>
      await client.photo.count({
        where: { hashtags: { some: { id } } },
      }),
  },
};

export default resolvers;
